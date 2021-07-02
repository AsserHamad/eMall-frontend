import React from 'react';
import { View, Image } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useLanguage } from '../../hooks/language';
import TextLato from './TextLato';

const Empty = ({height = '100%', width = '100%', uri = "https://imgur.com/4XUo9Ko.png", text, aspectRatio = 1}) => {
    const language = useLanguage();
    const en = language === 'en';
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height, width}}>
            <Image source={{uri}} style={{width: '100%', aspectRatio, marginBottom: 5, resizeMode: 'contain'}} />
            <TextLato italic style={{fontSize: RFPercentage(2), width: '80%', textAlign: 'center'}}>{text || en ? `There's nothing here` : `لا يوجد اي شيء هنا`}</TextLato>
        </View>
    )
}

export default Empty;