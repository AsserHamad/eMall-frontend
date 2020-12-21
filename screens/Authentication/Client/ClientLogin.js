import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../../global.style';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import { RFValue } from "react-native-responsive-fontsize";
import { useFonts } from 'expo-font';

// Redux
import { connect } from 'react-redux';
import { login } from '../../../src/actions/auth';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
const ClientLogin = (props) => {
    const [email, setEmail] = useState('malza.is.best.lol@gmail.com');
    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState('Pupper1996');
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
                res.client.verified? props.login(res) : props.navigation.replace('ClientLoginSuccess', {account: res.client})
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
        <View>
        {fontsLoaded ? 
        <View style={styles.container}>
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                    <AntDesign name="home" size={RFValue(25)} color={gStyles.secondary} />
                </TouchableOpacity>
            </View>
            <Image style={styles.image} source={require('../../../assets/logo.png')} />
            <View style={styles.headerContainer}>
                <Text style={{color: gStyles.secondary, fontSize: RFValue(20), fontFamily: gStyles.fontFamily}}>Welcome Back!</Text>
                <Text style={{color: gStyles.secondary, fontSize: RFValue(11), fontFamily: gStyles.fontFamily}}>Please login to continue shopping</Text>
            </View>
            <View style={styles.errorContainer}>
                {errors.map(err => <Text style={{color: gStyles.primary, fontFamily: gStyles.fontFamily}} key={Math.random()}>{err.msg ? err.msg : err}</Text>)}
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
                    <Text style={{color: gStyles.primary, fontFamily: gStyles.fontFamily, fontSize: RFValue(10)}}>Forgot Password</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => login()}>
                <View style={styles.submitButton}>
                    <Text style={{color: 'white', fontFamily: gStyles.fontFamily, fontSize: RFValue(12)}}>SUBMIT</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.bottomContainer}>

            <View style={styles.others}>
                {/* Register Now */}
                <View style={{display:'flex', flexDirection: 'row'}}>
                    <Text style={{color: gStyles.secondary, fontFamily: gStyles.fontFamily, fontSize: RFValue(11)}}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => props.navigation.push('ClientRegister')}>
                        <Text style={{marginLeft: 5, color: gStyles.primary, fontFamily: gStyles.fontFamily, fontSize: RFValue(11)}}>Sign Up Now</Text>
                    </TouchableOpacity>
                </View>
                {/* Seller Account */}
                <View style={{display:'flex', flexDirection: 'row', marginTop: 5}}>
                    <Text style={{color: gStyles.secondary, fontFamily: gStyles.fontFamily, fontSize: RFValue(11)}}>Are you a seller?</Text>
                    <TouchableOpacity>
                        <Text style={{marginLeft: 5, color: gStyles.primary, fontFamily: gStyles.fontFamily, fontSize: RFValue(11)}}>Login Here</Text>
                    </TouchableOpacity>
                </View>
                </View>
                {/* Other Logins */}
                <SafeAreaView style={styles.alternativeLogins}>
                    <TouchableOpacity onPress={facebookLogin}>
                        <View style={styles.alternativeLoginButtonF}>
                            <AntDesign style={{marginRight: width * 0.2}} name="facebook-square" size={RFValue(25)} color="white" />
                            <Text style={{color: 'white', fontSize: RFValue(12), width: width * 0.4, fontFamily: gStyles.fontFamily}}>Sign in with Facebook</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.alternativeLoginButtonG}>
                            <AntDesign style={{marginRight: width * 0.2}} name="google" size={RFValue(25)} color="white" />
                            <Text style={{color: 'white', fontSize: RFValue(12), width: width * 0.4, fontFamily: gStyles.fontFamily}}>Sign in with Google</Text>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </View>
        : <Text>Loading</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.background,
        height: height + Constants.statusBarHeight,
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        display: 'flex',
        flexDirection: 'column',
    },
    backContainer: {
        width,
        marginTop: height * 0.02,
        paddingHorizontal: width * 0.05,
    },
    image: {
        height: height * 0.1,
        aspectRatio: gStyles.logoAspectRatio
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
        fontSize: RFValue(15),
        marginVertical: 10,
        height: height * 0.04,
        borderBottomWidth: 2,
        borderColor: '#707070',
        fontFamily: gStyles.fontFamily
    },
    submitButton: {
        backgroundColor: gStyles.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        height: height * 0.05,
        borderRadius: 2,
        marginTop: height * 0.03
    },
    bottomContainer: {
        position: 'absolute',
        bottom: -5
    },
    others: {
        paddingHorizontal: height * 0.025,
    },
    alternativeLogins: {
        backgroundColor: gStyles.secondary,
        width,
        height: height * 0.2,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    alternativeLoginButtonF: {
        // marginTop: height * 0.05,
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
        marginTop: height * 0.03,
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
        login: (account) => dispatch(login(account))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientLogin);