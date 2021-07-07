import React, { useState } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { gStyles } from '../../../global.style';
import { funcs } from '../../../global.funcs';
import Constants from 'expo-constants';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useHeaderHeight } from '@react-navigation/stack';
import AwesomeAlert from 'react-native-awesome-alerts';

// Redux
import { connect } from 'react-redux';
import { login } from '../../../src/actions/auth';
import { useEffect } from 'react';
import RegisterInputAndError from '../RegisterInputAndError';
import DisabledButton from '../DisabledButton';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import TextLato from '../../../components/utils/TextLato';
import { useLanguage, useLanguageText } from '../../../hooks/language';
import Header from '../../../components/Header';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const SellerStoreRegister = (props) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [governate, setGovernate] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');
    const [apartment, setApartment] = useState('');
    const [extra, setExtra] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('https://www.heavydutydirect.ca/wp-content/uploads/2019/02/camera-placeholder-400x284.jpg');
    const headerHeight = useHeaderHeight();
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [other, setOther] = useState(false);
    const [otherCategory, setOtherCategory] = useState('');
    const [showAlert, setShowAlert] = useState(true);
    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('storeRegister')

    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/category`)
        .then(res => res.json())
        .then(res => setCategories(res));
    },[]);
    
    const register = () => {
        if(other && otherCategory === '') return;
        funcs.uploadImage(image, title)
        .then(res => {
            const body = {seller: props.route.params.seller, store: {
                title,
                description,
                categories: selectedCategories,
                logo: res.location,
                otherCategory: other ? otherCategory : undefined,
                addresses: [{
                    governate,
                    city,
                    street,
                    building,
                    apartment,
                    extra,
                    active: true
                }]
            }};
            console.log(body)
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
        })
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
        <ScrollView contentContainerStyle={{backgroundColor: gStyles.background}}>
        <Header details={{title: text.storeRegister}} />
        <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
            <View style={styles.headerContainer}>
                {/* <TextLato style={{color: gStyles.color_3, fontSize: RFValue(20)}}>{text.storeData}</TextLato> */}
                <TextLato style={{color: gStyles.color_1, fontSize: RFValue(12), marginTop: height * 0.01}}>{text.fillForm}</TextLato>
            </View>
            <View style={styles.formContainer}>
                <TextLato style={{fontSize: RFValue(20), textAlign: 'center'}} bold>{text.logo}</TextLato>
                <TextLato style={{fontSize: RFValue(10), textAlign: 'center'}} italic>{text.logoSubtitle}</TextLato>
                <View style={styles.profilePictureContainer}>
                    <TouchableOpacity onPress={() => funcs.chooseImage(setImage, [1,1])}>
                        <Image source={{ uri: image }} style={{ width: width * 0.3, height: width * 0.3, borderRadius: 10 }} />
                    </TouchableOpacity>
                </View>
                <RegisterInputAndError errors={errors} value={title} type={'storeTitle'} set={setTitle} />
                <RegisterInputAndError multiline={true} errors={errors} value={description} type={'storeDescription'} set={setDescription} />
                <TextLato style={{color: gStyles.color_3, fontSize: RFValue(20), marginTop: height * 0.02}}>{text.pickup}</TextLato>
                <TextLato style={{color: 'black', fontSize: RFValue(11), marginVertical: height * 0.01}}>{text.pickupTitle}</TextLato>
                <RegisterInputAndError errors={errors} value={governate} type={'governate'} set={setGovernate} />
                <RegisterInputAndError errors={errors} value={city} type={'city'} set={setCity} />
                <RegisterInputAndError errors={errors} value={street} type={'street'} set={setStreet} />
                <RegisterInputAndError errors={errors} value={building} type={'building'} set={setBuilding} />
                <RegisterInputAndError errors={errors} value={apartment} type={'apartment'} set={setApartment} />
                <RegisterInputAndError errors={errors} value={extra} type={'extra'} set={setExtra} />
                <TextLato style={{color: gStyles.color_3, fontSize: RFValue(20)}}>{text.categories}</TextLato>
                <TextLato style={{color: 'black', fontSize: RFValue(11), marginVertical: height * 0.01}}>{text.categoryTitle}</TextLato>
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
                                <TextLato bold style={!includes(selectedCategories, category._id) ? styles.categoryTitle : styles.selectedCategoryTitle}>{category.name[language]}</TextLato>
                                <Image source={{uri: category.image}} style={{...styles.categoryImage, tintColor: !includes(selectedCategories, category._id) ? 'black' : 'white'}} />
                            </View>
                        </TouchableOpacity>
                    )
                })}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setOther(other => !other)}
                >
                    <View style={!other ? styles.categoryButton : styles.selectedCategoryButton}>
                        <TextLato bold style={{color: other ? 'white' : gStyles.color_3, fontSize: RFPercentage(2.5)}}>{text.other}</TextLato>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
                {other && <TextInput style={{marginVertical: height * 0.05, fontFamily: 'Cairo'}} placeholder={text.enter} value={otherCategory} onChangeText={(value) => setOtherCategory(value)} />}
            <DisabledButton onPressIfActive={register} array={[title, description]} errors={errors}>
                    <TextLato style={{color: 'white', fontSize: RFValue(12)}}>{text.register}</TextLato>
            </DisabledButton>
            {Alert}
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.background,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: height * 0.1
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
    categoryImage: {
        width: 35,
        aspectRatio: 1
    },
    selectedCategoryButton: {
        width: width * 0.28,
        aspectRatio: 1,
        backgroundColor: gStyles.color_3,
        borderRadius: 100,
        textAlign: 'center',
        marginHorizontal: width * 0.01,
        marginVertical: width * 0.02,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryTitle: {
        color: gStyles.color_3,
        width: '80%',
        textAlign: 'center',
        marginBottom: RFPercentage(1),
        fontSize: RFPercentage(1.2)
    },
    icon: {
        color: gStyles.color_3,
    },
    selectedCategoryTitle: {
        color: 'white',
        fontSize: RFPercentage(1),
        marginBottom: RFPercentage(1),
        fontSize: RFPercentage(1.2)
    },
    selectedIcon: {
        color: 'white',
    }
})

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