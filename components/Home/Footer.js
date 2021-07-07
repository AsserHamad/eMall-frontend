import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { gStyles } from '../../global.style';
import TextLato from '../utils/TextLato';
import { useNavigation } from '@react-navigation/native';
import { useLanguage, useLanguageText } from '../../hooks/language';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const Footer = () => {
    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('footer');
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <Image source={require('../../assets/logoM.png')} style={styles.logo} />
            <View style={{...styles.secondaryContainer, flexDirection: en ? 'row' : 'row-reverse'}}>
                <TouchableNativeFeedback onPress={() => navigation.push('ContactUs')} style={{width: width * 0.45}}>
                    <TextLato style={styles.footerText}>{text.contactUs}</TextLato>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => navigation.push('Terms')} style={{width: width * 0.45}}>
                    <TextLato style={styles.footerText}>{text.terms}</TextLato>
                </TouchableNativeFeedback>
            </View>
            <View style={{...styles.secondaryContainer, flexDirection: en ? 'row' : 'row-reverse'}}>
                {/* <TouchableNativeFeedback onPress={() => {navigation.navigate('Register/Login', {screen: 'SellerRegister'})}} style={{width: width * 0.45}}>
                    <TextLato style={styles.footerText}>{text.openStore}</TextLato>
                </TouchableNativeFeedback> */}
                
                <TouchableNativeFeedback onPress={() => navigation.push('FAQs')} style={{width: width * 0.45}}>
                    <TextLato style={styles.footerText}>{text.faq}</TextLato>
                </TouchableNativeFeedback>
            </View>
            <TextLato style={styles.bottomText}>{text.rights}</TextLato>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: width * 0.1,
        height: (width * 0.2) * (width/height),
        marginBottom: 20,
        marginTop: height * 0.02
    },
    footerText: {
        fontSize: RFPercentage(1.7),
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