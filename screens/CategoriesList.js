import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../components/Header';
import { gStyles } from '../global.style';
import Constants from 'expo-constants';
import { useLanguage } from '../hooks/language';
import TextLato from '../components/utils/TextLato';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const CategoriesList = ({navigation}) => {
    const language = useLanguage();
    const en = language === 'en';
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/category`)
        .then(res => res.json())
        .then(res => setCategories(res))
    }, []);
    return (
        <View style={styles.container}>
            <Header details={{title: en ? 'Categories' : 'الاصناف'}} />
            <ScrollView contentContainerStyle={{paddingBottom: height * 0.01}}>
                {categories.map(category => {
                    return (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('Category', category)} style={styles.card} key={Math.random()}>
                            {/* <Icon type={category.iconType} name={category.icon} color={'white'} size={RFPercentage(10)} /> */}
                            <Image source={{uri: category.image}} style={{width: width * 0.25, aspectRatio: 1}} />
                            <TextLato bold style={{fontSize: RFPercentage(2), color: 'white', marginTop: height * 0.02}}>{category.name[language]}</TextLato>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: width * 0.95,
        backgroundColor: gStyles.color_2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: height * 0.03,
        marginTop: height * 0.005
    }
})

export default CategoriesList;