import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import TextLato from '../components/utils/TextLato';
import { gStyles } from '../global.style';
import { useLanguage } from '../hooks/language';
import CountDown from 'react-native-countdown-component';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
                
                <View style={{backgroundColor: 'white', borderTopRightRadius: 10, borderTopLeftRadius: 20, padding: 15, transform: [{translateX: width * 0.25}]}}>
                    <CountDown
                        until={calculateMilliseconds()}
                        onFinish={() => {
                            fetchDeals();
                            alert(en ? 'Deals of the day are done for the day!' : 'صفقات اليوم انتهت لهذا اليوم!')
                        }}
                        size={20}
                        timeToShow={['H', 'M', 'S']}
                        timeLabels={{h: en ? 'HOURS' : 'ساعات', m: en ? 'MINUTES' : 'دقائق', s: en ? 'SECONDS' : 'ثواني'}}
                        digitStyle={{backgroundColor: '#181818'}}
                        digitTxtStyle={{color: '#F6E71D'}}
                        timeLabelStyle={{fontFamily: language === 'en' ? 'Lato' : 'Cairo', color: gStyles.color_1, fontSize: RFPercentage(1.2)}}
                        
                    />
                </View>
            </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={[styles.listContainer]} style={{transform: en ? [] : [{scaleX: -1}]}}>
                <View style={{flexWrap: 'wrap', marginHorizontal: width * 0.01, height: height * 0.8}}>
                    {products.map(product => {
                        return <Deal navigation={navigation} key={product._id} product={product} language={language} en={en} />
                    })}
                    <View style={styles.productContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('DealsOfTheDay')} activeOpacity={0.8}>
                            <View style={{...styles.innerContainer, width: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                                <TextLato style={{color: 'black', fontSize: RFPercentage(2.5), textAlign: 'center'}}>View All Deals</TextLato>
                                <Icon type="AntDesign" name="plus" color="black" size={RFPercentage(4)} style={{marginTop: height * 0.01}} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const Deal = ({product, navigation, language, en}) => {
    return (
        <View style={[styles.productContainer, {transform: en ? [] : [{scaleX: -1}]}]}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={() => navigation.push('Product', {product: product.product})}>
                    <Image source={{uri: product.product.images[0]}} style={{height: height * 0.1, aspectRatio: 16/9}} />
                    <TextLato bold style={{fontSize: RFPercentage(1.8), textAlign: en ? 'left' : 'right', marginTop: height * 0.01}}>{product.product.title[language]}</TextLato>
                    <View style={{borderBottomColor: gStyles.color_2, borderBottomWidth: 2, width: '30%', marginVertical: height * 0.006}} />
                    <TextLato italic style={{fontSize: RFPercentage(1.3), textAlign: en ? 'left' : 'right', marginTop: height * 0.004}}>{en ? 'By' : 'من'}: {product.store.title}</TextLato>
                    <View style={{marginTop: height * 0.04, alignItems: en ? 'baseline' : 'flex-end'}}>
                        <TextLato style={{textDecorationLine: 'line-through', fontSize: RFPercentage(1.5), color: gStyles.color_0}}>{product.product.price.toFixed(2)} {en ? 'EGP' : 'ج.م'}</TextLato> 
                        <TextLato style={{fontSize: RFPercentage(1.8), color: gStyles.color_1}}>{(product.product.price * (1 - product.discount/100)).toFixed(2)} {en ? 'EGP' : 'ج.م'}</TextLato>
                    </View>
                </TouchableOpacity>
                <ImageBackground source={{uri: bubbles[getColors(product.discount)]}} style={{...styles.innerDiscountBubble, left: en ? null : 0, transform: [{translateY: height * 0.015}, {translateX:  en ? width * 0.02 : width * -0.02}]}}>
                    <TextLato style={{fontSize: RFPercentage(3), textAlign: 'center', color: 'white'}}>{product.discount}<TextLato style={{fontSize: RFPercentage(2)}}>%</TextLato></TextLato>
                    <TextLato style={{fontSize: en ? RFPercentage(1) : RFPercentage(1.2), textAlign: 'center', color: 'white'}}>{en ? 'D I S C O U N T' : 'تخفيض'}</TextLato>
                </ImageBackground>
            </View>
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
        flexDirection: 'row',
        paddingHorizontal: width * 0.02,
        paddingTop: height * 0.014,
        paddingBottom: height * 0.05,
        paddingLeft: width * 0.04,
        backgroundColor: 'white',
        width
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
        aspectRatio: 394/386,
        borderRadius: 100,
        marginHorizontal: 'auto',
        // transform: [{translateY: height * 0.01}, {translateX: width * 0.02}],
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
    },
    productContainer: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.01,
        paddingVertical: height * 0.01,
        width: width * 0.4,
        marginRight: width * 0.05
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