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
import * as WebBrowser from 'expo-web-browser';

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
            if(res.status === 200)
                return res.json()
            else throw new Error();
        })
        .then(res => {
            setOrders(res)
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        const newOrders = orders.filter(order => order.status === status);
        setDisplayedOrders(newOrders);
    }, [status, orders])
    return (
        <View style={styles.container}>
            <StoreNavbar title={'Orders'} />
            {/* STATUS BUTTON */}
            <ScrollView style={{height: height * 0.08}} horizontal showsHorizontalScrollIndicator={false}>
                {statuses.map(stat => {
                return (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        key={Math.random()}
                        onPress={() => setStatus(stat.status)} 
                        style={{...styles.statusButton, backgroundColor: stat.status === status ? gStyles.color_2: gStyles.color_0}}>
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
const Order = ({order, changeOrderStatus}) => {
    const language = useLanguage();
    const [expanded, setExpanded] = useState(false);
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
            <TextLato bold style={{color: '#888', marginVertical: height * 0.01}}>{order.orders.length} items</TextLato>
            {order.orders.map(order => (
            <View style={{marginBottom: height * 0.02}}>
                <TextLato key={Math.random()} italic>
                    {order.product.title[language]}  x{order.quantity} (stock: {order.product.stock})
                </TextLato>
                {order.options.map(option => {
                    const x = order.product.options.filter(op => op._id === option.option)[0];
                    const pick = x.options.filter(op => op._id === option.pick)[0];
                    return (<TextLato italic style={{color: '#aaa'}}>{x.title[language]}: {pick.title[language]}</TextLato>)
                })}
                {order.text && 
                    <View style={{marginTop: height * 0.01}}>
                        <TextLato style={{color: '#1184e8', fontSize: RFPercentage(2.5)}} italic>Text provided: </TextLato>
                        <TextLato style={{color: 'black', fontSize: RFPercentage(1.8)}}>{order.text}</TextLato>
                    </View>
                }
                {order.image && 
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => _handlePressButtonAsync(order.image)}>
                            <View style={orderStyles.downloadButton}>
                                <TextLato style={{color: 'white'}} bold>Download Image</TextLato>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>))}

            <View key={Math.random()} style={orderStyles.expandedView}>
                <TextLato bold style={{marginBottom: height * 0.005}}>Delivery address</TextLato>
                <TextLato>
                    {order.address.governate}, {order.address.city}, {order.address.street}, {order.address.building}, {order.address.apartment}, {order.address.extra} 
                </TextLato>
            </View>

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
                    <TextLato style={{color: 'white'}}>Cancel Order</TextLato>
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
        marginRight: width * 0.02,
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
        backgroundColor: '#1184e8',
        borderRadius: 15
    }
})



export default StoreOrders;