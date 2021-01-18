import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const checkEmpty = (array) => {
    return array.filter(element => element !== '').length !== array.length ? true : false;
}

const DisabledButton = (props) => {
    const [disabled, setDisabled] = useState(checkEmpty(props.array));
    const firstTime = useRef(true);

    useEffect(() => {
        if(firstTime.current){
            firstTime.current = false;
        } else {
            setDisabled(checkEmpty(props.array));
        }
    }, props.array);

    return(
        <TouchableOpacity onPress={() => disabled ? null : props.onPressIfActive()} activeOpacity={disabled ? 1 : 0.8}>
            <View style={{...styles.submitButton, backgroundColor: disabled ? 'grey' : gStyles.primary_light}}>
                {props.children}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: gStyles.primary_medium,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        height: height * 0.05,
        borderRadius: 2,
        marginTop: height * 0.03,
        display: 'flex',
        flexDirection: 'row'
    },
})

export default DisabledButton;