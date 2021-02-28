import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
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

const SellerCard = ({ seller }) => {
    const [aspectRatio, setAspectRatio] = useState(4/3);
    const navigation = useNavigation();
    const [reviews, setReviews] = useState({average: 0, number: 0})
    const language = useLanguage();
    const en = language === 'en';
    useEffect(() => {
        Image.getSize(seller.logo, (width, height) => setAspectRatio(width/height));
        const average = seller.reviews.reduce((total, next) => total + next.stars, 0) / seller.reviews.length;
        setReviews({
            average: average || 0,
            number: seller.reviews.length
        })
    }, []);
    return (
            <View style={styles.container}>
                <View style={{...styles.logoContainer, left: en ? width * 0.02 : null, right: en ? null : width * 0.02}}>
                    <TouchableOpacity onPress={() => navigation.push('Store', {store: seller})} >
                            <Image source={{uri: seller.logo}} style={{...styles.logo, aspectRatio}} />
                    </TouchableOpacity>
                </View>
                <View style={{...headerStyles.container, alignItems: en ? 'flex-start' : 'flex-end', paddingRight: en ? 0 : width * 0.28}}>
                    <TextLato style={headerStyles.title}>{seller.title}</TextLato>
                    <View style={styles.categoriesContainer}>
                        {seller.categories.map(details => {
                            return <Icon type={details.iconType} key={Math.random()} color="white" name={details.icon} style={styles.category} size={RFPercentage(1.7)} />
                        })}
                    </View>
                    <View style={styles.reviewsContainer}>
                        {[0, 1, 2, 3, 4].map((elem) => {
                            const num = reviews.average - elem;
                            return num > 0.5 ? 
                                <Icon type="FontAwesome" key={Math.random()} name="star" size={RFPercentage(1.3)} color="#ffe234" /> : num > 0 ?
                                <Icon type="FontAwesome" key={Math.random()} name="star-half" size={RFPercentage(1.3)} color="#ffe234" /> :
                                null
                        })}
                        <TextLato style={styles.reviewNumber}>({reviews.number})</TextLato>
                    </View>
                </View>
                <ScrollView horizontal>
                    {seller.products.map(product => <SellerCardProduct key={Math.random()} product={product} />)}
                </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.95,
        backgroundColor: 'white',
        marginTop: height * 0.035,
        borderRadius: 5,
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
        borderRadius: 100,
        position: 'absolute',
        top: height * -0.025,
        left: width * 0.02,
        backgroundColor: 'white',
        // transform: [{translateX: width * 0.05}, {translateY: -height * 0.1}]
    },
    logo: {
        backgroundColor: 'white',
        width: width * 0.15,
        // borderRadius: 100
    },
    reviewsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: height * 0.004,
        alignItems: 'center'
    },
    reviewNumber: {
        fontSize: RFPercentage(1.3),
        marginLeft: width * 0.01
    },
    categoriesContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: height * 0.005,
    },
    category: {
        width: width * 0.07,
        height: width * 0.07,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: gStyles.color_3,
        marginRight: width * 0.01
    }
});

const headerStyles = StyleSheet.create({
    container: {
        marginLeft: width * 0.28,
        marginTop: height * 0.01,
    },
    title: {
        fontSize: RFPercentage(2.2)
    }
})

export default SellerCard;