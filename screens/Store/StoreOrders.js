import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';

import { useSelector } from 'react-redux';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import { useLanguage, useLanguageText } from '../../hooks/language';
import * as WebBrowser from 'expo-web-browser';
import HTTP from '../../src/utils/axios';
import Loading from '../../components/utils/Loading';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const statuses = [{
    en: 'Pending',
    ar: 'قيد الانتظار',
    status: 0
}, {
    en: 'Ready for Pickup',
    ar: 'جاهز للإستلام',
    status: 1
}, {
    en: 'Completed',
    ar: 'منتهى',
    status: 5
}, {
    en: 'Cancelled',
    ar: 'ملغى',
    status: -1
}, {
    en: 'Refund Requested',
    ar: 'استرداد طلب',
    status: -2
}]

const StoreOrders = () => {
    const [orders, setOrders] = useState([]);
    const [displayedOrders, setDisplayedOrders] = useState([]);
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);
    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('sellerOrders');
    useEffect(() => {
        setLoading(true);
        HTTP(`/store/order/${status}`)
        .then(res => {
            setLoading(false);
            setOrders(res);
            setDisplayedOrders(res);
        })
        .catch(err => console.log(err.response));
    }, [status, refresh]);

    const changeOrderStatus = (newStatus, id) => {
        setLoading(true);
        HTTP.put('/store/order/status', {order: id, status: newStatus})
        .then(() => {
            setRefresh(refresh => !refresh);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }

    const cancelOrder = (id) => {
        setLoading(true);
        HTTP.put('/store/order/cancel', {order: id})
        .then(() => {
            setRefresh(refresh => !refresh);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        const newOrders = orders.filter(order => order.status === status);
        setDisplayedOrders(newOrders);
    }, [status, orders])
    return (
        <View style={styles.container}>
            <StoreNavbar title={text.title} />
            {/* STATUS BUTTON */}
            <ScrollView style={{height: height * 0.08, transform: en ? [] : [{scaleX: -1}]}} horizontal showsHorizontalScrollIndicator={false}>
                {statuses.map(stat => {
                return (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        key={stat.status}
                        onPress={() => setStatus(stat.status)} 
                        style={{...styles.statusButton, backgroundColor: stat.status === status ? gStyles.color_2: gStyles.color_0, transform: en ? [] : [{scaleX: -1}]}}>
                        <TextLato style={{color: 'white'}}>{stat[language]}</TextLato>
                    </TouchableOpacity>
                )
            })}
            </ScrollView>
            <ScrollView style={{height: '100%'}} contentContainerStyle={{paddingBottom: height * 0.03}}>
                {loading ? <Loading /> : displayedOrders.length === 0 ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height}}>
                        <TextLato italic style={{fontSize: RFPercentage(2)}}>{text.nothing}</TextLato>
                        <Image 
                            source={{uri: 'https://imgur.com/6w3sn3U.png'}}
                            style={{width, aspectRatio: 1, marginTop: height * 0.01}} />
                    </View>
                ) : displayedOrders.map(order => <Order order={order} changeOrderStatus={changeOrderStatus} cancelOrder={cancelOrder} key={order._id} text={text} />)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gStyles.background
    },
    statusButton: {
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.015,
        borderRadius: 100,
        marginHorizontal: width * 0.007,
    }
})


