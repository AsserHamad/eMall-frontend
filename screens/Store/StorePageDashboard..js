import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, ImageBackground, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import TextLato from '../../components/utils/TextLato';
import Constants from 'expo-constants';
import { gStyles } from '../../global.style';
import Icon from '../../components/utils/Icon';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import SellerCardProduct from '../../components/cards/Seller/SellerCardProduct';
import ProductPicker from '../../components/utils/ProductPicker';
import CustomModal from '../../components/utils/CustomModal';
import { funcs } from '../../global.funcs';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

function sortByPosition( a, b ) {
    if ( a.position < b.position ){
      return -1;
    }
    if ( a.position > b.position ){
      return 1;
    }
    return 0;
  }

const StorePageDashboard = () => {
    const [coverImage, setCoverImage] = useState(undefined || 'https://www.cellmax.eu/wp-content/uploads/2020/01/Hero-Banner-Placeholder-Dark-1024x480-1.png');
    const [ads, setAds] = useState([]);
    const store = useSelector(state => state.authReducer.store);
    const token = useSelector(state => state.authReducer.token);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalStep, setModalStep] = useState(-1);
    const [aspectRatio, setAspectRatio] = useState(1);
    const [pickedProduct, setPickedProduct] = useState(undefined);
    
    const [image, setImage] = useState(undefined);
    const [uploading, setUploading] = useState(false);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/page/${store._id}`)
        .then(res => res.json())
        .then(res => {
            setCoverImage(res.coverImage);
            setAds(res.homeAds);
        })
    }, []);

    useEffect(() => {
        if(image)
            Image.getSize(image, (width, height) => setAspectRatio(width/height));
    }, [image]);

    const changePosition = (id, oldPosition, newPosition) => {
        if(newPosition >= ads.length) return;
            const newAds = ads.map(element => {
            if(element._id === id){
                element.position = newPosition;
            } else
            if(element.position === newPosition){
                element.position = oldPosition;
            }
            return element;
            }).sort(sortByPosition)
        setAds(newAds);
        fetch(`${Constants.manifest.extra.apiUrl}/store/page`, {
            method: 'put',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({coverImage, homeAds: newAds})
        });
    }

    const removeAd = (id) => {
        let removed = false;
        const newAds =  ads.filter(ad => {
            if(ad._id !== id){
                if(removed)
                    ad.position--;
                return ad;
            } else removed = true;
        });
        setAds(newAds);
        fetch(`${Constants.manifest.extra.apiUrl}/store/page`, {
            method: 'put',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({coverImage, homeAds: newAds})
        });
    }

    const confirm = () => {
        setUploading(true);
        if(modalStep === 0 || modalStep === 2){
            funcs.uploadImage(image, store.title, token)
            .then(res => {
                let adverts = ads.map(ad => ({...ad, position: ad.position + 1}))
                const newAds = adverts.concat({
                    position: 0,
                    adType: modalStep,
                    image: res.location,
                    product: pickedProduct
                }).sort((a, b) => a.position - b.position);
                updatePage(newAds, coverImage)
            })
        } else {
            let adverts = ads.map(ad => ({...ad, position: ad.position + 1}))
            const newAds = adverts.concat({
                position: 0,
                adType: modalStep,
                product: pickedProduct
            }).sort((a, b) => a.position - b.position);
            updatePage(newAds, coverImage)
        }
    }

    const updatePage = (newAds, coverImage) => {
            fetch(`${Constants.manifest.extra.apiUrl}/store/page`, {
                method: 'put',
                headers: {token, 'Content-Type': 'application/json'},
                body: JSON.stringify({coverImage, homeAds: newAds})
            })
            .then(res => res.json())
            .then(res => {
                setUploading(false);
                setCoverImage(res.coverImage);
                setAds(res.homeAds);
                setModalVisible(false);
            })
    }

    const changeBanner = (uri) => {
        funcs.uploadImage(uri, store.title, token)
        .then(({location}) => {
            updatePage(ads, location)
        });
    };

    const ModalContent = (
        <CustomModal confirm={confirm} modalVisible={modalVisible} setModalVisible={setModalVisible}>
            <View style={{alignItems: 'center'}}>
                <TextLato bold>Pick an Ad type</TextLato>
                <View style={{flexDirection: 'row', marginVertical: height * 0.02}}>
                    <TouchableOpacity style={{...modalStyles.button, backgroundColor: modalStep === 0 ? gStyles.color_2 : 'black'}} onPress={() => setModalStep(0)}>
                        <TextLato style={{color: 'white'}}>Static Image</TextLato>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...modalStyles.button, backgroundColor: modalStep === 1 ? gStyles.color_2 : 'black'}} onPress={() => setModalStep(1)}>
                        <TextLato style={{color: 'white'}}>Product</TextLato>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...modalStyles.button, backgroundColor: modalStep === 2 ? gStyles.color_2 : 'black'}} onPress={() => setModalStep(2)}>
                        <TextLato style={{color: 'white'}}>Product Ad</TextLato>
                    </TouchableOpacity>
                </View>
                {(modalStep === 0 || modalStep === 2) && (
                    <TouchableOpacity onPress={() => funcs.chooseImage(setImage)} style={{width: '100%', alignItems: 'center'}}>
                        <Image style={{width: '70%', aspectRatio, maxHeight: height * 0.2}} source={{uri: image || 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'}} />
                    </TouchableOpacity>
                )}
                {(modalStep === 1 || modalStep === 2) && (
                    <ProductPicker style={{height: height * 0.4, width: width * 0.65, marginTop: height * 0.02}} pickedProduct={pickedProduct} setPickedProduct={setPickedProduct}  />
                    )}
                {uploading && <View style={{height: height * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                    <TextLato>Uploading...</TextLato>
                    <ActivityIndicator color={gStyles.color_2} size={RFPercentage(4)} />
                </View>}
            </View>
        </CustomModal>
    )
    
    return (
        <View style={styles.container}>
            <StoreNavbar title={'Page Layout'} />
            <ScrollView contentContainerStyle={{padding: width * 0.05}}>
                {ModalContent}
                <TextLato bold style={{fontSize: RFPercentage(2.5)}}>Store Banner</TextLato>
                <View style={styles.coverImageContainer}>
                    {coverImage !== '' && <Image source={{uri: coverImage}} style={styles.coverImage} />}
                    <View>
                        <TouchableOpacity onPress={() => funcs.chooseImage(changeBanner, [7,3])} style={{justifyContent: 'center', alignItems: 'center', width: width * 0.2, height: width * 0.3, backgroundColor: gStyles.color_0}}>
                            <Icon color={'white'} size={RFPercentage(3)} type="Feather" name="edit" />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: width * 0.2, height: width * 0.15, backgroundColor: gStyles.color_3}}>
                            <Icon color={gStyles.color_0} size={RFPercentage(3)} type="Feather" name="trash" />
                        </TouchableOpacity> */}
                    </View>
                </View>
                <TextLato bold style={{fontSize: RFPercentage(2.5), marginTop: height * 0.03}}>Store Page/Ads</TextLato>
                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Icon type="AntDesign" name="plus" color={'white'} size={RFPercentage(4)} />
                    <TextLato style={{color: 'white', fontSize: RFPercentage(2), marginLeft: width * 0.1}}>Add Block</TextLato>
                </TouchableOpacity>
                <View style={{marginTop: height * 0.01}}>
                    {ads.map(ad => {
                        switch(ad.adType){
                            case 0: return <AdType_0 key={Math.random()} ad={ad} changePosition={changePosition} removeAd={removeAd} />;
                            case 1: return <AdType_1 key={Math.random()} ad={ad} changePosition={changePosition} removeAd={removeAd} />;
                            case 2: return <AdType_2 key={Math.random()} ad={ad} changePosition={changePosition} removeAd={removeAd} />;
                        }
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

const AdType_0 = ({ad, changePosition, removeAd}) => {
    const [aspectRatio, setAspectRatio] = useState(1);
    useEffect(() => {
        Image.getSize(ad.image, (width, height) => setAspectRatio(width/height));
    }, [])
    return (
        <View style={{flexDirection: 'row'}}>
            <ImageBackground source={{uri: ad.image}} style={{width: width * 0.83, aspectRatio}}>
                <View style={{width: width * 0.3, backgroundColor: gStyles.color_0, alignItems: 'center', justifyContent: 'center', paddingVertical: height * 0.01}}>
                    <TextLato style={{color: 'white', fontSize: RFPercentage(2)}}>Image</TextLato>
                </View>
            </ImageBackground>
            <View>
                <TouchableOpacity 
                    style={{justifyContent: 'center', alignItems: 'center', width: width * 0.07, height: width * 0.08, backgroundColor: gStyles.color_0}}
                    onPress={() => changePosition(ad._id , ad.position, ad.position - 1)}
                >
                    <Icon color={'white'} size={RFPercentage(3)} type="Feather" name="arrow-up" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{justifyContent: 'center', alignItems: 'center', width: width * 0.07, height: width * 0.08, backgroundColor: gStyles.color_3}}
                    onPress={() => changePosition(ad._id ,ad. position, ad.position + 1)}
                >
                    <Icon color={'white'} size={RFPercentage(3)} type="Feather" name="arrow-down" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{justifyContent: 'center', alignItems: 'center', width: width * 0.07, height: width * 0.08, backgroundColor: gStyles.color_3}}
                    onPress={() => removeAd(ad._id ,ad. position)}
                >
                    <Icon color={'white'} size={RFPercentage(3)} type="AntDesign" name="delete" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const AdType_1 = ({ad, changePosition, removeAd}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <View style={{width: width * 0.83}}>
                <SellerCardProduct seller style={{paddingVertical: height * 0.02}} product={ad.product} />
            </View>
            <View>
                <TouchableOpacity 
                    style={{justifyContent: 'center', alignItems: 'center', width: width * 0.07, height: width * 0.08, backgroundColor: gStyles.color_0}}
                    onPress={() => changePosition(ad._id , ad.position, ad.position - 1)}
                >
                    <Icon color={'white'} size={RFPercentage(3)} type="Feather" name="arrow-up" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{justifyContent: 'center', alignItems: 'center', width: width * 0.07, height: width * 0.08, backgroundColor: gStyles.color_3}}
                    onPress={() => changePosition(ad._id ,ad. position, ad.position + 1)}
                >
                    <Icon color={'white'} size={RFPercentage(3)} type="Feather" name="arrow-down" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{justifyContent: 'center', alignItems: 'center', width: width * 0.07, height: width * 0.08, backgroundColor: gStyles.color_3}}
                    onPress={() => removeAd(ad._id ,ad. position)}
                >
                    <Icon color={'white'} size={RFPercentage(3)} type="AntDesign" name="delete" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const AdType_2 = ({ad, changePosition, removeAd}) => {
    const [aspectRatio, setAspectRatio] = useState(0);
    useEffect(() => {
        Image.getSize(ad.image, (width, height) => setAspectRatio(width/height));
    }, [])
    return (
        <View style={{flexDirection: 'row'}}>
            <ImageBackground source={{uri: ad.image}} style={{width: width * 0.83, aspectRatio}}>
                <View style={{width: width * 0.3, backgroundColor: gStyles.color_0, alignItems: 'center', justifyContent: 'center', paddingVertical: height * 0.01}}>
                    <TextLato style={{color: 'white', fontSize: RFPercentage(2)}}>Product Ad</TextLato>
                </View>
            </ImageBackground>
            <View>
                <TouchableOpacity 
                    style={{justifyContent: 'center', alignItems: 'center', width: width * 0.07, height: width * 0.08, backgroundColor: gStyles.color_0}}
                    onPress={() => changePosition(ad._id , ad.position, ad.position - 1)}
                >
                    <Icon color={'white'} size={RFPercentage(3)} type="Feather" name="arrow-up" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{justifyContent: 'center', alignItems: 'center', width: width * 0.07, height: width * 0.08, backgroundColor: gStyles.color_3}}
                    onPress={() => changePosition(ad._id ,ad. position, ad.position + 1)}
                >
                    <Icon color={'white'} size={RFPercentage(3)} type="Feather" name="arrow-down" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{justifyContent: 'center', alignItems: 'center', width: width * 0.07, height: width * 0.08, backgroundColor: gStyles.color_3}}
                    onPress={() => removeAd(ad._id ,ad. position)}
                >
                    <Icon color={'white'} size={RFPercentage(3)} type="AntDesign" name="delete" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    coverImageContainer: {
        flexDirection: 'row',
        marginTop: height * 0.01
    },
    coverImage: {
        width: width * 0.7,
        height: width * 0.3
    },
    addButton: {
        width: width * 0.9,
        height: width * 0.2,
        borderRadius: 20,
        marginVertical: height * 0.02,
        backgroundColor: gStyles.color_2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
        flexDirection: 'row'

    }
})

const modalStyles = StyleSheet.create({
    button: {
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.02,
        backgroundColor: 'cyan',
        borderRadius: 10,
        marginHorizontal: width * 0.01
    }
})

export default StorePageDashboard;