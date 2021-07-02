import React, { useState} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../../global.style';
import Constants from 'expo-constants';
import * as Facebook from 'expo-facebook';
import { RFValue } from "react-native-responsive-fontsize";
import TextLato from '../../../components/utils/TextLato';
import { useLanguageText } from '../../../hooks/language';

// Redux
import { connect } from 'react-redux';
import { login } from '../../../src/actions/auth';
import RegisterInputAndError from '../RegisterInputAndError';
import Header from '../../../components/Header';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const ClientRegister = (props) => {
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('+20');
    const languageText = useLanguageText('clientAuth');
    
    const register = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/client/register`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({phone, password, firstName, lastName})
        })
        .then(res => res.json())
        .then(res => {
            console.log('register shiet', res)
            if(!res.status){
                setErrors([]);
                props.navigation.replace('ClientLoginSuccess', {account: res})
            }
            else {
                setErrors(res.message ? [res.message] : res.errors)
            }
        });
    }

    const facebookRegister = async () => {
        await Facebook.initializeAsync(
            {
              autoLogAppEvents: true,
              appId: '322777442117432',
            }
          );
        try {
            const { 
                type, 
                token, 
                expires, 
                permissions, 
                declinedPermissions 
            } = await Facebook.logInWithReadPermissionsAsync({appId: '322777442117432', permissions: ['public_profile', 'email']});
            if(type === 'success') {
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
                .then(res => res.json())
                .then(data => {
                    fetch(`${Constants.manifest.extra.apiUrl}/client/login/facebook`, {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .then(res => props.login(res))
                })
                .catch(e => console.log(e))
            }
        }
        catch ({ message }) {
            alert(`facebook login error: ${message}`)
        }
    }

    return (
        <View style={styles.container}>
            <Header details={{title: ''}} />
            <View style={styles.headerContainer}>
                <TextLato bold style={{color: 'black', fontSize: RFValue(20)}}>{languageText.register}</TextLato>
                <TextLato italic style={{color: 'black', fontSize: RFValue(12), marginTop: height * 0.01}}>{languageText.registerDescription}</TextLato>
            </View>
            <View style={styles.formContainer}>
                <View style={{flexDirection: 'row', width}}>
                    <RegisterInputAndError errors={errors} value={firstName} type={'firstName'} set={setFirstName} inputStyle={{width: width * 0.42, marginRight: width * 0.06}} />
                    <RegisterInputAndError errors={errors} value={lastName} type={'lastName'} set={setLastName} inputStyle={{width: width * 0.42}} />
                </View>
                <RegisterInputAndError errors={errors} value={phone} type={'phone'} set={setPhone} numeric keyboardType={'numeric'} />
                {/* <RegisterInputAndError errors={errors} value={email} type={'email'} set={setEmail} keyboardType={'email-address'} /> */}
                <RegisterInputAndError errors={errors} value={password} type={'password'} set={setPassword} secureTextEntry />
            </View>
            {/* Other Logins */}
            {/* <SafeAreaView style={styles.alternativeLogins}>
                <TouchableOpacity onPress={facebookRegister}>
                    <View style={styles.alternativeLoginButton}>
                        <Icon type={'FontAwesome'} name="facebook" size={RFValue(17)} color="white" style={{width: '30%', alignItems: 'center'}} />
                        <TextLato style={{color: 'white', width: '70%'}}>Register with Facebook</TextLato>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.alternativeLoginButton, {backgroundColor: '#EA4335'}]}>
                        <Icon type={'AntDesign'} name="google" size={RFValue(17)} color="white" style={{width: '30%', alignItems: 'center'}} />
                        <TextLato style={{color: 'white', textAlign: 'left', width: '70%'}}>Register with Google</TextLato>
                    </View>
                </TouchableOpacity>
            </SafeAreaView> */}
            <TouchableOpacity onPress={() => register()}>
                <View style={styles.submitButton}>
                    <TextLato style={{color: 'white', fontSize: RFValue(12)}}>{languageText.register}</TextLato>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.background,
        height: height + Constants.statusBarHeight,
        alignItems: 'center',
        flex: 1
    },
    headerContainer: {
        width: width * 0.9,
        paddingTop: height * 0.01,
        marginBottom: height * 0.02
    },
    errorContainer: {
        width: width * 0.9,
        height: height * 0.04,
        textAlign: 'left'
    },
    formContainer: {
        width: width * 0.9
    },
    profilePictureContainer: { 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: height * 0.02
    },
    submitButton: {
        backgroundColor: gStyles.color_0,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        paddingVertical: height * 0.02,
        // height: height * 0.05,
        borderRadius: 100,
        marginTop: height * 0.03
    },
    others: {
        paddingHorizontal: height * 0.025,
    },
    alternativeLogins: {
        width,
        marginTop: height * 0.03,
        marginBottom: height * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
    },
    alternativeLoginButton: {
        width: width * 0.6,
        // aspectRatio: 1,
        // paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
        backgroundColor: '#3b5998',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: height * 0.02,
        borderRadius: 100
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientRegister);