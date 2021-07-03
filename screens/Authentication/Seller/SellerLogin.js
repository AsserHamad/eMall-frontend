import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../../global.style';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import { RFValue } from "react-native-responsive-fontsize";

// Redux
import { connect } from 'react-redux';
import { loginSeller } from '../../../src/actions/auth';
import DisabledButton from '../DisabledButton';
import TextLato from '../../../components/utils/TextLato';
import Icon from '../../../components/utils/Icon';
import { changeFirstTime } from '../../../src/actions/general';
import { useLanguage, useLanguageText } from '../../../hooks/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/Header';
import LoadingPage from '../../../components/utils/LoadingPage';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
const SellerLogin = (props) => {
    const [email, setEmail] = useState('inyourshoe@gmail.com');
    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState('emall.321!');
    const [loading, setLoading] = useState(false);
    const language = useLanguage();
    const text = useLanguageText('sellerLogin');
    const en = language === 'en';
    const login = () => {
        setLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/seller/login`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        .then(res => res.json())
        .then(res => {
            setLoading(false);
            if(res && !res.status){
                setErrors([]);
                if(res.store.approved){
                    console.log(res);
                    AsyncStorage.setItem('@accessToken', JSON.stringify({type: 'store', token: res.accessToken}));
                    AsyncStorage.setItem('@refreshToken', res.refreshToken);
                    AsyncStorage.setItem('@firstTime', 'true');
                    props.changeFirstTime(true);
                    props.loginSeller(res); 
                } else props.navigation.replace('SellerLoginSuccess', {store: res.store, seller: res.seller})
            }
            else {
                setErrors(res.message ? [res.message] : res.errors)
            }
        });
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
                setLoading(false);
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
        <ScrollView contentContainerStyle={styles.container}>
        {loading && <LoadingPage />}
        <Header details={{title: ''}} />
        <Image style={styles.image} source={{uri: 'https://imgur.com/CoPeD7N.png'}} />
            <View style={styles.headerContainer}>
                <TextLato bold style={{color: 'black', fontSize: RFValue(20)}}>{text.sellerDashboard}</TextLato>
                <TextLato italic style={{color: 'black', fontSize: RFValue(11)}}>{text.sellerSubtitle}</TextLato>
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
                    <TextLato style={{color: gStyles.color_0, fontSize: RFValue(10)}}>{text.forgotPassword}</TextLato>
                </TouchableOpacity>
            </View>
                {/* Other Logins */}
                {/* <SafeAreaView style={styles.alternativeLogins}>
                    <TouchableOpacity onPress={facebookLogin}>
                        <View style={styles.alternativeLoginButton}>
                            <Icon style={{width: '30%', alignItems: 'center'}} type={'FontAwesome'} name="facebook-f" size={RFValue(18)} color="white" />
                            <TextLato style={{color: 'white', textAlign: 'left', width: '70%'}}>{text.loginWithFacebook}</TextLato>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={[styles.alternativeLoginButton, {backgroundColor: '#EA4335'}]}>
                            <Icon type={'AntDesign'} style={{width: '30%', alignItems: 'center'}} name="google" size={RFValue(18)} color="white" />
                            <TextLato style={{color: 'white', textAlign: 'left', width: '70%'}}>{text.loginWithGoogle}</TextLato>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView> */}
            <DisabledButton onPressIfActive={login} array={[email, password]} errors={errors}>
                    <TextLato style={{color: 'white', fontSize: RFValue(12)}}>{text.login}</TextLato>
            </DisabledButton>
                {/* Register Now */}
                <View style={{flexDirection: 'row', marginTop: height * 0.02}}>
                    <TextLato style={{color: 'black', fontSize: RFValue(12)}}>{text.dontHaveAccount}</TextLato>
                    <TouchableOpacity onPress={() => props.navigation.push('SellerRegister')}>
                        <TextLato bold style={{marginLeft: 5, color: gStyles.color_2, fontSize: RFValue(11)}}>{text.signUp}</TextLato>
                    </TouchableOpacity>
                </View>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.background,
        alignItems: 'center',
        flex: 1
    },
    image: {
        height: height * 0.16,
        aspectRatio: 786/610
    },
    headerContainer: {
        width: width * 0.9,
        alignItems: 'center',
        // marginTop: height * 0.05,
        marginTop: height * 0.01
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
        marginTop: height * 0.03,
        // marginBottom: height * 0.05,
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
        loginSeller: (account) => dispatch(loginSeller(account)),
        changeFirstTime: (firstTime) => dispatch(changeFirstTime(firstTime))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerLogin);