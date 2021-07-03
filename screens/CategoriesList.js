import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, StyleSheet, View, ScrollView } from 'react-native';
import Header from '../components/Header';
import Constants from 'expo-constants';
import CategoryListCard from '../components/cards/CategoryList/CategoryListCard';
import { useLanguage } from '../hooks/language';
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
            <ScrollView contentContainerStyle={{paddingBottom: height * 0.01, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}} >
                {categories.map(category => {
                    return <CategoryListCard key={category._id} category={category} language={language} en={en} navigation={navigation} />
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
    }
})

export default CategoriesList;