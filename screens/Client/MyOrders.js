import React, {useState, useEffect} from 'react';
import { Animated, Dimensions, Image, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../components/utils/Icon';
import {useLanguage, useLanguageText} from '../../hooks/language';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import Constants from 'expo-constants';
import { ScrollView, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const MyOrders = ({navigation}) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector(state => state.authReducer.token);
    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('myOrders');
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/client/orders`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            setLoading(false);
            setOrders(res);
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.topContainer, {flexDirection: en ? 'row' : 'row-reverse'}]}>
                <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
                    <Icon type="Feather" name={`arrow-${en ? 'left' : 'right'}`} size={RFPercentage(4)} color="black" />
                </TouchableOpacity>
                <View style={styles.title}>
                    {/* <Icon style={{alignItems: 'center'}} type={'FontAwesome5'} name={'truck-moving'} size={width * 0.06} color={'black'} /> */}
                    <TextLato style={{marginLeft: width * 0.03, color: 'black', fontSize: RFPercentage(2.6)}}>{text.myOrders}</TextLato>
                </View>
            </View>
            {loading ? loadingView : (
                <ScrollView contentContainerStyle={{paddingVertical: height * 0.03, paddingBottom: height * 0.05}}>
                    <View style={styles.orders}>
                        {orders.map(order => <Order key={Math.random()} order={order} en={en} text={text} />)}
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
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.02
    },
    backContainer: {
        width: width * 0.13,
        alignItems: 'center'
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center'
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

const Order = ({order, en, text}) => {
    let _date = new Date(order.created_at);
    const getStatus = (status) => {
        switch(status){
            case 0: return text.awaitingConfirmation;
            case 1: return text.orderConfirmed;
            case 2: return text.orderProcessing;
            case 3: return text.orderReadyToShip;
            case 4: return text.orderOutForDelivery;
            case 5: return text.orderComplete;
            default: return 
        }
    }
    const date = `${_date.getDay()}-${_date.getMonth()}-${_date.getFullYear()}, ${_date.getUTCHours()}:${_date.getUTCMinutes()}`
    
    const [status, setStatus] = useState(getStatus(order.status));
    const language = useLanguage();
    const [cancelled, setCancelled] = useState(order.status === -1);
    const completed = order.status === 5;
    const token = useSelector(state => state.authReducer.token);
    const [expanded, setExpanded] = useState(false);
    const [orders, setOrders] = useState([]);
    const [reviewVisible, setReviewVisible] = useState(false);

    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/client/order-products/${order.code}`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            setOrders(res)
        });
    }, []);

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
            <ReviewModal modalVisible={reviewVisible} setModalVisible={setReviewVisible} order={order} />
            <View style= {{alignItems: en ? 'flex-start' : 'flex-end'}}>
                <View>
                    <TextLato bold style={orderStyles.title}>{text.order} #: {order.code}</TextLato>
                    {/* <TextLato style={orderStyles.title} italic>{order.storeOrders.length} items</TextLato> */}
                    <TextLato style={{...orderStyles.date, textAlign: en ? 'left' : 'right'}}>{date}</TextLato>
                </View>
                {/* <View style={{alignItems: 'flex-end', flex: 1}}>
                    <Image source={{uri: order.storeOrders[0].product.images[0]}} style={orderStyles.imageStyle} />
                </View> */}
            {cancelled ? <TextLato bold style={orderStyles.cancelText}>{text.cancelled}</TextLato> :
            <TextLato style={orderStyles.statusText}>{status}</TextLato>}

            {/*
                CANCEL BUTTON 
            */}
            {!cancelled && !completed && <TouchableOpacity activeOpacity={0.8} style={orderStyles.cancelContainer} onPress={cancelOrder}>
                <Icon type={'Entypo'} name={'circle-with-cross'} color={'white'} size={RFPercentage(2)} />
                <TextLato bold style={{color: 'white', fontSize: RFPercentage(2), marginLeft: width * 0.02}}>{text.cancelOrder}</TextLato>
            </TouchableOpacity>}
            {completed && (
                <View style={{flexDirection: en ? 'row' : 'row-reverse', marginTop: height * 0.02}}>
                    <TouchableNativeFeedback style={orderStyles.completeButtons} onPress={() => setReviewVisible(true)}>
                        <TextLato bold style={{fontSize: RFPercentage(2)}}>Review</TextLato>
                    </TouchableNativeFeedback>
                    {/* <TouchableNativeFeedback style={orderStyles.completeButtons}>
                        <TextLato bold style={{fontSize: RFPercentage(2)}}>Complain</TextLato>
                    </TouchableNativeFeedback> */}
                </View>
            )}
            </View>

            {/* 
                EXPANDED VIEW
            */}
            {expanded && (
                <View>
                    <View style={orderStyles.productsContainer}>
                        {orders.map(_order => {
                            const status = _order.status;
                            return _order.orders.map(order => {
                                const product = order.product;
                                return (
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: height * 0.01}} key={Math.random()}>
                                        <Image style={{width: width * 0.1, aspectRatio: 1, marginRight: width * 0.05}} source={{uri: product.images[0]}} />
                                        <TextLato style={{width: width * 0.5, marginRight: width * 0.05}} italic>{product.title[language]} x{order.quantity}</TextLato>
                                        {status >= 1 ? 
                                        <Icon color={gStyles.color_2} type={'AntDesign'} name={'checkcircle'} size={RFPercentage(3)} />:
                                        <Icon color={gStyles.color_3} type={'FontAwesome'} name={'circle-o'} size={RFPercentage(3)} />}
                                    </View>
                                )
                            })
                        })}
                    </View>
                    <View style={orderStyles.expandedContainer}>
                        <View style={orderStyles.diagramContainer}>
                            <View style={{...orderStyles.dot, backgroundColor: order.status >= 0 ? gStyles.color_2 : gStyles.color_0}} />
                            <View style={{...orderStyles.line, backgroundColor: order.status >= 1 ? gStyles.color_2 : gStyles.color_0}} />
                            <View style={{...orderStyles.dot, backgroundColor: order.status >= 1 ? gStyles.color_2 : gStyles.color_0}} />
                            <View style={{...orderStyles.line, backgroundColor: order.status >= 2 ? gStyles.color_2 : gStyles.color_0}} />
                            <View style={{...orderStyles.dot, backgroundColor: order.status >= 2 ? gStyles.color_2 : gStyles.color_0}} />
                            <View style={{...orderStyles.line, backgroundColor: order.status >= 3 ? gStyles.color_2 : gStyles.color_0}} />
                            <View style={{...orderStyles.dot, backgroundColor: order.status >= 3 ? gStyles.color_2 : gStyles.color_0}} />
                            <View style={{...orderStyles.line, backgroundColor: order.status >= 4 ? gStyles.color_2 : gStyles.color_0}} />
                            <View style={{...orderStyles.dot, backgroundColor: order.status >= 4 ? gStyles.color_2 : gStyles.color_0}} />
                        </View>
                        <View style={orderStyles.detailsContainer}>
                            <DetailContainer textActive={order.status === 0} active={order.status >= 0} title={text.orderPlaced} subtitle={`${text.orderPlacedDescription} ${date}`} type={'FontAwesome5'} name={'feather'} />
                            <DetailContainer textActive={order.status === 1} active={order.status >= 1} title={text.orderConfirmed} subtitle={text.orderConfirmedDescription} type={'Feather'} name={'check-circle'} />
                            <DetailContainer textActive={order.status === 2} active={order.status >= 2} title={text.orderProcessing} subtitle={text.orderProcessingDescription} type={'FontAwesome5'} name={'brain'} />
                            <DetailContainer textActive={order.status === 3} active={order.status >= 3} title={text.orderReadyToShip} subtitle={text.orderReadyToShipDescription} type={'FontAwesome5'} name={'box'} />
                            <DetailContainer textActive={order.status === 4} active={order.status >= 4} title={text.orderOutForDelivery} subtitle={text.orderOutForDeliveryDescription} type={'MaterialCommunityIcons'} name={'truck-check'} />
                        </View>
                    </View>
                </View>
            )}
            {!expanded ? 
                <TouchableWithoutFeedback style={{alignItems: 'center', marginTop: height * 0.03, width: '100%'}} onPress={() => setExpanded(expanded => !expanded)} activeOpacity={1}>
                    <TextLato bold style={{fontSize: RFPercentage(1.4),color: gStyles.color_0}}>{text.viewFullDetails}</TextLato>
                    <Icon style={orderStyles.arrow} type="Feather" size={RFPercentage(3)} color={gStyles.color_0} name="chevron-down" />
                </TouchableWithoutFeedback>
            :
                <TouchableWithoutFeedback style={{alignItems: 'center', marginTop: height * 0.03}} onPress={() => setExpanded(expanded => !expanded)} activeOpacity={1}>
                    <TextLato bold style={{fontSize: RFPercentage(1.4),color: gStyles.color_0}}>{text.viewFewerDetails}</TextLato>
                    <Icon style={orderStyles.arrow} type="Feather" size={RFPercentage(3)} color={gStyles.color_0} name="chevron-up" />
                </TouchableWithoutFeedback>
            }
            
        </View>
    )
};

