import React, {useState, useEffect} from 'react';
import { Animated, Dimensions, Image, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../components/utils/Icon';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import Constants from 'expo-constants';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const MyOrders = ({navigation}) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector(state => state.authReducer.token);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/client/orders`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            setLoading(false);
            console.log(res);
            setOrders(res);
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={{backgroundColor: gStyles.color_0}}>
                <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
                    <Icon type="Feather" name="arrow-left" size={RFPercentage(4)} color="white" />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Icon style={{alignItems: 'center'}} type={'FontAwesome5'} name={'truck-moving'} size={width * 0.06} color={'white'} />
                    <View>
                        <TextLato style={{textTransform: 'uppercase', marginLeft: width * 0.03, color: 'white', fontSize: RFPercentage(2.6)}}>MY ORDERS</TextLato>
                    </View>
                </View>
            </View>
            {loading ? loadingView : (
                <ScrollView contentContainerStyle={{paddingVertical: height * 0.03, paddingBottom: height * 0.05}}>
                    <View style={styles.orders}>
                        {orders.map(order => <Order key={Math.random()} order={order} />)}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    )
}

const loadingView = <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}><ActivityIndicator size={width * 0.2} color={gStyles.color_0} /></View>;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: gStyles.background,
    },
    backContainer: {
        marginLeft: width * 0.02,
        marginTop: height * 0.01,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: height * 0.02
    },
    orders: {
        marginHorizontal: width * 0.05,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        backgroundColor: 'white',
        borderRadius: 14
    }
})

