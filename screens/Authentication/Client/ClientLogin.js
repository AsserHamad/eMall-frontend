import React, { useState, useEffect } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
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

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
const ClientLogin = (props) => {
    const [email, setEmail] = useState('asserhamad96@gmail.com');
    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState('Abcd1234');
    const language = useLanguage();
    const en = language === 'en';
    const languageText = useLanguageText('clientAuth');
    
    const login = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/client/login`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        .then(res => res.json())
        .then(res => {
            if(!res.status){
                setErrors([]);
                if(res.client.verified){
                    AsyncStorage.setItem('@token', res.token);
                    props.setCart(res.client.cart);
                    props.setWishlist(res.client.wishlist);
                    props.login(res);
                 }
                 else props.navigation.replace('ClientLoginSuccess', {account: res.client})
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
                    fetch(`${Constants.manifest.extra.apiUrl}/client/login/facebook`, {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .then(res => {
                        setCart(res.client.cart);
                        props.login(res)
                    })
                })
                .catch(e => console.log(e))
            }
        }
        catch ({ message }) {
            alert(`Facebook login error: ${message}`)
        }
    }

    const GoogleLogin = async () => {
        const config = {
            androidClientId: "202581872046-r45t047pgp795ur78o6tmeqvi9hn0dih.apps.googleusercontent.com",
            webClientId: '202581872046-b17q9altfm5bgi2kp2lp1011pm93bu2f.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        }
        const { type, accessToken, user } = await Google.logInAsync(config);

        if(type === 'success') {
            console.log(accessToken, user)
        }
    }

    useEffect(() => {
        if(props.route.params && props.route.params.store)
            props.navigation.push('SellerLogin')
    }, []);

    return (
        <View style={styles.container}>
            <View style={[styles.backContainer, {alignItems: en ? 'baseline' : 'flex-end'}]}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Icon type="FontAwesome5" name="bars" size={RFValue(25)} color={gStyles.secondary} />
                </TouchableOpacity>
            </View>
            <Image style={styles.image} source={{uri: 'https://i.imgur.com/iXv3XUH.png'}} />
            <View style={styles.headerContainer}>
                <TextLato bold style={{color: 'black', fontSize: RFPercentage(3.5), textAlign: 'center'}}>{languageText.welcome}</TextLato>
                <TextLato style={{color: gStyles.color_1, fontSize: RFValue(11), textAlign: 'center'}}>{languageText.pleaseLogin}</TextLato>
            </View>
            <View style={styles.errorContainer}>
                {errors.map(err => <TextLato style={{color: gStyles.color_0}} key={Math.random()}>{err.msg ? err.msg[language] : err[language]}</TextLato>)}
            </View>
            <View style={styles.formContainer}>
                <TextInput 
                    value={email}
                    textContentType={"emailAddress"}
                    autoCompleteType={"email"}
                    placeholder={en ? 'Email' : 'بريد الالكتروني'}
                    placeholderTextColor={"#ffc6c6"}
                    onChangeText={(val) => setEmail(val)}
                    style={{...styles.input, textAlign: en ? 'left' : 'right'}} />
                <TextInput 
                    value={password}
                    textContentType={"password"}
                    autoCompleteType={"password"}
                    placeholder={en ? 'Password' : 'كلمة المرور'}
                    placeholderTextColor={"#ffc6c6"}
                    secureTextEntry={true}
                    onChangeText={(val) => setPassword(val)}
                    style={{...styles.input, textAlign: en ? 'left' : 'right'}} />
                <TouchableOpacity onPress={() => props.navigation.push('ForgotPassword', {route: 'client'})}>
                    <TextLato bold style={{color: 'black', fontSize: RFValue(12), marginHorizontal: width * 0.02}}>{languageText.forgotPassword}</TextLato>
                </TouchableOpacity>
            </View>
            <DisabledButton onPressIfActive={login} array={[email, password]}>
                    <TextLato bold style={{color: 'white', fontSize: RFValue(12)}}>{languageText.login}</TextLato>
            </DisabledButton>
            <View style={styles.bottomContainer}>

                <View style={styles.others}>
                    {/* Register Now */}
                    <View style={{flexDirection: en ? 'row' : 'row-reverse'}}>
                        <TextLato style={{color: gStyles.color_1, fontSize: RFValue(11)}}>{languageText.dontHaveAccount}</TextLato>
                        <TouchableOpacity onPress={() => props.navigation.push('ClientRegister')}>
                            <TextLato style={{marginHorizontal: 5, color: gStyles.color_0, fontSize: RFValue(11)}}>{languageText.signUp}</TextLato>
                        </TouchableOpacity>
                    </View>
                    {/* Seller Account */}
                    <View style={{flexDirection: en ? 'row' : 'row-reverse', marginTop: 5}}>
                        <TextLato style={{color: gStyles.color_1, fontSize: RFValue(11)}}>{languageText.areYouSeller}</TextLato>
                        <TouchableOpacity onPress={() => props.navigation.push('SellerLogin')}>
                            <TextLato style={{marginHorizontal: 5, color: gStyles.color_0, fontSize: RFValue(11)}}>{languageText.loginHere}</TextLato>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Other Logins */}
                <SafeAreaView style={styles.alternativeLogins}>
                    <TouchableOpacity onPress={facebookLogin}>
                        <View style={styles.alternativeLoginButton}>
                            <Icon type={'FontAwesome'} name="facebook" size={RFValue(25)} color="white" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={GoogleLogin}>
                        <View style={[styles.alternativeLoginButton, {backgroundColor: '#EA4335'}]}>
                            <AntDesign name="google" size={RFValue(25)} color="white" />
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height,
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'column',
        // flex: 1
    },
    backContainer: {
        width,
        marginTop: height * 0.02,
        paddingHorizontal: width * 0.05,
    },
    image: {
        height: height * 0.2,
        aspectRatio: 1177/867
    },
    headerContainer: {
        width: width * 0.9,
        paddingTop: height * 0.02,
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
        backgroundColor: gStyles.color_1,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.3,
        height: height * 0.05,
        borderRadius: 2,
        marginTop: height * 0.03
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0
    },
    others: {
        paddingHorizontal: height * 0.025,
    },
    alternativeLogins: {
        width,
        marginVertical: height * 0.03,
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
        login: (account) => dispatch(login(account)),
        setCart: (cart) => dispatch(setCart(cart)),
        setWishlist: (wishlist) => dispatch(setWishlist(wishlist))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientLogin);