import React, { useState } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../../global.style';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useFonts } from 'expo-font';
import * as Google from 'expo-google-app-auth';

// Redux
import { connect } from 'react-redux';
import { login } from '../../../src/actions/auth';
import { setCart } from '../../../src/actions/cart';
import DisabledButton from '../DisabledButton';
import Icon from '../../../components/utils/Icon';
import { setWishlist } from '../../../src/actions/wishlist';
import TextLato from '../../../components/utils/TextLato';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
const ClientLogin = (props) => {
    const [email, setEmail] = useState('asserhamad96@gmail.com');
    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState('Abcd1234');
    const [fontsLoaded] = useFonts({
      'Lato': require('../../../assets/fonts/Lato-Regular.ttf')
    });
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
                    console.log(`CART: I have logged in, this is my cart`, res.client)
                    props.setCart(res.client.cart);
                    props.setWishlist(res.client.wishlist)
                    props.login(res)
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
            alert(`facebook login error: ${message}`)
        }
    }

    const GoogleLogin = async () => {
        const config = {
            androidClientId: "202581872046-r45t047pgp795ur78o6tmeqvi9hn0dih.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
        }
        const { type, accessToken, user } = await Google.logInAsync(config);

        if(type === 'success') {
            console.log(accessToken, user)
        }
    }
    if(!fontsLoaded)
        return <TextLato>Loading</TextLato>
    return (
        <View style={styles.container}>
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Icon type="FontAwesome5" name="bars" size={RFValue(25)} color={gStyles.secondary} />
                </TouchableOpacity>
            </View>
            <Image style={styles.image} source={{uri: 'https://imgur.com/kc4Ry8f.png'}} />
            <View style={styles.headerContainer}>
                <TextLato bold style={{color: 'black', fontSize: RFPercentage(3.5), textAlign: 'center'}}>Welcome Back!</TextLato>
                <TextLato style={{color: gStyles.color_1, fontSize: RFValue(11), textAlign: 'center'}}>Please login to continue shopping</TextLato>
            </View>
            <View style={styles.errorContainer}>
                {errors.map(err => <TextLato style={{color: gStyles.color_0, fontFamily: gStyles.fontFamily}} key={Math.random()}>{err.msg ? err.msg : err}</TextLato>)}
            </View>
            <View style={styles.formContainer}>
                <TextInput 
                    value={email}
                    textContentType={"emailAddress"}
                    autoCompleteType={"email"}
                    placeholder={'Email'}
                    placeholderTextColor={"#ffc6c6"}
                    onChangeText={(val) => setEmail(val)}
                    style={styles.input} />
                <TextInput 
                    value={password}
                    textContentType={"password"}
                    autoCompleteType={"password"}
                    placeholder={'Password'}
                    placeholderTextColor={"#ffc6c6"}
                    secureTextEntry={true}
                    onChangeText={(val) => setPassword(val)}
                    style={styles.input} />
                <TouchableOpacity>
                    <TextLato bold style={{color: 'black', fontSize: RFValue(12), marginHorizontal: width * 0.02}}>Forgot Password?</TextLato>
                </TouchableOpacity>
            </View>
            <DisabledButton onPressIfActive={login} array={[email, password]}>
                    <TextLato bold style={{color: 'white', fontSize: RFValue(12)}}>LOGIN</TextLato>
            </DisabledButton>
            <View style={styles.bottomContainer}>

            <View style={styles.others}>
                {/* Register Now */}
                <View style={{display:'flex', flexDirection: 'row'}}>
                    <TextLato style={{color: gStyles.color_1, fontFamily: gStyles.fontFamily, fontSize: RFValue(11)}}>Don't have an account?</TextLato>
                    <TouchableOpacity onPress={() => props.navigation.push('ClientRegister')}>
                        <TextLato style={{marginLeft: 5, color: gStyles.color_0, fontFamily: gStyles.fontFamily, fontSize: RFValue(11)}}>Sign Up Now</TextLato>
                    </TouchableOpacity>
                </View>
                {/* Seller Account */}
                <View style={{display:'flex', flexDirection: 'row', marginTop: 5}}>
                    <TextLato style={{color: gStyles.color_1, fontFamily: gStyles.fontFamily, fontSize: RFValue(11)}}>Are you a seller?</TextLato>
                    <TouchableOpacity onPress={() => props.navigation.push('SellerLogin')}>
                        <TextLato style={{marginLeft: 5, color: gStyles.color_0, fontFamily: gStyles.fontFamily, fontSize: RFValue(11)}}>Login Here</TextLato>
                    </TouchableOpacity>
                </View>
                </View>
                {/* Other Logins */}
                <SafeAreaView style={styles.alternativeLogins}>
                    <TouchableOpacity onPress={facebookLogin}>
                        <View style={styles.alternativeLoginButtonF}>
                            <AntDesign style={{marginRight: width * 0.2}} name="facebook-square" size={RFValue(25)} color="white" />
                            <TextLato style={{color: 'white', fontSize: RFPercentage(1.2), width: width * 0.4, fontFamily: gStyles.fontFamily}}>Sign in with Facebook</TextLato>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={facebookLogin}>
                        <View style={styles.alternativeLoginButtonG}>
                            <AntDesign style={{marginRight: width * 0.2}} name="google" size={RFValue(25)} color="white" />
                            <TextLato style={{color: 'white', fontSize: RFPercentage(1.2), width: width * 0.4, fontFamily: gStyles.fontFamily}}>Sign in with Google</TextLato>
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
        display: 'flex',
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
        backgroundColor: gStyles.color_1,
        width,
        // height: height * 0.23,
        marginTop: height * 0.02,
        alignItems: 'center',
        justifyContent: 'center'
    },
    alternativeLoginButtonF: {
        marginTop: height * 0.02,
        width: width * 0.9,
        backgroundColor: '#3b5998',
        height: height * 0.06,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    alternativeLoginButtonG: {
        marginVertical: height * 0.02,
        width: width * 0.9,
        backgroundColor: '#EA4335',
        height: height * 0.06,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row'
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
        login: (account) => dispatch(login(account)),
        setCart: (cart) => dispatch(setCart(cart)),
        setWishlist: (wishlist) => dispatch(setWishlist(wishlist))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientLogin);