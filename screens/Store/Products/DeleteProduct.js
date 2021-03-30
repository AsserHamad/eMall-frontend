import React, { useState, useEffect } from 'react';
import { View, Image, ScrollableView, StyleSheet, Dimensions } from 'react-native';
import Header from '../../../components/Header';
import TextLato from '../../../components/utils/TextLato';
import Constants from 'expo-constants';
import { gStyles } from '../../../global.style';
import Icon from '../../../components/utils/Icon';
import ProductPicker from '../../../components/utils/ProductPicker';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useLanguage } from '../../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const DeleteProduct = ({navigation}) => {
    const [products, setProducts] = useState([]);
    const [picks, setPicks] = useState([]);
    const token = useSelector(state => state.authReducer.token);
    const language = useLanguage();
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/own-products`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            setProducts(res);
        })
        .catch(err => console.log(err))
    }, []);

    const pick = (id) => {
        if(!picks.includes(id))
            setPicks(picks => picks.concat(id));
        else setPicks(picks => picks.filter(pick => pick !== id))
    }

    return (
        <View>
            <Header details={{title: 'Delete Product'}} />
            <ScrollView style={styles.table}>
                {products.map(product => {

                    return (
                        <TouchableOpacity onPress={() => pick(product._id)}>
                            <TextLato bold={picks.includes(product._id) ? true : false} >{product.title[language]}</TextLato>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    table: {
        marginHorizontal: width * 0.05,
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.01,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#aaa'
    }
})

export default DeleteProduct;