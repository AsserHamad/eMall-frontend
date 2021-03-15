import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
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
            <View style={styles.creditContainer}>
                <TextLato style={{color: 'white', fontSize: RFPercentage(1.5), marginBottom: height * 0.01}}>TOTAL BALANCE</TextLato>
                <TextLato bold style={{color: 'white', fontSize: RFPercentage(3), letterSpacing: 3}}> 300.00 EGP</TextLato>
            </View>
            <ScrollView>
                {payments.map(payment => {
                    const date = new Date(payment.created_at);
                    return (
                        <View style={styles.paymentContainer}>
                            <View style={{width: '30%', alignItems: 'center'}}>
                                <TextLato bold>{returnDate(date)}</TextLato>
                            </View>
                            <View style={{width: '15%'}}>
                                <Icon type={'Feather'} name={'dollar-sign'} size={RFPercentage(3.5)} />
                            </View>
                            <View style={{width: '50%'}}>
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
        marginTop: height * 0.05,
        backgroundColor: '#5469DD',
        paddingVertical: height * 0.07,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    paymentContainer: {
        height: height * 0.15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#5469DD',
        borderBottomWidth: 1
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