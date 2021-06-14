import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SellerCardProduct from './SellerCardProduct';
import TextLato from '../../utils/TextLato';
import Icon from '../../utils/Icon';
import { gStyles } from '../../../global.style';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../../../hooks/language';
import { Constants } from 'react-native-unimodules';

const SellerCard = ({ seller, showToast }) => {
    const navigation = useNavigation();
    const [reviews, setReviews] = useState({average: 0, number: 0})
    const language = useLanguage();
    const en = language === 'en';
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/reviews/overview/${seller._id}`)
        .then(res => res.json())
        .then(res => {
            setReviews(res);
        })
    }, []);
    return (
            <View style={styles.container}>
                <View style={{...styles.logoContainer, left: en ? width * 0.02 : null, right: en ? null : width * 0.02}}>
                    <TouchableOpacity onPress={() => navigation.push('Store', {store: seller})} >
                            <Image source={{uri: seller.logo}} style={{...styles.logo, aspectRatio: 1}} />
                    </TouchableOpacity>
                </View>
                <View style={{...headerStyles.container, alignItems: en ? 'flex-start' : 'flex-end', paddingHorizontal:width * 0.27}}>
                    <TextLato style={headerStyles.title}>{seller.title}</TextLato>
                    <View style={[styles.categoriesContainer, {justifyContent: en ? 'flex-start' : 'flex-end'}]}>
                        {seller.categories.slice(1,5).map(details => {
                            return <Icon type={details.iconType} key={Math.random()} color="white" name={details.icon} style={styles.category} size={RFPercentage(1.7)} />
                        })}
                        <Icon type={'AntDesign'} key={Math.random()} color="white" name={'plus'} style={styles.category} size={RFPercentage(1.7)} />
                    </View>
                    <View style={styles.reviewsContainer}>
                        {[0, 1, 2, 3, 4].map((elem) => {
                            const num = reviews.average - elem;
                            return num > 0.5 ? 
                                <Icon type="FontAwesome" key={Math.random()} name="star" size={RFPercentage(1.3)} color="#ffe234" /> : num > 0 ?
                                <Icon type="FontAwesome" key={Math.random()} name="star-half" size={RFPercentage(1.3)} color="#ffe234" /> :
                                <Icon type="FontAwesome" key={Math.random()} name="star" size={RFPercentage(1.3)} color="#aaa" />
                        })}
                        <TextLato style={styles.reviewNumber}>({reviews.number})</TextLato>
                    </View>
                </View>
                <ScrollView style={{transform: en ? [] : [{scaleX: -1}]}} horizontal showsHorizontalScrollIndicator={false}>
                    {seller.products.map(product => <SellerCardProduct showToast={showToast} style={{marginHorizontal: width * 0.02, marginVertical: height * 0.04}} key={Math.random()} product={product} />)}
                    <TouchableOpacity style={styles.moreButton} onPress={() => navigation.push('Store', {store: seller, state: 1})}>
                        <Icon type={'Feather'} name={en ? 'arrow-right' : 'arrow-left'} color={gStyles.color_3} size={RFPercentage(3)} />
                        <TextLato style={{color: gStyles.color_3, fontSize: RFPercentage(1.4), marginTop: height * 0.01}}>{en ? 'View More' : 'عرض المزيد'}</TextLato>
                    </TouchableOpacity>
                </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.95,
        backgroundColor: 'white',
        marginBottom: height * 0.035,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 6,
    },
    logoContainer: {
        width: width * 0.23,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 200,
        position: 'absolute',
        top: height * -0.025,
        left: width * 0.02,
        backgroundColor: 'white',
    },
    logo: {
        width: width * 0.23,
        borderRadius: 200
    },
    reviewsContainer: {
        flexDirection: 'row',
        marginTop: height * 0.004,
        alignItems: 'center'
    },
    reviewNumber: {
        fontSize: RFPercentage(1.3),
        marginLeft: width * 0.01
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
    },
    category: {
        width: width * 0.07,
        height: width * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: gStyles.color_3,
        marginRight: width * 0.01,
        marginTop: height * 0.005,
    },
    moreButton: {
        marginHorizontal: width * 0.02,
        marginBottom: height * 0.01,
        marginVertical: height * 0.04,
        height: height * 0.18,
        backgroundColor: '#ebebeb',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: width * 0.3

    }
});

const headerStyles = StyleSheet.create({
    container: {
        marginTop: height * 0.01,
    },
    title: {
        fontSize: RFPercentage(2.2)
    }
})

export default SellerCard;