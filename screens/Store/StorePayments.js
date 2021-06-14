import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Button, ImageBackground } from 'react-native';
import TextLato from '../../components/utils/TextLato';
import Constants from 'expo-constants';
import { gStyles } from '../../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import useCredit from '../../hooks/credit';
import { useLanguageText } from '../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const StorePayments = ({navigation}) => {
    const token = useSelector(state => state.authReducer.token);
    const [payments, setPayments] = useState([]);
    const credit = useCredit();
    const text = useLanguageText('sellerPayments');
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/payments`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            setPayments(res);
        })
    }, []);
    return(
        <View style={styles.container}>
            <StoreNavbar title={text.title} />
            <ScrollView>
            <ImageBackground source={{uri: 'https://imgur.com/eG8Mx1a.jpg'}} style={{width, marginBottom: height * 0.05}}>
                <View style={styles.creditContainer}>
                    <TextLato style={{color: 'white', fontSize: RFPercentage(1.5), marginBottom: height * 0.01}}>{text.available}</TextLato>
                    <TextLato bold style={{color: 'white', fontSize: RFPercentage(3), letterSpacing: 3}}> {credit.toFixed(2)} {text.egp}</TextLato>
                    <View style={{marginTop: height * 0.02}}>
                        <Button color={gStyles.color_2} onPress={() => navigation.push('RequestWithdrawal')} title={text.requestWithdrawal} />
                    </View>
                </View>
            </ImageBackground>
                {payments.map(payment => {
                    const date = new Date(payment.created_at);
                    const twoWeeks = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 14)
                    return (
                        <View key={Math.random()} style={styles.paymentContainer}>
                            <View style={{width: '30%', alignItems: 'center'}}>
                                <TextLato bold>{returnDate(date)}</TextLato>
                            </View>
                            <View style={{width: '15%'}} />
                            <View style={{width: '50%'}}>
                                <TextLato italic>{text.order} {payment.storeOrder.code}</TextLato>
                                <TextLato style={{fontSize: RFPercentage(3), marginTop: height * 0.01}} bold>{payment.amount.toFixed(2)} {text.egp}</TextLato>
                                <TextLato style={{marginTop: height * 0.01}} italic>{text.availableOn} {twoWeeks.getDate()}/{twoWeeks.getMonth() + 1}</TextLato>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
            
        </View>
    )
}

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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
        borderColor: '#222',
        borderLeftWidth: 7,
        borderRightWidth: 7
    },
    paymentContainer: {
        height: height * 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'red',
        elevation: 2,
        backgroundColor: 'white',
        marginVertical: height * 0.005
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

export default StorePayments;