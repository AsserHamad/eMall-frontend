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
import HTTP from '../../src/utils/axios';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const MyProfile = ({navigation}) => {
    const text = useLanguageText('myProfile');
    const language = useLanguage();
    const en = language === 'en';
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const toast = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        HTTP('/client/profile')
        .then(res => {
            setFirstName(res.firstName);
            setLastName(res.lastName);
        })
        .catch(err => console.log(err));
    }, []);
    
    const showToast = message => {
        toast.current.show(message);
    }

    const updateProfile = () => {
        HTTP.put('/client/profile', {firstName, lastName})
        .then(res => {
            dispatch(updateAccount(res));
            showToast(en ? 'Successfully updated profile!' : 'تم تحديث الملف الشخصي بنجاح!');
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header details={{title: en ? 'My Profile' : 'ملفي'}} />
        <Toast ref={_toast => toast.current = _toast} />
        <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
            {/* <Input title={text.email} value={email} setValue={setEmail} /> */}
            <Input title={text.firstName} value={firstName} setValue={setFirstName} />
            <Input title={text.lastName} value={lastName} setValue={setLastName} />
            <View style={styles.buttonView}>
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={updateProfile}>
                    <TextLato bold style={{color: 'white'}}>{text.update}</TextLato>
                </TouchableOpacity>
            <View style={styles.separator} />
            </View>
            {/* <Input title={text.phone} value={lastName} setValue={setLastName} /> */}
            <View style={styles.buttonView}>
                <TouchableOpacity activeOpacity={0.8} style={styles.changeButton} onPress={() => navigation.push('ChangePhone')}>
                    <TextLato bold style={{color: 'white'}}>{text.changePhoneNumber}</TextLato>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity activeOpacity={0.8} style={styles.changeButton} onPress={() => navigation.push('ChangePassword')}>
                    <TextLato bold style={{color: 'white'}}>{text.changePassword}</TextLato>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const Input = ({title, value, setValue}) => {
    const language = useLanguage();
    const en = language === 'en';
    return (
        <View style={styles.inputContainer}>
            <TextLato style={{fontSize: RFPercentage(2.5), color: '#999'}}>{title}</TextLato>
            <TextInput
                style={[styles.input, {fontFamily: en ? 'Lato':'Cairo'}]}
                placeholder={title}
                value={value}
                onChangeText={text => setValue(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderBottomWidth: 2,
        borderColor: gStyles.color_2
    },
    inputContainer: {
        paddingHorizontal: width * 0.1,
        marginTop: height * 0.025
    },
    separator: {
        width: width * 0.92,
        height: height * 0.003,
        marginTop: height * 0.02,
        backgroundColor: gStyles.inactive
    },
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.03
    },
    button: {
        backgroundColor: gStyles.color_2,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.08,
        width: width * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    changeButton: {
        backgroundColor: gStyles.color_0,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.08,
        width: width * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
})


export default MyProfile;