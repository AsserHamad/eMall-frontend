import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { gStyles } from '../../../global.style';
import Constants from 'expo-constants';
import { AntDesign, Ionicons, FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useHeaderHeight } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import AwesomeAlert from 'react-native-awesome-alerts';

// Redux
import { connect } from 'react-redux';
import { login } from '../../../src/actions/auth';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import RegisterInputAndError from '../RegisterInputAndError';
import DisabledButton from '../DisabledButton';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const SellerStoreRegister = (props) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('https://www.heavydutydirect.ca/wp-content/uploads/2019/02/camera-placeholder-400x284.jpg');
    const headerHeight = useHeaderHeight();
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [otherCategory, setOtherCategory] = useState('');
    const [showAlert, setShowAlert] = useState(true);
    const [fontsLoaded] = useFonts({
      'Lato': require('../../../assets/fonts/Lato-Regular.ttf'),
      'Lato-Bold': require('../../../assets/fonts/Lato-Bold.ttf')
    });

    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/category`)
        .then(res => res.json())
        .then(res => setCategories(res));
    },[]);

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
    //         if(!res.cancelled) {
    //             setImage(res.uri);
    //         }
    //     })
    // }
    
    const register = () => {
        const body = {seller: props.route.params.seller, store: {
            title,
            description,
            categories
        }};
        fetch(`${Constants.manifest.extra.apiUrl}/seller/register`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            if(!res.status){
                setErrors([]);
                props.navigation.replace('SellerLoginSuccess', {seller: res.seller, store: res.store})
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
                    .then(res => props.navigation.replace('SellerLoginSuccess', {store: res.store, seller: res.seller}))
                })
                .catch(e => console.log(e))
            }
        }
        catch ({ message }) {
            alert(`facebook login error: ${message}`)
        }
    }

    const Alert = () => (
        <AwesomeAlert
        show={showAlert}
        showProgress={false}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        confirmButtonColor="#DD6B55"
        contentContainerStyle={{backgroundColor: gStyles.color_0}}
        customView={(
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: gStyles.color_0}}>
                <Icon type="Feather" name="check" size={RFValue(60)} color={'white'} />
                <TextLato bold style={{fontSize: RFPercentage(3), marginTop: height * 0.02, color: 'white'}}>Success</TextLato>
                <TextLato style={{fontSize: RFPercentage(2), marginTop: height * 0.04, textAlign: 'center', color: 'white'}}>You have successfully added a new product!</TextLato>
            </View>
        )}
        onCancelPressed={() => {
            setShowAlert(false);
        }}
        onConfirmPressed={() => {
            props.removeFromWishlist(item)
            setShowAlert(false);
        }}
        onDismiss={() => {
            setShowAlert(false);
            navigation.goBack();
        }}
    />
    )

    return (
        <ScrollView>
        {fontsLoaded ? 
        <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={{color: gStyles.color_1, fontSize: RFValue(20), fontFamily: gStyles.fontFamily}}>Store Data</Text>
                <Text style={{color: gStyles.color_1, fontSize: RFValue(12), fontFamily: gStyles.fontFamily, marginTop: height * 0.01}}>Fill this form with your store's information</Text>
            </View>
            <View style={styles.formContainer}>
                    {/* <View style={styles.profilePictureContainer}>
                        <TouchableOpacity onPress={pickImage}>
                            <Image source={{ uri: image }} style={{ width: width * 0.3, height: width * 0.3, borderRadius: 10 }} />

                        </TouchableOpacity>
                    </View> */}
                <RegisterInputAndError errors={errors} value={title} type={'storeTitle'} set={setTitle} />
                <RegisterInputAndError multiline={true} errors={errors} value={description} type={'storeDescription'} set={setDescription} />
                <Text style={{color: gStyles.color_1, fontSize: RFValue(20), fontFamily: gStyles.fontFamily}}>Categories</Text>
                <Text style={{color: 'black', fontSize: RFValue(11), fontFamily: gStyles.fontFamily, marginVertical: height * 0.01}}>Please select the most appropriate categories regarding your store's products</Text>
            <View style={styles.categoryContainer}>
                {categories.map(category => {
                    return(
                        <TouchableOpacity
                        activeOpacity={0.9}
                            key={category._id}
                            onPress={() => 
                                setSelectedCategories(sc => includes(sc, category._id) ? 
                                    remove(sc, category._id) :
                                    sc.concat(category._id))}
                        >
                            <View style={!includes(selectedCategories, category._id) ? styles.categoryButton : styles.selectedCategoryButton} 
                                >
                                <Text style={!includes(selectedCategories, category._id) ? styles.categoryTitle : styles.selectedCategoryTitle}>{category.name.en}</Text>
                                {returnIconType(category, !includes(selectedCategories, category._id))}
                            </View>
                        </TouchableOpacity>
                    )
                })}
                <TouchableOpacity
                activeOpacity={0.9}
                    onPress
                >
                    <View style={otherCategory === '' ? styles.categoryButton : styles.selectedCategoryButton} 
                        >
                        <Text style={otherCategory === '' ? styles.categoryTitle : styles.selectedCategoryTitle}>Other</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
            <DisabledButton onPressIfActive={register} array={[title, description]} errors={errors}>
                    <Text style={{color: 'white', fontFamily: gStyles.fontFamily, fontSize: RFValue(12)}}>REGISTER</Text>
            </DisabledButton>
            {Alert}
        </KeyboardAvoidingView>
        : <Text>Loading</Text>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.background,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },
    headerContainer: {
        width: width * 0.9,
        paddingTop: height * 0.01,
        marginBottom: height * 0.02
    },
    formContainer: {
        width: width * 0.9
    },
    profilePictureContainer: { 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: height * 0.02
    },
    categoryContainer: {
        width,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryButton: {
        width: width * 0.28,
        aspectRatio: 1,
        borderColor: gStyles.color_3,
        borderWidth: 2,
        borderRadius: 100,
        marginHorizontal: width * 0.01,
        marginVertical: width * 0.02,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedCategoryButton: {
        width: width * 0.28,
        aspectRatio: 1,
        backgroundColor: gStyles.color_3,
        borderRadius: 100,
        marginHorizontal: width * 0.01,
        marginVertical: width * 0.02,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryTitle: {
        color: gStyles.color_3,
        fontFamily: 'Lato-Bold',
        marginBottom: RFPercentage(1),
        fontSize: RFPercentage(1.2)
    },
    icon: {
        color: gStyles.color_3,
    },
    selectedCategoryTitle: {
        color: 'white',
        fontFamily: 'Lato-Bold',
        fontSize: RFPercentage(1),
        marginBottom: RFPercentage(1),
        fontSize: RFPercentage(1.2)
    },
    selectedIcon: {
        color: 'white',
    }
})

const returnIconType = (details, selected) => {
    const style= selected ? styles.icon : styles.selectedIcon;
    switch(details.iconType){
        case 'Ionicons': return <Ionicons name={details.icon} style={style} size={35} />;
        case 'MaterialCommunityIcons': return <MaterialCommunityIcons name={details.icon} style={style} size={35} />;
        case 'Feather': return <Feather name={details.icon} style={style} size={35} />;
        case 'FontAwesome5': return <FontAwesome5 name={"tv"} style={style} size={35} />;
        case 'AntDesign': return <AntDesign name={details.icon} style={style} size={35} />;
    }
}

const includes = (array, element) => {
    return array.filter(el => el === element).length > 0;
}

const remove = (array, element) => {
    return array.filter(el => el !== element);
}

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

export default connect(mapStateToProps, mapDispatchToProps)(SellerStoreRegister);