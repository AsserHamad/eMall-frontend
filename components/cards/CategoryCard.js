import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { gStyles } from '../../global.style';

export default function CategoryCard(props){
    const details = props.details;
    return(
        <TouchableNativeFeedback>
            <View style={styles.container}>
                <FontAwesomeIcon style={styles.icon} size={50} icon={details.icon} />   
                <Text style={styles.title}>{details.name}</Text>
            </View>
        </TouchableNativeFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: '30%',
        backgroundColor: gStyles.primary,
        margin: 4,
        borderRadius: 5,
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