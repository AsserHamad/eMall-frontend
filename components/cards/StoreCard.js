import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { gStyles } from '../../global.style';
import Icon from '../utils/Icon';
import TextLato from '../utils/TextLato';


function StoreCard({store}){
    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={{uri: store.logo}} />
            <TextLato style={styles.title}>{store.title}</TextLato>
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
        width: 180,
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