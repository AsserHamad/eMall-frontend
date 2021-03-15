import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../../components/Header';
import Icon from '../../components/utils/Icon';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import { useLanguage, useLanguageText } from '../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const ContactUs = (props) => {

    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('contactUs');

    return (
        <View style={styles.container}>
            <Header details={{details: 'Contact Us'}} />
            <TextLato bold style={styles.title}>{text.contactUs}</TextLato>
            <View style={{flexDirection: en ? 'row' : 'row-reverse', marginTop: height * 0.05}}>
                <View style={styles.pinContainer}>
                    <Icon type={'Feather'} name={'map-pin'} color={gStyles.color_2} size={RFPercentage(4)} />
                </View>
                <View>
                    <TextLato italic style={{fontSize: RFPercentage(2), width: width * 0.7, marginBottom: height * 0.02}}>{text.city}</TextLato>
                    <TextLato italic style={{fontSize: RFPercentage(2), width: width * 0.7, marginBottom: height * 0.02}}>{text.street}</TextLato>
                    <TextLato italic style={{fontSize: RFPercentage(2), width: width * 0.7, marginBottom: height * 0.02}}>{text.building}</TextLato>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pinContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.1,
    },
    title: {
        fontSize: RFPercentage(3.5),
        marginHorizontal: width * 0.05
    }
})

export default ContactUs;