import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../global.style';
import TextLato from '../utils/TextLato';
import { useLanguage } from '../../hooks/language';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

export default function CategoryCard(props){
    const details = props.details;
    const language = useLanguage();
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={() => navigation.push('Category', details)} activeOpacity={0.8} style={{borderWidth: 0, width: width * 0.32, alignItems: 'center'}}>
            <View style={styles.container}>
                <Image source={{uri: details.image}} style={{height: '40%', aspectRatio: 1}} />
                {/* <Icon type={details.iconType} size={40} color={'white'} name={details.icon} style={styles.icon} /> */}
                <TextLato style={styles.title}>{details.name[language]}</TextLato>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').width * 0.3,
        aspectRatio: 1,
        backgroundColor: gStyles.color_1,
        borderRadius: 2,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        marginTop: height * 0.01
    },
    icon: {
    },
    title: {
        color: 'black',
        fontSize: RFPercentage(1.5),
        textAlign: 'center',
        marginTop: height * 0.01,
        width: width * 0.2
    }
})