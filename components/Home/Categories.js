import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { gStyles } from '../../global.style';
import CategoryCard from '../cards/CategoryCard';
import { ScrollView } from 'react-native-gesture-handler';

function Categories(){
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/category`)
        .then(res => res.json())
        .then(res => setCategories(res))
    }, []);
    return(
        <View horizontal style={styles.container} showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
                {categories.map(category => (
                    <CategoryCard key={Math.random()} details={category} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 18,
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