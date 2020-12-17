import React, { useState } from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../global.style';
import Constants from 'expo-constants';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
const ClientLogin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/client/login`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        .then(res => {
            if(res.ok) return res.json();
            else console.log(res.json());
        })
        .then(res => setEmail(res.token))
        .catch(err => console.log(err))
    }
    return (
        <View style={styles.container}>
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
            <Image style={styles.image} source={require('../../assets/logo.png')} />
            <View style={styles.headerContainer}>
                <Text style={{color: gStyles.secondary, fontSize: 23}}>Welcome Back!</Text>
                <Text style={{color: gStyles.secondary, fontSize: 13}}>Please login to continue shopping</Text>
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

                </View>
        </View>
    )
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
        marginTop: 20,
        paddingHorizontal: 20
    },
    imageContainer: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 90,
        aspectRatio: 1875/870
    },
    headerContainer: {
        width: width * 0.9,
        paddingTop: 30,
        // paddingHorizontal: 20,
        marginBottom: 30
    },
    formContainer: {
        width: width * 0.9
    },
    input: {
        // width: width * 0.85,
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
        height: 500,
        marginTop: 20
    }
})

export default ClientLogin;