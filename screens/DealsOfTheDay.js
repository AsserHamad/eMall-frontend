import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import TextLato from '../components/utils/TextLato';
import { gStyles } from '../global.style';
import { useLanguage } from '../hooks/language';
import CountDown from 'react-native-countdown-component';
import { useNavigation } from '@react-navigation/native';
import Icon from '../components/utils/Icon';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const image = 'https://imgur.com/3Wt1bLn.png';
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
    const [products, setProducts] = useState([]);
    const language = useLanguage();
    const en = language === 'en';
    const navigation = useNavigation();
    useEffect(() => {
        fetchDeals();
    }, []);

    const fetchDeals = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/dealsoftheday`)
        .then(res => res.json())
        .then(res => {
            setProducts(res)
        });
    }
    if(!products.length)
        return null;
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', width, justifyContent: 'center', paddingTop: height * 0.08}}>

                <Image source={{uri: 'https://imgur.com/qIJjuUY.gif'}} style={{...styles.topImage, alignSelf: en ? 'auto' : 'flex-end'}} />
                
                <View style={{backgroundColor: gStyles.color_1, borderRadius: 10, padding: 15, transform: [{translateX: width * 0.25}]}}>
                    <CountDown
                        until={calculateMilliseconds()}
                        onFinish={() => {
                            fetchDeals();
                            alert(en ? 'Deals of the day are done for the day!' : 'صفقات اليوم انتهت لهذا اليوم!')
                        }}
                        size={20}
                        timeToShow={['H', 'M', 'S']}
                        timeLabels={{h: en ? 'HOURS' : 'ساعات', m: en ? 'MINUTES' : 'دقائق', s: en ? 'SECONDS' : 'ثواني'}}
                        digitStyle={{backgroundColor: gStyles.color_3}}
                        digitTxtStyle={{color: 'white'}}
                        timeLabelStyle={{fontFamily: language === 'en' ? 'Lato' : 'Cairo', color: 'white', fontSize: RFPercentage(1)}}
                    />
                </View>
            </View>
            <ScrollView horizontal contentContainerStyle={styles.listContainer} style={{transform: en ? [] : [{scaleX: -1}]}}>
                    {products.map(product => <Deal navigation={navigation} key={product._id} product={product} language={language} en={en} />)}
                    <View style={dealStyles.productContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('DealsOfTheDay')} activeOpacity={0.8}>
                            <View style={{...dealStyles.innerContainer, justifyContent: 'center', flexDirection: 'row', paddingHorizontal: width * 0.1, alignItems: 'center'}}>
                                <TextLato style={{color: 'black', fontSize: RFPercentage(2), textAlign: 'center'}}>View All Deals</TextLato>
                                <Icon type="AntDesign" name="plus" color="black" size={RFPercentage(2)} style={{marginTop: height * 0.01}} />
                            </View>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginHorizontal: width * 0.02,
        marginVertical: height * 0.01,
        alignItems: 'center'
    },
    listContainer: {
        paddingVertical: height * 0.01,
        // backgroundColor: 'white',
        height: height * 0.4
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
    topImage: {
        width: width * 0.6,
        zIndex: 2,
        aspectRatio: 612/453,
        position: 'absolute',
        left: 0,
        bottom: -height * 0.03
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
    }
})

const Deal = ({product, navigation, language, en}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.push('Product', {product: product.product})}>
        <View style={[dealStyles.productContainer, {transform: en ? [] : [{scaleX: -1}]}]}>
            <View style={dealStyles.innerContainer}>
                    <Image source={{uri: product.product.images[0]}} style={dealStyles.image} />
                    <TextLato bold style={dealStyles.title}>{product.product.title[language]}</TextLato>
                    <View style={dealStyles.line} />
                    <TextLato italic style={dealStyles.storeTitle}>{en ? 'By' : 'من'}: {product.store.title}</TextLato>
                    <View style={{marginTop: height * 0.02, alignItems: en ? 'baseline' : 'flex-end'}}>
                        <TextLato style={{textDecorationLine: 'line-through', fontSize: RFPercentage(1.5), color: gStyles.color_0}}>{product.product.price.toFixed(2)} {en ? 'EGP' : 'ج.م'}</TextLato> 
                        <TextLato style={{fontSize: RFPercentage(1.8), color: gStyles.color_1}}>{(product.product.price * (1 - product.discount/100)).toFixed(2)} {en ? 'EGP' : 'ج.م'}</TextLato>
                    </View>
                <ImageBackground source={{uri: bubbles[getColors(product.discount)]}} style={{...dealStyles.innerDiscountBubble, left: en ? null : 0, transform: [{translateY: height * 0.015}, {translateX:  en ? width * 0.02 : width * -0.02}]}}>
                    <TextLato style={{fontSize: RFPercentage(3), textAlign: 'center', color: 'white'}}>{product.discount}<TextLato style={{fontSize: RFPercentage(2)}}>%</TextLato></TextLato>
                    <TextLato style={{fontSize: en ? RFPercentage(1) : RFPercentage(1.2), textAlign: 'center', color: 'white'}}>{en ? 'D I S C O U N T' : 'تخفيض'}</TextLato>
                </ImageBackground>
            </View>
        </View>
        </TouchableOpacity>
    )
}

const dealStyles = StyleSheet.create({
    productContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.01,
        paddingVertical: height * 0.01,
        width: width * 0.4,
        // marginRight: width * 0.05,
        marginHorizontal: width * 0.05,
    },
    innerContainer: {
        backgroundColor: 'white',
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.02,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius: 10,
        height: '100%'
    },
    innerDiscountBubble: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: width * 0.2,
        aspectRatio: 394/386,
        borderRadius: 100,
        marginHorizontal: 'auto',
        // transform: [{translateY: height * 0.01}, {translateX: width * 0.02}],
        zIndex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: height * 0.1,
        aspectRatio: 16/9
    },
    title: {
        fontSize: RFPercentage(1.8),
        marginTop: height * 0.01
    },
    line: {
        borderBottomColor: gStyles.color_2, 
        borderBottomWidth: 2, 
        width: '30%', 
        marginVertical: height * 0.006
    },
    storeTitle: {
        fontSize: RFPercentage(1.3), 
        marginTop: height * 0.004
    }
})

// const Deal = ({product, navigation, language, en}) => {
//     return (
//         <View style={[dealStyles.productContainer, {transform: en ? [] : [{scaleX: -1}]}]}>
//             <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.push('Product', {product: product.product})}>
//             <ImageBackground source={{uri: product.product.images[0]}} style={dealStyles.innerContainer} imageStyle={{resizeMode: 'cover', borderRadius: 10}}>
//                     {/* <Image source={{uri: product.product.images[0]}} style={dealStyles.image} /> */}
//                     <TextLato bold style={dealStyles.title}>{product.product.title[language]}</TextLato>
//                     {/* <View style={dealStyles.line} /> */}
//                     <TextLato italic style={dealStyles.storeTitle}>{en ? 'By' : 'من'}: {product.store.title}</TextLato>
//                     <View style={{marginTop: height * 0.02, alignItems: en ? 'baseline' : 'flex-end', backgroundColor: 'rgba(0,0,0,0.2)'}}>
//                         <TextLato style={{textDecorationLine: 'line-through', fontSize: RFPercentage(1.5), color: 'white'}}>{product.product.price.toFixed(2)} {en ? 'EGP' : 'ج.م'}</TextLato> 
//                         <TextLato style={{fontSize: RFPercentage(1.8), color: 'white'}}>{(product.product.price * (1 - product.discount/100)).toFixed(2)} {en ? 'EGP' : 'ج.م'}</TextLato>
//                     </View>
//                 <ImageBackground source={{uri: bubbles[getColors(product.discount)]}} style={{...dealStyles.innerDiscountBubble, left: en ? null : 0, transform: [{translateY: height * 0.015}, {translateX:  en ? width * 0.02 : width * -0.02}]}}>
//                     <TextLato style={{fontSize: RFPercentage(3), textAlign: 'center', color: 'white'}}>{product.discount}<TextLato style={{fontSize: RFPercentage(2)}}>%</TextLato></TextLato>
//                     <TextLato style={{fontSize: en ? RFPercentage(1) : RFPercentage(1.2), textAlign: 'center', color: 'white'}}>{en ? 'D I S C O U N T' : 'تخفيض'}</TextLato>
//                 </ImageBackground>
//             </ImageBackground>
//         </TouchableOpacity>
//         </View>
//     )
// }

// const dealStyles = StyleSheet.create({
//     productContainer: {
//         height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingHorizontal: width * 0.01,
//         paddingVertical: height * 0.01,
//         // width: width * 0.4,
//         // marginRight: width * 0.05,
//         marginHorizontal: width * 0.01,
//     },
//     innerContainer: {
//         backgroundColor: 'white',
//         width: width * 0.4,
//         paddingHorizontal: width * 0.04,
//         // paddingVertical: height * 0.02,
//         borderRadius: 10,
//         shadowColor: "#000",
//         shadowOffset:{
//         width: 0,
//         height: 2,
//         },
//         shadowOpacity: 0.23,
//         shadowRadius: 2.62,
//         elevation: 4,
//         borderRadius: 10,
//         height: '100%',
//         borderRadius: 20
//     },
//     innerDiscountBubble: {
//         position: 'absolute',
//         right: 0,
//         bottom: 0,
//         width: width * 0.2,
//         aspectRatio: 394/386,
//         borderRadius: 100,
//         marginHorizontal: 'auto',
//         // transform: [{translateY: height * 0.01}, {translateX: width * 0.02}],
//         zIndex: 5,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     image: {
//         height: height * 0.08,
//         aspectRatio: 16/9
//     },
//     title: {
//         fontSize: RFPercentage(1.8),
//         marginTop: height * 0.01,
//         backgroundColor: 'rgba(0,0,0,0.3)',
//         paddingVertical: 5,
//         paddingHorizontal: 10,
//         textAlign: 'center',
//         borderRadius: 5,
//         color: 'white'
//     },
//     line: {
//         borderBottomColor: gStyles.color_2, 
//         borderBottomWidth: 2, 
//         width: '30%', 
//         marginVertical: height * 0.006
//     },
//     storeTitle: {
//         fontSize: RFPercentage(1.3), 
//         marginTop: height * 0.004
//     }
// })

export default DealOfTheDay;