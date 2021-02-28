import React, {useState, useEffect} from 'react';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import TextLato from '../utils/TextLato';
import { gStyles } from '../../global.style';
import { useSelector } from 'react-redux';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const AddMembers = ({route, navigation}) => {
    const refresh = () => route.params.setRefresh(refresh => !refresh);
    const [name, setName] = useState('Moar Moar');
    const [email, setEmail] = useState('moar@moar.com');
    const [password, setPassword] = useState('Abcd1234');
    const [phone, setPhone] = useState('01140008042');
    const [title, setTitle] = useState('Accountant');
    const [disabled, setDisabled] = useState(false);
    const token = useSelector(state => state.authReducer.token);
    useEffect(() => {
        setDisabled([name,email, password, phone, title].filter(element => element === '').length > 0)
    }, [name, email, password, phone, title]);

    const createMember = () => {
        if(disabled) return;
        fetch(`${Constants.manifest.extra.apiUrl}/seller/create-member`, {
            method: 'post',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify({
                member: {
                    name,
                    email,
                    password,
                    phone,
                    title,
                }
            })
        })
        .then(() => {
            refresh();
            navigation.goBack();
        })
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView style={{paddingBottom: height * 0.06}}>
                <View>
                    <Input value={name} setValue={setName} placeholder={'Asser Mohamed'} title={'Name'} />
                    <Input value={email} setValue={setEmail} placeholder={'example@example.com'} title={'Email'} />
                    <Input value={password} setValue={setPassword} placeholder={'Password'} textContentType={'password'} title={'Password'} secure />
                    <Input value={phone} setValue={setPhone} placeholder={'+20xxxxxxxxxx'} keyboardType={'number-pad'} title={'Phone'} />
                    <Input value={title} setValue={setTitle} placeholder={'Accountant'} title={'Job Title'} />
                </View>
                <TouchableOpacity onPress={createMember} activeOpacity={0.7} style={{...styles.button, backgroundColor: disabled ? '#999' : gStyles.color_1}}>
                    <TextLato style={{color: 'white'}}>Add Member</TextLato>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const Input = ({title, keyboardType, textContentType, placeholder, secure, value, setValue}) => {
    
    return (
        <View style={styles.container}>
            <TextLato style={styles.title} >{title}</TextLato>
            <TextInput 
                value={value}
                onChangeText={(input) => setValue(input)}
                style={styles.input}
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