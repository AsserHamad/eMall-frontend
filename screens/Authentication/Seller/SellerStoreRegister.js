import React, { useState } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { gStyles } from '../../../global.style';
import { funcs } from '../../../global.funcs';
import Constants from 'expo-constants';
import { AntDesign, Ionicons, FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
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
import { useLanguage } from '../../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const SellerStoreRegister = (props) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
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
                otherCategory: other ? otherCategory : undefined
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
        <ScrollView>
        <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
            <View style={styles.headerContainer}>
                <TextLato style={{color: gStyles.color_3, fontSize: RFValue(20)}}>Store Data</TextLato>
                <TextLato style={{color: gStyles.color_1, fontSize: RFValue(12), marginTop: height * 0.01}}>Fill this form with your store's information</TextLato>
            </View>
            <View style={styles.formContainer}>
                <TextLato style={{fontSize: RFValue(20), textAlign: 'center'}} bold>Logo</TextLato>
                <TextLato style={{fontSize: RFValue(10), textAlign: 'center'}} italic>Preferably a transparent.png image</TextLato>
                <View style={styles.profilePictureContainer}>
                    <TouchableOpacity onPress={() => funcs.chooseImage(setImage, [1,1])}>
                        <Image source={{ uri: image }} style={{ width: width * 0.3, height: width * 0.3, borderRadius: 10 }} />
                    </TouchableOpacity>
                </View>
                <RegisterInputAndError errors={errors} value={title} type={'storeTitle'} set={setTitle} />
                <RegisterInputAndError multiline={true} errors={errors} value={description} type={'storeDescription'} set={setDescription} />
                <TextLato style={{color: gStyles.color_3, fontSize: RFValue(20)}}>Categories</TextLato>
                <TextLato style={{color: 'black', fontSize: RFValue(11), marginVertical: height * 0.01}}>Please select the most appropriate categories regarding your store's products</TextLato>
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
                                <TextLato bold style={!includes(selectedCategories, category._id) ? styles.categoryTitle : styles.selectedCategoryTitle}>{category.name.en}</TextLato>
                                {returnIconType(category, !includes(selectedCategories, category._id))}
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
            </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setOther(other => !other)}
                >
                    <View style={!other ? styles.categoryButton : styles.selectedCategoryButton}>
                        <TextLato bold style={{color: other ? 'white' : gStyles.color_3, fontSize: RFPercentage(2.5)}}>Other</TextLato>
                    </View>
                </TouchableOpacity>
                {other && <TextInput style={{marginVertical: height * 0.05, fontFamily: 'Cairo'}} placeholder={'Please enter the other category name here'} value={otherCategory} onChangeText={(value) => setOtherCategory(value)} />}
            <DisabledButton onPressIfActive={register} array={[title, description]} errors={errors}>
                    <TextLato style={{color: 'white', fontSize: RFValue(12)}}>REGISTER</TextLato>
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