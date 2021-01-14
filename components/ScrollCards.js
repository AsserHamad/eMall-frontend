import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native';
import { gStyles } from '../global.style';
import Icon from './utils/Icon';

function ScrollCards(props){
    const title = props.title;
    const countdown = props.countdown;
    const cards = props.cards;
    const [count, setCount] = useState('00:00:00')
    useEffect(() => {
        setInterval(() => {
            const countDate = countRemainingTime();
            setCount(`${addZero(countDate.getHours())}:${addZero(countDate.getMinutes())}:${addZero(countDate.getSeconds())}`);
        }, 1000)
    }, []);
    return (
        <View style={{...styles.container, ...props.style}}>
        <View style={styles.topContainer}>
            <View style={styles.topLeftContainer}>
                <Text style={styles.title}>{title}</Text>
                {countdown && 
                <View style={styles.countDownContainer}>
                    <Icon type="MaterialIcons" size={18} name="watch-later" style={{color: gStyles.primary, marginRight: 4}} />
                    <Text
                    style={{
                        color: gStyles.primary,
                        fontWeight: 'bold',
                        fontSize: 20
                    }}>
                        {count}
                    </Text>
                </View>}
            </View>
            <View style={styles.topRightContainer}>
                <Text style={styles.topRightViewMore}>View More</Text>
            </View>
        </View>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.containerContent} horizontal>
                {cards}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: Dimensions.get('window').width * 0.03
    },
    containerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '1%'
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    topLeftContainer: {
        width: '50%',
        marginLeft: 10,
        marginBottom: 5
    },
    title: {
        fontSize: gStyles.fontSizeL
    },
    countDownContainer: {
        marginTop: 7,
        display: 'flex',
        flexDirection: 'row',
        color: gStyles.primary_light,
        alignItems: 'center'
    },
    topRightContainer: {
        width: '45%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',

    },
    topRightViewMore: {
        color: gStyles.background,
        backgroundColor: gStyles.secondary_dark,
        padding: 6,
        fontSize: 13,
        // marginBottom: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    scrollContainer: {
        width: '100%',
        backgroundColor: gStyles.secondary_dark,
    },
})

const addZero = (number) => number <= 9 ? `0${number}`: number;

const countRemainingTime = () => {
    const dayStart = new Date();
    dayStart.setHours(dayStart.getHours() + 2)
    const dayEnd = new Date();
    dayEnd.setHours(23, 59, 59, 999);
    return  new Date(dayEnd - dayStart);
}

export default ScrollCards;