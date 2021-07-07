import React, { useState } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../../global.style';
import Constants from 'expo-constants';
import * as Facebook from 'expo-facebook';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Google from 'expo-google-app-auth';
import { useLanguage, useLanguageText } from '../../../hooks/language';

// Redux
import { connect, useSelector } from 'react-redux';
import { login } from '../../../src/actions/auth';
import { setCart } from '../../../src/actions/cart';
import { changeFirstTime } from '../../../src/actions/general';
import DisabledButton from '../DisabledButton';
import Icon from '../../../components/utils/Icon';
import { setWishlist } from '../../../src/actions/wishlist';
import TextLato from '../../../components/utils/TextLato';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingPage from '../../../components/utils/LoadingPage';
import HTTP from '../../../src/utils/axios';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
const ClientLogin = (props) => {
    const [phone, setPhone] = useState('01140008042');
    const [password, setPassword] = useState('Abcd1234');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const language = useLanguage();
    const firstTime = useSelector(state => state.generalReducer.firstTime);
    const en = language === 'en';
    const languageText = useLanguageText('clientAuth');
    
    const login = () => {
        setLoading(true);
        HTTP.post(`/client/login`, {phone, password})
        .then(data => {
            console.log('data', data)
            setLoading(false);
            setErrors([]);
            if(data.client.verified){
                props.setCart(data.client.cart);
                props.setWishlist(data.client.wishlist);
                props.changeFirstTime(true);
                props.login(data);
                }
                else props.navigation.replace('ClientLoginSuccess', {account: data.client})
        })
        .catch(err => {
            console.log(err.response.data);
            setErrors(err.response.data.errors)
            setLoading(false);
        })
    }

    const facebookLogin = async () => {
        setLoading(true);
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
                        props.login(res);
                        setLoading(false);
                    })
                })
                .catch(e => setLoading(false))
            }
        }
        catch ({ message }) {
            setLoading(false);
            alert(`Facebook login error: ${message}`)
        }
    }

    const GoogleLogin = async () => {
        setLoading(true);
        const config = {
            androidClientId: "202581872046-r45t047pgp795ur78o6tmeqvi9hn0dih.apps.googleusercontent.com",
            webClientId: '202581872046-b17q9altfm5bgi2kp2lp1011pm93bu2f.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        }
        const { type, accessToken, user } = await Google.logInAsync(config);

        if(type === 'success') {
            setLoading(false);
        };
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor={gStyles.background} barStyle={'dark-content'} />
            {firstTime && <View style={[styles.backContainer, {alignItems: en ? 'baseline' : 'flex-end'}]}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Icon type="FontAwesome5" name="bars" size={RFValue(25)} color={gStyles.secondary} />
                </TouchableOpacity>
            </View>}
            <Image style={styles.image} source={{uri: 'https://imgur.com/hLnp9Kc.png'}} />
            <View style={styles.headerContainer}>
                <TextLato bold style={{color: 'black', fontSize: RFPercentage(3), textAlign: 'center'}}>{languageText.welcome}</TextLato>
                <TextLato style={{color: gStyles.color_1, fontSize: RFPercentage(1.5), textAlign: 'center'}}>{languageText.pleaseLogin}</TextLato>
            </View>
            <View style={styles.errorContainer}>
                {errors.map(err => <TextLato style={{color: gStyles.color_0}} key={JSON.stringify(err)}>{err.msg ? err.msg[language] : err[language]}</TextLato>)}
            </View>
            <View style={styles.formContainer}>
                <TextInput 
                    value={phone}
                    textContentType={"telephoneNumber"}
                    autoCompleteType={"tel"}
                    keyboardType={'phone-pad'}
                    placeholder={en ? 'Phone' : 'رقم الهاتف'}
                    placeholderTextColor={"#ffc6c6"}
                    onChangeText={(val) => setPhone(val)}
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
            {/* Other Logins */}
            {/* <SafeAreaView style={styles.alternativeLogins}>
                <TouchableOpacity onPress={facebookLogin}>
                    <View style={{...styles.alternativeLoginButton, flexDirection: en ? 'row' : 'row-reverse'}}>
                        <Icon style={{width: '30%', alignItems: 'center'}} type={'FontAwesome'} name="facebook-f" size={RFValue(15)} color="white" />
                        <TextLato style={styles.loginButtonText}>{languageText.loginF}</TextLato>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{...styles.alternativeLoginButton, flexDirection: en ? 'row' : 'row-reverse', backgroundColor: '#EA4335'}}>
                        <Icon type={'AntDesign'} style={{width: '30%', alignItems: 'center'}} name="google" size={RFValue(15)} color="white" />
                        <TextLato style={styles.loginButtonText}>{languageText.loginG}</TextLato>
                    </View>
                </TouchableOpacity>
            </SafeAreaView> */}

            {/* Login Button */}
            <DisabledButton onPressIfActive={login} array={[phone, password]}>
                    <TextLato bold style={{color: 'white', fontSize: RFValue(12)}}>{languageText.login}</TextLato>
            </DisabledButton>

                <View style={styles.others}>
                    {/* Register Now */}
                    <View style={{flexDirection: en ? 'row' : 'row-reverse'}}>
                        <TextLato style={{color: gStyles.color_3, fontSize: RFValue(11)}}>{languageText.dontHaveAccount}</TextLato>
                        <TouchableOpacity onPress={() => props.navigation.push('ClientRegister')}>
                            <TextLato bold style={{marginHorizontal: 5, color: gStyles.color_2, fontSize: RFValue(11)}}>{languageText.signUp}</TextLato>
                        </TouchableOpacity>
                    </View>
                    {/* Seller Account */}
                    <View style={{flexDirection: en ? 'row' : 'row-reverse', marginTop: 5}}>
                        <TextLato style={{color: gStyles.color_3, fontSize: RFValue(11)}}>{languageText.areYouSeller}</TextLato>
                        <TouchableOpacity onPress={() => props.navigation.push('SellerLogin')}>
                            <TextLato bold style={{marginHorizontal: 5, color: gStyles.color_2, fontSize: RFValue(11)}}>{languageText.loginHere}</TextLato>
                        </TouchableOpacity>
                    </View>
                </View>
            {loading && <LoadingPage />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // height,
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'column',
        backgroundColor: gStyles.background,
        flex: 1
    },
    backContainer: {
        width,
        marginTop: height * 0.02,
        paddingHorizontal: width * 0.05,
    },
    image: {
        height: height * 0.2,
        aspectRatio: 820/433
    },
    headerContainer: {
        width: width * 0.9,
        paddingTop: height * 0.01,
        marginBottom: height * 0.01
    },
    errorContainer: {
        width: width * 0.9,
        height: height * 0.06,
        justifyContent: 'center',
        textAlign: 'left'
    },
    formContainer: {
        width: width * 0.9
    },
    input: {
        fontSize: RFValue(10),
        marginVertical: 10,
        borderRadius: 100,
        backgroundColor: 'white',
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.01,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation: 4,
        
        fontFamily: 'Cairo',
        color: 'black'
    },
    submitButton: {
        backgroundColor: gStyles.color_1,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.3,
        height: height * 0.04,
        borderRadius: 2
    },
    bottomContainer: {
    },
    others: {
        paddingHorizontal: height * 0.025,
        marginTop: height * 0.02,
        width,
        alignItems: 'center'
    },
    alternativeLogins: {
        width,
        marginTop: height * 0.04,
        marginBottom: height * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    alternativeLoginButton: {
        width: width * 0.43,
        // aspectRatio: 1,
        // paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
        backgroundColor: '#3b5998',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: width * 0.03,
        borderRadius: 100
    },
    loginButtonText: {
        color: 'white',
        width: '70%',
        fontSize: RFPercentage(1.3)}
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
        setWishlist: (wishlist) => dispatch(setWishlist(wishlist)),
        changeFirstTime: (firstTime) => dispatch(changeFirstTime(firstTime))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientLogin);