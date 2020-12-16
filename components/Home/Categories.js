import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { gStyles } from '../../global.style';
import CategoryCard from '../cards/CategoryCard';

function Categories(){
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/categories`)
        .then(res => res.json())
        .then(res => {console.log(res);setCategories(res)})
    }, []);
    return(
    <View style={styles.container}>
        <View style={styles.categoriesContainer}>
            {categories.map(category => (
                <CategoryCard key={Math.random()} details={category} />
            ))}
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {
        fontSize: gStyles.fontSizeL,
        marginBottom: 20,
        fontWeight: '500'
    },
    categoriesContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center',
        borderWidth: 0
    }
});

export default Categories;