const DetailContainer = ({type, name, active, textActive, title, subtitle}) => (
    <View style={orderStyles.detail}>
        <View style={{...orderStyles.iconContainer, backgroundColor: active ? gStyles.color_2 : gStyles.color_0}}>
            <Icon type={type} name={name} color={'white'} size={25} />
        </View>
        <View style={{width: width * 0.45}}>
            <TextLato bold style={{fontSize: RFPercentage(2), color: textActive ? gStyles.color_2 : '#636363'}}>{title}</TextLato>
            <TextLato bold style={{fontSize: RFPercentage(1.5), color: textActive ? gStyles.color_2 : '#a5a5a5'}}>{subtitle}</TextLato>
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
        color: '#838383',
    },
    cancelText: {
        color: 'red',
        marginVertical: height * 0.02,
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
        color: gStyles.color_2
    },
    arrow: {
        
    },
    expandedContainer: {
        flexDirection: 'row',
        marginTop: height * 0.03,
        paddingHorizontal: 20
    },
    productsContainer: {
        marginVertical: height * 0.01,
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.02,
        backgroundColor: 'white',
        borderRadius: 20
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
    },
    completeButtons: {
        paddingHorizontal: width * 0.05, 
        paddingVertical: height * 0.005, 
        marginRight: width * 0.01, 
        borderWidth: 1, 
        borderColor: '#777', 
        borderRadius: 100
    }
})

