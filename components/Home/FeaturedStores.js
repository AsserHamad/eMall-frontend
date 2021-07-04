import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, View, FlatList, ImageBackground, TouchableNativeFeedback } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { gStyles } from '../../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
import { useLanguage } from '../../hooks/language';
import HTTP from '../../src/utils/axios';
import TextLato from '../utils/TextLato';
import StoreCard from '../cards/StoreCard';

const FeaturedStores = () => {
    const [stores, setStores] = useState([]);
    const language = useLanguage();
    const en = language === 'en';
    useEffect(() => {
        HTTP('/advertisement/featured-stores')
        .then(res => {setStores(res.map(res => res.store))})
    }, []);
    return (
        <View>
            <TextLato bold style={styles.title}>{en ? 'Featured Stores' : 'محلات مميزة'}</TextLato>
            <View style={styles.storesContainer}>
                {stores.length > 0 ? (
                    <FlatList
                        data={stores}
                        horizontal
                        renderItem={store => <StoreCard store={store.item} />}
                        keyExtractor={store => store._id}
                        style={{transform: en ? [] : [{scaleX: -1}]}}
                        contentContainerStyle={{paddingVertical: height * 0.01, alignItems: 'center'}}
                    />
                ):(
                        <View style={styles.product}>
                                <ActivityIndicator color={'white'} size={RFPercentage(3.5)} />
                        </View>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: RFPercentage(2.5),
        marginHorizontal: width * 0.03,
        marginTop: height * 0.03,
    },
    storesContainer: {
        marginVertical: height * 0.01,
        paddingVertical: height * 0.005
    },
    storeContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,
        marginHorizontal: width * 0.02,
        width: width * 0.85,
        borderRadius: 40,
        height: height * 0.22,
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: '60%',
        resizeMode: 'cover',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40
    },
    bottomContainer: {
        paddingHorizontal: width * 0.05
    },
    logoContainer: {
        width: width * 0.25,
        backgroundColor: 'white',
        paddingHorizontal: width * 0.04,
        paddingVertical: width * 0.04,
        aspectRatio: 1,
        resizeMode: 'cover',
        borderRadius: 300,
        position: 'absolute',
        transform: [{translateY: -width * 0.15}, {translateX: width * 0.03}],
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,

    },
    logoImage: {
        borderRadius: 300,
    },
    storeTitle: {
        color: 'black',
        fontSize: RFPercentage(2)
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        height: height * 0.05
    },
    categoryContainer: {
        width: width * 0.05,
        height: width * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: gStyles.color_3,
        marginRight: width * 0.01,
        marginTop: height * 0.005,
        paddingHorizontal: width * 0.01
    },
    categoryImage: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
        tintColor: 'white'
    },
    moreButton: {
        marginVertical: height * 0.01,
        height: height * 0.05,
        backgroundColor: '#ebebeb',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: '90%'
    }
})

export default FeaturedStores;