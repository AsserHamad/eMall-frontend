import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../global.style';
import { useLanguage } from '../../hooks/language';
import Icon from '../utils/Icon';
import TextLato from '../utils/TextLato';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];


function StoreCard({store}){
    const [aspectRatio, setAspectRatio] = useState(1);
    const navigation = useNavigation();
    const language = useLanguage();
    const en = language === 'en';
    useEffect(() => {
        if(store.logo)
            Image.getSize(store.logo, (width, height) => setAspectRatio(width/height))
    }, []);
    return(
        <TouchableOpacity activeOpacity={0.7} onPress={() => {navigation.push('Store', {store})}} style={[styles.container, {transform: en ? [] : [{scaleX: -1}]}]}>
            <View style={styles.logoContainer}>
                    <Image source={{uri: store.logo}} style={{height: 60,  width: 80, resizeMode: 'contain'}} />
            </View>
            <TextLato style={styles.title}>{store.title}</TextLato>
            <View style={styles.categories}>
                {store.categories.map(category => (
                    <View style={styles.categoryContainer} key={Math.random()}>
                        <Icon type={category.iconType} color="white" name={category.icon} size={12} style={styles.icon} />
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.07,
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: width * 0.02,
        height: height * 0.2,
        minWidth: width * 0.4
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: gStyles.fontSizeM,
        marginTop: 10
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6
    },
    categoryContainer: {
        width: 23,
        height: 23,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        backgroundColor: gStyles.color_3
    },
    icon: {
        color: 'white'
    }
})

export default StoreCard;