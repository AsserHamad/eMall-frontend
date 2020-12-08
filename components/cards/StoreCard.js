import { FontAwesome5, MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { gStyles } from '../../global.style';

// Categories:
//    0: Men's Clothes      - #E74A5F (primary)    - faTie
//    1: Women's Clothes    - #005071 (secondary)  - faFemale
//    2: Children's Clothes - #48C6DC              - faChild


const categories = [{
    id: 0,
    name: `Men's Clothes`,
    iconName: `md-male`,
    type: `ionicons`,
    color: '#E74A5F',
},{
    id: 1,
    name: `Women's Clothes`,
    iconName: `md-female`,
    type: 'ionicons',
    color: '#005071',
},{
    id: 2,
    name: `Children's Clothes`,
    iconName: `md-shirt`,
    type: 'ionicons',
    color: '#48DC5C',
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


function StoreCard(props){
    const store = props.store;
    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={{uri: store.logo}} />
            <Text style={styles.title}>{store.name}</Text>
            <View style={styles.categories}>
                {store.categories.map(category => (
                    <View style={{...styles.categoryContainer, backgroundColor: getCategoryInfo(category).color}} key={category}>
                        {returnIconType(getCategoryInfo(category))}
                    </View>
                ))}
            </View>
        </View>
    )
}

const returnIconType = (details) => {
    switch(details.type){
        case 'ionicons': return <Ionicons name={details.iconName} style={styles.icon} size={14} />;
        case 'material': return <MaterialCommunityIcons name={details.iconName} style={styles.icon} size={14} />;
        case 'feather': return <Feather name={details.iconName} style={styles.icon} size={14} />;
        case 'fontawesome5': return <FontAwesome5 name={details.iconName} style={styles.icon} size={14} />;
    }
}

const getCategoryInfo = category => categories[category];

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 120,
        height: 160,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginRight: 5,
        marginLeft: 5,
        marginTop: 20,
        marginBottom: 20
    },
    logo: {
        height: 70,
        width: 90,
        resizeMode: 'contain'
    },
    title: {
        marginTop: 5,
        fontSize: gStyles.fontSizeM
    },
    categories: {
        height: 30,
        width: 120,
        display: 'flex',
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
    },
    icon: {
        color: 'white'
    }
})

export default StoreCard;