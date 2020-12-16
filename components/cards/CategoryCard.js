import { FontAwesome5, MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { gStyles } from '../../global.style';

export default function CategoryCard(props){
    const details = props.details;
    return(
        <TouchableNativeFeedback style={{borderWidth: 0}}>
            <View style={styles.container}>
                {returnIconType(details)}
                <Text style={styles.title}>{details.name.en}</Text>
            </View>
        </TouchableNativeFeedback>
    )
};

const returnIconType = (details) => {
    console.log(details)
    switch(details.iconType){
        case 'Ionicons': return <Ionicons name={details.icon} style={styles.icon} size={50} />;
        case 'MaterialCommunityIcons': return <MaterialCommunityIcons name={details.icon} style={styles.icon} size={50} />;
        case 'Feather': return <Feather name={details.icon} style={styles.icon} size={50} />;
        case 'FontAwesome5': return <FontAwesome5 name={details.icon} style={styles.icon} size={50} />;
    }
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: Dimensions.get('window').width/3.2,
        backgroundColor: gStyles.primary,
        margin: 2,
        borderRadius: 5,
        borderWidth: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    icon: {
        color: 'white',
        margin: 14
    },
    title: {
        color: 'white',
        fontSize: gStyles.fontSizeS
    }
})