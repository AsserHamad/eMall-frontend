import React, { useState } from 'react';
import { Button, Dimensions, Image, StyleSheet, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { gStyles } from '../../../global.style';
import { RFPercentage } from "react-native-responsive-fontsize";
import { useLanguage } from '../../../hooks/language';
import HTTP from '../../../src/utils/axios';

// Redux
import Icon from '../../../components/utils/Icon';
import TextLato from '../../../components/utils/TextLato';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
const ForgotPassword = (props) => {
    const language = useLanguage();
    const route = props.route.params.route;
    const en = language === 'en';
    const [phone, setPhone] = useState('');
    const [step, setStep] = useState(0);
    const [otp, setOtp] = useState('');
        
    switch(step) {
        case 0 : return <EnterPhone phone={phone} setPhone={setPhone} en={en} setStep={setStep} route={route} />;
        case 1 : return <EnterPassword phone={phone} en={en} otp={otp} setOtp={setOtp} setStep={setStep} route={route} />;
        case 2 : return <EnterNewPassword phone={phone} otp={otp} en={en} setStep={setStep} route={route} />;
        case 3 : return <ConfirmPasswordChange en={en} />
    }
}
    
const EnterPhone = ({phone, setPhone, en, setStep, route}) => {
        const submit = () => {
            if(!(phone.match(/^\+20[0-9]{10}$/) || phone.match(/^0[0-9]{10}$/)))
                return '';
            HTTP.post(`/${route}/forgot-password`, {phone})
            .then(() => setStep(1));
        }
        return (
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                <Header details={{title: en ? 'Forgot Password' : 'نسيت كلمة السر'}} />
                <Image source={{uri: 'https://i.imgur.com/2ZZJXSk.png'}} style={styles.image} />
                <TextLato bold style={{marginTop: height * 0.1, marginBottom: height * 0.03, fontSize: RFPercentage(3)}}>Forgot Your Password?</TextLato>
                <TextInput
                    placeholder={en ? 'Type Your Phone' : 'اكتب رقم هاتفك'}
                    style={styles.input}
                    value={phone}
                    onChangeText={val => setPhone(val)}
                    />
    
                <TouchableOpacity style={styles.button} onPress={submit}>
                    <TextLato style={{marginHorizontal: width * 0.05, color: 'white'}}>NEXT</TextLato>
                    <Icon type={'AntDesign'} name={'arrowright'} color={'white'} size={RFPercentage(2)} />
                </TouchableOpacity>
            </ScrollView>
            )
}

const EnterPassword = ({phone, en, setStep, otp, setOtp, route}) => {
    const submit = () => {
        if(otp === '') return;
        HTTP.post(`/${route}/forgot-password/check-otp`, {phone, otp})
            .then(({data}) => {
                if(data.confirmed){
                    setStep(2);
                }
                })
            }
            return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
            <Header details={{title: en ? 'Enter OTP' : 'أدخل OTP'}} />
            <Image source={{uri: 'https://i.imgur.com/GnDpI1L.png'}} style={styles.image} />
            <TextLato bold style={{marginTop: height * 0.1, fontSize: RFPercentage(3)}}>An SMS has been sent!</TextLato>
            <TextLato style={{marginTop: height * 0.01, marginHorizontal: width * 0.1, textAlign: 'center', marginBottom: height * 0.03, fontSize: RFPercentage(1.7)}}>Please wait for the message to arrive</TextLato>
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

const EnterNewPassword = ({phone, otp, en, setStep, route}) => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const disabled = password === '' || password !== confirm || !/^.{8,35}$/.test(password);
    const submit = () => {
        if(disabled) return;
        HTTP.post(`/${route}/change-password`, {phone, otp, password})
            .then(() => {setStep(3);})
            .catch(err => console.log(err))
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