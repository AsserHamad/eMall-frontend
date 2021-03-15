import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useLanguage } from '../hooks/language';
import TextLato from './utils/TextLato';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

function ScrollCards(props){
    const title = props.title;
    const language = useLanguage();
    const en = language === 'en';
    if(!props.cards.length) return null;
    return (
        <View style={{...styles.container, ...props.style}}>
            <TextLato bold style={styles.title}>{title}</TextLato>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.containerContent} style={{transform: en ? [] : [{scaleX: -1}]}} horizontal>
                {props.cards}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: RFPercentage(2.5),
        marginHorizontal: width * 0.03,
        marginVertical: width * 0.03,
    },
    containerContent: {
        paddingVertical: height * 0.02,
        backgroundColor: 'black'
    },
})

export default ScrollCards;