import React, { useState } from 'react';
import { Alert, Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../../global.style';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import { RFValue } from "react-native-responsive-fontsize";
import { useFonts } from 'expo-font';
import { useHeaderHeight } from '@react-navigation/stack';

// Redux
import { connect } from 'react-redux';
import { loginSeller } from '../../../src/actions/auth';
import DisabledButton from '../DisabledButton';
import TextLato from '../../../components/utils/TextLato';
import Icon from '../../../components/utils/Icon';
import { useLanguage } from '../../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
const SellerLogin = (props) => {
    const headerHeight = useHeaderHeight();
    const [email, setEmail] = useState('asserhamad96@gmail.com');
    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState('Abcd1234');
    const language = useLanguage();
    const en = language === 'en';
    const login = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/seller/login`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        .then(res => res.json())
        .then(res => {
            if(res && !res.status){
                setErrors([]);
                res.store.approved? props.loginSeller(res) : props.navigation.replace('SellerLoginSuccess', {store: res.store, seller: res.seller})
            }
            else {
                setErrors(res.message ? [res.message] : res.errors)
            }
        });
    }

    const facebookLogin = async () => {
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
                    fetch(`${Constants.manifest.extra.apiUrl}/seller/login/facebook`, {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .then(res => {
                        if(!res.status){
                            setErrors([]);
                            res.store.approved ? props.login(res) : props.navigation.replace('SellerLoginSuccess', {store: res.store, seller: res.seller})
                        } else {
                            setErrors(res.message ? [res.message] : res.errors)
                        }
                    })
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
        <Image style={styles.image} source={{uri: 'https://imgur.com/eoMwgCe.png'}} />
            <View style={styles.headerContainer}>
                <TextLato style={{color: 'black', fontSize: RFValue(20), fontFamily: gStyles.fontFamily}}>Seller Dashboard</TextLato>
                <TextLato italic style={{color: 'black', fontSize: RFValue(11)}}>Please login to access your dashboard</TextLato>
            </View>
            <View style={styles.errorContainer}>
                {errors.map(err => <TextLato style={{color: gStyles.color_0}} key={Math.random()}>{err.msg ? err.msg : err}</TextLato>)}
            </View>
            <View style={styles.formContainer}>
                <TextInput 
                    value={email}
                    textContentType={"emailAddress"}
                    autoCompleteType={"email"}
                    placeholder={'Email'}
                    placeholderTextColor={"#ffc6c6"}
                    onChangeText={(val) => setEmail(val)}
                    style={{...styles.input, textAlign: en ? 'left' : 'right'}} />
                <TextInput 
                    value={password}
                    textContentType={"password"}
                    autoCompleteType={"password"}
                    placeholder={'Password'}
                    placeholderTextColor={"#ffc6c6"}
                    secureTextEntry={true}
                    onChangeText={(val) => setPassword(val)}
                    style={{...styles.input, textAlign: en ? 'left' : 'right'}} />
                <TouchableOpacity onPress={() => props.navigation.push('ForgotPassword', {route: 'seller'})}>
                    <TextLato style={{color: gStyles.color_0, fontFamily: gStyles.fontFamily, fontSize: RFValue(10)}}>Forgot Password</TextLato>
                </TouchableOpacity>
            </View>
            <DisabledButton onPressIfActive={login} array={[email, password]} errors={errors}>
                    <TextLato style={{color: 'white', fontFamily: gStyles.fontFamily, fontSize: RFValue(12)}}>SUBMIT</TextLato>
            </DisabledButton>
                {/* Register Now */}
                <View style={{flexDirection: 'row', marginTop: height * 0.02}}>
                    <TextLato style={{color: gStyles.color_1, fontFamily: gStyles.fontFamily, fontSize: RFValue(12)}}>Don't have an account?</TextLato>
                    <TouchableOpacity onPress={() => props.navigation.push('SellerRegister')}>
                        <TextLato style={{marginLeft: 5, color: gStyles.color_0, fontFamily: gStyles.fontFamily, fontSize: RFValue(11)}}>Sign Up Now</TextLato>
                    </TouchableOpacity>
                </View>
                {/* Other Logins */}
                <SafeAreaView style={styles.alternativeLogins}>
                    <TouchableOpacity onPress={facebookLogin}>
                        <View style={styles.alternativeLoginButton}>
                            <Icon type={'FontAwesome'} name="facebook-f" size={RFValue(25)} color="white" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={[styles.alternativeLoginButton, {backgroundColor: '#EA4335'}]}>
                            <AntDesign name="google" size={RFValue(25)} color="white" />
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.background,
        alignItems: 'center',
        flex: 1
    },
    backContainer: {
        width,
        marginTop: height * 0.02,
        paddingHorizontal: width * 0.05,
    },
    image: {
        height: height * 0.21,
        aspectRatio: 714/553
    },
    headerContainer: {
        width: width * 0.9,
        // marginTop: height * 0.05,
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
    input: {
        fontSize: RFValue(12),
        marginVertical: 10,
        borderRadius: 100,
        backgroundColor: 'white',
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.015,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        fontFamily: 'Cairo',
        elevation: 24,
        color: 'black'
    },
    submitButton: {
        backgroundColor: gStyles.color_0,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        height: height * 0.05,
        borderRadius: 2,
        marginTop: height * 0.03
    },
    others: {
        paddingHorizontal: height * 0.025,
    },
    alternativeLogins: {
        width,
        marginVertical: height * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    alternativeLoginButton: {
        width: width * 0.15,
        aspectRatio: 1,
        backgroundColor: '#3b5998',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: width * 0.05,
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
        loginSeller: (account) => dispatch(loginSeller(account))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerLogin);