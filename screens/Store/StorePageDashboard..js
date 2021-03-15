import React, { useState, useEffect } from 'react';
import { View, Image, ScrollableView, StyleSheet, Dimensions, ImageBackground, Modal } from 'react-native';
import Header from '../../components/Header';
import TextLato from '../../components/utils/TextLato';
import Constants from 'expo-constants';
import { gStyles } from '../../global.style';
import Icon from '../../components/utils/Icon';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Reviews from '../../components/utils/Reviews';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import HomeComponent from '../../components/Store/HomeComponent';
import BrowseComponent from '../../components/Store/BrowseComponent';
import ReviewsComponent from '../../components/Store/ReviewsComponent';
import { useSelector } from 'react-redux';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import SellerCardProduct from '../../components/cards/Seller/SellerCardProduct';

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

const StorePageDashboard = (props) => {
    const [coverImage, setCoverImage] = useState('');
    const [ads, setAds] = useState([]);
    const store = useSelector(state => state.authReducer.store);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/page/${store._id}`)
        .then(res => res.json())
        .then(res => {
            setCoverImage(res.coverImage);
            setAds(res.homeAds);
        })
    }, []);
    // useEffect(() => {
    //     setAds(ads => ads.sort(sortByPosition))
    // }, [ads])

    const changePosition = (id, oldPosition, newPosition) => {
        if(newPosition >= ads.length) return;
        setAds( ads => 
            ads.map(element => {
            if(element._id === id){
                console.log(`IT'S ME!!!! I used to be ${element.position} and now I'll be ${newPosition}`);
                element.position = newPosition;
            } else
            if(element.position === newPosition){
                element.position = oldPosition;
                console.log(`element's new position is ${element.position}`)
            }
            return element;
            }).sort(sortByPosition)
    )}
    
    return (
        <View style={styles.container}>
            <StoreNavbar title={'Page Layout'} />
            <ScrollView contentContainerStyle={{padding: width * 0.05}}>
                <TextLato bold style={{fontSize: RFPercentage(2.5)}}>Store Banner</TextLato>
                <View style={styles.coverImageContainer}>
                    {coverImage !== '' && <Image source={{uri: coverImage}} style={styles.coverImage} />}
                    <View>
                        <View style={{justifyContent: 'center', alignItems: 'center', width: width * 0.2, height: width * 0.15, backgroundColor: gStyles.color_0}}>
                            <Icon color={'white'} size={RFPercentage(3)} type="Feather" name="edit" />
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', width: width * 0.2, height: width * 0.15, backgroundColor: gStyles.color_3}}>
                            <Icon color={gStyles.color_0} size={RFPercentage(3)} type="Feather" name="trash" />
                        </View>
                    </View>
                </View>
                <TextLato bold style={{fontSize: RFPercentage(2.5), marginTop: height * 0.03}}>Store Page/Ads</TextLato>
                <View style={{marginTop: height * 0.01}}>
                    {ads.map(ad => {
                        switch(ad.adType){
                            case 0: return <AdType_0 key={Math.random()} ad={ad} changePosition={changePosition} />;
                            case 1: return <AdType_1 key={Math.random()} ad={ad} changePosition={changePosition} />;
                            case 2: return <AdType_2 key={Math.random()} ad={ad} changePosition={changePosition} />;
                        }
                    })}
                </View>
                <View style={styles.addButton}>
                    <Icon type="AntDesign" name="plus" color={gStyles.color_0} size={RFPercentage(4)} />
                    <TextLato style={{color: gStyles.color_3, fontSize: RFPercentage(2), marginLeft: width * 0.1}}>Add Advertisement</TextLato>
                </View>
            </ScrollView>
        </View>
    )
}

const AdType_0 = ({ad, changePosition}) => {
    const [aspectRatio, setAspectRatio] = useState(1);
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
            </View>
        </View>
    )
}

const AdType_1 = ({ad, changePosition}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <View style={{width: width * 0.83}}>
                <SellerCardProduct product={ad.product} />
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
            </View>
        </View>
    )
}

const AdType_2 = ({ad, changePosition}) => {
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
        marginTop: height * 0.05,
        backgroundColor: 'white',
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

export default StorePageDashboard;