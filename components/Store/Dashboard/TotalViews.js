import React, {useState, useEffect} from 'react';
import TextLato from '../../utils/TextLato';
import { Dimensions, StyleSheet, View } from 'react-native';
import { gStyles } from '../../../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from '../../utils/Icon';
import { LinearGradient } from 'expo-linear-gradient';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const TotalViews = (props) => {

    return (
        <LinearGradient colors={['#4D92FF', '#4FB8FB']} start={{ x: -1, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <View style={{width: width * 0.15, height: width * 0.15, borderRadius: 200, backgroundColor: '#3E79CB', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon color="white" size={RFPercentage(4.5)} type="Entypo" name="eye" />
                </View>
                <View style={{marginLeft: width * 0.43, alignItems: 'flex-end'}}>
                    <TextLato bold style={{color: 'white', fontSize: RFPercentage(3), letterSpacing: 2}}>3,200</TextLato>
                    <TextLato style={{color: 'white', fontSize: RFPercentage(1.8), textAlign: 'right', marginTop: 7}}>Unique Visitors</TextLato>
                </View>
            </View>
            <TextLato style={styles.text}>Total Views this Month</TextLato>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        marginTop: height * 0.02,
        borderRadius: 0,
        paddingVertical: height * 0.03,
        paddingLeft: width * 0.05,
        
    },
    text: {
        color: 'white',
        fontSize: RFPercentage(1.6),
        textTransform: 'uppercase',
        marginTop: height * 0.05
    }
})

export default TotalViews;