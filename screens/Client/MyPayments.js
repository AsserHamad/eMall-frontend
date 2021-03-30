import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput, TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import { SafeAreaView } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../components/utils/Icon';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import { useLanguage, useLanguageText } from '../../hooks/language';
import Toast from 'react-native-easy-toast';
import { updateAccount } from '../../src/actions/auth';
import Header from '../../components/Header';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const MyPayments = () => {
    const text = useLanguageText('myPayments');
    const [payments, setPayments] = useState([]);
    const token = useSelector(state => state.authReducer.token);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/client/payments`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            setPayments(res);
        })
    }, []);
    return (
        <View style={styles.container}>
            <Header details={{title: text.payments}} />
            <ImageBackground source={{uri: 'https://image.freepik.com/free-vector/red-oriental-chinese-seamless-pattern-illustration_193606-43.jpg'}} style={{width}}>
                <View style={styles.creditContainer}>
                    <TextLato style={{color: 'white', fontSize: RFPercentage(1.5), marginBottom: height * 0.01}}>TOTAL BALANCE</TextLato>
                    <TextLato bold style={{color: 'white', fontSize: RFPercentage(3), letterSpacing: 3}}> 300.00 EGP</TextLato>
                </View>
            </ImageBackground>
            <ScrollView style={{marginTop: height * 0.02}}>
                {payments.map(payment => {
                    const date = new Date(payment.created_at);
                    return (
                        <View style={styles.paymentContainer}>
                            <View style={{width: '30%', alignItems: 'center'}}>
                                <TextLato bold>{returnDate(date)}</TextLato>
                            </View>
                            <View style={{width: '70%', alignItems: 'center'}}>
                                <TextLato italic>Order #: {payment.order.code}</TextLato>
                                <TextLato style={{fontSize: RFPercentage(3), marginTop: height * 0.01}} bold>{payment.total.toFixed(2)} EGP</TextLato>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    creditContainer: {
        marginHorizontal: width * 0.1,
        marginTop: height * 0.02,
        backgroundColor: gStyles.color_3,
        paddingVertical: height * 0.07,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{translateY: 20}],
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
        elevation: 5,
        borderColor: '#222',
        borderLeftWidth: 7,
        borderRightWidth: 7
    },
    paymentContainer: {
        height: height * 0.12,
        marginVertical: height * 0.015,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftColor: gStyles.color_2,
        borderLeftWidth: 10
    }
})

const returnDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    switch(month){
        case 1: return `Jan ${day}`;
        case 2: return `Feb ${day}`;
        case 3: return `Mar ${day}`;
        case 4: return `Apr ${day}`;
        case 5: return `May ${day}`;
        case 6: return `Jun ${day}`;
        case 7: return `Jul ${day}`;
        case 8: return `Aug ${day}`;
        case 9: return `Sep ${day}`;
        case 10: return `Oct ${day}`;
        case 11: return `Nov ${day}`;
        case 12: return `Dec ${day}`;
    }
}

export default MyPayments;