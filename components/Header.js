import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../global.style';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

export default ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <Text style={{color: 'black', fontSize: 15}}>Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        width,
        backgroundColor: gStyles.background,
        height: height * 0.1
    }
})