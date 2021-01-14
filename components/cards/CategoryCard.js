import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../global.style';
import TextLato from '../utils/TextLato';
import { useLanguage } from '../../hooks/language';
import Icon from '../utils/Icon';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function CategoryCard(props){
    const details = props.details;
    const language = useLanguage();
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={() => navigation.push('Category', details)} style={{borderWidth: 0}}>
            <View style={styles.container}>
                <Icon type={details.iconType} size={40} color={'white'} name={details.icon} style={styles.icon} />
                <TextLato style={styles.title}>{details.name[language]}</TextLato>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').width/3.2,
        width: Dimensions.get('window').width/3.2,
        backgroundColor: gStyles.primary_medium,
        margin: 2,
        borderRadius: 2,
        borderWidth: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    icon: {
        margin: 14
    },
    title: {
        color: 'white',
        fontSize: RFPercentage(1.5),
        textAlign: 'center',
    }
})