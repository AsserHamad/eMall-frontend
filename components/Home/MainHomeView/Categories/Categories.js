import { faBlackTie } from '@fortawesome/free-brands-svg-icons';
import { faChild, faFemale, faGem, faShoePrints, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gStyles } from '../../../../global.style';
import CategoryCard from '../../../cards/CategoryCard';

function Categories(){

    const categories = [{
        id: 0,
        name: `Men's Clothes`,
        icon: faBlackTie
    },{
        id: 1,
        name: `Women's Clothes`,
        icon: faFemale 
    },{
        id: 2,
        name: `Children's Clothes`,
        icon: faChild 
    },{
        id: 3,
        name: `Shoes`,
        icon: faShoePrints 
    },{
        id: 4,
        name: `Watches`,
        icon: faStopwatch 
    },{
        id: 5,
        name: `Accessories`,
        icon: faGem 
    },];
    return(
    <View style={styles.container}>
        {/* <Text style={styles.title}>Product Categories</Text> */}
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
        marginLeft: 10,
        marginRight: 10,
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
        justifyContent: 'center'
    }
});

export default Categories;