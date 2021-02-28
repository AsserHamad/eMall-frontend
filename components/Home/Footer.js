const react = require("react");

import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
import { gStyles } from '../../global.style';
import TextLato from '../utils/TextLato';

const Footer = () => {

    return(
        <View style={styles.container}>
            <Image source={require('../../assets/_logoM.png')} style={styles.logo} />
            <View style={styles.secondaryContainer}>
                <TextLato style={styles.footerText}>Contact Us</TextLato>
                <TextLato style={styles.footerText}>Terms and Conditions</TextLato>
            </View>
            <View style={styles.secondaryContainer}>
                <TextLato style={styles.footerText}>Open Your Store</TextLato>
                <TextLato style={styles.footerText}>FAQs</TextLato>
            </View>
            <TextLato style={styles.bottomText}>© eMall.com All Rights reserved</TextLato>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopColor: 'rgba(0,0,0,0.1)',
        borderTopWidth: 1,
        marginTop: height * 0.05,
        alignItems: 'center',
    },
    secondaryContainer: {
        width: width * 0.9,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: width * 0.2,
        height: (width * 0.3) * (width/height),
        marginBottom: 20
    },
    footerText: {
        fontSize: RFPercentage(1.7),
        width: '50%',
        textAlign: 'center',
        color: 'gray',
        marginVertical: height * 0.01,
    },
    bottomText: {
        color: gStyles.lightPrimary,
        marginBottom: height * 0.02,
        marginTop: height * 0.05
    }
})

export default Footer;