import React from 'react';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { gStyles } from '../../../global.style';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

function SellerLoginSuccess(props) {
    const store = props.route.params.store;
    const seller = props.route.params.seller;
    console.log(props)
    return (
    <View style={styles.container}>
        <Entypo name="hour-glass" size={RFValue(130)} color={gStyles.secondary} />
        <Text style={styles.welcomeText}>Greetings, {seller.name}</Text>
        <View style={styles.subtitle}>
            <Text style={{fontSize: RFPercentage(2.5), fontWeight: 'bold', color: gStyles.primary}}>{store.title}</Text>
            <Text style={{fontSize: RFPercentage(1.8), color: 'black', textAlign: 'center'}}>Is still pending approval from our administrators, please regularly check your email for any updates.</Text>
            <Text style={{fontSize: RFPercentage(1.8), color: 'black', textAlign: 'center', marginTop: height * 0.02}}>In the meantime, you can check out our selection of shops and browse the app to your content.</Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('Home')}>
            <View style={styles.homeContainer}>
                <AntDesign name="home" size={RFPercentage(4)} color={gStyles.secondary} />
            </View>
            </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height,
        backgroundColor: gStyles.background,
        paddingTop: Constants.statusBarHeight + height * 0.15,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: RFPercentage(4),
        width: width * 0.8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: width * 0.8,
        fontSize: RFValue(10),
        display: 'flex',
        flexDirection: 'column',
    },
    backButton: {
        paddingVertical: height * 0.015,
        width: width * 0.8,
        textAlign: 'center',
        color: 'white',
        fontSize: RFPercentage(2),
        backgroundColor: gStyles.primary,
        borderRadius: 4
    },
    homeContainer: {
        marginTop: height * 0.1,
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: gStyles.primary
    }
})

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authReducer.loggedIn,
        account: state.authReducer.account,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (account) => dispatch(login(account))
    }
}

export default SellerLoginSuccess;