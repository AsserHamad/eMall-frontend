import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, ImageBackground, Linking, Platform, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import { useLanguage, useLanguageText } from '../hooks/language';
import Swiper from 'react-native-swiper/src';
import { gStyles } from '../global.style';
import { funcs } from '../global.funcs';
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Reviews from '../components/utils/Reviews';
import TextLato from '../components/utils/TextLato';
import Icon from '../components/utils/Icon';
import ScrollCards from '../components/ScrollCards';
import StoreCard from '../components/cards/StoreCard';
import SimilarProductCard from '../components/cards/Product/SimilarProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../src/actions/cart';
import ProductReviewCard from '../components/cards/Product/ProductReviewCard';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import Toast from 'react-native-easy-toast';
import SellerCardProduct from '../components/cards/Seller/SellerCardProduct';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const image = 'https://imgur.com/qIJjuUY.gif';
const bubbles = [
    'https://imgur.com/G27hm50.png',
    'https://imgur.com/Jd0bH1o.png',
    'https://imgur.com/FnOaCd8.png',
    'https://imgur.com/5AcEkKV.png',
];


const getColors = (discount) => {
    discount = Number(discount);
    if(discount < 40)
        return 0;
    if(discount < 60)
        return 1;
    if(discount < 80)
        return 2
    return 3;
}

