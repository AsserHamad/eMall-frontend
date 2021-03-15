import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import TextLato from '../components/utils/TextLato';
import { gStyles } from '../global.style';
import { useLanguage } from '../hooks/language';
import CountDown from 'react-native-countdown-component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const image = 'https://www.pikpng.com/pngl/b/46-461447_deal-of-the-day-png-deal-day-clipart.png';
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

const calculateMilliseconds = () => {
    let x = new Date();
    return (23 - x.getHours())*3600 + (60 - x.getMinutes())*60 + (60 - x.getSeconds());
}

function DealOfTheDay(){
    const [aspectRatio, setAspectRatio] = useState(1);
    const [products, setProducts] = useState([]);
    const language = useLanguage();
    const en = language === 'en';
    const navigation = useNavigation();
    const [firstAspectRatio, setFirstAspectRatio] = useState(0);
    useEffect(() => {
        Image.getSize(image, (width, height) => setAspectRatio(width/height));
        Image.getSize(bubbles[0], (width, height) => {setFirstAspectRatio(width/height)});
        fetchDeals();
    }, []);

    const fetchDeals = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/dealsoftheday`)
        .then(res => res.json())
        .then(res => {
            setProducts(res)
        });
    }
    
    return (
        <View style={styles.container}>
            <Image source={{uri: image}} style={{...styles.topImage, aspectRatio, alignSelf: en ? 'auto' : 'flex-end'}} />
            <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={[styles.listContainer]} style={{marginTop: height * -0.09, transform: en ? [] : [{scaleX: -1}]}}>

                {/* First GIANT Product */}
                {/* {products.length > 0 && (
                    <View style={{transform: en ? [] : [{scaleX: -1}]}}>
                        <TouchableOpacity  onPress={() => navigation.push('Product', {product: products[0].product})} style={[styles.firstProduct, {alignItems: en ? 'baseline' : 'flex-end'}]}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image style={styles.firstImage} source={{uri: products[0].product.images[0]}} />
                            </View>
                            <TextLato bold style={{fontSize: RFPercentage(2.2), width: '80%'}}>{products[0].product.title[language]}</TextLato>
                            <TextLato style={{fontSize: RFPercentage(1.7),  marginVertical: height * 0.02}}>{products[0].product.description[language].slice(0, 100)}...</TextLato>
                            <View>
                                <TextLato style={{textDecorationLine: 'line-through', fontSize: RFPercentage(2), color: gStyles.color_0, textAlign: en ? 'left' : 'right'}}>{products[0].product.price.toFixed(2)} {en ? 'EGP' : 'ج.م'}</TextLato> 
                                <TextLato style={{fontSize: RFPercentage(2.7), color: gStyles.color_1, textAlign: en ? 'left' : 'right'}}>{(products[0].product.price * (1 - products[0].discount/100)).toFixed(2)} {en ? 'EGP' : 'ج.م'}</TextLato>
                            </View>
                        </TouchableOpacity>
                        <ImageBackground source={{uri: bubbles[getColors(products[0].discount)]}} 
                            style={
                                {
                                    ...styles.discountBubble,
                                    aspectRatio: firstAspectRatio,
                                    left: en ? null : 0,
                                    transform: [{translateY: height * 0.03}, {translateX: en ? width * 0.1 : -width * 0.1}]
                                }
                            }
                            >
                            <TextLato style={{fontSize: RFPercentage(3.5), textAlign: 'center', color: 'white'}}>{products[0].discount}<Text style={{fontSize: RFPercentage(2)}}>%</Text></TextLato>
                            <TextLato style={{fontSize: en ? RFPercentage(1.1) : RFPercentage(1.5), textAlign: 'center', color: 'white'}}>{en ? 'D I S C O U N T' : 'تخفيض'}</TextLato>
                        </ImageBackground>
                    </View>
                )} */}

                {/* Rest Of Products */}
                <View style={{flexWrap: 'wrap', marginHorizontal: width * 0.06, height: height * 0.65}}>
                    {products.map(product => {
                        return <Deal key={Math.random()} product={product} />
                    })}
                </View>
            </ScrollView>
            <CountDown
                until={calculateMilliseconds()}
                onFinish={() => {
                    fetchDeals();
                    alert(en ? 'Deals of the day are done for the day!' : 'صفقات اليوم انتهت لهذا اليوم!')
                }}
                size={30}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{h: en ? 'HOURS' : 'ساعات', m: en ? 'MINUTES' : 'دقائق', s: en ? 'SECONDS' : 'ثواني'}}
                digitStyle={{backgroundColor: '#181818'}}
                digitTxtStyle={{color: '#F6E71D'}}
                timeLabelStyle={{fontFamily: language === 'en' ? 'Lato' : 'Cairo', color: gStyles.color_1, fontSize: RFPercentage(1.8)}}
            />
        </View>
    )
}

const Deal = ({product}) => {
    const [aspectRatio, setAspectRatio] = useState(16/9);
    const [loading, setLoading] = useState(true);
    const language = useLanguage();
    const en = language === 'en';
    const navigation = useNavigation();
    useEffect(() => {
        Image.getSize(bubbles[2], (width, height) => {
            setLoading(false);
            setAspectRatio(width/height);
        })
    }, []);
    return (
        <View style={[styles.productContainer, {transform: en ? [] : [{scaleX: -1}]}]}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={() => navigation.push('Product', {product: product.product})}>
                    {loading ? 
                        <View style={{justifyContent: 'center', alignItems: 'center', width: width * 0.3, aspectRatio: 16/9}}><ActivityIndicator size={RFPercentage(3)} color={gStyles.color_0} /></View> : (
                        <Image source={{uri: product.product.images[0]}} style={{height: height * 0.1, aspectRatio: 16/9}} />
                    )}
                    <TextLato style={{fontSize: RFPercentage(1.7), textAlign: en ? 'left' : 'right', marginTop: height * 0.01}}>{product.product.title[language]}</TextLato>
                    <View style={{marginTop: height * 0.04, alignItems: en ? 'baseline' : 'flex-end'}}>
                        <TextLato style={{textDecorationLine: 'line-through', fontSize: RFPercentage(1.5), color: gStyles.color_0}}>{product.product.price.toFixed(2)} {en ? 'EGP' : 'ج.م'}</TextLato> 
                        <TextLato style={{fontSize: RFPercentage(1.8), color: gStyles.color_1}}>{(product.product.price * (1 - product.discount/100)).toFixed(2)} {en ? 'EGP' : 'ج.م'}</TextLato>
                    </View>
                </TouchableOpacity>
                <ImageBackground source={{uri: bubbles[getColors(product.discount)]}} style={{...styles.innerDiscountBubble, left: en ? null : 0, transform: [{translateY: height * 0.015}, {translateX: width * 0.02}], aspectRatio}}>
                    <TextLato style={{fontSize: RFPercentage(3), textAlign: 'center', color: 'white'}}>{product.discount}<Text style={{fontSize: RFPercentage(2)}}>%</Text></TextLato>
                    <TextLato style={{fontSize: en ? RFPercentage(1) : RFPercentage(1.2), textAlign: 'center', color: 'white'}}>{en ? 'D I S C O U N T' : 'تخفيض'}</TextLato>
                </ImageBackground>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginHorizontal: width * 0.02,
        marginVertical: height * 0.01
    },
    listContainer: {
        flexDirection: 'row',
        marginTop: height * 0.02,
        paddingHorizontal: width * 0.02,
        paddingTop: height * 0.03,
        paddingBottom: height * 0.05,
        paddingLeft: width * 0.04
    },
    discountBubble: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 100,
        borderRadius: 100,
        marginHorizontal: 'auto',
        transform: [{translateY: height * 0.03}, {translateX: width * 0.05}],
        zIndex: 5,
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
        zIndex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topImage: {
        marginHorizontal: width * 0.05,
        height: height * 0.13,
        zIndex: 3
    },
    firstProduct: {
        width: width * 0.6,
        height: height * 0.65,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.04,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21,
        borderRadius: 10,
        marginRight: width * 0.03
    },
    firstImage: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
        marginBottom: height * 0.03,
    },
    productContainer: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.01,
        paddingVertical: height * 0.01,
        width: width * 0.4,
        marginRight: width * 0.1
    },
    innerContainer: {
        backgroundColor: 'white',
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.02,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21,
        borderRadius: 10,
        height: '100%'
    }
})

export default DealOfTheDay;