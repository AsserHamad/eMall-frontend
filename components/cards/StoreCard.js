import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { gStyles } from '../../global.style';
import Icon from '../utils/Icon';


function StoreCard(props){
    const store = {...props.store, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/The-Body-Shop-Logo.svg/480px-The-Body-Shop-Logo.svg.png'};
    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={{uri: store.logo}} />
            <Text style={styles.title}>{store.title}</Text>
            <View style={styles.categories}>
                {store.categories.map(category => (
                    <View style={{...styles.categoryContainer, backgroundColor: gStyles.color_3}} key={Math.random()}>
                        <Icon type={category.iconType} color="white" name={category.icon} size={12} style={styles.icon} />
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 200,
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