import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import TextLato from '../../utils/TextLato';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useLanguage } from '../../../hooks/language';
const [_width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const SubcategoryListCard = ({subcategory, width = _width * 0.48}) => {
    const language = useLanguage();
    const en = language === 'en';
    const navigation = useNavigation();
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('Subcategory', subcategory)} style={{...styles.card, width, transform: en ? [] : [{scaleX: -1}]}}>
            <Image source={{uri: subcategory.image}} style={{width: _width * 0.15, aspectRatio: 1}} />
            <TextLato bold style={{fontSize: RFPercentage(1.6), textAlign: 'center', width: _width * 0.2, marginTop: height * 0.02}}>{subcategory.name[language]}</TextLato>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: _width * 0.005,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: height * 0.03,
        marginTop: height * 0.005,
        flexDirection: 'column',
        height: height * 0.2
    }
})

export default SubcategoryListCard;