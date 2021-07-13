import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { gStyles } from '../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import Icon from './utils/Icon';
import TextLato from './utils/TextLato';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];


export default ({ details, cart }) => {
    const cartProducts = useSelector(state => state.cartReducer.cart.products);
    const language = useLanguage();
    const navigation = useNavigation();
    const pad = navigation.canGoBack();
    
    const en = language === 'en';
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{...styles.topContainer, flexDirection: en ? 'row' : 'row-reverse'}}>
                <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
                    <Icon type="Feather" name={`arrow-${en ? 'left' : 'right'}`} size={RFPercentage(4)} color="black" />
                </TouchableOpacity>
                <TextLato style={{...styles.title, textAlign: en ? 'left' : 'right'}}>{details.title}</TextLato>
                {cart && <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.push('Cart')}
                    style={styles.burgerContainer}
                >
                    <View style={styles.cartNumberContainer}>
                        <TextLato>{cartProducts.length}</TextLato>
                    </View>
                    <Icon type="FontAwesome5" name="shopping-cart" color={gStyles.color_3} size={ 27 }/>
                </TouchableOpacity>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 5,
        zIndex: 1,
        width
    },
    topContainer: {
        width,
        // height: height * 0.06,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.03
        // paddingHorizontal: width * 0.02
    },
    backContainer: {
        width: width * 0.13,
        paddingLeft: width * 0.02
        // alignItems: 'center'
    },
    title: {
        fontSize: RFPercentage(2.5),
        width: width * 0.7
    },
    burgerContainer: {
        width: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    cartNumberContainer: {
        backgroundColor: gStyles.color_0,
        minWidth: 18,
        height: 18,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{translateX: -9}, {translateY: 0}],
        zIndex: 2,
        position: "absolute"
    },
    searchbarContainer: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    }
})