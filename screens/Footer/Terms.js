import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../../components/Header';
import Icon from '../../components/utils/Icon';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import { useLanguage, useLanguageText } from '../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const Terms = (props) => {

    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('terms');

    return (
        <View style={styles.container}>
            <Header details={{details: 'Contact Us'}} />
            <TextLato bold style={styles.title}>{text.terms}</TextLato>
            <ScrollView>

            </ScrollView>

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

export default Terms;