import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../components/Header';
import { gStyles } from '../global.style';
import Constants from 'expo-constants';
import { useLanguage } from '../hooks/language';
import TextLato from '../components/utils/TextLato';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const CategoriesList = ({navigation}) => {
    const language = useLanguage();
    const en = language === 'en';
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/category`)
        .then(res => res.json())
        .then(res => setCategories(res))
    }, []);
    return (
        <View style={styles.container}>
            <Header details={{title: en ? 'Categories' : 'الاصناف'}} />
            <ScrollView contentContainerStyle={{paddingBottom: height * 0.01, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}} >
                {categories.map(category => {
                    return <CategoryListCard key={Math.random()} category={category} language={language} en={en} navigation={navigation} />
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: width * 0.48,
        marginHorizontal: width * 0.005,
        backgroundColor: gStyles.color_2,
        justifyContent: 'center',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: height * 0.03,
        marginTop: height * 0.005,
        flexDirection: 'column',
        height: height * 0.2
    }
})

const CategoryListCard = ({category, language, en, navigation}) => {
    const [subcategories, setSubcategories] = useState([]);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/subcategory/find-by-category/${category._id}`)
        .then(res => res.json())
        .then(res => setSubcategories(res.splice(0,2)))
    }, []);
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('Category', category)} style={styles.card} key={Math.random()}>
            {/* <Icon type={category.iconType} name={category.icon} color={'white'} size={RFPercentage(10)} /> */}
            <Image source={{uri: category.image}} style={{width: width * 0.15, aspectRatio: 1}} />
            <TextLato bold style={{fontSize: RFPercentage(1.6), textAlign: 'center', width: width * 0.2, marginTop: height * 0.02}}>{category.name[language]}</TextLato>
            {/* <ScrollView horizontal style={{width: width * 0.1, backgroundColor: 'rgba(0,0,0,0.1)', paddingVertical: height * 0.02}}>
                {subcategories.map(subcategory => {
                    return (
                        <TouchableOpacity key={Math.random()} style={{...subcategoryStyles.touchableBlock, transform: en ? [] : [{scaleX: -1}]}} activeOpacity={0.8} onPress={() => navigation.push('Subcategory', {...subcategory})}>
                        <View key={subcategory._id} style={subcategoryStyles.container}>
                            <Image style={{width: width * 0.07, aspectRatio: 1}} source={{uri: subcategory.image}} />
                        </View>
                        <TextLato bold style={{fontSize: RFPercentage(1.5), textAlign: 'center', color: 'black', marginTop: height * 0.01, width: width * 0.18, textTransform: 'capitalize'}}>{subcategory.name[language]}</TextLato>
                    </TouchableOpacity>
                    )
                })}
            </ScrollView> */}
        </TouchableOpacity>
    )
}

const subcategoryStyles = StyleSheet.create({
    touchableBlock: {
        alignItems: 'center'
        // paddingVertical: height * 0.05
    },
    container: {
        width: width * 0.12,
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 18,
    },
    scrollView: {
        width,
        marginTop: height * 0.01,
        paddingHorizontal: 3.5
    }
})

export default CategoriesList;