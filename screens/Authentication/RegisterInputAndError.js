import React from 'react';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import { useLanguage, useLanguageText } from '../../hooks/language';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const types = {
    email: {
        textContentType: 'emailAddress',
        autoCompleteType: 'email',
        placeholder: {en: 'Email', ar: 'بريد الالكتروني'},
        validate: (text) => {
            const regexp = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;
            if(!regexp.test(text)){
                return {en: 'Invalid Email Address', ar: 'عنوان البريد الإلكتروني غير صالح'}
            }
        }
    },
    password: {
        textContentType: 'password',
        autoCompleteType: 'password',
        placeholder: {en: 'Password', ar: 'كلمة المرور'},
        validate: (text) => {
            const regexp = /^.{8,30}$/;
            if(!regexp.test(text)){
                return {en: 'Password should be between 8 and 30 characters', ar: 'يجب أن تكون كلمة المرور بين 8 و 30 حرفًا'}
            }
        }
    },
    phone: {
        textContentType: 'telephoneNumber',
        autoCompleteType: 'tel',
        placeholder: {en: 'Phone Number', ar: 'رقم التليفون'},
        validate: (text) => {
            const regexp = /^\+20[0-9]{10}$/;
            if(!regexp.test(text)){
                return {en: 'Please enter a proper egyptian phone number', ar: 'الرجاء إدخال رقم هاتف مصري مناسب'}
            }
        }
    },
    name: {
        textContentType: 'name',
        autoCompleteType: 'name',
        placeholder: {en: 'Name', ar: 'الاسم'},
        validate: (text) => {
            const regexp = /^[a-zA-Z ]{2,30}$$/;
            if(!regexp.test(text)){
                return {en: 'Name should be between 2 and 30 characters', ar: 'يجب أن يتراوح الاسم بين 2 و 30 حرفًا'}
            }
        }
    },
    firstName: {
        textContentType: 'name',
        autoCompleteType: 'name',
        placeholder: {en: 'First Name', ar: 'الاسم الاول'},
        validate: (text) => {
            const regexp = /^[a-zA-Z]{2,20}$$/;
            if(!regexp.test(text)){
                return {en: 'First names should be between 2 and 20 characters', ar: 'يجب أن تتكون الأسماء الأولى من 2 إلى 20 حرفًا'}
            }
        }
    },
    lastName: {
        textContentType: 'name',
        autoCompleteType: 'name',
        placeholder: {en: 'Last Name', ar: 'اسم العائلة'},
        validate: (text) => {
            const regexp = /^[a-zA-Z]{2,20}$/;
            if(!regexp.test(text)){
                return {en: 'Last names should be between 2 and 20 characters', ar: 'يجب أن تكون الأسماء الأخيرة بين 2 و 20 حرفًا'}
            }
        }
    },
    title: {
        textContextType: 'none',
        autoCompleteType: 'off',
        placeholder: {en: 'Job Title', ar: 'عنوان وظيفي'},
        validate: (text) => {
            const regexp = /^[a-zA-Z0-9 ]{2,40}$/;
            if(!regexp.test(text)){
                return {en: 'Titles should be between 2 and 40 characters long', ar: 'يجب أن يتراوح طول العناوين بين 2 و 40 حرفًا'}
            }
        }
    },
    storeTitle: {
        textContextType: 'none',
        autoCompleteType: 'off',
        placeholder: {en: 'Store Title', ar: 'عنوان المتجر'},
        validate: (text) => {
            const regexp = /^[a-zA-Z0-9 ]{1,30}$/;
            if(!regexp.test(text)){
                return {en: 'Store Titles should be between 1 and 30 characters long', ar: 'يجب أن يتراوح طول عناوين المتجر بين 1 و 30 حرفًا'}
            }
        }
    },
    storeDescription: {
        textContextType: 'none',
        autoCompleteType: 'off',
        multiline: 'true',
        placeholder: {en: 'Store Description', ar: 'وصف المتجر'},
        validate: (text) => {
            const regexp = /^.{10,300}$/;
            if(!regexp.test(text)){
                return {en: 'Titles should be between 10 and 300 characters long', ar: 'يجب أن يتراوح طول العناوين بين 10 و 300 حرف'}
            }
        }
    },
}

const RegisterInputAndError = (props) => {
    const [validate, setValidate] = useState(false);
    const language = useLanguage();
    const en = language === 'en';
    const checkErrors = () => {
        const err = props.errors.filter(err => err.param === props.type);
        if(err.length){
            return err[0].msg[language];
        }
        return false;
    }
    
    return (
        <View style={[styles.inputContainer, props.inputStyle]}>
            <TextInput
                value={props.value}
                textContentType={types[props.type].textContentType}
                autoCompleteType={types[props.type].autoCompleteType}
                placeholder={types[props.type].placeholder[language]}
                onBlur={() => setValidate(true)}
                {...props}
                placeholderTextColor={"#ffc6c6"}
                onChangeText={(val) => props.set(val)}
                style={{...styles.input, fontFamily: en ? 'Lato' : 'Cairo', textAlign: en ? 'left' : 'right'}}
            />
            <TextLato bold style={styles.error}>
                {(validate || props.errors.length > 0) ?
                     checkErrors(props.errors, props.type) ? 
                        checkErrors(props.errors, props.type) 
                        : types[props.type].validate(props.value) ? types[props.type].validate(props.value)[language] : ''
                    : ''
                }
            </TextLato>
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
        borderBottomWidth: 1,
        borderColor: '#777'
    },
    error: {
        color: gStyles.color_0,
        fontSize: RFValue(10)
    }
})

export default RegisterInputAndError;