const Product = (props) => {
    const [product, setProduct] = useState(null);
    const [picks, setPicks] = useState([]);
    const [addedPrice, setAddedPrice] = useState(0);
    const [similarStores, setSimilarStores] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [logoAspectRatio, setLogoAspectRatio] = useState(4/3);
    const [cartLoading, setCartLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('product');
    const dispatch = useDispatch();
    const cartProducts = useSelector(state => state.cartReducer.cart.products);
    const inCart = () => cartProducts.filter(cartProd => cartProd._id === product._id).length > 0;
    const token = useSelector(state => state.authReducer.token);
    const loggedIn = useSelector(state => state.authReducer.loggedIn);
    const toast = useRef();
    const [extraImage, setExtraImage] = useState(undefined);
    const [extraAspectRatio, setExtraAspectRatio] = useState(1);
    const [extraText, setExtraText] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        fetchProduct(props.route.params.product._id);
        fetch(`${Constants.manifest.extra.apiUrl}/product/reviews/${props.route.params.product._id}`)
        .then(res => res.json())
        .then(res => {
            setReviews(res);
        })
    }, []);

    useEffect(() => {
        setAddedPrice(picks.reduce((pickA, pickB) => pickA + pickB.extraPrice ,0));
    }, [picks]);

    useEffect(() => {
        if(extraImage)
            Image.getSize(extraImage, (width, height) => setExtraAspectRatio(width/height))
    }, [extraImage])

    const showToast = message => {
        toast.current.show(message);
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

    const fetchProduct = (product) => {
        fetch(`${Constants.manifest.extra.apiUrl}/product/${product}`)
        .then(res => res.json())
        .then(res => {
            setPicks(res.options.map(option => ({
                option: option._id,
                pick: option.options[0]._id,
                extraPrice: option.options[0].extraPrice ? option.options[0].extraPrice : 0
            })))
            res.reviewAverage = {average: 5, number: 4730};
            res.store.logo = res.store.logo ? res.store.logo : "https://logos-world.net/wp-content/uploads/2020/11/The-Body-Shop-Logo.png";
            Image.getSize(res.store.logo, (width, height) => setLogoAspectRatio(width/height));
            setProduct(res);

            fetch(`${Constants.manifest.extra.apiUrl}/store/find-similar-stores`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({store: res.store})
            })
            .then(resp => resp.json())
            .then(stores => {
                setSimilarStores(stores);
            })

            fetch(`${Constants.manifest.extra.apiUrl}/product/more-from-seller`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(res)
            })
            .then(resp => resp.json())
            .then(products => {
                setSimilarProducts(products);
            })
        });
    }

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
                    // showToast(`Added to Cart Successfully!`);
                    dispatch(setCart(res))
                    navigation.push('Cart');
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
                // showToast(`Added to Cart Successfully!`);
                dispatch(setCart(res))
                navigation.push('Cart');
            })
            .catch(err => console.log(err))
        }
    }

    const calculatePrice = () => {
        const dealOfTheDay = product.dealOfTheDay ? 1 - product.dealOfTheDay.discount/100 : 1;
        const discount = product.discount ? 1 - product.discount : 1;
        return ((product.price + addedPrice) * dealOfTheDay * discount).toFixed(2);
    }

    if(!product)
        return (
            
            <View style={{...styles.container}}>
                <Header search={false} details={{title: product ? product.title[language] : ''}} />
                <View style={{height: height * 0.8, justifyContent: 'center'}}>
                    <ActivityIndicator color={gStyles.color_0} size={RFPercentage(10)} />
                </View>
            </View>
        )

    return (
        <View style={styles.container}>
            <Toast ref={_toast => toast.current = _toast} />
            <Header search={false} details={{title: product ? product.title[language] : ''}} />
                <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <Swiper
                    activeDotColor={gStyles.color_0}
                    containerStyle={styles.swiper}
                >
                    {product.images.map(image => (
                        <TouchableOpacity activeOpacity={1} key={Math.random()}  onPress={() => {navigation.push('Gallery', {images: product.images})}}>
                            <ImageBackground style={styles.swiperImage} source={{uri: image}}>

                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                    
                </Swiper>
                        
                    {/* DEAL OF THE DAY */}
                    {product.dealOfTheDay && (
                    <View style={{flexDirection: 'row', position: 'absolute', left: 0, top: height * 0.33}}>
                        <Image source={{uri: image}} style={{width: width * 0.3, aspectRatio: 1.7, zIndex: 2}} />
                        {/* <ImageBackground source={{uri: bubbles[getColors(product.dealOfTheDay.discount)]}} 
                            style={{...styles.discountBubble, transform: [{translateX: en ? -width * 0.02 : width * 0.02}]}}>
                            <TextLato style={{fontSize: RFPercentage(3.5), textAlign: 'center', color: 'white'}}>{product.dealOfTheDay.discount}<TextLato style={{fontSize: RFPercentage(2)}}>%</TextLato></TextLato>
                            <TextLato style={{fontSize: en ? RFPercentage(1.1) : RFPercentage(1.5), textAlign: 'center', color: 'white'}}>{en ? 'D I S C O U N T' : 'تخفيض'}</TextLato>
                        </ImageBackground> */}
                    </View>
                    )}

                    <View style={mainStyles.detailsContainer}>
                        {/* TITLE */}
                        <TextLato bold style={mainStyles.title}>{product.title[language]}</TextLato>
                        
                        {/* REVIEWS */}
                        <Reviews style={{...mainStyles.reviews, flexDirection: en ? 'row' : 'row-reverse'}} size={RFPercentage(1.5)} reviews={product.reviewAverage} />
                        
                        {/* STORE */}
                        <View style={{...mainStyles.storeContainer, flexDirection: en ? 'row' : 'row-reverse'}}>
                            <TextLato bold style={mainStyles.soldBy}>{text.soldBy}</TextLato>
                            <TouchableOpacity onPress={() => navigation.push('Store', {store: {_id: product.store._id}})} style={mainStyles.storeViewContainer}>
                                <TextLato style={mainStyles.storeTitle}>{product.store.title}</TextLato>
                                <Image style={{...mainStyles.storeLogo, aspectRatio: logoAspectRatio }} source={{uri: product.store.logo}} />
                            </TouchableOpacity>
                        </View>

                        {/* OPTIONS */}
                        {(product.variants || product.options.length !== 0) && <View style={mainStyles.optionsContainer}>
                            <TextLato bold style={mainStyles.optionsTitle}>{text.options}</TextLato>
                            <View>
                                {/* VARIANTS */}
                                {product.variants && 
                                        <View key={Math.random()}>
                                            <TextLato bold style={mainStyles.optionsSubtitle}>{product.variants.title[language]}</TextLato>
                                            <ScrollView horizontal>

                                            <View style={{flexDirection: en ? 'row' : 'row-reverse', marginBottom: height * 0.02, width: '100%'}}>
                                                {product.variants.products.map(variant => {
                                                    const picked = variant.product === product._id;
                                                    return (
                                                        <TouchableOpacity key={Math.random()} activeOpacity={0.4} onPress={() => {
                                                            if(!picked)fetchProduct(variant.product);
                                                        }}>
                                                            <View style={{...mainStyles.optionOptionsView, borderColor: picked ?  gStyles.color_0 : '#aaa'}}>
                                                                <TextLato style={{...mainStyles.optionOptions, color: picked ? gStyles.color_0 : '#aaa'}}>{variant.variant[language]}</TextLato>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })}
                                            </View>
                                                </ScrollView>
                                        </View>}
                                {product.options.map(option => {
                                    return (
                                        <View key={Math.random()}>
                                            <TextLato bold style={mainStyles.optionsSubtitle}>{option.title[language]}</TextLato>
                                            <ScrollView style={{transform: en ? [] : [{scaleX: -1}]}} horizontal>

                                            <View style={{flexDirection: 'row', marginBottom: height * 0.02, width: '100%'}}>
                                                {option.options.map(optionPick => {
                                                    if(optionPick.stock === 0) return;
                                                    
                                                    const picked = picks.filter(pick => pick.pick === optionPick._id).length ? true : false;
                                                    return (
                                                        <TouchableOpacity key={Math.random()} activeOpacity={0.4} onPress={() => {
                                                            changePick(option, optionPick)
                                                        }}>
                                                            <View style={{...mainStyles.optionOptionsView, borderColor: picked ?  gStyles.color_2 : '#aaa', transform: en ? [] : [{scaleX: -1}]}}>
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
                        </View>}

                        {/* DESCRIPTION */}
                        {product.description.en !== '' && <View style={mainStyles.descriptionContainer}>
                            <TextLato bold style={mainStyles.descriptionTitle}>{text.overview}</TextLato>
                            <TextLato style={{fontSize: RFPercentage(1.7)}}>{product.description[language]}</TextLato>
                        </View>}


                        {/* EXTRA IMAGE AND TEXT */}
                        {(product.extraText) && (
                            <View>
                                <TextLato style={{fontSize: RFPercentage(2.5), color: gStyles.color_2}} bold>{text.extraTextTitle}</TextLato>
                                <TextLato style={{fontSize: RFPercentage(1.7)}} italic>{text.extraDetails}</TextLato>
                                <TextInput
                                    value={extraText}
                                    onChangeText={(val) => setExtraText(val)}
                                    style={mainStyles.input}
                                    placeholder={text.enterInfo} />
                            </View>
                        )}
                        {(product.extraImage) && (
                            <View style={{marginBottom: height * 0.02}}>
                                <TextLato style={{fontSize: RFPercentage(2.5), color: gStyles.color_2}} bold>{text.extraImageTitle}</TextLato>
                                <TextLato style={{fontSize: RFPercentage(1.7)}} italic>{text.extraDetails}</TextLato>
                                <TouchableOpacity onPress={() => funcs.chooseImage(setExtraImage)}>
                                    <Image 
                                        source={{uri: extraImage || 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'}}
                                        style={{width: '40%', aspectRatio: extraAspectRatio, maxHeight: height * 0.4, resizeMode: 'contain', borderRadius: 5, marginVertical: height * 0.01}}/>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* PRICE */}
                        <View style={{flexDirection: en ? 'row' : 'row-reverse', alignItems: 'center', marginBottom: height * 0.03}}>
                            
                            {(!product.discount && !product.dealOfTheDay) ? 
                                <TextLato bold style={mainStyles.price}>{(product.price + addedPrice).toFixed(2)} <TextLato style={mainStyles.currency}>{en ? 'EGP' : 'ج.م.'}</TextLato></TextLato>
                            :
                                <View>
                                    <View style={{flexDirection: en ? 'row' : 'row-reverse', alignItems: 'center'}}>
                                        <TextLato bold style={{...mainStyles.price, textDecorationLine: 'line-through'}}>{(product.price + addedPrice).toFixed(2)} <TextLato style={mainStyles.currency}>{en ? 'EGP' : 'ج.م.'}</TextLato></TextLato>
                                        {product.discount && <View style={styles.discountContainer}>
                                            <TextLato bold style={{color: 'white', fontSize: RFPercentage(1.7)}}>{product.discount * 100}%</TextLato>
                                            <TextLato style={{color: 'white', fontSize: RFPercentage(1.7), marginHorizontal: width * 0.01}} italic>{en ? 'OFF' : 'خصم'}</TextLato>
                                        </View>}
                                        {product.dealOfTheDay && <View style={{...styles.discountContainer, backgroundColor: 'black', marginHorizontal: 5}}>
                                            <TextLato bold style={{color: 'white', fontSize: RFPercentage(1.7)}}>{product.dealOfTheDay.discount}%</TextLato>
                                            <TextLato style={{color: 'white', fontSize: RFPercentage(1.7), marginHorizontal: width * 0.01}} italic>{en ? 'OFF' : 'خصم'}</TextLato>
                                        </View>}
                                    </View>
                                    <TextLato bold style={mainStyles.price}>{calculatePrice()} <TextLato style={mainStyles.currency}>{en ? 'EGP' : 'ج.م.'}</TextLato></TextLato>                                    
                                </View>
                        }
                        </View>

                        
                        {/* CART */}
                        {inCart ? 
                        <TouchableOpacity onPress={() => {addToCartHelper()}}>
                            <View style={mainStyles.addToCartButton}>
                                <TextLato style={{color: 'white', fontSize: RFPercentage(2), marginHorizontal: width * 0.03}}>{text.addToCart}</TextLato>
                                <Icon type="FontAwesome5" color="white" size={RFPercentage(2)} name="cart-plus" />
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => addToCartHelper()}>
                            <View style={mainStyles.addToCartButton}>
                                <TextLato style={{color: 'white', fontSize: RFPercentage(2), marginHorizontal: width * 0.03}}>{text.addToCart}</TextLato>
                                <Icon type="FontAwesome5" color="white" size={RFPercentage(2)} name="cart-plus" />
                            </View>
                        </TouchableOpacity>
                        }

                        {/* SPECIFICATIONS */}
                        {product.specifications && product.specifications.length !== 0 && <View style={mainStyles.specificationsContainer}>
                            <TextLato bold style={mainStyles.specificationTitle}>{text.specifications}</TextLato>
                            <View>
                                {product.specifications.map(spec => {
                                    const num = product.specifications.indexOf(spec) % 2 === 0;
                                    return (
                                        <View key={Math.random()} style={{...mainStyles.specificationTile,
                                            flexDirection: en ? 'row' : 'row-reverse', 
                                            backgroundColor: num ? 'white' : 'transparent'}}>
                                            <View style={{width: '50%'}}>
                                                <TextLato bold >{spec.title[language]}</TextLato>
                                            </View>
                                            <View style={{width: '50%'}}>
                                                <TextLato style={{color: '#555'}}>{spec.details[language]}</TextLato>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>}

                        {/* REVIEWS */}
                        {reviews.length > 0 && <View style={mainStyles.reviewsContainer}>
                            <TextLato bold style={mainStyles.reviewsTitle}>{text.reviews}</TextLato>
                            <ScrollView horizontal>
                                {reviews.map(review => <ProductReviewCard key={Math.random()} review={review} />)}
                            </ScrollView>
                        </View>}
                    </View>
                        {/* MORE FROM STORE */}
                        <ScrollCards 
                            style={{width}}
                            title={`${text.moreFrom} ${product.store.title}`}
                            cards={similarProducts.map(product => <SellerCardProduct showToast={showToast} key={Math.random()} product={product} style={{marginHorizontal: width * 0.02}} />)}
                            />

                        {/* MORE ITEMS */}
                        {/* <ScrollCards style={{width}} title={text.similarStores} cards={similarStores.map(store => <StoreCard key={Math.random()} store={store} />)} /> */}
                </ScrollView>
        </View>
    )
}

const SwiperImage = (image) => {
    const [aspectRatio, setAspectRatio] = useState(1);
    useEffect(() => {
        Image.getSize(image, (width, height) => setAspectRatio(width/height))
    }, []);
    return <Image style={{...styles.swiperImage, aspectRatio}} source={{uri: image}} key={Math.random()} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gStyles.background
    },
    swiper: {
        height: height * 0.4,
        backgroundColor: 'white'
    },
    swiperImage: {
        height: height * 0.4,
        width: '100%',
        resizeMode: 'contain'
    },
    swiperDot: {
        backgroundColor:gStyles.background, 
        width: 14, 
        height: 3,
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3, 
        marginBottom: 1,
    },
    swiperActiveDot: {
        backgroundColor:gStyles.color_0, 
        width: 14, 
        height: 3,
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3, 
        marginBottom: 1,
    },
    discountBubble: {
        width: width * 0.2,
        aspectRatio: 1,
        // transf
        borderRadius: 100,
        marginHorizontal: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerDiscountBubble: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: width * 0.2,
        borderRadius: 100,
        marginHorizontal: 'auto',
        // transform: [{translateY: height * 0.01}, {translateX: width * 0.02}],
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    discountContainer: {
        flexDirection: 'row',
        paddingVertical: height * 0.008,
        paddingHorizontal: width * 0.015,
        backgroundColor: gStyles.active,
        borderRadius: 10,
        marginHorizontal: width * 0.02,
        alignItems: 'center'
    },
});

const mainStyles = StyleSheet.create({
    detailsContainer: {
        marginTop: height * 0.02,
        width: width * 0.93,
        marginBottom: height * 0.05,
    },
    title: {
        fontSize: RFPercentage(3),
        marginBottom: height * 0.01,
        textTransform: 'capitalize'
    },
    reviews: {
        marginBottom: height * 0.01
    },
    price: {
        color: gStyles.color_0,
        fontSize: RFPercentage(2.4),
    },
    currency: {
        color: gStyles.color_3,
        fontSize: RFPercentage(1.8),
        marginHorizontal: width * 0.02,
        fontFamily: 'Cairo'
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: gStyles.color_1,
        height: 50,
        marginBottom: height * 0.05,
    },
    removeFromCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: gStyles.color_0,
        height: 50,
        marginBottom: height * 0.05,
    },
    storeContainer: {
        // width: width * 0.3,
        // aspectRatio: 1,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: height * 0.03,
        flexDirection: 'row'
    },
    soldBy: {
        fontSize: RFPercentage(1.7),
        marginHorizontal: width * 0.02
    },
    storeViewContainer: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    storeTitle: {
        fontSize: RFPercentage(1.7),
        fontFamily: 'Lato',
        marginRight: width * 0.01
    },
    storeLogo: {
        // width: width * 0.07,
    },
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
    descriptionContainer: {
        marginBottom: height * 0.05
    },
    descriptionTitle: {
        marginBottom: height * 0.01,
        fontSize: RFPercentage(2)
    },
    specificationsContainer: {
    },
    specificationTitle: {
        fontSize: RFPercentage(2),
        marginBottom: height * 0.01
    },
    specificationTile: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    reviewsContainer: {
        marginTop: height * 0.05
    },
    reviewsTitle: {
        marginBottom: height * 0.01,
        fontSize: RFPercentage(2)

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

export default Product;