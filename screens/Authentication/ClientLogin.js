import React, { useState } from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../global.style';
import Constants from 'expo-constants';
import { Feather, AntDesign } from '@expo/vector-icons';

// Redux
import { connect } from 'react-redux';
import { login } from '../../src/actions/auth';
import ClientLoginSuccess from './ClientLoginSuccess';
import { useEffect } from 'react';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
const ClientLogin = (props) => {
    const [email, setEmail] = useState('asserhamad96@gmail.com');
    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState('Abcd1234');
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
                props.login(res);
            }
            else {
                setErrors(res.message ? [res.message] : res.errors)
            }
        });
    }
    return <View>
        <View style={styles.container}>
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                    <Feather name="arrow-left" size={30} color={gStyles.secondary} />
                </TouchableOpacity>
            </View>
            <Image style={styles.image} source={require('../../assets/logo.png')} />
            <View style={styles.headerContainer}>
                <Text style={{color: gStyles.secondary, fontSize: 23}}>Welcome Back!</Text>
                <Text style={{color: gStyles.secondary, fontSize: 13}}>Please login to continue shopping</Text>
            </View>
            <View style={styles.errorContainer}>
                {errors.map(err => <Text style={{color: gStyles.primary}} key={Math.random()}>{err.msg ? err.msg : err}</Text>)}
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
                    <Text style={{color: gStyles.primary}}>Forgot Password</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => login()}>
                <View style={styles.submitButton}>
                    <Text style={{color: 'white'}}>SUBMIT</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.others}>
                {/* Register Now */}
                <View style={{display:'flex', flexDirection: 'row'}}>
                    <Text style={{color: gStyles.secondary}}>Don't have an account?</Text>
                    <TouchableOpacity><Text style={{marginLeft: 5, color: gStyles.primary}}>Sign Up Now</Text></TouchableOpacity>
                </View>
                {/* Seller Account */}
                <View style={{display:'flex', flexDirection: 'row', marginTop: 5}}>
                    <Text style={{color: gStyles.secondary}}>Are you a seller?</Text>
                    <TouchableOpacity><Text style={{marginLeft: 5, color: gStyles.primary}}>Login Here</Text></TouchableOpacity>
                </View>
            </View>
                {/* Other Logins */}
                <View style={styles.alternativeLogins}>
                    <TouchableOpacity>
                        <View style={styles.alternativeLoginButtonF}>
                            <AntDesign style={{marginRight: width * 0.2}} name="facebook-square" size={30} color="white" />
                            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Sign in with Facebook</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.alternativeLoginButtonG}>
                            <AntDesign style={{marginRight: width * 0.2}} name="google" size={30} color="white" />
                            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Sign in with Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        </View>
        </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.background,
        height: '100%',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        display: 'flex',
        flexDirection: 'column'
    },
    backContainer: {
        width,
        marginTop: 10,
        paddingHorizontal: 13
    },
    imageContainer: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 90,
        aspectRatio: gStyles.logoAspectRatio
    },
    headerContainer: {
        width: width * 0.9,
        paddingTop: 30,
        marginBottom: 30
    },
    errorContainer: {
        width: width * 0.9,
        height: 50,
        textAlign: 'left'
    },
    formContainer: {
        width: width * 0.9
    },
    input: {
        fontSize: 18,
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 2,
        borderColor: '#707070',
    },
    submitButton: {
        backgroundColor: gStyles.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        height: 45,
        borderRadius: 2,
        marginTop: 40
    },
    others: {
        width: width * 0.9,
        marginTop: 150
    },
    alternativeLogins: {
        backgroundColor: gStyles.secondary,
        width,
        height: 300,
        marginTop: 20,
        alignItems: 'center'
    },
    alternativeLoginButtonF: {
        marginTop: 30,
        width: width * 0.9,
        backgroundColor: '#3b5998',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    alternativeLoginButtonG: {
        marginTop: 30,
        width: width * 0.9,
        backgroundColor: '#EA4335',
        height: 50,
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