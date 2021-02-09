import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { gStyles } from '../global.style';

function Loading(){

    return(
        <View style={styles.container}>
            <Image source={require('../assets/logoM.png')} style={styles.logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height + 40,
        width: Dimensions.get('window').width,
        backgroundColor: gStyles.color_0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 200
    }
})

export default Loading;