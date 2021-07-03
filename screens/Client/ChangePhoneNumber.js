import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { gStyles } from '../../global.style';
import { Feather } from '@expo/vector-icons';
import InputOneCharacter from '../Authentication/InputOneCharacter';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useState } from 'react';
import TextLato from '../../components/utils/TextLato';
import HTTP from '../../src/utils/axios';
import Header from '../../components/Header';
import { useLanguage, useLanguageText } from '../../hooks/language';
import Icon from '../../components/utils/Icon';
import Toast from 'react-native-easy-toast';
import { useNavigation } from '@react-navigation/core';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

function ChangePhoneNumber() {
    const [state, setState] = useState(0);
    const [phone, setPhone] = useState('+20');
    const toast = useRef();
    const text = useLanguageText('changePhone');

    const showToast = message => {
        toast.current.show(message);
    }
    return (
        <View style={styles.container}>
            <Header details={{title: text.title}} />
            <Toast ref={_toast => toast.current = _toast} />
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                {state === 0 ? 
                    <EnterPhoneView setState={setState} showToast={showToast} text={text} phone={phone} setPhone={setPhone} /> : 
                    <ConfirmPhoneView showToast={showToast} text={text} phone={phone} />}
            </ScrollView>
        </View>
    )
}

const EnterPhoneView = ({setState, showToast, text, account, phone, setPhone}) => {
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState([]);
    const language = useLanguage()
    useEffect(() => {
        setDisabled(!/^\+20[0-9]{10}$/.test(phone))
    }, [phone]);

    const submit = () => {
        if(disabled) showToast(text.toast);
        HTTP.post(`/client/check-new-phone`, {phone})
        .then(() => setState(1))
        .catch(err => setErrors(err.response.data.errors))
    }
    return (
        <View style={styles.phoneFormContainer}>
            <Image style={styles.headerImage} source={{uri: 'https://imgur.com/5s0dGlW.png'}} />
            <TextLato bold style={styles.headerTitle}>{text.enterNumber}</TextLato>
            {errors.map(err => <TextLato key={Math.random()} bold style={styles.errors}>{err.msg[language]}</TextLato>)}
            <TextInput
                placeholder={text.placeholder}
                style={styles.input}
                value={phone}
                onChangeText={val => setPhone(val)}
                />

                <TouchableOpacity activeOpacity={disabled ? 1 : 0.8} style={{...styles.button, backgroundColor: disabled ? gStyles.inactive : gStyles.color_2}} onPress={submit}>
                    <TextLato style={{marginHorizontal: width * 0.05, color: 'white'}}>{text.next}</TextLato>
                    <Icon type={'AntDesign'} name={'arrowright'} color={'white'} size={RFPercentage(2)} />
                </TouchableOpacity>
        </View>
        )
}

const ConfirmPhoneView = ({showToast, phone, text}) => {
    const [input0, setInput0] = useState(''),
    [input1, setInput1] = useState(''),
    [input2, setInput2] = useState(''),
    [input3, setInput3] = useState(''),
    [input4, setInput4] = useState(''),
    [disabled, setDisabled] = useState(true),
    navigation = useNavigation();
    useEffect(() => {
        setDisabled(
            (input0 === '' || isNaN(Number(input0))) ||
            (input1 === '' || isNaN(Number(input1))) ||
            (input2 === '' || isNaN(Number(input2))) ||
            (input3 === '' || isNaN(Number(input3))) ||
            (input4 === '' || isNaN(Number(input4)))
        );
    }, [input0, input1, input2, input3, input4]);

    const submit = () => {
        const otp = input0 + input1 + input2 + input3 + input4;
        HTTP.post(`/client/verify-new-phone`, {otp})
        .then(() => navigation.pop())
        .catch(() => showToast(text.otpError));
    }
    return (
        <View style={{alignItems: 'center'}}>
            <Feather name="check-circle" size={RFValue(130)} color={gStyles.color_2} />
            <View style={styles.subtitle}>
                <TextLato style={{fontSize: RFPercentage(1.8)}}>{text.smsSent}</TextLato>
                <TextLato bold style={{fontSize: RFPercentage(1.8), color: gStyles.color_0}}>{phone}</TextLato>
                <TextLato style={{fontSize: RFPercentage(1.8)}}>{text.enterCode}</TextLato>
            </View>
            <InputOneCharacter
                input0={input0} setInput0={setInput0}
                input1={input1} setInput1={setInput1}
                input2={input2} setInput2={setInput2}
                input3={input3} setInput3={setInput3}
                input4={input4} setInput4={setInput4} />

            <TouchableOpacity activeOpacity={disabled ? 1 : 0.8} style={{...styles.button, width: width * 0.8, backgroundColor: disabled ? gStyles.inactive : gStyles.color_2}} onPress={submit}>
                <TextLato style={{marginHorizontal: width * 0.05, color: 'white'}}>{text.submit}</TextLato>
                <Icon type={'AntDesign'} name={'arrowright'} color={'white'} size={RFPercentage(2)} />
            </TouchableOpacity>
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gStyles.background,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: RFPercentage(4),
        width: width * 0.8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: width * 0.8,
        fontSize: RFValue(12),
        marginTop: height * 0.05
    },
    backButton: {
        paddingVertical: height * 0.015,
        width: width * 0.8,
        textAlign: 'center',
        color: 'white',
        fontSize: RFPercentage(2),
        backgroundColor: gStyles.color_0,
        borderRadius: 4
    },
    headerImage: {
        width: width * 0.9,
        height: height * 0.35,
        resizeMode: 'contain'
    },
    headerTitle: {
        marginTop: height * 0.02,
        fontSize: RFPercentage(3)
    },
    phoneFormContainer: {
        width: width,
        alignItems: 'center',
        paddingVertical: height * 0.05,
        paddingHorizontal: width * 0.01
    },
    input: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 18,
        borderRadius: 100,
        fontFamily: 'Cairo',
        fontSize: RFPercentage(2),
        width: '80%',
        marginTop: height * 0.02
    },
    button: {
        marginTop: height * 0.1,
        backgroundColor: gStyles.color_2,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    errors: {
        color: gStyles.color_2,
        fontSize: RFPercentage(1.5),
        marginTop: height * 0.015
    }
});

export default ChangePhoneNumber;