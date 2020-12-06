import React from 'react';
import { StyleSheet, View } from 'react-native';
import { gStyles } from '../../../../global.style';
import CategoryCard from '../../../cards/CategoryCard';

function Categories(){
    const categories = [{
        id: 0,
        name: `Men's Clothes`,
        iconName: `md-male`,
        type: `ionicons`,
    },{
        id: 1,
        name: `Women's Clothes`,
        iconName: `md-female`,
        type: 'ionicons',
    },{
        id: 2,
        name: `Children's Clothes`,
        iconName: `md-shirt`,
        type: 'ionicons',
    },{
        id: 3,
        name: `Shoes`,
        iconName: `shoe-formal`,
        type: 'material',
    },{
        id: 4,
        name: `Watches`,
        iconName: `watch`,
        type: 'feather',
    },{
        id: 5,
        name: `Accessories`,
        iconName: `gem`,
        type: 'fontawesome5',
    },];
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