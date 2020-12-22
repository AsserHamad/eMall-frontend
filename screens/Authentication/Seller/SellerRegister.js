import React, { useState } from 'react';
import { Dimensions, Image, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../../global.style';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import { RFValue } from "react-native-responsive-fontsize";
import { useHeaderHeight } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';

// Redux
import { connect } from 'react-redux';
import { login } from '../../../src/actions/auth';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import RegisterInputAndError from '../RegisterInputAndError';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const SellerRegister = (props) => {
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('+20');
    const [image, setImage] = useState('https://www.heavydutydirect.ca/wp-content/uploads/2019/02/camera-placeholder-400x284.jpg');
    const headerHeight = useHeaderHeight();
    const [fontsLoaded] = useFonts({
      'Lato': require('../../../assets/fonts/Lato-Regular.ttf')
    });

    // Get image permission
    // useEffect(() => {
    //     (async () => {
    //         if(Platform.OS !== 'web'){
    //             const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    //             if(status !== 'granted') {
    //                 alert('Sorry, we need camera roll permission to register!')
    //             }
    //         }
    //     })();
    // }, []);
    
    // Pick image
    // const pickImage = async () => {
    //     ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.All,
    //       allowsEditing: true,
    //       aspect: [1, 1],
    //       quality: 1,
    //     })
    //     .then(res => {
    //         console.log(res);
    //         if(!res.cancelled) {
    //             setImage(res.uri);
    //         }
    //     })
    // }
    
    const register = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/client/register`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, firstName, lastName, phone: `+20${phone}`})
        })
        .then(res => res.json())
        .then(res => {
            if(!res.status){
                setErrors([]);
                props.navigation.replace('ClientLoginSuccess', {account: res})
            }
            else {
                setErrors(res.message ? [res.message] : res.errors)
            }
        });
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
                    fetch(`${Constants.manifest.extra.apiUrl}/client/login/facebook`, {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .then(res => props.login(res))
                })
                .catch(e => console.log(e))
            }
        }
        catch ({ message }) {
            alert(`facebook login error: ${message}`)
        }
    }

    return (
        <View>
        {fontsLoaded ? 
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={{color: gStyles.secondary, fontSize: RFValue(20), fontFamily: gStyles.fontFamily}}>Sign Up</Text>
                <Text style={{color: gStyles.secondary, fontSize: RFValue(12), fontFamily: gStyles.fontFamily, marginTop: height * 0.01}}>Fill this form to complete your registration process</Text>
            </View>
            <View style={styles.formContainer}>
                    {/* <View style={styles.profilePictureContainer}>
                        <TouchableOpacity onPress={pickImage}>
                            <Image source={{ uri: image }} style={{ width: width * 0.3, height: width * 0.3, borderRadius: 10 }} />

                        </TouchableOpacity>
                    </View> */}
                
                <View style={{display: 'flex', flexDirection: 'row', width}}>
                    <RegisterInputAndError errors={errors} value={firstName} type={'firstName'} set={setFirstName} inputStyle={{width: width * 0.42, marginRight: width * 0.06}} />
                    <RegisterInputAndError errors={errors} value={lastName} type={'lastName'} set={setLastName} inputStyle={{width: width * 0.42}} />
                </View>
                <RegisterInputAndError errors={errors} value={phone} type={'phone'} set={setPhone} numeric keyboardType={'numeric'} />
                <RegisterInputAndError errors={errors} value={email} type={'email'} set={setEmail} keyboardType={'email-address'} />
                <RegisterInputAndError errors={errors} value={password} secureTextEntry type={'password'} set={setPassword} />
            </View>
            <TouchableOpacity onPress={() => register()}>
                <View style={styles.submitButton}>
                    <Text style={{color: 'white', fontFamily: gStyles.fontFamily, fontSize: RFValue(12)}}>REGISTER</Text>
                </View>
            </TouchableOpacity>
            <View style={{ position: 'absolute', bottom: headerHeight - 10}}>
                {/* Other Logins */}
                <SafeAreaView style={styles.alternativeLogins}>
                    <TouchableOpacity onPress={facebookRegister}>
                        <View style={styles.alternativeLoginButtonF}>
                            <AntDesign style={{marginRight: width * 0.2}} name="facebook-square" size={RFValue(25)} color="white" />
                            <Text style={{color: 'white', fontSize: RFValue(12), width: width * 0.4, fontFamily: gStyles.fontFamily}}>Sign up with Facebook</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.alternativeLoginButtonG}>
                            <AntDesign style={{marginRight: width * 0.2}} name="google" size={RFValue(25)} color="white" />
                            <Text style={{color: 'white', fontSize: RFValue(12), width: width * 0.4, fontFamily: gStyles.fontFamily}}>Sign up with Google</Text>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </View>
        : <Text>Loading</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.background,
        height: height + Constants.statusBarHeight,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
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
    submitButton: {
        backgroundColor: gStyles.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        height: height * 0.05,
        borderRadius: 2,
        marginTop: height * 0.03
    },
    others: {
        paddingHorizontal: height * 0.025,
    },
    alternativeLogins: {
        backgroundColor: gStyles.secondary,
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
        display: 'flex',
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
        display: 'flex',
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