const Order = ({order}) => {
    let _date = new Date(order.created_at);
    const date = `${_date.getDay()}-${_date.getMonth()}-${_date.getFullYear()}, ${_date.getUTCHours()}:${_date.getUTCMinutes()}`
    let status = "";
    const [cancelled, setCancelled] = useState(order.cancelRequest);
    const token = useSelector(state => state.authReducer.token);
    const [expanded, setExpanded] = useState(false);
    switch(order.status){
        case 0: status = "Awaiting Store Confirmation";
        default: status = "Awaiting Confirmation"
    }

    const cancelOrder = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/client/cancel-order`, {
            method: 'put',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({order})
        })
        .then(res => res.json())
        .then(res => {
            setCancelled(res);
        })
    }
    return (
        <View key={Math.random()} style={orderStyles.orderContainer}>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <TextLato bold style={orderStyles.title}>Order #: {order.code}</TextLato>
                    <TextLato style={orderStyles.title} italic>{order.orders.length} items</TextLato>
                    <TextLato style={orderStyles.date}>{date}</TextLato>
                </View>
                <View style={{alignItems: 'flex-end', flex: 1}}>
                    <Image source={{uri: order.orders[0].product.images[0]}} style={orderStyles.imageStyle} />
                </View>
            </View>
            {cancelled ? <TextLato bold style={orderStyles.cancelText}>CANCELLED</TextLato> :
            <TextLato style={orderStyles.statusText}>{status}</TextLato>}

            {/*
                CANCEL BUTTON 
             */}
            {!cancelled && <TouchableOpacity activeOpacity={0.8} style={orderStyles.cancelContainer} onPress={cancelOrder}>
                <Icon type={'Entypo'} name={'circle-with-cross'} color={'white'} size={RFPercentage(2)} />
                <TextLato bold style={{color: 'white', fontSize: RFPercentage(2), marginLeft: width * 0.02}}>Cancel Order</TextLato>
            </TouchableOpacity>}

            {/* 
                EXPANDED VIEW
            */}
            {expanded && 
                <View style={orderStyles.expandedContainer}>
                    <View style={orderStyles.diagramContainer}>
                        <View style={{...orderStyles.dot, backgroundColor: order.status >= 0 ? gStyles.active : gStyles.color_0}} />
                        <View style={{...orderStyles.line, backgroundColor: order.status >= 1 ? gStyles.active : gStyles.color_0}} />
                        <View style={{...orderStyles.dot, backgroundColor: order.status >= 1 ? gStyles.active : gStyles.color_0}} />
                        <View style={{...orderStyles.line, backgroundColor: order.status >= 2 ? gStyles.active : gStyles.color_0}} />
                        <View style={{...orderStyles.dot, backgroundColor: order.status >= 2 ? gStyles.active : gStyles.color_0}} />
                        <View style={{...orderStyles.line, backgroundColor: order.status >= 3 ? gStyles.active : gStyles.color_0}} />
                        <View style={{...orderStyles.dot, backgroundColor: order.status >= 3 ? gStyles.active : gStyles.color_0}} />
                        <View style={{...orderStyles.line, backgroundColor: order.status >= 4 ? gStyles.active : gStyles.color_0}} />
                        <View style={{...orderStyles.dot, backgroundColor: order.status >= 4 ? gStyles.active : gStyles.color_0}} />
                    </View>
                    <View style={orderStyles.detailsContainer}>
                        <DetailContainer textActive={order.status === 0} active={order.status >= 0} title={'Order Placed'} subtitle={'You have placed this order on 2-Feb-2021'} type={'FontAwesome5'} name={'feather'} />
                        <DetailContainer textActive={order.status === 1} active={order.status >= 1} title={'Order Confirmed'} subtitle={'You order has been confirmed by the sellers'} type={'Feather'} name={'check-circle'} />
                        <DetailContainer textActive={order.status === 2} active={order.status >= 2} title={'Processing Order'} subtitle={'We are processing your order'} type={'FontAwesome5'} name={'brain'} />
                        <DetailContainer textActive={order.status === 3} active={order.status >= 3} title={'Ready to Ship'} subtitle={'Your order is getting ready to be shipped'} type={'FontAwesome5'} name={'box'} />
                        <DetailContainer textActive={order.status === 4} active={order.status === 4} title={'Out for Delivery'} subtitle={'Your order is on its way to you right now!'} type={'MaterialCommunityIcons'} name={'truck-check'} />
                    </View>
                </View>
            }
            {!expanded ? 
                <TouchableWithoutFeedback style={{alignItems: 'center', marginTop: height * 0.03}} onPress={() => setExpanded(expanded => !expanded)} activeOpacity={1}>
                    <TextLato bold style={{fontSize: RFPercentage(1.4),color: gStyles.color_0}}>View Full Details</TextLato>
                    <Icon style={orderStyles.arrow} type="Feather" size={RFPercentage(3)} color={gStyles.color_0} name="chevron-down" />
                </TouchableWithoutFeedback>
            :
                <TouchableWithoutFeedback style={{alignItems: 'center', marginTop: height * 0.03}} onPress={() => setExpanded(expanded => !expanded)} activeOpacity={1}>
                    <TextLato bold style={{fontSize: RFPercentage(1.4),color: gStyles.color_0}}>View Fewer Details</TextLato>
                    <Icon style={orderStyles.arrow} type="Feather" size={RFPercentage(3)} color={gStyles.color_0} name="chevron-up" />
                </TouchableWithoutFeedback>
            }
            
        </View>
    )
};

const DetailContainer = ({type, name, active, textActive, title, subtitle}) => (
    <View style={orderStyles.detail}>
        <View style={{...orderStyles.iconContainer, backgroundColor: active ? gStyles.active : gStyles.color_0}}>
            <Icon type={type} name={name} color={'white'} size={25} />
        </View>
        <View style={{width: width * 0.45}}>
            <TextLato bold style={{fontSize: RFPercentage(2.5), color: textActive ? gStyles.active : '#636363'}}>{title}</TextLato>
            <TextLato bold style={{fontSize: RFPercentage(2), color: textActive ? gStyles.active : '#a5a5a5'}}>{subtitle}</TextLato>
        </View>
    </View>
)

const detail = 90, dot = 14, icon = 50, line = detail - dot, margin = line/4;

const orderStyles = StyleSheet.create({
    orderContainer: {
        borderBottomWidth: 1,
        borderColor: "#cDcDcD",
        paddingHorizontal: width * 0.07,
        paddingVertical: height * 0.02
    },
    imageStyle: {
        width: width * 0.25,
        aspectRatio: 1
    },
    title: {
        color: "#707070",
        marginBottom: height * 0.005,
        fontSize: RFPercentage(2.3)
    },
    date: {
        fontSize: RFPercentage(2.1),
        color: '#838383'
    },
    cancelText: {
        color: 'red',
        fontSize: RFPercentage(2.5)
    },
    cancelContainer: {
        backgroundColor: 'red',
        paddingVertical: height * 0.013,
        width: width * 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.02,
        borderRadius: 5,
        flexDirection: 'row'
    },
    statusText: {
        marginTop: height * 0.02,
        color: gStyles.active
    },
    arrow: {
        
    },
    expandedContainer: {
        flexDirection: 'row',
        marginTop: height * 0.03,
        paddingHorizontal: 20
    },
    diagramContainer: {
        alignItems: 'center',
        paddingVertical: margin
    },
    dot: {
        width: dot,
        aspectRatio: 1,
        backgroundColor: gStyles.color_0,
        borderRadius: 100
    },
    line: {
        width: 3,
        backgroundColor: gStyles.color_0,
        height: line
    },
    iconContainer: {
        width: icon,
        aspectRatio: 1,
        backgroundColor:
        gStyles.color_0,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: width * 0.04
    },
    detailsContainer: {
        marginLeft: width * 0.06,
    },
    detail: {
        height: detail,
        justifyContent: 'center',
        flexDirection: 'row'
    }
})

export default MyOrders;