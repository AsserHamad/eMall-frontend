import React, { useState, useEffect } from 'react';
import { View, Image, ScrollableView, StyleSheet, Dimensions, Text, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';

import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import Icon from '../../components/utils/Icon';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import { useLanguage } from '../../hooks/language';
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
    const token = useSelector(state => state.authReducer.token);
    const language = useLanguage();
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/orders`, {
            headers: {token}
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setOrders(res);
            setDisplayedOrders(res);
        })
        .catch(err => console.log(err));
    }, []);

    const changeOrderStatus = (newStatus, id) => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/order/status`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                token,
            },
            body: JSON.stringify({order: id, status: newStatus})
        })
        .then(res => {
            console.log(res);
            if(res.status === 200)
                return res.json()
            else throw new Error();
        })
        .then(res => {
            console.log('new orders!!', res);
            setOrders(res)
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        const newOrders = orders.filter(order => order.status === status);
        console.log('orders that fit the filter are', newOrders)
        setDisplayedOrders(newOrders);
    }, [status, orders])
    return (
        <SafeAreaView style={styles.container}>
            <StoreNavbar title={'Orders'} />
            {/* STATUS BUTTON */}
            <ScrollView contentContainerStyle={{paddingVertical: height * 0.02}} horizontal showsHorizontalScrollIndicator={false}>
                {statuses.map(stat => {
                return (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        key={Math.random()}
                        onPress={() => setStatus(stat.status)} 
                        style={{...styles.statusButton, backgroundColor: stat.status === status ? gStyles.color_1: gStyles.color_0}}>
                        <TextLato style={{color: 'white'}}>{stat[language]}</TextLato>
                    </TouchableOpacity>
                )
            })}
            </ScrollView>
            <ScrollView style={{height: '100%'}} contentContainerStyle={{paddingBottom: height * 0.03}}>
                {displayedOrders.length === 0 ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height}}>
                        <TextLato italic style={{fontSize: RFPercentage(2)}}>There's Nothing Here</TextLato>
                        <Image 
                            source={{uri: 'https://imgur.com/lUVPfJM.png'}}
                            style={{width, aspectRatio: 1, marginTop: height * 0.01}} />
                    </View>
                ) : displayedOrders.map(order => <Order order={order} changeOrderStatus={changeOrderStatus} key={Math.random()} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gStyles.background
    },
    statusButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.015,
        borderRadius: 100,
        marginLeft: width * 0.013
    }
})


// ? ORDER CONTAINERS
const Order = ({order, changeOrderStatus}) => {
    const language = useLanguage();
    const [expanded, setExpanded] = useState(true);
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
            console.log('revenue res is', res)
            setRevenue(res.total);
            setDiscount(res.discountedTotal);
        });
    }, []);
    return (
        <View style={orderStyles.container}>
            <TextLato style={{fontSize: RFPercentage(2.5)}} bold>#{order.code}</TextLato>
            <TextLato bold style={{color: '#888', marginVertical: height * 0.003}}>
                {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`}
            </TextLato>
            <TextLato bold style={{color: '#888', marginVertical: height * 0.01}}>{order.orders.length} items</TextLato>
            {order.orders.map(order => (
            <View style={{marginBottom: height * 0.02}}>
                <TextLato key={Math.random()} italic>
                    {order.product.title[language]}  x{order.quantity} (stock: {order.product.stock})
                </TextLato>
                {order.options.map(option => {
                    const x = order.product.options.filter(op => op._id === option.option)[0];
                    const pick = x.options.filter(op => op._id === option.pick)[0];
                    console.log(pick)
                    return (<TextLato italic style={{color: '#aaa'}}>{x.title[language]}: {pick.title[language]}</TextLato>)
                })}
            </View>))}
            {!expanded ? 
                <TouchableWithoutFeedback style={{alignItems: 'center', marginTop: height * 0.03}} onPress={() => setExpanded(expanded => !expanded)} activeOpacity={1}>
                    <TextLato bold style={{fontSize: RFPercentage(1.4),color: gStyles.color_0}}>View Full Details</TextLato>
                    <Icon style={orderStyles.arrow} type="Feather" size={RFPercentage(3)} color={gStyles.color_0} name="chevron-down" />
                </TouchableWithoutFeedback>
            :
            [
                // ! EXPANDED VIEW
                <View key={Math.random()} style={orderStyles.expandedView}>
                    <TextLato bold style={{marginBottom: height * 0.005}}>Delivery address</TextLato>
                    <TextLato>
                        {order.address.governate}, {order.address.city}, {order.address.street}, {order.address.building}, {order.address.apartment}, {order.address.extra} 
                    </TextLato>
                    {/* Revenue */}
                    <View style={{flexDirection: 'row', marginTop: height * 0.01, alignItems: 'flex-end'}}>
                        <TextLato bold style={{fontSize: RFPercentage(2)}}>{revenue}</TextLato>
                        <TextLato italic style={{fontSize: RFPercentage(1.6)}}> EGP</TextLato>
                    </View>
                    
                    <TextLato style={{marginTop: height * 0.01}}>Total after discount</TextLato>
                    {/* Discount */}
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <TextLato bold style={{fontSize: RFPercentage(2)}}>{discount}</TextLato>
                        <TextLato italic style={{fontSize: RFPercentage(1.6)}}> EGP</TextLato>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: height * 0.02}}>
                        {order.status === 0 && <TouchableOpacity onPress={() => changeOrderStatus(1, order._id)} style={orderStyles.confirmButton}>
                            <TextLato style={{color: 'white'}}>Confirm Order</TextLato>
                        </TouchableOpacity>}
                        {(order.status === 0 || order.status === 1) && <TouchableOpacity onPress={() => changeOrderStatus(-1, order._id)} style={orderStyles.cancelButton}>
                            <TextLato style={{color: 'white'}}>Reject Order</TextLato>
                        </TouchableOpacity>}
                    </View> 
                </View>,

                // * ARROW
                <TouchableWithoutFeedback key={Math.random()} style={{alignItems: 'center', marginTop: height * 0.03}} onPress={() => setExpanded(expanded => !expanded)} activeOpacity={1}>
                    <TextLato bold style={{fontSize: RFPercentage(1.4),color: gStyles.color_0}}>View Fewer Details</TextLato>
                    <Icon style={orderStyles.arrow} type="Feather" size={RFPercentage(3)} color={gStyles.color_0} name="chevron-up" />
                </TouchableWithoutFeedback>
            ]
            }
        </View>
    )
}

const orderStyles = StyleSheet.create({
    container: {
        marginHorizontal: width * 0.05,
        marginTop: height * 0.03,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.01
    },
    arrow: {},
    expandedView: {
        marginTop: height * 0.03
    },
    confirmButton: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.01,
        backgroundColor: "#8875FD",
        marginRight: width * 0.02,
        borderRadius: 10,

    },
    cancelButton: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.01,
        backgroundColor: '#FF3D41',
        borderRadius: 10,


    }
})



export default StoreOrders;