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

const FAQs = (props) => {

    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('faqs');

    return (
        <View style={styles.container}>
            <Header details={{details: 'FAQ'}} />
            <TextLato bold style={styles.title}>{text.faqs}</TextLato>
            <ScrollView>
                <View style={styles.question}>
                    <TextLato style={styles.questionQ} bold>Q: Is it possible to Lorem Ipsum?</TextLato>
                    <TextLato style={styles.questionA} italic>A: Yes, it is possible to lorem Ipsum?</TextLato>
                </View>
                <View style={styles.question}>
                    <TextLato style={styles.questionQ} bold>Q: Is it possible to Lorem Ipsum?</TextLato>
                    <TextLato style={styles.questionA} italic>A: Yes, it is possible to lorem Ipsum?</TextLato>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gStyles.background
    },
    pinContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.1,
    },
    title: {
        fontSize: RFPercentage(3.5),
        marginHorizontal: width * 0.05,
        textAlign: 'center'
    },
    question: {
        marginHorizontal: width * 0.1,
        marginTop: height * 0.05
    },
    questionQ: {
        color: gStyles.color_2
    }
})

export default FAQs;