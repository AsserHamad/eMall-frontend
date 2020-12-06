import { faBlackTie } from '@fortawesome/free-brands-svg-icons';
import { faChild, faFemale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { gStyles } from '../../global.style';

// Categories:
//    0: Men's Clothes      - #E74A5F (primary)    - faTie
//    1: Women's Clothes    - #005071 (secondary)  - faFemale
//    2: Children's Clothes - #48C6DC              - faChild

function StoreCard(props){
    const store = props.store;
    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={{uri: store.logo}} />
            <Text style={styles.title}>{store.name}</Text>
            <View style={styles.categories}>
                {store.categories.map(category => (
                    <View style={{...styles.categoryContainer, backgroundColor: getCategoryInfo(category).color}} key={category}>
                        <FontAwesomeIcon size={14} style={styles.icon} icon={getCategoryInfo(category).icon} />
                    </View>
                ))}
            </View>
        </View>
    )
}

const getCategoryInfo = category => category === 0 ? {
    color: '#E74A5F',
    icon: faBlackTie
} : category === 1 ? {
    color: '#005071',
    icon: faFemale
} : {
    color: '#48DC5C',
    icon: faChild
};

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
        height: 80,
        width: 110,
        resizeMode: 'contain'
    },
    title: {
        marginTop: 5,
        fontSize: gStyles.fontSizeM
    },
    categories: {
        height: 30,
        width: '100%',
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
        margin: 2
    },
    icon: {
        color: 'white'
    }
})

export default StoreCard;