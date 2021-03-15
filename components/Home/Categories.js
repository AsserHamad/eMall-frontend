import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { gStyles } from '../../global.style';
import CategoryCard from '../cards/CategoryCard';
import { ScrollView } from 'react-native-gesture-handler';
import { useLanguage } from '../../hooks/language';

function Categories(){
    const [categories, setCategories] = useState([]);
    const language = useLanguage();
    const en = language === 'en';
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/category`)
        .then(res => res.json())
        .then(res => setCategories(res))
    }, []);
    return(
            <View style={{...styles.categoriesContainer, flexDirection: en ? 'row' : 'row-reverse'}}>
                {categories.map(category => (
                    <CategoryCard key={Math.random()} details={category} />
                ))}
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 18,
    },
    categoriesContainer: {
        width: '100%',
        justifyContent: 'center',
        borderWidth: 0,
        flexWrap: 'wrap'
    }
});

export default Categories;