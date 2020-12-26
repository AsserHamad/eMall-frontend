import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const Ad = (props) => {
    const [image, useImage] = useState({
        aspectRatio: props.aspectRatio,
        uri: props.uri
    })
    return (
        <View style={styles.container}>
            <Image style={{width: width * 0.95, aspectRatio: image.aspectRatio, borderRadius: 10}} source={{uri: image.uri}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        marginVertical: height * 0.02,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Ad;