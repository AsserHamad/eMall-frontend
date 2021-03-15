import React, { useState, useEffect } from 'react';
import { View, Image, ScrollableView, StyleSheet, Dimensions, Text, Button } from 'react-native';
import Header from '../../components/Header';
import TextLato from '../../components/utils/TextLato';
import Constants from 'expo-constants';
import { gStyles } from '../../global.style';
import Icon from '../../components/utils/Icon';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import SalesGraph from '../../components/Store/Dashboard/SalesGraph';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import TotalSales from '../../components/Store/Dashboard/TotalSales';
import TotalViews from '../../components/Store/Dashboard/TotalViews';
import CurrentFunds from '../../components/Store/Dashboard/CurrentFunds';
import useCredit from '../../hooks/credit';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const StorePayments = ({navigation, route}) => {
    const token = useSelector(state => state.authReducer.token);
    const [payments, setPayments] = useState([]);
    const credit = useCredit();
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/payments`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            setPayments(res);
        })
    }, []);
    return(
        <View style={styles.container}>
            <StoreNavbar title={'Payments'} />
            <View style={styles.creditContainer}>
                <TextLato style={{color: 'white', fontSize: RFPercentage(1.5), marginBottom: height * 0.01}}>AVAILABLE BALANCE</TextLato>
                <TextLato bold style={{color: 'white', fontSize: RFPercentage(3), letterSpacing: 3}}> {credit.toFixed(2)} EGP</TextLato>
                <View style={{marginTop: height * 0.02}}>
                    <Button onPress={() => navigation.push('RequestWithdrawal')} title={'REQUEST WITHDRAWAL'} />
                </View>
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
                                <TextLato italic>Order #: {payment.storeOrder.code}</TextLato>
                                <TextLato style={{fontSize: RFPercentage(3), marginTop: height * 0.01}} bold>{payment.amount.toFixed(2)} EGP</TextLato>
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
        marginTop: height * 0.05,
        backgroundColor: '#5469DD',
        paddingVertical: height * 0.04,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    paymentContainer: {
        height: height * 0.15,
        flexDirection: 'row',
        alignItems: 'center',
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