import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { gStyles } from '../../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').width];

export default (props) => {
    const ref_input1 = useRef(),
          ref_input2 = useRef(),
          ref_input3 = useRef(),
          ref_input4 = useRef();

    return (
        <View style={{display: 'flex', flexDirection: 'row', marginVertical: height * 0.2}}>
            <TextInput
                autoCapitalize={'characters'}
                blurOnSubmit={false}
                returnKeyType={'next'}
                onSubmitEditing={() => ref_input1.current.focus()}
                onChangeText={(input) => {props.setInput0(input); input ? ref_input1.current.focus() : null}}
                value={props.input0}
                maxLength={1}
                style={styles.input}
                />
            <TextInput
                autoCapitalize={'characters'}
                ref={ref_input1}
                onChangeText={(input) => {props.setInput1(input); input ? ref_input2.current.focus() : null}}
                blurOnSubmit={false}
                returnKeyType={'next'}
                value={props.input1}
                maxLength={1}
                style={styles.input}
                onSubmitEditing={() => ref_input2.current.focus()}
                />
            <TextInput
                autoCapitalize={'characters'}
                ref={ref_input2}
                onChangeText={(input) => {props.setInput2(input); input ? ref_input3.current.focus() : null}}
                blurOnSubmit={false}
                returnKeyType={'next'}
                value={props.input2}
                maxLength={1}
                style={styles.input}
                onSubmitEditing={() => ref_input3.current.focus()}
                />
            <TextInput
                autoCapitalize={'characters'}
                ref={ref_input3}
                onChangeText={(input) => {props.setInput3(input); input ? ref_input4.current.focus() : null}}
                blurOnSubmit={false}
                returnKeyType={'next'}
                value={props.input3}
                maxLength={1}
                style={styles.input}
                onSubmitEditing={() => ref_input4.current.focus()}
                />
            <TextInput
                autoCapitalize={'characters'}
                ref={ref_input4}
                onChangeText={(input) => props.setInput4(input)}
                returnKeyType={'done'}
                value={props.input4}
                maxLength={1}
                style={styles.input}
                enablesReturnKeyAutomatically={true}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: width * 0.13,
        height: height * 0.2,
        borderRadius: 10,
        backgroundColor: gStyles.tint,
        fontSize: RFValue(20),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginHorizontal: width * 0.015,
        textTransform: 'capitalize'
    }
})