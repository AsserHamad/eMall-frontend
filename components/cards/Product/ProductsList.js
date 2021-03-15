import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useLanguage } from '../../../hooks/language';
import TextLato from '../../utils/TextLato';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height ]

const ProductsList = ({products}) => {
    return (
        <ScrollView>
            {products.map(product => <ProductCard product={product} key={Math.random()} />)}
        </ScrollView>
    )
}

const ProductCard = ({product}) => {
    const language = useLanguage();
    const navigation = useNavigation();
    const [logoAspect, setLogoAspect] = useState(1);
    useEffect(() => {
        Image.getSize(product.store.logo, (width, height) => setLogoAspect(width/height));
    }, [])
    return (
        <TouchableOpacity onPress={() => navigation.push('Product', {product: {_id: product._id}})} style={styles.container}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={{uri: product.images[0]}} style={styles.image} />
                <View style={styles.logoContainer}><Image source={{uri: product.store.logo}} style={{...styles.logo, aspectRatio: logoAspect}} /></View>
            </View>
            <View style={{marginHorizontal: width * 0.1}}>
                <TextLato bold>{product.title[language]}</TextLato>
                <TextLato style={{marginVertical: height * 0.01, width: width * 0.5, fontSize: RFPercentage(1.7)}}>{product.description[language].substr(0, 100)}...</TextLato>
                <TextLato style={styles.price} bold>{product.price} EGP</TextLato>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: height * 0.02,
        backgroundColor: 'white',
        marginVertical: height * 0.005,
        flexDirection: 'row',
        paddingHorizontal: width * 0.05
    },
    image: {
        width: width * 0.25,
        aspectRatio: 1,
        resizeMode: 'contain'
    },
    logoContainer: {
        position: 'absolute',
        bottom: 0,
        right: -width * 0.05,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 200,
        width: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
    },
    logo: {
        width: width * 0.07,
        aspectRatio: 1
    },
    price: {
        marginTop: height * 0.07
    }
})

export default ProductsList;