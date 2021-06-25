import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../../global.style';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import { RFValue } from "react-native-responsive-fontsize";

// Redux
import { connect } from 'react-redux';
import { login } from '../../../src/actions/auth';
import RegisterInputAndError from '../RegisterInputAndError';
import DisabledButton from '../DisabledButton';
import TextLato from '../../../components/utils/TextLato';
import { useLanguageText } from '../../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const SellerRegister = (props) => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('Amer Hamad');
    const [email, setEmail] = useState('asserhamad1@gmail.com');
    const [password, setPassword] = useState('Abcd1234');
    const [phone, setPhone] = useState('+201140008042');
    const [title, setTitle] = useState('CEO of Madness');
    const [facebookId, setFacebookId] = useState(undefined);
    const text = useLanguageText('sellerRegister');
    
    function registerSeller() {
        fetch(`${Constants.manifest.extra.apiUrl}/seller/verify`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password, phone})
        })
        .then(res => res.json())
        .then(res => {
            if(res.status){
                setErrors(res.errors);
            }
            else {
                setErrors([]);
                const seller = {
                    name,
                    phone,
                    email,
                    title,
                    password
                }
                if(facebookId)
                    seller.facebookId = facebookId;
                props.navigation.push('SellerStoreRegister', {seller});
            }
        })
        .catch(err => {
            setErrors(err.errors);
        })
    }

    const facebookRegister = async () => {
        await Facebook.initializeAsync(
            {
              autoLogAppEvents: true,
              appId: '322777442117432',
            }
          );
        try {
            const { 
                type, 
                token, 
                expires, 
                permissions, 
                declinedPermissions 
            } = await Facebook.logInWithReadPermissionsAsync({appId: '322777442117432', permissions: ['public_profile', 'email']});
            if(type === 'success') {
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
                .then(res => res.json())
                .then(data => {
                    setEmail(data.email);
                    setName(data.name);
                    setFacebookId(data.id);
                })
                .catch(e => console.log(e))
            }
        }
        catch ({ message }) {
            alert(`facebook login error: ${message}`)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TextLato bold style={{color: 'black', fontSize: RFValue(20)}}>{text.sellerData}</TextLato>
                <TextLato italic style={{color: 'black', fontSize: RFValue(12), marginTop: height * 0.01}}>{text.fillForm}</TextLato>
            </View>
            <KeyboardAvoidingView style={styles.formContainer}>
                <RegisterInputAndError errors={errors} value={name} type={'name'} set={setName} />
                <RegisterInputAndError errors={errors} value={title} type={'title'} set={setTitle} />
                <RegisterInputAndError errors={errors} value={phone} type={'phone'} set={setPhone} numeric keyboardType={'numeric'} />
                <RegisterInputAndError errors={errors} value={email} type={'email'} set={setEmail} keyboardType={'email-address'} />
                <RegisterInputAndError errors={errors} value={password} secureTextEntry type={'password'} set={setPassword} />
            </KeyboardAvoidingView>
            <DisabledButton onPressIfActive={registerSeller} array={[name, phone, email, password]} errors={errors}>
                    <TextLato style={{color: 'white', fontSize: RFValue(12), marginRight: RFValue(6)}}>{text.next}</TextLato>
                    <AntDesign size={RFValue(12)} color="white" name="arrowright" />
            </DisabledButton>
                {/* Other Logins */}
                {!facebookId && <SafeAreaView style={styles.alternativeLogins}>
                    <TouchableOpacity onPress={facebookRegister}>
                        <View style={styles.alternativeLoginButtonF}>
                            <AntDesign style={{marginRight: width * 0.2}} name="facebook-square" size={RFValue(25)} color="white" />
                            <TextLato style={{color: 'white', fontSize: RFValue(12), width: width * 0.45}}>{text.fetchFB}</TextLato>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.alternativeLoginButtonG}>
                            <AntDesign style={{marginRight: width * 0.2}} name="google" size={RFValue(25)} color="white" />
                            <TextLato style={{color: 'white', fontSize: RFValue(12), width: width * 0.45}}>{text.fetchGoogle}</TextLato>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.background,
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1
    },
    headerContainer: {
        width: width * 0.9,
        paddingTop: height * 0.01,
        marginBottom: height * 0.02
    },
    errorContainer: {
        width: width * 0.9,
        height: height * 0.04,
        textAlign: 'left'
    },
    formContainer: {
        width: width * 0.9
    },
    profilePictureContainer: { 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: height * 0.02
    },
    others: {
        paddingHorizontal: height * 0.025,
    },
    alternativeLogins: {
        width,
        height: height * 0.2,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    alternativeLoginButtonF: {
        width: width * 0.9,
        backgroundColor: '#3b5998',
        height: height * 0.06,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    alternativeLoginButtonG: {
        marginTop: height * 0.03,
        width: width * 0.9,
        backgroundColor: '#EA4335',
        height: height * 0.06,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})


const mapStateToProps = (state) => {
    return {
        loggedIn: state.authReducer.loggedIn,
        account: state.authReducer.account,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (account) => dispatch(login(account))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerRegister);