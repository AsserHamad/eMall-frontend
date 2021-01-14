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
import { login } from '../../../src/actions/auth';
import DisabledButton from '../DisabledButton';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
const SellerLogin = (props) => {
    const headerHeight = useHeaderHeight();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState('');
    const [fontsLoaded] = useFonts({
      'Lato': require('../../../assets/fonts/Lato-Regular.ttf')
    });
    const login = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/seller/login`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        .then(res => res.json())
        .then(res => {
            if(!res.status){
                setErrors([]);
                res.store.approved? console.log(res) : props.navigation.replace('SellerLoginSuccess', {store: res.store, seller: res.seller})
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
                            res.approved ? console.log(res) : props.navigation.replace('SellerLoginSuccess', {store: res.store, seller: res.seller})
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
        <View>
        {fontsLoaded ? 
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={{color: gStyles.secondary, fontSize: RFValue(20), fontFamily: gStyles.fontFamily}}>Seller Dashboard</Text>
                <Text style={{color: gStyles.secondary, fontSize: RFValue(11), fontFamily: gStyles.fontFamily}}>Please login to access your dashboard</Text>
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
            <DisabledButton onPressIfActive={login} array={[email, password]} errors={errors}>
                    <Text style={{color: 'white', fontFamily: gStyles.fontFamily, fontSize: RFValue(12)}}>SUBMIT</Text>
            </DisabledButton>
            <View style={{ position: 'absolute', bottom: headerHeight * 1 - 6}}>

            <View style={styles.others}>
                {/* Register Now */}
                <View style={{display:'flex', flexDirection: 'row'}}>
                    <Text style={{color: gStyles.secondary, fontFamily: gStyles.fontFamily, fontSize: RFValue(11)}}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => props.navigation.push('SellerRegister')}>
                        <Text style={{marginLeft: 5, color: gStyles.primary, fontFamily: gStyles.fontFamily, fontSize: RFValue(11)}}>Sign Up Now</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SellerLogin);