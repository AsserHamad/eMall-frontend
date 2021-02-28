import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { useLanguage } from '../hooks/language';
import Swiper from 'react-native-swiper/src';
import { gStyles } from '../global.style';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
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
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const Product = (props) => {
    const [product, setProduct] = useState(null);
    const [picks, setPicks] = useState([]);
    const [addedPrice, setAddedPrice] = useState(0);
    const [similarStores, setSimilarStores] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [logoAspectRatio, setLogoAspectRatio] = useState(4/3);
    const [cartLoading, setCartLoading] = useState(false);
    const language = useLanguage();
    const dispatch = useDispatch();
    const cartProducts = useSelector(state => state.cartReducer.cart.products);
    const inCart = () => cartProducts.filter(cartProd => cartProd._id === product._id).length > 0;
    const token = useSelector(state => state.authReducer.token);
    const loggedIn = useSelector(state => state.authReducer.loggedIn);
    const toast = useRef();

    useEffect(() => {
        fetchProduct(props.route.params.product._id);
    }, []);

    useEffect(() => {
        setAddedPrice(picks.reduce((pickA, pickB) => pickA + pickB.extraPrice ,0));
    }, [picks])

    const showToast = message => {
        toast.current.show(message);
    }

    const changePick = (option, newPick) => {
        // console.log(option, newPick)
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
            console.log(res.options)
            setPicks(res.options.map(option => ({
                option: option._id,
                pick: option.options[0]._id,
                extraPrice: option.options[0].extraPrice ? option.options[0].extraPrice : 0
            })))
            res.reviewAverage = {average: 5, number: 4730};
            res.store.logo = res.store.logo ? res.store.logo : "https://logos-world.net/wp-content/uploads/2020/11/The-Body-Shop-Logo.png";
            Image.getSize(res.store.logo, (width, height) => setLogoAspectRatio(width/height));
            setProduct(res)

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
        const quantity = 1;
        const options = picks;

        setCartLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {
            method: 'post',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product: product._id, options, quantity})
        })
        .then(res => res.json())
        .then(res => {
            setCartLoading(false);
            showToast(`Added to Cart Successfully!`);
            dispatch(setCart(res))
        })
        .catch(err => console.log(err))
    }
    return (
        <View style={styles.container}>
            <Toast ref={_toast => toast.current = _toast} />
            <Header search={false} details={{title: product ? product.title[language] : ''}} />
            {!product ? <View style={{width, height, paddingTop: '10%', alignItems: 'center'}}><ActivityIndicator color={gStyles.color_0} size={RFPercentage(10)} /></View> :
                <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <Swiper
                    activeDotColor={gStyles.color_0}
                    containerStyle={styles.swiper}
                >
                    {product.images.map(image => (
                            <Image style={styles.swiperImage} source={{uri: image}} key={Math.random()} />
                    ))}
                </Swiper>
                    <View style={mainStyles.detailsContainer}>
                        {/* TITLE */}
                        <TextLato bold style={mainStyles.title}>{product.title[language]}</TextLato>
                        
                        {/* REVIEWS */}
                        <Reviews style={mainStyles.reviews} size={RFPercentage(1.5)} reviews={product.reviewAverage} />
                        
                        {/* STORE */}
                        <View style={mainStyles.storeContainer}>
                            <TextLato bold style={mainStyles.soldBy}>Sold by</TextLato>
                            <View style={mainStyles.storeViewContainer}>
                                <TextLato style={mainStyles.storeTitle}>{product.store.title}</TextLato>
                                <Image style={{...mainStyles.storeLogo, aspectRatio: logoAspectRatio }} source={{uri: product.store.logo}} />
                            </View>
                        </View>

                        {/* OPTIONS */}
                        {(product.variants || product.options.length !== 0) && <View style={mainStyles.optionsContainer}>
                            <TextLato bold style={mainStyles.optionsTitle}>Options</TextLato>
                            <View>
                                {/* VARIANTS */}
                                {product.variants && 
                                        <View key={Math.random()}>
                                            <TextLato bold style={mainStyles.optionsSubtitle}>{product.variants.title[language]}</TextLato>
                                            <ScrollView horizontal>

                                            <View style={{flexDirection: 'row', marginBottom: height * 0.02, width: '100%'}}>
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
                                            <ScrollView horizontal>

                                            <View style={{flexDirection: 'row', marginBottom: height * 0.02, width: '100%'}}>
                                                {option.options.map(optionPick => {
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
                        </View>}

                        {/* PRICE */}
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: height * 0.03}}>
                            <TextLato style={mainStyles.currency}>{product.currency.toUpperCase()}</TextLato>
                            <TextLato bold style={mainStyles.price}>{(product.price + addedPrice).toFixed(2)}</TextLato>
                        </View>
                        
                        {/* CART */}
                        {inCart ? 
                        <TouchableOpacity onPress={() => {addToCartHelper()}}>
                            <View style={mainStyles.addToCartButton}>
                                <TextLato style={{color: 'white', fontSize: RFPercentage(2), marginHorizontal: width * 0.03}}>ADD TO CART</TextLato>
                                <Icon type="FontAwesome5" color="white" size={RFPercentage(2)} name="cart-plus" />
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => addToCartHelper()}>
                            <View style={mainStyles.addToCartButton}>
                                <TextLato style={{color: 'white', fontSize: RFPercentage(2), marginHorizontal: width * 0.03}}>ADD TO CART</TextLato>
                                <Icon type="FontAwesome5" color="white" size={RFPercentage(2)} name="cart-plus" />
                            </View>
                        </TouchableOpacity>
                        }

                        {/* DESCRIPTION */}
                        <View style={mainStyles.descriptionContainer}>
                            <TextLato bold style={mainStyles.descriptionTitle}>Overview</TextLato>
                            <TextLato style={{fontSize: RFPercentage(1.7)}}>{product.description[language]}</TextLato>
                        </View>

                        {/* SPECIFICATIONS */}
                        {product.specifications.length !== 0 && <View style={mainStyles.specificationsContainer}>
                            <TextLato bold style={mainStyles.specificationTitle}>Specifications</TextLato>
                            <View>
                                {product.specifications.map(spec => {
                                    const num = product.specifications.indexOf(spec) % 2 === 0;
                                    return (
                                        <View key={Math.random()} style={{...mainStyles.specificationTile, 
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
                        <View style={mainStyles.reviewsContainer}>
                            <TextLato bold style={mainStyles.reviewsTitle}>Customer Reviews</TextLato>
                            <ScrollView horizontal>
                                {product.reviews.map(review => <ProductReviewCard key={Math.random()} review={review} />)}
                            </ScrollView>
                        </View>
                    </View>
                        {/* MORE FROM STORE */}
                        <ScrollCards 
                            style={{width}}
                            title={`More From ${product.store.title}`}
                            cards={similarProducts.map(product => <SimilarProductCard key={Math.random()} product={product} />)}
                            />

                        {/* MORE ITEMS */}
                        <ScrollCards style={{width}} title={'Similar Stores'} cards={similarStores.map(store => <StoreCard key={Math.random()} store={store} />)} />
                </ScrollView>
            }
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
        height: height * 0.4
    },
    swiperImage: {
        height: height * 0.4,
        width: '100%',
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
    }
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
        marginRight: width * 0.02

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
        marginRight: width * 0.02
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

    }
})

export default Product;