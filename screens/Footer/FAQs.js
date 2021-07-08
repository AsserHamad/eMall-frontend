import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../../components/Header';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import { useLanguage, useLanguageText } from '../../hooks/language';
import HTTP from '../../src/utils/axios';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const FAQs = () => {

    const language = useLanguage();
    const text = useLanguageText('faqs');
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        HTTP.get('/general/faqs')
        .then(res => setFaqs(res));
    }, []);

    return (
        <View style={styles.container}>
            <Header details={{details: 'FAQ'}} />
            <TextLato bold style={styles.title}>{text.faqs}</TextLato>
            <ScrollView>
                {faqs.map(faq => {
                    return (
                        <View key={faq._id} style={styles.question}>
                            <TextLato style={styles.questionQ} bold>{faq.question[language]}</TextLato>
                            <TextLato style={styles.questionA} italic>{faq.answer[language]}</TextLato>
                        </View>
                    )
                })}
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