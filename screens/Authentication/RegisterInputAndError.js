import React from 'react';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";
import { gStyles } from '../../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const types = {
    email: {
        textContentType: 'emailAddress',
        autoCompleteType: 'email',
        placeholder: 'Email',
        validate: (text) => {
            const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!regexp.test(text)){
                return 'Invalid Email Address'
            }
        }
    },
    password: {
        textContentType: 'password',
        autoCompleteType: 'password',
        placeholder: 'Password',
        validate: (text) => {
            const regexp = /^.{8,30}$/;
            if(!regexp.test(text)){
                return 'Password should be between 8 and 30 characters'
            }
        }
    },
    phone: {
        textContentType: 'telephoneNumber',
        autoCompleteType: 'tel',
        placeholder: 'Phone Number',
        validate: (text) => {
            const regexp = /^\+20[0-9]{10}$/;
            if(!regexp.test(text)){
                return 'Please enter a proper egyptian phone number'
            }
        }
    },
    name: {
        textContentType: 'name',
        autoCompleteType: 'name',
        placeholder: 'Name',
        validate: (text) => {
            const regexp = /^[a-zA-Z ]{2,30}$$/;
            if(!regexp.test(text)){
                return 'Name should be between 2 and 30 characters'
            }
        }
    },
    firstName: {
        textContentType: 'name',
        autoCompleteType: 'name',
        placeholder: 'First Name',
        validate: (text) => {
            const regexp = /^[a-zA-Z]{2,20}$$/;
            if(!regexp.test(text)){
                return 'First names should be between 2 and 20 characters'
            }
        }
    },
    lastName: {
        textContentType: 'name',
        autoCompleteType: 'name',
        placeholder: 'Last Name',
        validate: (text) => {
            const regexp = /^[a-zA-Z]{2,20}$/;
            if(!regexp.test(text)){
                return 'Last names should be between 2 and 20 characters'
            }
        }
    },
    title: {
        textContextType: 'none',
        autoCompleteType: 'off',
        placeholder: 'Job Title',
        validate: (text) => {
            const regexp = /^[a-zA-Z0-9 ]{2,40}$/;
            if(!regexp.test(text)){
                return 'Titles should be between 2 and 40 characters long'
            }
        }
    },
    storeTitle: {
        textContextType: 'none',
        autoCompleteType: 'off',
        placeholder: 'Store Title',
        validate: (text) => {
            const regexp = /^[a-zA-Z0-9 ]{1,30}$/;
            if(!regexp.test(text)){
                return 'Store Titles should be between 1 and 30 characters long'
            }
        }
    },
    storeDescription: {
        textContextType: 'none',
        autoCompleteType: 'off',
        multiline: 'true',
        placeholder: 'Store Description',
        validate: (text) => {
            const regexp = /^.{10,300}$/;
            if(!regexp.test(text)){
                return 'Titles should be between 10 and 300 characters long'
            }
        }
    },
}

const RegisterInputAndError = (props) => {
    const [validate, setValidate] = useState(false);

    const checkErrors = () => {
        const err = props.errors.filter(err => err.param === props.type);
        if(err.length){
            return err[0].msg;
        }
        return false;
    }
    
    return (
        <View style={styles.inputContainer}>
            <TextInput
                value={props.value}
                textContentType={types[props.type].textContentType}
                autoCompleteType={types[props.type].autoCompleteType}
                placeholder={types[props.type].placeholder}
                onBlur={() => setValidate(true)}
                {...props}
                placeholderTextColor={"#ffc6c6"}
                onChangeText={(val) => props.set(val)}
                style={{...styles.input, ...props.inputStyle}}
            />
            <Text style={{...styles.error, ...props.inputStyle}}>
                {(validate || props.errors.length > 0) ?
                     checkErrors(props.errors, props.type) ? 
                        checkErrors(props.errors, props.type) 
                        : types[props.type].validate(props.value)
                    : ''
                }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 2,
    },
    input: {
        fontSize: RFValue(15),
        height: height * 0.04,
        borderBottomWidth: 2,
        borderColor: '#707070',
        fontFamily: gStyles.fontFamily
    },
    error: {
        color: gStyles.primary_light,
        fontSize: RFValue(10),
    }
})

export default RegisterInputAndError;