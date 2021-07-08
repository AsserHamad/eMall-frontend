import React, { useEffect, useRef, useState } from 'react';
import { Button, Dimensions, Image, StyleSheet, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { gStyles } from '../../global.style';
import { RFPercentage } from "react-native-responsive-fontsize";
import { useLanguage, useLanguageText } from '../../hooks/language';
import HTTP from '../../src/utils/axios';
import Toast from 'react-native-easy-toast';

// Redux
import Icon from '../../components/utils/Icon';
import TextLato from '../../components/utils/TextLato';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
const ChangePassword = () => {
    const text = useLanguageText('changePassword');
    const [step, setStep] = useState(0);
    const toast = useRef();

    const showToast = message => {
        toast.current.show(message);
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
            <Header details={{title: text.title}} />
            <Toast ref={_toast => toast.current = _toast} />
            {step === 0 ? <EnterNewPassword showToast={showToast} text={text} setStep={setStep} /> : <ConfirmPasswordChange text={text} />}
        </ScrollView>
        )
}

const EnterNewPassword = ({setStep, text, showToast}) => {
    const [currPassword, setCurrPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [disabled, setDisabled] = useState(true);
    const language = useLanguage();

    useEffect(() => {
        const regexp = /^.{8,30}$/;
        setDisabled(
            password        === '' || !regexp.test(password)        ||
            currPassword    === '' || !regexp.test(currPassword)    ||
            confirm         === '' || !regexp.test(confirm)         ||
            password !== confirm
        );
    }, [currPassword, password, confirm]);
    const submit = () => {
        if(disabled) return;
        HTTP.post(`/client/change-password-direct`, {password: currPassword, newPassword: password})
        .then(() => {setStep(3)})
        .catch(err => {
            showToast(err.data.message[language])
        })
    }
    return (
        <>
            <Image source={{uri: 'https://imgur.com/YsLRCPW.png'}} style={styles.image} />
            <TextLato bold style={{marginTop: height * 0.04, marginBottom: height * 0.05, fontSize: RFPercentage(3)}}>{text.enterPassword}</TextLato>
            <TextInput
                placeholder={text.currentPlaceholder}
                style={[styles.input, {marginBottom: height * 0.02}]}
                value={currPassword}
                secureTextEntry={true}
                onChangeText={val => setCurrPassword(val)}
                />
            <TextInput
                placeholder={text.newPlaceholder}
                style={[styles.input, {marginBottom: height * 0.02}]}
                value={password}
                secureTextEntry={true}
                onChangeText={val => setPassword(val)}
                />
            <TextInput
                placeholder={text.confirmPlaceholder}
                style={styles.input}
                value={confirm}
                secureTextEntry={true}
                onChangeText={val => setConfirm(val)}
                />

            <TouchableOpacity style={{...styles.button, backgroundColor: disabled ? '#666' : gStyles.color_2}} onPress={submit}>
                <TextLato style={{marginHorizontal: width * 0.05, color: 'white'}}>SUBMIT</TextLato>
                <Icon type={'AntDesign'} name={'arrowright'} color={'white'} size={RFPercentage(2)} />
            </TouchableOpacity>
        </>
    )
}

const ConfirmPasswordChange = ({text}) => {
    const navigation = useNavigation();
    return (
        <>
            <Image source={{uri: 'https://imgur.com/OX5hd7G.png'}} style={styles.image} />
            <TextLato bold style={{marginTop: height * 0.1, marginBottom: height * 0.1, fontSize: RFPercentage(3)}}>{text.success}</TextLato>
            <Button color={gStyles.color_2} title={text.goBack} onPress={() => navigation.goBack()} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gStyles.background
    },
    image: {
        width: width,
        aspectRatio: 795/553
    },
    input: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.012,
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
        fontSize: RFPercentage(1.7),
        width: '80%'
    },
    button: {
        width: width * 0.8,
        justifyContent: 'center',
        marginTop: height * 0.05,
        backgroundColor: gStyles.color_2,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        borderRadius: 100,
        flexDirection: 'row'
    }
})

export default ChangePassword;