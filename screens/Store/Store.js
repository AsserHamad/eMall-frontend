import React, { useState, useEffect } from 'react';
import { View, Image, ScrollableView, StyleSheet, Dimensions } from 'react-native';
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

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const Store = (props) => {
    const [store, setStore] = useState(null);
    const [viewState, setViewState] = useState(0);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/${props.route.params.store._id}`)
        .then(res => res.json())
        .then(res => {res.reviewAverage = {average: 5, number: 4730};setStore(res)});
    }, []);
    return store ? (
        <View style={styles.container}>
            <Header details={{title: store.title}} />
            <ScrollView style={styles.headerContainer}>
                <Image source={{uri: store.page.coverImage}} style={styles.cover} />
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Image source={{uri: store.logo}} style={styles.logo} />
                    </View>
            <View style={styles.categories}>
                {store.categories.map(category => (
                    <View style={{...styles.categoryContainer, backgroundColor: gStyles.color_3}} key={Math.random()}>
                        <Icon type={category.iconType} color="white" name={category.icon} size={12} style={styles.icon} />
                    </View>
                ))}
            </View>
                </View>
                {/* STORE TITLE */}
                <TextLato bold style={styles.title}>{store.title}</TextLato>
                
                {/* REVIEWS */}
                <Reviews style={styles.reviews} size={RFPercentage(1.5)} reviews={store.reviewAverage} />
                
                {/* MENU */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => setViewState(state => state === 0 ? state : 0)}>
                        <View style={{...styles.menuItem, backgroundColor: viewState === 0 ? gStyles.color_0 : 'transparent' }}>
                            <TextLato style={{color: viewState !== 0 ? gStyles.color_0 : 'white'}}>Home</TextLato>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setViewState(state => state === 1 ? state : 1)}>
                        <View style={{...styles.menuItem, backgroundColor: viewState === 1 ? gStyles.color_0 : 'transparent' }}>
                            <TextLato style={{color: viewState !== 1 ? gStyles.color_0 : 'white'}}>Browse</TextLato>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setViewState(state => state === 2 ? state : 2)}>
                        <View style={{...styles.menuItem, backgroundColor: viewState === 2 ? gStyles.color_0 : 'transparent' }}>
                            <TextLato style={{color: viewState !== 2 ? gStyles.color_0 : 'white'}}>Reviews</TextLato>
                        </View>
                    </TouchableOpacity>
                </View>
                
                {/* HOME BODY */}
                {viewState === 0 ? 
                <HomeComponent homeAds={store.page.homeAds} /> : viewState === 1 ?
                <BrowseComponent id={store._id} /> : 
                <ReviewsComponent reviews={store.reviews} />}
            </ScrollView>
        </View>
    ) : <TextLato>Loading...</TextLato>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gStyles.background
    },
    cover: {
        width: '100%',
        height: height * 0.15
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: width * 0.05,
        marginTop: -height * 0.05,
        alignItems: 'center'
    },
    categories: {
        height: 30,
        width: 120,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.05,
        marginLeft: width * 0.02
    },
    categoryContainer: {
        width: 27,
        height: 27,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2
    },
    icon: {
        color: 'white'
    },
    logoContainer: {
        padding: width * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.24,
        backgroundColor: gStyles.background,
        borderRadius: 100,
    },
    logo: {
        width: width * 0.22,
        aspectRatio: 1
    },
    title: {
        fontSize: RFPercentage(3),
        marginLeft: width * 0.05
    },
    reviews: {
        marginTop: height * 0.01,
        marginLeft: width * 0.05,
        marginBottom: height * 0.03
    },
    menuContainer: {
        flexDirection: 'row',
        marginLeft: width * 0.02,
        marginBottom: height * 0.015
    },
    menuItem: {
        padding: RFPercentage(1),
        borderRadius: 10,
        borderWidth: 2,
        borderColor: gStyles.color_0,
        marginHorizontal: 5
    }
})

export default Store;