import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, View, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { gStyles } from '../../global.style';
import { useLanguage } from '../../hooks/language';
import HTTP from '../../src/utils/axios';
import Icon from '../utils/Icon';
import TextLato from '../utils/TextLato';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];


const StoreCard = ({store}) => {
    const [page, setPage] = useState(store.page)
    const language = useLanguage();
    const en = language === 'en';
    const navigation = useNavigation();
    console.log(store)
    useEffect(() => {
        HTTP(`/store/${store._id}`).then(res => setPage(res.page));
    }, []);
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('Store', {store})} style={{...styles.storeContainer, transform: en ? [] : [{scaleX: -1}]}}>
            <Image style={styles.image} source={{uri: page?.coverImage || 'https://image.freepik.com/free-vector/red-oriental-chinese-seamless-pattern-illustration_193606-43.jpg'}} />
            <View style={styles.bottomContainer}>
                <ImageBackground source={{uri: store.logo}} style={{...styles.logoContainer,    
                    transform: [{translateY: -width * 0.15}, {translateX: en ? width * 0.03 : width * 0.57}],
                }} imageStyle={styles.logoImage} />
                <View style={{marginLeft: en ? width * 0.25 : 0, marginRight: en ? 0 : width * 0.25, paddingVertical: height * 0.01}}>
                    <TextLato bold style={styles.storeTitle}>{store.title}</TextLato>
                    <View style={{...styles.categoriesContainer, justifyContent: en ? 'flex-start' : 'flex-end'}}>
                        {store.categories.slice(0,4).map(details => {
                            return <View key={details._id} style={styles.categoryContainer}><Image source={{uri: details.image}} style={styles.categoryImage} /></View>
                        })}
                        <Icon type={'AntDesign'} color="white" name={'plus'} style={styles.categoryContainer} size={RFPercentage(1.7)} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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

export default StoreCard;