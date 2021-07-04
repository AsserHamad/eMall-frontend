import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useLanguage } from '../hooks/language';
import TextLato from './utils/TextLato';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

function ScrollCards({title, data, style, renderItem}){
    const language = useLanguage();
    const en = language === 'en';
    if(!data.length) return (
        <View style={{...styles.container, ...style}}>
            <TextLato bold style={styles.title}>{title}</TextLato>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={RFPercentage(4)} color={'white'} />
            </View>
        </View>
    );
    return (
        <View style={{...styles.container, ...style}}>
            <TextLato bold style={styles.title}>{title}</TextLato>
            
            <FlatList
                data={data}
                horizontal
                renderItem={renderItem}
                keyExtractor={item => item._id}
                style={{transform: en ? [] : [{scaleX: -1}]}}
                contentContainerStyle={{paddingVertical: height * 0.01, alignItems: 'center'}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        height: height * 0.2,
        width,
        backgroundColor: '#aaa',
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