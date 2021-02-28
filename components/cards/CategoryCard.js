import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../global.style';
import TextLato from '../utils/TextLato';
import { useLanguage } from '../../hooks/language';
import Icon from '../utils/Icon';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

export default function CategoryCard(props){
    const details = props.details;
    const language = useLanguage();
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={() => navigation.push('Category', details)} activeOpacity={0.8} style={{borderWidth: 0, width: Dimensions.get('window').width * 0.3, alignItems: 'center'}}>
            <View style={styles.container}>
                <Icon type={details.iconType} size={50} color={'white'} name={details.icon} style={styles.icon} />
                <TextLato bold style={styles.title}>{details.name[language]}</TextLato>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').width * 0.28,
        aspectRatio: 1,
        backgroundColor: gStyles.color_0,
        marginVertical: height * 0.01,
        borderRadius: 2,
        borderWidth: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        paddingVertical: height * 0.03
    },
    icon: {
        margin: 14
    },
    title: {
        color: 'white',
        fontSize: RFPercentage(1.8),
        textAlign: 'center',
        marginTop: height * 0.01
    }
})