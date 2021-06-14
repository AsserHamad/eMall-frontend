import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height ]

export default () => (
    <View style={{flex: 1, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.4)', width, height, zIndex: 999, justifyContent: 'center', elevation: 5}}>
        <ActivityIndicator size={RFPercentage(4)} color={'white'} />
    </View>
)