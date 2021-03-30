import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect, useDispatch, useSelector } from 'react-redux';
import { gStyles } from '../../../global.style';
import { funcs } from '../../../global.funcs';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import TextLato from '../../utils/TextLato';
import Icon from '../../utils/Icon';
import CustomModal from '../../utils/CustomModal';
import { useLanguage } from '../../../hooks/language';
import { useNavigation } from '@react-navigation/native';
import { Constants } from 'react-native-unimodules';
import { setCart } from '../../../src/actions/cart';
import { setWishlist } from '../../../src/actions/wishlist';
import { useRef } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];


const SellerCardProduct = ({product, style, seller, showToast}) => {
    const language = useLanguage();
    const en = language === 'en';
    const navigation = useNavigation();
    const cartProducts = useSelector(state => state.cartReducer.cart.products);
    const wishlist = useSelector(state => state.wishlistReducer.wishlist.products);
    const token = useSelector(state => state.authReducer.token);
    const loggedIn = useSelector(state => state.authReducer.loggedIn);
    const type = useSelector(state => state.authReducer.type);
    const dispatch = useDispatch();

    useEffect(() => {
        setPicks(product.options.map(option => ({
            option: option._id,
            pick: option.options[0]._id,
            extraPrice: option.options[0].extraPrice ? option.options[0].extraPrice : 0
        })))
    }, [])
    
    // ** Helper Functions
    
    const containsItem = (product) => {
        return cartProducts.filter(cartProduct => {
            return cartProduct.product._id === product._id
        }).length;
    }
    
    const containsItemWishlist = (product) => {
        return wishlist.filter(wishlistProduct => {
            return wishlistProduct._id === product._id
        }).length;
    }

    const [wishlistButton, setWishlistButton] = useState(!containsItemWishlist(product));
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [cartButton, setCartButton] = useState(!containsItem(product));
    const [cartLoading, setCartLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [picks, setPicks] = useState([]);
    const [extraImage, setExtraImage] = useState(undefined);
    const [extraText, setExtraText] = useState('');
    const [addedPrice, setAddedPrice] = useState(0);

    useEffect(() => {
        setAddedPrice(picks.reduce((pickA, pickB) => pickA + pickB.extraPrice ,0));
    }, [picks]);
    
    const addToCartHelper = () => {
        if(!loggedIn) return showToast('You must be logged in to add to your cart!');
        if(product.extraText && extraText === '') return showToast('You must input the text specified by this product!');
        if(product.extraImage && extraImage === undefined) return showToast('You must select an image as specified by this product!');
        const quantity = 1;
        const options = picks;

        setCartLoading(true);
        if(product.extraImage){
            funcs.uploadImage(extraImage, product._id + '_')
            .then(res => {
                fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {
                    method: 'post',
                    headers: {token, 'Content-Type': 'application/json'},
                    body: JSON.stringify({product: product._id, options, quantity, image: res.location, text: extraText !== '' ? extraText : undefined})
                })
                .then(res => res.json())
                .then(res => {
                    setCartLoading(false);
                    showToast(`Added to Cart Successfully!`);
                    dispatch(setCart(res))
                })
                .catch(err => console.log(err))
            });
        } else {
            fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {
                method: 'post',
                headers: {token, 'Content-Type': 'application/json'},
                body: JSON.stringify({product: product._id, options, quantity, text: extraText !== '' ? extraText : undefined})
            })
            .then(res => res.json())
            .then(res => {
                setCartLoading(false);
                showToast(`Added to Cart Successfully!`);
                dispatch(setCart(res));
                setModalVisible(false);
            })
            .catch(err => console.log(err))
        }
    }

    const removeFromCartHelper = (product) => {
        if(!loggedIn || type !== 'client') return;
        setCartLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {
            method: 'delete',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product})
        })
        .then(res => res.json())
        .then(res => {
            setCartLoading(false);
            dispatch(setCart(res))
        })
        .catch(err => console.log(err))
    }

    const addToWishlistHelper = () => {
        if(!loggedIn || type !== 'client') return;
        setWishlistLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/wishlist`, {
            method: 'post',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product: product._id})
        })
        .then(res => res.json())
        .then(res => {
            setWishlistLoading(false);
            dispatch(setWishlist(res))
        })
        .catch(err => console.log(err))
    }

    const removeFromWishlistHelper = () => {
        if(!loggedIn || type !== 'client') return;
        setWishlistLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/wishlist`, {
            method: 'delete',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product: product._id})
        })
        .then(res => res.json())
        .then(res => {
            setWishlistLoading(false);
            dispatch(setWishlist(res))
        })
        .catch(err => console.log(err))
    }

    const changePick = (option, newPick) => {
        setPicks(picks => {
            return picks.map(pick => {
                if(pick.option === option._id){
                    pick.pick = newPick._id;
                    pick.extraPrice = newPick.extraPrice ? newPick.extraPrice : 0;
                    return pick;
                } else return pick;
            })
        })
    }

    const calculatePrice = () => {
        const dealOfTheDay = product.dealOfTheDay ? 1 - product.dealOfTheDay.discount/100 : 1;
        const discount = product.discount ? 1 - product.discount : 1;
        return ((product.price + addedPrice) * dealOfTheDay * discount).toFixed(2);
    }

    useEffect(() => {
        setCartButton(!containsItem(product));
        setWishlistButton(!containsItemWishlist(product));
    }, [cartProducts, wishlist])

    if(!product)
    return (
        <View style={[styles.container, {...style, height: height * 0.18,flexDirection: en ? 'row' : 'row-reverse', transform: en ? [] : [{scaleX: -1}]}]}>
            <ActivityIndicator size={RFPercentage(5)} color={gStyles.color_2} />
        </View>

    )

    return (
        <View style={{...style, zIndex: 9}}>
            <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} confirm={addToCartHelper}>
                <ScrollView style={{ width: width * 0.65, maxHeight: height * 0.4}}>
                    {product.options.length > 0 && (
                        <View>
                                {product.options.map(option => {
                                    return (
                                        <View key={Math.random()}>
                                            <TextLato bold style={mainStyles.optionsSubtitle}>{option.title[language]}</TextLato>
                                            <ScrollView horizontal>
                                                <View style={{flexDirection: 'row', marginBottom: height * 0.02, width: '100%'}}>
                                                    {option.options.map(optionPick => {
                                                        if(optionPick.stock === 0) return;
                                                        
                                                        const picked = picks.filter(pick => pick.pick === optionPick._id).length ? true : false;
                                                        return (
                                                            <TouchableOpacity key={Math.random()} activeOpacity={0.4} onPress={() => {
                                                                changePick(option, optionPick)
                                                            }}>
                                                                <View style={{...mainStyles.optionOptionsView, borderColor: picked ?  gStyles.color_2 : '#aaa'}}>
                                                                    <TextLato style={{...mainStyles.optionOptions, color: picked ? gStyles.color_2 : '#aaa'}}>{optionPick.title[language]}</TextLato>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    })}
                                                </View>
                                            </ScrollView>
                                        </View>
                                    )
                                })}
                                </View>
                    )}
                    {(product.extraText) && (
                        <View>
                            <TextLato style={{fontSize: RFPercentage(2), color: 'black'}} bold>This product requires an input:</TextLato>
                            <TextInput
                                value={extraText}
                                onChangeText={(val) => setExtraText(val)}
                                style={mainStyles.input}
                                placeholder={'Enter text here'} />
                        </View>
                    )}
                    {(product.extraImage) && (
                        <View style={{marginBottom: height * 0.05}}>
                            <TextLato style={{fontSize: RFPercentage(2), color: 'black'}} bold>This product requires an image:</TextLato>
                            <TouchableOpacity onPress={() => funcs.chooseImage(setExtraImage)} style={{alignItems: 'center'}}>
                                <Image 
                                    source={{uri: extraImage || 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'}}
                                    style={{width: '80%', aspectRatio: 1, maxHeight: height * 0.4, resizeMode: 'contain', borderRadius: 5, marginVertical: height * 0.01}}/>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
                    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: height * 0.05}}>
                        <TextLato bold>Total Price</TextLato>
                        <TextLato>{calculatePrice()}</TextLato>
                    </View>
            </CustomModal>
            {product.dealOfTheDay && <Image source={{uri: 'https://imgur.com/qIJjuUY.gif'}} style={{position: 'absolute', top: -height * 0.05,right: 0, width: width * 0.25, aspectRatio: 612/453, zIndex: 2, transform: en ? [] : [{scaleX: -1}]}} />}
            <TouchableOpacity
                style={[styles.container, {flexDirection: en ? 'row' : 'row-reverse', transform: en ? [] : [{scaleX: -1}], height: en ? height * 0.18 : height * 0.24}]} 
                activeOpacity={1}
                onPress={() => type !== 'store' ? navigation.push('Product', {product: product}) : null}>
                <View>
                    {product.discount && <TextLato style={styles.discountContainer}>{Math.floor(product.discount * 100)}% {en ? 'OFF' : 'خصم'}</TextLato>}
                    {product.dealOfTheDay && <TextLato style={{...styles.discountContainer, backgroundColor: 'black'}}>{Math.floor(product.dealOfTheDay.discount)}% {en ? 'OFF' : 'خصم'}</TextLato>}
                    <Image style={styles.image} source={{uri: product.images[0]}} />
                </View>

                {/* Details */}
                <View style={styles.details}>
                    <TextLato bold style={styles.title}>{product.title[language]}</TextLato>
                    <TextLato style={styles.description}>{product.description[language].substr(0, 100)}...</TextLato>
                    {(product.discount || product.dealOfTheDay) ? 
                        <View key={Math.random()} style={{marginTop: height * 0.02}}>
                            <TextLato italic style={{fontSize: RFPercentage(1.7), textDecorationLine: 'line-through', color: gStyles.color_3, marginLeft: RFPercentage(0.7)}}>{product.price} {en ? 'EGP' : 'ج.م'}</TextLato>
                            <TextLato bold style={{fontSize: RFPercentage(1.7), marginLeft: RFPercentage(0.7), color: gStyles.color_2}}>{calculatePrice()} {en ? 'EGP' : 'ج.م'}</TextLato>
                        </View>
                        :
                        <TextLato style={{fontSize: RFPercentage(1.7), color: gStyles.color_0, marginTop: height * 0.02}}>{product.price} {en ? 'EGP' : 'ج.م'}</TextLato>
                    }
                </View>

                {/* Buttons */}
                <View style={styles.buttons}>
                    {/* Cart */}
                    {cartLoading ? 
                        <View >
                            <ActivityIndicator color={'white'} style={{...styles.cartContainer, ...{backgroundColor: gStyles.color_1}}} size={20} />
                        </View>
                    :
                    cartButton ?
                        <TouchableOpacity activeOpacity={0.4} onPress={() => {
                            if(seller) return;
                            if(!loggedIn) return showToast('You must be logged in to add to your cart!');
                            (product.extraText || product.extraImage || product.options.length > 0) ? setModalVisible(true) : addToCartHelper(product)
                        }}>
                            <Icon style={{...styles.cartContainer, ...{backgroundColor: gStyles.color_1}}} type="FontAwesome5" color="white" size={20} name="cart-plus" />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity activeOpacity={0.4} onPress={() => removeFromCartHelper(product._id)}>
                            <Icon style={{...styles.cartContainer, ...{backgroundColor: '#20B2AA'}}} type="MaterialIcons" color="white" size={23} name="remove-shopping-cart" />
                        </TouchableOpacity>
                    }
                    {/* Wishlist */}
                    {wishlistLoading ? 
                        <View >
                            <ActivityIndicator color={'white'} style={{...styles.cartContainer, ...{backgroundColor: gStyles.color_1}}} size={20} />
                        </View>
                    :
                    wishlistButton ? 
                        <TouchableOpacity activeOpacity={0.4} onPress={() => addToWishlistHelper({product: product, quantity: 1})}>
                            <Icon style={{...styles.cartContainer, ...{backgroundColor: gStyles.color_1}}} type="FontAwesome5" color="white" size={20} name="heart" />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity activeOpacity={0.4} onPress={() => removeFromWishlistHelper(product)}>
                            <Icon style={{...styles.cartContainer, ...{backgroundColor: '#20B2AA'}}} type="MaterialCommunityIcons" color="white" size={23} name="heart" />
                        </TouchableOpacity>
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#eee',
        borderWidth: 2,
        backgroundColor: 'white',
        padding: RFPercentage(1.5),
        height: height * 0.18
    },
    image: {
        width: width * 0.23,
        aspectRatio: 1
    },
    details: {
        width: width * 0.4,
        marginHorizontal: width * 0.03
    },
    title: {
        fontSize: RFPercentage(1.7),
    },
    description: {
        fontSize: RFPercentage(1.1),
        marginTop: height * 0.005
    },
    buttons: {
        width: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    discountContainer: {
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: gStyles.color_2,
        color: 'white',
        fontSize: RFPercentage(1.5),
    },
    cartContainer: {
        width: width * 0.09,
        height: width * 0.09,
        borderRadius: 100,
        backgroundColor: gStyles.color_0,
        marginVertical: RFPercentage(0.5),
        justifyContent: 'center',
        alignItems: 'center',
        
    }
})

const mainStyles = StyleSheet.create({
    optionsContainer: {
        marginBottom: height * 0.02
    },
    optionsTitle: {
        marginBottom: height * 0.02,
        fontSize: RFPercentage(2)
    },
    optionsSubtitle: {
        fontSize: RFPercentage(1.7),
        marginBottom: height * 0.01,
    },
    optionOptionsView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.008,
        borderColor: '#aaa',
        marginRight: 10,
        borderWidth: 2,
        borderRadius: 3,
    },
    optionOptions: {
        color: '#aaa',
    },
    input: {
        marginTop: height * 0.01,
        paddingTop: height * 0.01,
        fontSize: RFPercentage(2.5),
        fontFamily: 'Cairo',
        borderBottomWidth: 2,
        borderColor: gStyles.color_2,
        marginBottom: height * 0.02
    },
})


const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart,
        wishlist: state.wishlistReducer.wishlist
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch(addToCart(product)),
        removeFromCart: (product) => dispatch(removeFromCart(product)),
        addToWishlist: (product) => dispatch(addToWishlist(product)),
        removeFromWishlist: (product) => dispatch(removeFromWishlist(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerCardProduct);