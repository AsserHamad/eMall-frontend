import React from 'react';
import TextLato from '../TextLato';
import { TouchableOpacity } from 'react-native';
import {style} from './ButtonStyle';

const Button = ({text, onPress, activeOpacity = 0.7, containerStyle, textStyle}) => {

    return (
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={activeOpacity}
            style={{...style.buttonContainer, ...containerStyle}}
            >
            <TextLato style={{...style.text, ...textStyle}}>{text}</TextLato>
        </TouchableOpacity>
    )
}

export default Button;