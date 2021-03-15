import React, { useState, useEffect } from 'react';
import { Button, Dimensions, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../../global.style';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useFonts } from 'expo-font';
import * as Google from 'expo-google-app-auth';
import { useLanguage, useLanguageText } from '../../../hooks/language';

// Redux
import { connect } from 'react-redux';
import { login } from '../../../src/actions/auth';
import { setCart } from '../../../src/actions/cart';
import DisabledButton from '../DisabledButton';
import Icon from '../../../components/utils/Icon';
import { setWishlist } from '../../../src/actions/wishlist';
import TextLato from '../../../components/utils/TextLato';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
const ForgotPassword = (props) => {
    const language = useLanguage();
    const route = props.route.params.route;
    const en = language === 'en';
    const [email, setEmail] = useState('asserhamad96@gmail.com');
    const [step, setStep] = useState(0);
    const [otp, setOtp] = useState('');
        
    switch(step) {
        case 0 : return <EnterEmail email={email} setEmail={setEmail} en={en} setStep={setStep} route={route} />;
        case 1 : return <EnterPassword email={email} en={en} otp={otp} setOtp={setOtp} setStep={setStep} route={route} />;
        case 2 : return <EnterNewPassword email={email} otp={otp} en={en} setStep={setStep} route={route} />;
        case 3 : return <ConfirmPasswordChange en={en} />
    }
}
    
const EnterEmail = ({email, setEmail, en, setStep, route}) => {
        const submit = () => {
            if(email === '') return;
            fetch(`${Constants.manifest.extra.apiUrl}/${route}/forgot-password`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email})
            })
            .then(res => res.json())
            .then(confirmed => {
                setStep(1);
            })
        }
        return (
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                <Header details={{title: en ? 'Forgot Password' : 'نسيت كلمة السر'}} />
                <Image source={{uri: 'https://i.imgur.com/2ZZJXSk.png'}} style={styles.image} />
                <TextLato bold style={{marginTop: height * 0.1,marginBottom: height * 0.03, fontSize: RFPercentage(3)}}>Forgot Your Password?</TextLato>
                <TextInput
                    placeholder={en ? 'Type Your Email' : 'اكتب بريدك الإلكتروني'}
                    style={styles.input}
                    value={email}
                    onChangeText={val => setEmail(val)}
                    />
    
                <TouchableOpacity style={styles.button} onPress={submit}>
                    <TextLato style={{marginHorizontal: width * 0.05, color: 'white'}}>NEXT</TextLato>
                    <Icon type={'AntDesign'} name={'arrowright'} color={'white'} size={RFPercentage(2)} />
                </TouchableOpacity>
            </ScrollView>
            )
}

const EnterPassword = ({email, en, setStep, otp, setOtp, route}) => {
    const submit = () => {
        if(otp === '') return;
        fetch(`${Constants.manifest.extra.apiUrl}/${route}/forgot-password/check-otp`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, otp})
            })
            .then(res => res.json())
            .then(res => {
                if(res.confirmed){
                    setStep(2);
                }
                })
            }
            return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
            <Header details={{title: en ? 'Enter OTP' : 'أدخل OTP'}} />
            <Image source={{uri: 'https://i.imgur.com/GnDpI1L.png'}} style={styles.image} />
            <TextLato bold style={{marginTop: height * 0.1, fontSize: RFPercentage(3)}}>An email has been sent!</TextLato>
            <TextLato style={{marginTop: height * 0.01, marginHorizontal: width * 0.1, textAlign: 'center', marginBottom: height * 0.03, fontSize: RFPercentage(1.7)}}>Please check your email and enter the password the has been sent to you</TextLato>
            <TextInput
                placeholder={en ? 'Enter PIN' : 'ادخل الكود'}
                style={styles.input}
                value={otp}
                onChangeText={val => setOtp(val.toUpperCase())}
                />

            <TouchableOpacity style={styles.button} onPress={submit}>
                <TextLato style={{marginHorizontal: width * 0.05, color: 'white'}}>NEXT</TextLato>
                <Icon type={'AntDesign'} name={'arrowright'} color={'white'} size={RFPercentage(2)} />
            </TouchableOpacity>
        </ScrollView>
    )
}

const EnterNewPassword = ({email, otp, en, setStep, route}) => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const disabled = password === '' || password !== confirm || !/^.{8,35}$/.test(password);
    const submit = () => {
        if(disabled) return;
        fetch(`${Constants.manifest.extra.apiUrl}/${route}/change-password`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, otp, password})
            })
            .then(res => res.json())
            .then(confirmed => {
                    setStep(3);
                })
    }
    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
            <Header details={{title: en ? 'Enter OTP' : 'أدخل OTP'}} />
            <Image source={{uri: 'https://i.imgur.com/0Nvrm82.png'}} style={styles.image} />
            <TextLato bold style={{marginTop: height * 0.1, marginBottom: height * 0.05, fontSize: RFPercentage(3)}}>Enter your new password</TextLato>
            <TextInput
                placeholder={en ? 'Enter New Password' : 'أدخل كلمة مرور جديدة'}
                style={[styles.input, {marginBottom: height * 0.02}]}
                value={password}
                secureTextEntry={true}
                onChangeText={val => setPassword(val)}
                />
            <TextInput
                placeholder={en ? 'Confirm New Password' : 'تأكيد كلمة المرور الجديدة'}
                style={styles.input}
                value={confirm}
                secureTextEntry={true}
                onChangeText={val => setConfirm(val)}
                />

            <TouchableOpacity style={{...styles.button, backgroundColor: disabled ? '#666' : gStyles.color_2}} onPress={submit}>
                <TextLato style={{marginHorizontal: width * 0.05, color: 'white'}}>NEXT</TextLato>
                <Icon type={'AntDesign'} name={'arrowright'} color={'white'} size={RFPercentage(2)} />
            </TouchableOpacity>
        </ScrollView>
    )
}

const ConfirmPasswordChange = ({en}) => {
    const navigation = useNavigation();
    return (
        <View style={{alignItems: 'center'}}>
            <Header details={{title: en ? 'Enter OTP' : 'أدخل OTP'}} />
            <Image source={{uri: 'https://i.imgur.com/OniWek9.png'}} style={styles.image} />
            <TextLato bold style={{marginTop: height * 0.1, marginBottom: height * 0.1, fontSize: RFPercentage(3)}}>Password Changed Successfully!</TextLato>
            <Button title={'Go Back Home'} onPress={() => navigation.goBack()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: width,
        aspectRatio: 795/553
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
        width: '80%'
    },
    button: {
        marginTop: height * 0.1,
        backgroundColor: gStyles.color_2,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        borderRadius: 100,
        flexDirection: 'row'
    }
})

export default ForgotPassword;