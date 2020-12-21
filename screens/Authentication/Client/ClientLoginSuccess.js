import React from 'react';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { gStyles } from '../../../global.style';
import { Feather } from '@expo/vector-icons';
import InputOneCharacter from '../InputOneCharacter';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../src/actions/auth';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

function ClientLoginSuccess(props) {
    const [input0, setInput0] = useState(''),
          [input1, setInput1] = useState(''),
          [input2, setInput2] = useState(''),
          [input3, setInput3] = useState(''),
          [input4, setInput4] = useState('');
    const account = props.route.params.account;
    const submitOtp = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/client/login/otp`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...props.route.params.account, otp: `${input0}${input1}${input2}${input3}${input4}`})
        })
        .then(res => {
            console.log(res);
            if(res.ok){
                props.login(res);
                props.navigation.navigate('Home');
            }
            else {
                Alert.alert(
                    "Problem with Verification",
                    "Incorrect PIN",
                    [{text: "OK"}]
                );
            }
        })
        .catch(err => Alert.alert(
            "Problem with Verification",
            err.message,
            [{
                text: "Cancel",
                style: "cancel"
            }, {
                text: "OK"
            }, {cancelable: false}]
        ));
    }
    return (
    <View style={styles.container}>
        <Feather name="check-circle" size={RFValue(130)} color={gStyles.primary} />
        <Text style={styles.welcomeText}>Greetings, {account.firstName}</Text>
        <View style={styles.subtitle}>
            <Text style={{fontSize: RFPercentage(1.6)}}>An email has been sent to your email account</Text>
            <Text  style={{fontSize: RFPercentage(1.6), fontWeight: 'bold', color: gStyles.primary}}>{account.email}</Text>
            <Text style={{fontSize: RFPercentage(1.6)}}>Please enter the code that was provided in the email</Text>
        </View>
        <InputOneCharacter
            input0={input0} setInput0={setInput0}
            input1={input1} setInput1={setInput1}
            input2={input2} setInput2={setInput2}
            input3={input3} setInput3={setInput3}
            input4={input4} setInput4={setInput4} />
        <TouchableOpacity activeOpacity={0.9} onPress={submitOtp}>
            <Text style={styles.backButton}>Submit</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height,
        backgroundColor: gStyles.background,
        paddingTop: Constants.statusBarHeight + height * 0.15,
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
        fontSize: RFValue(10),
        display: 'flex',
        flexDirection: 'column',
    },
    backButton: {
        paddingVertical: height * 0.015,
        width: width * 0.8,
        textAlign: 'center',
        color: 'white',
        fontSize: RFPercentage(2),
        backgroundColor: gStyles.primary,
        borderRadius: 4
    }
})

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authReducer.loggedIn,
        account: state.authReducer.account,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (account) => dispatch(login(account))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientLoginSuccess);