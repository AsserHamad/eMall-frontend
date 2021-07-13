import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import Header from '../../components/Header';
import TextLato from '../../components/utils/TextLato';
import Constants from 'expo-constants';
import { gStyles } from '../../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Reviews from '../../components/utils/Reviews';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import HomeComponent from '../../components/Store/HomeComponent';
import BrowseComponent from '../../components/Store/BrowseComponent';
import ReviewsComponent from '../../components/Store/ReviewsComponent';
import { useSelector } from 'react-redux';
import Toast from 'react-native-easy-toast';
import { useLanguage, useLanguageText } from '../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const Store = (props) => {
    const [store, setStore] = useState(null);
    const [viewState, setViewState] = useState(props.route.params.state || 0);
    const [reviews, setReviews] = useState({average: 0, number: 0});
    const loggedIn = useSelector(state => state.authReducer.loggedIn);
    const token = useSelector(state => state.authReducer.token);
    const toast = useRef();
    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('storePage');
    
    const showToast = message => {
        toast.current.show(message);
    }

    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/${props.route.params.store._id}`)
        .then(res => res.json())
        .then(res => {
            if(res.page.homeAds.length === 0) setViewState(1);
            setStore(res)
        });

            fetch(`${Constants.manifest.extra.apiUrl}/store/reviews/overview/${props.route.params.store._id}`)
            .then(res => res.json())
            .then(res => {
                setReviews(res);
            })
        if(loggedIn){
            fetch(`${Constants.manifest.extra.apiUrl}/store/views/add`, {
                method: 'post',
                headers: {'Content-Type': 'application/json', token},
                body: JSON.stringify({store: props.route.params.store._id})
            }).then(res => res.json());
        }
    }, []);
    if(!store)
        return (
            <View style={{flex: 1}}>
            <Header details={{title: ''}} />
            <View style={{height: '90%', alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator color={gStyles.color_2} size={RFPercentage(7)} />
            </View>
            </View>
        )
    return (
        <View style={styles.container}>
            <Toast ref={_toast => toast.current = _toast} />
            <Header details={{title: store.title}} />
            <ScrollView style={styles.headerContainer}>
                <Image source={{uri: store.page.coverImage || 'https://image.freepik.com/free-vector/red-oriental-chinese-seamless-pattern-illustration_193606-43.jpg'}} style={styles.cover} />
                <View style={{...styles.header, flexDirection: en ? 'row' : 'row-reverse'}}>
                    <ImageBackground style={styles.logoContainer} source={{uri: store.logo}} imageStyle={styles.logo} />
                    <View style={styles.categories}>
                        {store.categories.map(category => (
                            <View style={{...styles.categoryContainer, backgroundColor: gStyles.color_3}} key={category._id}>
                                <Image source={{uri: category.image}} style={styles.icon} />
                            </View>
                        ))}
                    </View>
                </View>
                {/* STORE TITLE */}
                <TextLato bold style={{...styles.title, textAlign: en ? 'left' : 'right'}}>{store.title}</TextLato>
                
                {/* REVIEWS */}
                <Reviews number style={{...styles.reviews, flexDirection: en ? 'row' : 'row-reverse'}} size={RFPercentage(1.5)} reviews={reviews} />
                
                {/* MENU */}
                <View style={{...styles.menuContainer, flexDirection: en ? 'row' : 'row-reverse'}}>
                    {store.page.homeAds.length > 0 && <TouchableOpacity onPress={() => setViewState(state => state === 0 ? state : 0)}>
                        <View style={{...styles.menuItem, backgroundColor: viewState === 0 ? gStyles.color_1 : 'white' }}>
                            <TextLato style={{color: viewState !== 0 ? gStyles.color_0 : 'white'}}>{text.home}</TextLato>
                        </View>
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={() => setViewState(state => state === 1 ? state : 1)}>
                        <View style={{...styles.menuItem, backgroundColor: viewState === 1 ? gStyles.color_1 : 'white' }}>
                            <TextLato style={{color: viewState !== 1 ? gStyles.color_0 : 'white'}}>{text.allProducts}</TextLato>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setViewState(state => state === 2 ? state : 2)}>
                        <View style={{...styles.menuItem, backgroundColor: viewState === 2 ? gStyles.color_1 : 'white' }}>
                            <TextLato style={{color: viewState !== 2 ? gStyles.color_0 : 'white'}}>{text.reviews}</TextLato>
                        </View>
                    </TouchableOpacity>
                </View>
                
                {/* HOME BODY */}
                {viewState === 0 ? 
                <HomeComponent showToast={showToast} en={en} homeAds={store.page.homeAds} /> : viewState === 1 ?
                <BrowseComponent showToast={showToast} en={en} id={store._id} /> : 
                <ReviewsComponent reviews={store.reviews} text={text} en={en} id={store._id} />}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gStyles.background
    },
    cover: {
        width: '100%',
        height: height * 0.22
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: width * 0.05,
        marginTop: -height * 0.05,
        alignItems: 'center'
    },
    categories: {
        // height: 30,
        // width: 120,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.05,
        marginHorizontal: width * 0.02
    },
    categoryContainer: {
        width: 30,
        height: 30,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2
    },
    icon: {
        width: 25,
        borderRadius: 100,
        aspectRatio: 1,
        tintColor: 'white'
    },
    logoContainer: {
        padding: width * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.26,
        aspectRatio: 1,
        backgroundColor: gStyles.background,
        borderRadius: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 4,
    },
    logo: {
        width: width * 0.26,
        aspectRatio: 1,
        resizeMode: 'cover',
        borderRadius: 300,
    },
    title: {
        fontSize: RFPercentage(3),
        marginTop: height * 0.01,
        marginHorizontal: width * 0.05
    },
    reviews: {
        marginTop: height * 0.01,
        marginHorizontal: width * 0.05,
        marginBottom: height * 0.03
    },
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: width * 0.02,
        marginBottom: height * 0.015
    },
    menuItem: {
        padding: RFPercentage(2),
        borderRadius: 10,
        marginHorizontal: 5
    }
})

export default Store;