const ReviewModal = ({modalVisible, setModalVisible, order}) => {
    const language = useLanguage();
    const en = language === 'en';
    const products = order.storeOrders.map(storeOrder => {
            return storeOrder.orders.map(storeOrderOrder => storeOrderOrder.product);
        }).flat();
    const [pick, setPick] = useState('');
    const [stars, setStars] = useState(0);
    const [review, setReview] = useState('');
    const token = useSelector(state => state.authReducer.token);
    const close = () => {
        setModalVisible(false);
    }

    const submitReview = () => {
        if(review === '' || pick === '' || stars === 0) return;
        fetch(`${Constants.manifest.extra.apiUrl}/client/product-review`, {
            method: 'post',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                product: pick,
                stars,
                review
            })
        })
        .then(res => res.json())
        .then(res => {
            close();
        })
    }
    return (
        <View style={modalStyles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={close}
          visible={modalVisible}>
            <View style={modalStyles.modalView}>
              <TextLato>Choose a product to review</TextLato>
              {products.map(product => {
                  const picked = pick === product._id;
                  return (
                      <TouchableOpacity
                        key={Math.random()}
                        activeOpacity={0.7}
                        onPress={() => setPick(product._id)}
                        style={{paddingVertical: height * 0.01, paddingHorizontal: width * 0.02, backgroundColor: picked ? gStyles.color_2:gStyles.color_3, borderRadius: 10, marginVertical: height * 0.01}}>
                          <TextLato style={{color: 'white'}} italic>{product.title[language]}</TextLato>
                      </TouchableOpacity>
                  )
              })}
              <View style={{flexDirection: 'row', marginTop: height * 0.05}}>
                <TouchableOpacity onPress={() => setStars(1)}>
                    <Icon type="AntDesign" name={stars >= 1 ? 'star' : 'staro'} color={'#EED555'} size={RFPercentage(5)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStars(2)}>
                    <Icon type="AntDesign" name={stars >= 2 ? 'star' : 'staro'} color={'#EED555'} size={RFPercentage(5)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStars(3)}>
                    <Icon type="AntDesign" name={stars >= 3 ? 'star' : 'staro'} color={'#EED555'} size={RFPercentage(5)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStars(4)}>
                    <Icon type="AntDesign" name={stars >= 4 ? 'star' : 'staro'} color={'#EED555'} size={RFPercentage(5)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStars(5)}>
                    <Icon type="AntDesign" name={stars >= 5 ? 'star' : 'staro'} color={'#EED555'} size={RFPercentage(5)} />
                </TouchableOpacity>
              </View>
              <TextInput 
                multiline
                value={review} 
                onChangeText={val => setReview(val)} placeholder={en ? 'Write Review' : 'أكتب مراجعة'}
                style={{width: '90%', borderBottomWidth: 2, borderColor: 'red', marginVertical: height * 0.02}} />
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={{ ...modalStyles.openButton, backgroundColor: '#9DB68C' }}
                        onPress={submitReview}>
                        <Icon type={'Entypo'} name={'check'} color="white" size={RFPercentage(4)} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ ...modalStyles.openButton, backgroundColor: gStyles.color_1 }}
                        onPress={close}>
                        <Icon type={'Entypo'} name={'cross'} color="white" size={RFPercentage(4)} />
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
      </View>
    );
}
  
const modalStyles = StyleSheet.create({
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: width * 0.02
    // elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
      width: '80%',
      borderBottomWidth: 2,
      borderBottomColor: gStyles.color_1,
      marginBottom: height * 0.01,
      height: height * 0.05
  }
});

export default MyOrders;