import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

export default (props) => {
    const languageState = useSelector(state => state.generalReducer.language);
    const extra = props.thin ? ' Thin' : props.bold ? ' Bold' : props.italic ? ' Italic' : '';
    return  <Text
                {...props}
                style={{fontFamily: !languageState ^ props.reverse ? `Lato${extra}` : `Cairo${extra}`, textAlign: !languageState ? 'left' : 'right', ...props.style}}
            >
                {props.children}
            </Text>
}