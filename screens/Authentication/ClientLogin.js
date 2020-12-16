import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { gStyles } from '../../global.style';
import Constants from 'expo-constants';

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
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/logoM.png')} />
            <View style={styles.headerContainer}>
                <Text style={{color: 'white', fontSize: 23}}>Welcome Back!</Text>
                <Text style={{color: 'white', fontSize: 13, fontWeight: 'light'}}>Please login to continue shopping</Text>
            </View>
            <View>
                <TextInput value={email} placeholder={'Email'} onChangeText={(val) => setEmail(val)} style={styles.input} />
                <TextInput value={password} placeholder={'Password'} onChangeText={(val) => setPassword(val)} style={styles.input} />
            </View>
            <Button onPress={() => login()} title={'Submit'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.primary,
        height: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
        display: 'flex',
        flexDirection: 'column'
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderColor: gStyles.secondary,
        borderWidth: 4,
        backgroundColor: gStyles.background,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 100,
        width: 100
    },
    headerContainer: {
        width: '100%',
        paddingTop: 30,
        paddingHorizontal: 20
    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 2
    }
})

export default ClientLogin;