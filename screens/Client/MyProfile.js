import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput, TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import { SafeAreaView } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../components/utils/Icon';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import { useLanguage, useLanguageText } from '../../hooks/language';
import Toast from 'react-native-easy-toast';
import { updateAccount } from '../../src/actions/auth';
import Header from '../../components/Header';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const MyProfile = () => {
    const text = useLanguageText('myProfile');
    const language = useLanguage();
    const navigation = useNavigation();
    const en = language === 'en';
    const token = useSelector(state => state.authReducer.token);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('+20');
    const toast = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/client/profile`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            setEmail(res.email);
            setFirstName(res.firstName);
            setLastName(res.lastName);
            setPhone(res.phone || '+20');
        });
    }, []);
    
    const showToast = message => {
        toast.current.show(message);
    }

    const updateProfile = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/client/profile`, {
            method: 'put',
            body: JSON.stringify({firstName, lastName, phone}),
            headers: {token, 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => {
            dispatch(updateAccount(res));
            showToast(en ? 'Successfully updated profile!' : 'تم تحديث الملف الشخصي بنجاح!');
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header details={{title: en ? 'My Profile' : 'ملفي'}} />
        <Toast ref={_toast => toast.current = _toast} />
        <ScrollView>
            {/* <Input title={text.email} value={email} setValue={setEmail} /> */}
            <Input title={text.firstName} value={firstName} setValue={setFirstName} />
            <Input title={text.lastName} value={lastName} setValue={setLastName} />
            <Input title={text.phone} value={phone} setValue={setPhone} />
            <View style={styles.buttonView}>
                <TouchableNativeFeedback style={styles.button} onPress={updateProfile}>
                    <TextLato bold style={{color: 'white'}}>{text.update}</TextLato>
                </TouchableNativeFeedback>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const Input = ({title, value, setValue}) => {
    const language = useLanguage();
    const en = language === 'en';
    return (
        <View style={styles.inputContainer}>
            <TextLato style={{fontSize: RFPercentage(2.5), color: '#999'}}>{title}</TextLato>
            <TextInput
                style={[styles.input, {fontFamily: en ? 'Lato':'Cairo'}]}
                placeholder={title}
                value={value}
                onChangeText={text => setValue(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gStyles.background,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.02
    },
    backContainer: {
        width: width * 0.13,
        alignItems: 'center'
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderBottomWidth: 2,
        borderColor: gStyles.color_2
    },
    inputContainer: {
        paddingHorizontal: width * 0.1,
        marginTop: height * 0.05
    },
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: height * 0.1
    },
    button: {
        backgroundColor: gStyles.color_0,
        paddingVertical: height * 0.025,
        paddingHorizontal: width * 0.08,
        borderRadius: 100
    }
})


export default MyProfile;