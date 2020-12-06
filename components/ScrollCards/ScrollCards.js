import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { gStyles } from '../../global.style';

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
        <View>
        <View style={styles.topContainer}>
            <View style={styles.topLeftContainer}>
                <Text style={styles.title}>{title}</Text>
                {countdown && 
                <View style={styles.countDownContainer}>
                    <MaterialIcons size={18} name="watch-later" style={{color: gStyles.primary, marginRight: 4}} />
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
            <ScrollView style={styles.container} contentContainerStyle={styles.containerContent} horizontal>
                {cards}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // paddingTop: 20,
        // paddingBottom: 20,
        backgroundColor: gStyles.secondary,
    },
    containerContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    topLeftContainer: {
        width: '50%',
        marginLeft: 10,
        marginTop: 30,
        marginBottom: 10
    },
    title: {
        fontSize: gStyles.fontSizeL
    },
    countDownContainer: {
        marginTop: 7,
        display: 'flex',
        flexDirection: 'row',
        color: gStyles.primary,
        alignItems: 'center'
    },
    topRightContainer: {
        width: '45%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',

    },
    topRightViewMore: {
        color: gStyles.background,
        backgroundColor: gStyles.secondary,
        padding: 6,
        fontSize: 10,
        marginBottom: 10,
        borderRadius: 4
    }
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