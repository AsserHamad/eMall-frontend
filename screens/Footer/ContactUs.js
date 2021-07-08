import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../../components/Header';
import Icon from '../../components/utils/Icon';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import { useLanguage } from '../../hooks/language';
import HTTP from '../../src/utils/axios';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const ContactUs = (props) => {

    const language = useLanguage();
    const en = language === 'en';
    const [text, setText] = useState(null);

    useEffect(() => {
        HTTP('/general/contact')
        .then(res => setText(res));
    }, []);
    if(!text) return null;
    return (
        <View style={styles.container}>
            <Header details={{details: 'Contact Us'}} />
            <TextLato bold style={styles.title}>{text.contactUs}</TextLato>
            <View style={{flexDirection: en ? 'row' : 'row-reverse', marginTop: height * 0.05}}>
                <View style={styles.pinContainer}>
                    <Icon type={'Feather'} name={'map-pin'} color={gStyles.color_2} size={RFPercentage(4)} />
                </View>
                <View>
                    <TextLato italic style={{fontSize: RFPercentage(2), width: width * 0.7, marginBottom: height * 0.02}}>
                        {text.address.city[language]}
                    </TextLato>
                    <TextLato italic style={{fontSize: RFPercentage(2), width: width * 0.7, marginBottom: height * 0.02}}>
                        {text.address.street[language]}
                    </TextLato>
                    <TextLato italic style={{fontSize: RFPercentage(2), width: width * 0.7, marginBottom: height * 0.02}}>
                        {text.address.extra[language]}
                    </TextLato>
                    <TextLato bold style={{fontSize: RFPercentage(2), width: width * 0.7, marginBottom: height * 0.01, marginTop: height * 0.04}}>
                        {text.email}
                    </TextLato>
                    <TextLato bold style={{fontSize: RFPercentage(2), width: width * 0.7, marginBottom: height * 0.02}}>
                        {text.phone}
                    </TextLato>
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