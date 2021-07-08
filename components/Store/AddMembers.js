import React, {useState, useEffect} from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import TextLato from '../utils/TextLato';
import Header from '../Header';
import { gStyles } from '../../global.style';
import { useSelector } from 'react-redux';
import { useLanguage, useLanguageText } from '../../hooks/language';
import HTTP from '../../src/utils/axios';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const AddMembers = ({route, navigation}) => {
    const refresh = () => route.params.setRefresh(refresh => !refresh);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('+20');
    const [title, setTitle] = useState('');
    const [disabled, setDisabled] = useState(false);
    const text = useLanguageText('sellerMembers');
    useEffect(() => {
        setDisabled([name,email, password, phone, title].filter(element => element === '').length > 0)
    }, [name, email, password, phone, title]);

    const createMember = () => {
        if(disabled) return;
        HTTP.post('/seller/create-member', {
            member: {
                name,
                email,
                password,
                phone,
                title,
            }
        })
        .then(() => {
            refresh();
            navigation.goBack();
        })
    }
    return (
        <View>
            <Header details={{title: text.addMember}} />
            <ScrollView>
                <KeyboardAvoidingView style={{paddingBottom: height * 0.06}}>
                    <View>
                        <Input value={name} setValue={setName} placeholder={'Asser Mohamed'} title={text.name} />
                        <Input value={email} setValue={setEmail} placeholder={'example@example.com'} title={text.email} />
                        <Input value={password} setValue={setPassword} placeholder={'Password'} textContentType={'password'} title={text.password} secure />
                        <Input value={phone} setValue={setPhone} placeholder={'+20xxxxxxxxxx'} keyboardType={'number-pad'} title={text.phone} />
                        <Input value={title} setValue={setTitle} placeholder={'Accountant'} title={text.job} />
                    </View>
                    <TouchableOpacity onPress={createMember} activeOpacity={0.7} style={{...styles.button, backgroundColor: disabled ? '#999' : gStyles.color_1}}>
                        <TextLato style={{color: 'white'}}>{text.addButton}</TextLato>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

const Input = ({title, keyboardType, textContentType, placeholder, secure, value, setValue}) => {
    const language = useLanguage();
    const en = language === 'en';
    return (
        <View style={styles.container}>
            <TextLato style={styles.title} >{title}</TextLato>
            <TextInput 
                value={value}
                onChangeText={(input) => setValue(input)}
                style={[styles.input, {textAlign: en ? 'left' : 'right'}]}
                keyboardType={keyboardType}
                textContentType={textContentType}
                placeholder={placeholder}
                secureTextEntry={secure} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: width * 0.07,
        marginTop: height * 0.03
    },
    title: {

    },
    input: {
        borderColor: gStyles.color_0,
        borderBottomWidth: 2,
        paddingVertical: height * 0.01,
        fontFamily: 'Cairo'
    },
    button: {
        marginTop: height * 0.06,
        marginHorizontal: width * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: height * 0.02,
        backgroundColor: gStyles.color_1
    }
})

export default AddMembers;