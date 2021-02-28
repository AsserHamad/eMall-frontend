import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import { useSelector } from 'react-redux';
import { gStyles } from '../../global.style';
import { useLanguage } from '../../hooks/language';
import TextLato from './TextLato';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const ProductPicker = ({style, pickedProduct, setPickedProduct}) => {
    const store = useSelector(state => state.authReducer.store);
    const [products, setProducts] = useState([]);
    const [pick, setPick] = useState(pickedProduct);
    const [loading, setLoading] = useState(true);
    const language = useLanguage();
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/product/store/${store._id}`)
        .then(res => res.json())
        .then(res => {
            setLoading(false);
            setProducts(res)
            console.log('products', res)
        });
    }, []);
    return (
        <ScrollView style={{...style, ...styles.container}} contentContainerStyle={styles.contentContainer}>
            {loading ? 
                <View style={styles.loadingContainer}><ActivityIndicator size={RFPercentage(5)} color={'white'} /></View>
            :
            products.map(product => {
                const picked = pick && product._id === pick._id;
                return (
                    <TouchableOpacity key={Math.random()} activeOpacity={0.7} onPress={() => {setPick(product);setPickedProduct(product);}} style={{...styles.product, backgroundColor: picked ? gStyles.color_1 : 'white'}}>
                        <Image style={styles.image} source={{uri: product.images[0]}} />
                        <View style={{width: '50%'}}>
                            <TextLato style={{color: picked ? 'white' : 'black'}} bold>{product.title[language]}</TextLato>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        maxHeight: height * 0.6,
        borderRadius: 20
    },
    contentContainer: {
        borderRadius: 20,
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.01,
    },
    product: {
        paddingVertical: height * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.005,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
    },
    image: {
        width: width * 0.15,
        aspectRatio: 1,
        marginHorizontal: width * 0.04
    }
})

export default ProductPicker;