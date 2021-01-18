import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import Searchbar from './Navbar/Searchbar';
import Icon from './utils/Icon';
import TextLato from './utils/TextLato';
import HeaderSearchbar from './HeaderSearchbar';
import { useNavigation } from '@react-navigation/native';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

export default ({ details, search }) => {
    const cart = useSelector(state => state.cartReducer.cart);
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
            <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
                <Icon type="Feather" name="arrow-left" size={RFPercentage(3)} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>{details.title}</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.push('Cart')}
                    style={styles.burgerContainer}
                >
                    <View style={styles.cartNumberContainer}>
                        <TextLato style={{fontSize: RFPercentage(1.25)}}>{cart.length}</TextLato>
                    </View>
                    <Icon type="FontAwesome5" name="shopping-cart" color={gStyles.secondary_dark} size={ 27 }/>
                </TouchableOpacity>
            </View>
            {search && 
            <View style={styles.searchbarContainer}>
            </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        width,
        backgroundColor: gStyles.background,
    },
    topContainer: {
        width,
        height: height * 0.06,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: width * 0.02
    },
    backContainer: {
        width: width * 0.13,
        paddingLeft: width * 0.02
        // alignItems: 'center'
    },
    title: {
        fontSize: RFPercentage(2),
        width: width * 0.7
    },
    burgerContainer: {
        width: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    cartNumberContainer: {
        backgroundColor: gStyles.primary_light,
        height: 19,
        paddingHorizontal: 6,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
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