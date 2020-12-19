import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { gStyles } from '../../global.style';
import { Feather } from '@expo/vector-icons';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

function ClientLoginSuccess(props) {
    console.log(props);
    return (
    <View style={styles.container}>
        <Feather name="check-circle" size={130} color={gStyles.primary} />
        <Text style={styles.welcomeText}>Welcome back, {props.account.firstName}</Text>
        <TouchableNativeFeedback onPress={() => props.navigation.navigate('Home')}>
            <Text style={styles.backButton}>Go Home</Text>
        </TouchableNativeFeedback>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height,
        backgroundColor: gStyles.background,
        paddingTop: Constants.statusBarHeight + height * 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: 40,
        width: 300,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 200,
    },
    backButton: {
        paddingVertical: 20,
        width: width * 0.8,
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        backgroundColor: gStyles.primary,
        borderRadius: 4
    }
})

export default ClientLoginSuccess;