// ? ORDER CONTAINERS
const Order = ({order, changeOrderStatus, cancelOrder, text}) => {
    const language = useLanguage();
    const en = language === 'en';
    const [revenue, setRevenue] = useState('Calculating...');
    const [discount, setDiscount] = useState(0);
    const date = new Date(order.created_at);
    const token = useSelector(state => state.authReducer.token);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/order-revenue`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                token,
            },
            body: JSON.stringify({order: order._id})
        })
        .then(res => res.json())
        .then(res => {
            setRevenue(res.total);
            setDiscount(res.discountedTotal);
        });
    }, []);

    const _handlePressButtonAsync = async (link) => {
        await WebBrowser.openBrowserAsync(link);
      };

    return (
        <View style={orderStyles.container}>
            <TextLato style={{fontSize: RFPercentage(2.5)}} bold>#{order.code}</TextLato>
            <TextLato bold style={{color: '#888', marginVertical: height * 0.003}}>
                {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`}
            </TextLato>
            <TextLato bold style={{color: '#888', marginVertical: height * 0.01}}>{order.orders.length} {text.items}</TextLato>
            {order.orders.map(order => (
            <View key={order._id} style={{marginBottom: height * 0.02}}>
                <TextLato italic>
                    {order.product.title[language]}  x{order.quantity} (stock: {order.product.stock})
                </TextLato>
                {order.options.map(option => {
                    const x = order.product.options.filter(op => op._id === option.option)[0];
                    const pick = x.options.filter(op => op._id === option.pick)[0];
                    return (<TextLato key={option._id} italic style={{color: '#aaa'}}>{x.title[language]}: {pick.title[language]}</TextLato>)
                })}
                {order.text && 
                    <View style={{marginTop: height * 0.01}}>
                        <TextLato style={{color: gStyles.color_2, fontSize: RFPercentage(2.5)}} italic>{text.text}: </TextLato>
                        <TextLato style={{color: 'black', fontSize: RFPercentage(1.8)}}>{order.text}</TextLato>
                    </View>
                }
                {order.image && 
                    <View style={{marginTop: height * 0.03}}>
                        <TextLato style={{color: gStyles.color_2, fontSize: RFPercentage(2.5)}} italic>{text.image}: </TextLato>
                        <Image source={{uri: order.image}} style={orderStyles.image} />
                        <TouchableOpacity onPress={() => _handlePressButtonAsync(order.image)}>
                            <View style={orderStyles.downloadButton}>
                                <TextLato style={{color: 'white'}} bold>{text.image}</TextLato>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>))}

            <View style={orderStyles.expandedView}>
                <TextLato bold style={{marginBottom: height * 0.005}}>{text.address}</TextLato>
                <TextLato>
                    {order.address.governate}, {order.address.city}, {order.address.street}, {order.address.building}, {order.address.apartment}, {order.address.extra} 
                </TextLato>
            </View>

            {/* Revenue */}
            <View style={{flexDirection: en ? 'row' : 'row-reverse', marginTop: height * 0.01, alignItems: 'flex-end'}}>
                <TextLato bold style={{fontSize: RFPercentage(2)}}>{revenue}</TextLato>
                <TextLato italic style={{fontSize: RFPercentage(1.6)}}> {text.egp}</TextLato>
            </View>
            
            <TextLato style={{marginTop: height * 0.01}}>{text.totalAfterDiscount}</TextLato>
            {/* Discount */}
            <View style={{flexDirection: en ? 'row' : 'row-reverse', alignItems: 'flex-end'}}>
                <TextLato bold style={{fontSize: RFPercentage(2)}}>{discount}</TextLato>
                <TextLato italic style={{fontSize: RFPercentage(1.6)}}> {text.egp}</TextLato>
            </View>

            <View style={{flexDirection: en ? 'row' : 'row-reverse', marginTop: height * 0.02}}>
                {order.status === 0 && <TouchableOpacity onPress={() => changeOrderStatus(1, order._id)} style={orderStyles.confirmButton}>
                    <TextLato style={{color: 'white'}}>{text.confirm}</TextLato>
                </TouchableOpacity>}
                {(order.status === 0 || order.status === 1) && <TouchableOpacity onPress={() => cancelOrder(order._id)} style={orderStyles.cancelButton}>
                    <TextLato style={{color: 'white'}}>{text.cancel}</TextLato>
                </TouchableOpacity>}
            </View> 
        </View>
    )
}

const orderStyles = StyleSheet.create({
    container: {
        marginHorizontal: width * 0.05,
        marginTop: height * 0.03,
        // borderWidth: 1,
        // borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.02,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    arrow: {},
    expandedView: {
        marginTop: height * 0.03
    },
    confirmButton: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.01,
        backgroundColor: gStyles.color_2,
        marginHorizontal: width * 0.02,
        borderRadius: 10,

    },
    cancelButton: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.01,
        backgroundColor: gStyles.color_3,
        borderRadius: 10,

    },
    downloadButton: {
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.01,
        marginTop: height * 0.02,
        backgroundColor: gStyles.color_2,
        borderRadius: 15,
        width: width * 0.4,
        alignItems: 'center'
    },
    image: {
        width: width * 0.4,
        borderRadius: 3,
        aspectRatio: 1.5,
        resizeMode: 'contain',
        marginTop: height * 0.01
    }
})



export default StoreOrders;