import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { gStyles } from '../../global.style';

const Loading = ({color = gStyles.color_2, size = RFPercentage(5)}) => {
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator color={color} size={size} />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Loading;