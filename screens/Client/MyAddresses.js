import React, {useState, useEffect} from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../components/utils/Icon';
import TextLato from '../../components/utils/TextLato';
import { useLanguage, useLanguageText } from '../../hooks/language';
import { gStyles } from '../../global.style';
import Constants from 'expo-constants';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { updateAccount } from '../../src/actions/auth';
import Header from '../../components/Header';
import CustomModal from '../../components/utils/CustomModal';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const MyAddresses = () => {
    const addresses = useSelector(state => state.authReducer.account.addresses);
    console.log(addresses);
    const token = useSelector(state => state.authReducer.token);
    const dispatch = useDispatch();
    const [edited, setEdited] = useState(undefined);
    const [modalVisible, setModalVisible] = useState(false);
    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('myAddresses');

    const deleteAddress = (id) => {
        const newAddresses = addresses.filter(address => {
            if(address._id === id && address.active)
                wasActive = true;
            return address._id !== id;
        });
        if(newAddresses.length)
            newAddresses[0].active = true;
        fetch(`${Constants.manifest.extra.apiUrl}/client`, {
            method: 'put',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify({addresses: newAddresses})
        })
        .then(res => res.json())
        .then(res => {
            dispatch(updateAccount(res));
        })
    }

    const setActive = (id) => {
        const newAddresses = addresses.map(address => {
            address.active = address._id === id ? true : false;
            return address;
        });
        fetch(`${Constants.manifest.extra.apiUrl}/client`, {
            method: 'put',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify({addresses: newAddresses})
        })
        .then(res => res.json())
        .then(res => {
            dispatch(updateAccount(res));
        })
    }

    const edit = (address) => {
        setEdited(address);
        setModalVisible(true);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header details={{title: text.myAddresses}} />
            <InputModal modalVisible={modalVisible} setModalVisible={setModalVisible} addresses={addresses} edited={edited} setEdited={setEdited} text={text} en={en} />
            <ScrollView style={{marginTop: height * 0.03}} contentContainerStyle={{alignItems: 'center'}}>
                {addresses.map(address => {
                    return (
                        <View key={Math.random()} style={address.active ? styles.activeAddressContainer : styles.addressContainer}>
                            <TextLato style={{...styles.cardText, textAlign: en ? 'left' : 'right'}} bold>{address.governate}</TextLato>
                            <TextLato style={{...styles.cardText, textAlign: en ? 'left' : 'right'}} bold>{address.city}</TextLato>
                            <TextLato style={{...styles.cardText, textAlign: en ? 'left' : 'right'}} bold>{address.street}</TextLato>
                            <TextLato style={{...styles.cardText, textAlign: en ? 'left' : 'right'}} bold>{address.building}, {address.apartment}</TextLato>
                            <TextLato style={{...styles.cardText, textAlign: en ? 'left' : 'right'}} italic>{address.extra}</TextLato>
                            <View style={{marginTop: height * 0.02, flexDirection: en ? 'row' : 'row-reverse'}}>
                                {address.active ? 
                                    <View style={{...styles.activeButton, backgroundColor: 'white'}}>
                                        <Icon type={'AntDesign'} name={`smile-circle`} color={gStyles.color_0} size={20} />
                                        <TextLato style={{...styles.activeText, color: gStyles.color_0}} italic>{text.active}</TextLato>
                                    </View>
                                :
                                    <TouchableOpacity onPress={() => setActive(address._id)} style={styles.activeButton}>
                                        <Icon type={'AntDesign'} name={`frowno`} color={'white'} size={20} />
                                        <TextLato style={styles.activeText} italic>{text.setActive}</TextLato>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity onPress={() => edit(address)} style={styles.activeButton}>
                                    <Icon type="Feather" name="edit" size={20} color="white" /> 
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteAddress(address._id)} style={styles.activeButton}>
                                    <Icon type="Feather" name="trash" size={20} color="white" /> 
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
                <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} style={styles.addNew}>
                    <TextLato style={{fontSize: RFPercentage(2), color: 'white', marginBottom: height * 0.01}}>{text.addAddress}</TextLato>
                    <Icon size={40} type={'AntDesign'} name="plus" color="white" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    addNew: {
        width: width * 0.8,
        backgroundColor: gStyles.color_0,
        paddingVertical: height * 0.03,
        shadowColor: gStyles.color_0,
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.90,
        shadowRadius: 2.35,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: height * 0.01
    },
    activeAddressContainer: {
        width: width * 0.8,
        backgroundColor: gStyles.color_2,
        paddingVertical: height * 0.03,
        shadowColor: gStyles.color_2,
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.90,
        shadowRadius: 2.35,
        elevation: 10,
        borderRadius: 10,
        marginBottom: height * 0.01,
        paddingHorizontal: width * 0.08
    },
    addressContainer: {
        width: width * 0.8,
        backgroundColor: gStyles.color_0,
        paddingVertical: height * 0.03,
        shadowColor: gStyles.color_0,
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.90,
        shadowRadius: 2.35,
        elevation: 10,
        borderRadius: 10,
        marginBottom: height * 0.01,
        paddingHorizontal: width * 0.08
    },
    cardText: {
        fontSize: RFPercentage(2),
        color: 'white',
        marginBottom: height * 0.005
    },
    activeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        padding: RFPercentage(1),
        marginRight: width * 0.03
    },
    activeText: {
        color: 'white',
        marginLeft: width * 0.03,
    }
});

const InputModal = ({modalVisible, setModalVisible, addresses, oldValues, edited, setEdited, en, text}) => {
    const [governate, setGovernate] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');
    const [apartment, setApartment] = useState('');
    const [extra, setExtra] = useState('');
    const token = useSelector(state => state.authReducer.token);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const close = () => {
        setGovernate('');
        setCity('');
        setBuilding('');
        setApartment('');
        setExtra('');
        setEdited(undefined);
        setModalVisible(false);
    }

    const addOrChangeAddress = () => {
        setLoading(true);
        let newAddresses;
        if(edited){
            newAddresses = addresses.map(address => {
                if(address._id === edited._id){
                    address.governate = governate;
                    address.city = city;
                    address.street = street;
                    address.building = building;
                    address.apartment = apartment;
                    address.extra = extra;
                }
                return address;
            });
        }
        else {
            newAddresses = addresses.concat({governate, city, street, building, apartment, extra, active: false})
        }
        fetch(`${Constants.manifest.extra.apiUrl}/client`, {
            method: 'put',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify({addresses: newAddresses})
        })
        .then(res => res.json())
        .then(res => {
            setLoading(false);
            setModalVisible(false);
            dispatch(updateAccount(res));
        })
    }

    useEffect(() => {
        if(edited){
            setGovernate(edited.governate);
            setCity(edited.city);
            setStreet(edited.street);
            setBuilding(edited.building);
            setApartment(edited.apartment);
            setExtra(edited.extra);
        } else {
            setGovernate('');
            setCity('');
            setStreet('');
            setBuilding('');
            setApartment('');
            setExtra('');
        }
    }, [edited])
    return (
        <CustomModal confirm={() => loading ? null : addOrChangeAddress()} modalVisible={modalVisible} setModalVisible={setModalVisible} close={close}>
            <View style={{width: width * 0.7}}>
                <TextLato bold style={modalStyles.modalText}>{text.enterAddress}</TextLato>
                <TextInput 
                    multiline 
                    value={governate}    
                    onChangeText={value => setGovernate(value)} 
                    style={{...modalStyles.input, textAlign: en ? 'left' : 'right', fontFamily: en ? 'Lato' : 'Cairo'}} 
                    placeholder={text.governate} />
                <TextInput 
                    multiline 
                    value={city}         
                    onChangeText={value => setCity(value)} 
                    style={{...modalStyles.input, textAlign: en ? 'left' : 'right', fontFamily: en ? 'Lato' : 'Cairo'}} 
                    placeholder={text.city} />
                <TextInput 
                    multiline 
                    value={street}       
                    onChangeText={value => setStreet(value)} 
                    style={{...modalStyles.input, textAlign: en ? 'left' : 'right', fontFamily: en ? 'Lato' : 'Cairo'}} 
                    placeholder={text.street} />
                <TextInput 
                    multiline 
                    value={building}     
                    onChangeText={value => setBuilding(value)} 
                    style={{...modalStyles.input, textAlign: en ? 'left' : 'right', fontFamily: en ? 'Lato' : 'Cairo'}} 
                    placeholder={text.building} />
                <TextInput 
                    multiline 
                    value={apartment}    
                    onChangeText={value => setApartment(value)} 
                    style={{...modalStyles.input, textAlign: en ? 'left' : 'right', fontFamily: en ? 'Lato' : 'Cairo'}} 
                    placeholder={text.apartment} />
                <TextInput 
                    multiline 
                    value={extra}        
                    onChangeText={value => setExtra(value)} 
                    style={{...modalStyles.input, textAlign: en ? 'left' : 'right', fontFamily: en ? 'Lato' : 'Cairo'}} 
                    placeholder={text.extra} />
            </View>
        </CustomModal>
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
      width: '100%',
      borderBottomWidth: 2,
      borderBottomColor: gStyles.color_1,
      marginBottom: height * 0.02,
      height: height * 0.05
  }
});

export default MyAddresses;