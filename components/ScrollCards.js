import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useLanguage } from '../hooks/language';
import TextLato from './utils/TextLato';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

function ScrollCards(props){
    const title = props.title;
    const language = useLanguage();
    const en = language === 'en';
    if(!props.cards.length) return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={RFPercentage(4)} color={'white'} />
        </View>
    );
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
    loadingContainer: {
        height: height * 0.2,
        backgroundColor: '#aaa',
        marginVertical: height * 0.02,
        marginTop: height * 0.07,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        marginVertical: height * 0.02
    },
    title: {
        fontSize: RFPercentage(2.5),
        marginHorizontal: width * 0.03,
        marginVertical: width * 0.03
    },
    containerContent: {
        paddingVertical: height * 0.02,
        backgroundColor: 'black',
        minHeight: height * 0.25,
        minWidth: width,
        alignItems: 'center'
    },
})

export default ScrollCards;