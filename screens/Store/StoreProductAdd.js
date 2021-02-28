import React, { useState, useEffect } from 'react';
import { View, Image, ScrollableView, StyleSheet, Dimensions, Text, KeyboardAvoidingView, ImageBackground } from 'react-native';
import TextLato from '../../components/utils/TextLato';
import Constants from 'expo-constants';
import { gStyles } from '../../global.style';
import Icon from '../../components/utils/Icon';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
import { useHeaderHeight } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import AwesomeAlert from 'react-native-awesome-alerts';

const isEmpty = (obj) => Object.keys(obj).length === 0;

const StoreProductsAdd = () => {
    const navigation = useNavigation();
    const headerHeight = useHeaderHeight();
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    
    const [enTitle, setEnTitle] = useState('');
    const [enTitleErr, setEnTitleErr] = useState('');
    
    const [arTitle, setArTitle] = useState('');
    const [arTitleErr, setArTitleErr] = useState('');
    
    const [enDescription, setEnDescription] = useState('');
    const [enDescriptionErr, setEnDescriptionErr] = useState('');
    
    const [arDescription, setArDescription] = useState('');
    const [arDescriptionErr, setArDescriptionErr] = useState('');
    
    const [pickedCategory, setPickedCategory] = useState('');
    const [pickedCategoryErr, setPickedCategoryErr] = useState('');
    
    const [pickedSubcategory, setPickedSubcategory] = useState('');
    const [pickedSubcategoryErr, setPickedSubcategoryErr] = useState('');
    
    const [stock, setStock] = useState('');
    const [stockErr, setStockErr] = useState('');
    
    const [price, setPrice] = useState('');
    const [priceErr, setPriceErr] = useState('');
    
    const [specifications, setSpecfications] = useState([]);
    const [images, setImages] = useState([]);
    const token = useSelector(state => state.authReducer.token)
    
    const [showAlert, setShowAlert] = useState(false);
    
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/category`)
        .then(res => res.json())
        .then(res => setCategories(res));
    }, []);
    
    useEffect(() => {
        if(!isEmpty(pickedCategory)){
            setPickedSubcategory('');
            fetch(`${Constants.manifest.extra.apiUrl}/subcategory/find-by-category/${pickedCategory}`)
            .then(res => res.json())
            .then(res => setSubcategories(res))
        }
    }, [pickedCategory])
    
    const submitProduct = () => {
        const product = {
            title: {
                en: enTitle,
                ar: arTitle
            },
            description: {
                en: enDescription,
                ar: arDescription
            },
            category: pickedCategory,
            subcategory: pickedSubcategory,
            stock,
            price,
            currency: 'EGP',
        }
        fetch(`${Constants.manifest.extra.apiUrl}/product`, {
            method: 'post',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify({product})
        })
        .then(res => res.json(res))
        .then(res => {
            if(res.status || res.errors){
                setEnTitleErr('')
                setArTitleErr('')
                setPickedCategoryErr('')
                setPickedSubcategoryErr('')
                setStockErr('')
                setPriceErr('')
                res.errors.map(err => {
                    switch(err.param){
                        case 'title.en': setEnTitleErr(err.msg); break;
                        case 'title.ar': setArTitleErr(err.msg); break;
                        case 'category': setPickedCategoryErr(err.msg); break;
                        case 'subcategory': setPickedSubcategoryErr(err.msg); break;
                        case 'stock': setStockErr(err.msg); break;
                        case 'price': setPriceErr(err.msg); break;
                    }
                })
            } else {
                setShowAlert(true);
                console.log('REEESSSSS', res);
            }
        })
        .catch(err => console.log('ERRR', err));
    }
    
    // Get image permission
    useEffect(() => {
        (async () => {
            if(Platform.OS !== 'web'){
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if(status !== 'granted') {
                    alert('Sorry, we need camera roll permission to register!')
                }
            }
        })();
    }, []);
    
    // Pick image
    const pickImage = async () => {
        ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        })
        .then(res => {
            console.log(res);
            if(!res.cancelled) {
                res.id = Math.random();
                setImages(images => [...images, res]);
            }
        })
    }

    const removeImage = (id) => {
        setImages(images => images.filter(image => image.id !== id));
    }

    const checkNotEmpty = () => {
        console.log('not empty says', (enTitle && arTitle && pickedCategory && pickedSubcategory && stock && price && images.length !== 0) === true)
        return enTitle && arTitle && pickedCategory && pickedSubcategory && stock && price && images.length !== 0;
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
                <TextLato style={{fontSize: RFPercentage(2), marginTop: height * 0.04, textAlign: 'center', color: 'white'}}>You have successfully added a new product! ({enTitle})</TextLato>
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

    return(
        <KeyboardAvoidingView keyboardVerticalOffset = {headerHeight + 64} style={styles.container}>
            <Alert />
            <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
                <Icon type="Feather" name="arrow-left" size={RFPercentage(3)} color="black" />
            </TouchableOpacity>
            <ScrollView>
                <View style={{paddingHorizontal: 20}}>
                    <TextLato style={{fontSize: RFPercentage(3)}} bold>Add Product</TextLato>
                    <TextLato italic>Products marked with an asterisk (*) are obligatory</TextLato>
                    <View style={styles.inputContainer}>
                        <TextErrorInput
                            value={enTitle}
                            error={enTitleErr}
                            setValue={setEnTitle}
                            title={'English Title*'}
                            placeholder={'Adidas Pro Max 20'} 
                        />
                        <TextErrorInput
                            value={arTitle}
                            error={arTitleErr}
                            setValue={setArTitle}
                            title={'Arabic Title*'}
                            placeholder={'اديداس برو ماكس 20'} 
                        />
                        <TextErrorInput
                            value={enDescription}
                            error={enDescriptionErr}
                            setValue={setEnDescription}
                            title={'English Description'}
                            placeholder={'A brief description describing your product...'}
                            multiline
                        />
                        <TextErrorInput
                            value={arDescription}
                            error={arDescriptionErr}
                            setValue={setArDescription}
                            title={'Arabic Description'}
                            placeholder={'وصف موجز يصف منتجك كحزمة ...'} 
                            multiline
                        />
                        <TextErrorInput
                            value={stock}
                            error={stockErr}
                            setValue={setStock}
                            title={'Stock*'}
                            placeholder={'0'}
                            keyboardType={'number-pad'} 
                        />
                        <TextErrorInput
                            value={price}
                            error={priceErr}
                            setValue={setPrice}
                            title={'Price* (EGP)'}
                            placeholder={'0.00'}
                            keyboardType={'number-pad'} 
                        />
                    </View>
                </View>

                {/* IMAGES */}
                <TextLato style={styles.label}>Images</TextLato>
                <ScrollView style={styles.categories} horizontal>

                    {images.map(image => (
                    <ImageBackground
                        key={Math.random()}
                        source={{uri: image.uri}}
                        style={{...styles.imageContainer, aspectRatio: image.width/image.height}}>
                            <TouchableOpacity onPress={() => removeImage(image.id)} style={styles.trashContainer}>
                                <Icon type="Feather" name="trash" color="white" size={RFPercentage(2.5)} />
                            </TouchableOpacity>
                    </ImageBackground>
                    ))}

                    <TouchableOpacity onPress={() => pickImage()} style={styles.addImageContainer}>
                        <Icon type="AntDesign" name="plus" color="white" size={RFPercentage(2.5)} />
                        <TextLato style={{color: 'white', fontSize: RFPercentage(1.5)}}>Add Image</TextLato>
                    </TouchableOpacity>
                </ScrollView>

                {/* CATEGORIES */}
                <TextLato style={styles.label}>Pick Category</TextLato>
                <ScrollView horizontal contentContainerStyle={styles.categories}>
                    {categories.map(category => {
                        return(
                        <TouchableOpacity
                            key={category._id}
                            activeOpacity={0.7}
                            style={{...styles.category, backgroundColor: pickedCategory === category._id ? gStyles.color_0 : gStyles.color_3}}
                            onPress={() => setPickedCategory(category._id)}
                        >
                            <Icon type={category.iconType} color="white" size={RFPercentage(5)} style={{marginBottom: height * 0.01}} name={category.icon} />
                            <TextLato style={{textAlign: 'center', color: 'white', fontSize: RFPercentage(1.6)}}>{category.name.en}</TextLato>
                        </TouchableOpacity>)
                    })}
                </ScrollView>
                
                {/* SUBCATEGORIES */}
                <TextLato style={styles.label}>Pick Subcategory</TextLato>
                {pickedCategory === '' ? <View style={{marginHorizontal: 20, height: width * 0.35, justifyContent: 'center', alignItems: 'center', borderColor: gStyles.color_3, borderWidth: 1, borderRadius: 3}}>
                    <TextLato>Please Pick a Category</TextLato></View> : 
                <ScrollView horizontal style={styles.categories}>
                {subcategories.map(subcategory => {
                        return(
                        <TouchableOpacity
                            key={subcategory._id}
                            activeOpacity={0.7}
                            style={{...styles.category, backgroundColor: pickedSubcategory === subcategory._id ? gStyles.color_0 : gStyles.color_3}} 
                            onPress={() => setPickedSubcategory(subcategory._id)}
                        >
                            <Icon type={subcategory.iconType} color="white" size={RFPercentage(5)} style={{marginBottom: height * 0.01}} name={subcategory.icon} />
                            <TextLato style={{textAlign: 'center', color: 'white', fontSize: RFPercentage(1.6)}}>{subcategory.name.en}</TextLato>
                        </TouchableOpacity>)
                })}
                </ScrollView>
                }
            
                {/* SPECIFICATIONS */}
                <TextLato style={styles.label}>Specifications
                <TextLato italic style={{fontSize: RFPercentage(1.7), color: gStyles.color_1}}>   (weight, model, etc..)</TextLato></TextLato>
                <View>
                    {specifications.map(specification => {
                        const index = specifications.indexOf(specification);
                        console.log('Specification currently is', specifications[index])
                        return <Specification setSpecfications={setSpecfications} titleEn={specification.titleEn} index={index} />
                    })}
                    <TouchableOpacity 
                        onPress={() => setSpecfications(specifications => specifications.concat({titleEn: '', titleAr: ''}))} 
                        style={{justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: gStyles.color_0, margin: 20, padding: 10}}>
                        <Icon type="AntDesign" name="plus" size={RFPercentage(3)} color={'white'} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    onPress={() => checkNotEmpty() ? submitProduct() : null}
                    style={{...styles.submitButton, backgroundColor: checkNotEmpty() ? gStyles.color_0 : gStyles.color_3 }}
                >
                    <TextLato bold style={{color: 'white', fontSize: RFPercentage(2)}}>SUBMIT</TextLato>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1
    },
    backContainer: {
        marginVertical: 20,
        marginHorizontal: 10

    },
    inputContainer: {
        marginTop: height * 0.05
    },
    label: {
        fontSize: RFPercentage(2),
        marginBottom: height * 0.02,
        marginHorizontal: 20
    },
    categories: {
        flexDirection: 'row',
        marginBottom: height * 0.02,
        paddingHorizontal: 15,
    },
    category: {
        width: width * 0.25,
        height: width * 0.35,
        backgroundColor: gStyles.color_3,
        marginHorizontal: 3,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        height: width * 0.35,
        backgroundColor: gStyles.color_0,
        alignItems: 'flex-end',
        padding: 5,
        marginRight: 5
    },
    addImageContainer: {
        width: width * 0.25,
        height: width * 0.35,
        backgroundColor: gStyles.color_0,
        alignItems: 'center',
        justifyContent:'center', 
        marginRight: 20
    },
    trashContainer: {
        backgroundColor: gStyles.color_0,
        borderRadius: 100,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButton: {
        margin: 20,
        backgroundColor: gStyles.color_0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }
})

const TextErrorInput = (props) => {
    return (
        <View style={inputStyles.container}>
            <TextLato bold style={inputStyles.label}>{props.title}</TextLato>
            <TextInput placeholder={props.placeholder} style={inputStyles.input} {...props} onChangeText={props.setValue} />
            {props.error !== "" && <TextLato italic style={inputStyles.error}>{props.error}</TextLato>}
        </View>
    )
}

const inputStyles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: height * 0.02
    },
    label: {
        fontSize: RFPercentage(2),
        marginBottom: height * 0.01
    },
    input: {
        fontFamily: 'Cairo',
        fontSize: RFPercentage(2),
        width: '100%',
        minHeight: 35,
        color: 'black',
        borderColor: gStyles.color_3,
        borderBottomWidth: 1,
        marginBottom: height * 0.005
    },
    error: {
        fontSize: RFPercentage(1.6),
        color: gStyles.color_1
    }
})

const Specification = ({titleEn, setSpecfications, index}) => {

    return (
        <View style={{margin: 20, borderRadius: 10}}>
            <TextErrorInput 
                value={titleEn} 
                setValue={(title) => setSpecfications(specifications => {
                    console.log('current spec', specifications)
                    specifications[index].titleEn += title;
                    return specifications;
                })} 
                title={'English Specification Title'} 
                placeholder={'Weight, Color, Dimensions'} />
        </View>
    )
}

export default StoreProductsAdd;