import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import TextLato from '../utils/TextLato';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useLanguage, useLanguageText } from '../../hooks/language';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { gStyles } from '../../global.style';
import Icon from '../utils/Icon';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

function Searchbar(){
    const language = useLanguage();
    const languageText = useLanguageText('searchbar');
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const inputRef = useRef();
    const en = language === 'en';
    const apiUrl = Constants.manifest.extra.apiUrl;

    useEffect(() => {
        if(!text.length)
            setResults([[], [], [], []]);
    }, [text]);

    const searchInput = (text) => {
        if(!text.length)
            setResults([[], [], [], []]);
        else
            fetch(`${apiUrl}/search/input`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({criteria: text})
            })
            .then(res => res.json())
            .then(res => setResults(res))
    }

    const setResults = ([stores, products, categories, subcategories]) => {
        setStores(stores);
        setProducts(products);
        setCategories(categories);
        setSubcategories(subcategories);
    }
    return(
        <View>
            <View style={{...styles.searchBar, flexDirection: en ? 'row' : 'row-reverse'}}>
                <View style={styles.searchIcon}>{show?
                <TouchableOpacity onPress={() => {inputRef.current.blur();setShow(false)}}>
                    <Icon type={'Feather'} name={`arrow-${en ? 'left': 'right'}`} color='#a3a3a3' size={ 20 } />
                </TouchableOpacity>
                :
                    <Icon type={'Ionicons'} name="md-search" color='#a3a3a3' size={ 15 } />
                }
                </View>
                <TextInput
                    ref={inputRef}
                    onFocus={() => setShow(true)}
                    onBlur={() => setShow(false)}
                    placeholder={languageText.searchPlaceholder}
                    value={text}
                    onChangeText={text => {setText(text);searchInput(text)}}
                    style={{...styles.input, fontFamily: en ? 'Lato' : 'Cairo', textAlign: en ? 'left' : 'right'}}
                />
                    <View style={styles.closeIcon}>
                        <TouchableOpacity onPress={() => setText("")}>
                            <Icon type="Ionicons" name="md-close-circle" color='#a3a3a3' size={ RFPercentage(2.2) } />
                        </TouchableOpacity>
                    </View>
            </View>
            {show && <ScrollView style={searchStyles.container}>
                <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={height * 0.2}>

                    {/* Stores */}
                    <View style={{...searchStyles.subContainer, alignItems: en ? 'flex-start' : 'flex-end'}}>
                        <TextLato style={searchStyles.title}>{languageText.stores}</TextLato>
                        {stores.map(store => {
                            return (
                            <TouchableOpacity style={searchStyles.linkContainer} key={Math.random()} onPress={() => navigation.push('Store', {store: {_id: store._id}})}>
                                <TextLato bold style={searchStyles.linkStyle}>{store.title}</TextLato>
                            </TouchableOpacity>);
                        })}
                        <TouchableOpacity onPress={() => navigation.push('SearchPage', {criteria: text, path: `${apiUrl}/store/search`, type: 'Store'})}>
                            <TextLato style={searchStyles.etcText}>{languageText.searchStores}</TextLato>
                        </TouchableOpacity>
                    </View>

                    {/* Products */}
                    <View style={{...searchStyles.subContainer, alignItems: en ? 'flex-start' : 'flex-end'}}>
                        <TextLato style={searchStyles.title}>{languageText.products}</TextLato>
                        {products.map(product => {
                            return (
                            <TouchableOpacity key={Math.random()} style={searchStyles.linkContainer} key={Math.random()} onPress={() => navigation.push('Product', {product})}>
                                <TextLato bold style={searchStyles.linkStyle}>{product.title[language]}</TextLato>
                            </TouchableOpacity>);
                        })}
                        <TouchableOpacity onPress={() => navigation.push('SearchPage', {criteria: text, path: `${apiUrl}/product/search`, type: 'Product', skipRequest: 30})}>
                            <TextLato style={searchStyles.etcText}>{languageText.searchProducts}</TextLato>
                        </TouchableOpacity>
                    </View>

                    {/* Categories */}
                    <View style={{...searchStyles.subContainer, alignItems: en ? 'flex-start' : 'flex-end'}}>
                        <TextLato style={searchStyles.title}>{languageText.categories}</TextLato>
                        {categories.map(category => {
                            return (
                            <TouchableOpacity style={searchStyles.linkContainer} key={Math.random()} onPress={() => navigation.push('Category', category)}>
                                <TextLato bold style={searchStyles.linkStyle}>{category.name[language]}</TextLato>
                            </TouchableOpacity>);
                        })}
                        <TouchableOpacity onPress={() => navigation.push('SearchPage', {criteria: text, path: `${apiUrl}/category/search`, type: 'Category', skipRequest: 20})}>
                            <TextLato style={searchStyles.etcText}>{languageText.searchCategories}</TextLato>
                        </TouchableOpacity>
                    </View>

                    {/* Subcategories */}
                    <View style={{...searchStyles.subContainer, alignItems: en ? 'flex-start' : 'flex-end'}} onPress={() => navigation.push('Subcategory', subcategory)}>
                        <TextLato style={searchStyles.title}>{languageText.subcategories}</TextLato>
                        {subcategories.map(subcategory => {
                            return (
                            <TouchableOpacity style={searchStyles.linkContainer} key={Math.random()} onPress={() => navigation.push('Subcategory', subcategory)}>
                                <TextLato bold style={searchStyles.linkStyle}>{subcategory.name[language]}</TextLato>
                            </TouchableOpacity>);
                        })}
                        <TouchableOpacity onPress={() => navigation.push('SearchPage', {criteria: text, path: `${apiUrl}/subcategory/search`, type: 'Subcategory', skipRequest: 20})}>
                            <TextLato style={searchStyles.etcText}>{languageText.searchSubcategories}</TextLato>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>}
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        width: width * 0.97,
        minHeight: 40,
        // backgroundColor: '#FFCECE',
        backgroundColor: 'white',
        borderRadius: 100,
        alignItems: 'center',
        marginTop: 3,
    },
    searchIcon: {
        width: '10%',
        alignItems: 'center'
    },
    closeIcon: {
        width: '5%',
        alignItems: 'center'
    },
    input: {
        height: '100%',
        width: '80%',
        paddingHorizontal: '1%',
    },

})

const searchStyles = StyleSheet.create({
    container: {
        height: '100%',
        paddingVertical: 10,
        paddingHorizontal: width * 0.03
    },
    subContainer: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingVertical: 10,
        marginBottom: height * 0.01
    },
    etcText: {
        color: '#888',
        marginTop: height * 0.01
    },
    title: {
        fontSize: RFPercentage(2.5),
        marginBottom: height * 0.01,
    },
    linkContainer: {
        paddingVertical: height * 0.005,
        marginVertical: 3,
    },
    linkStyle: {
        fontSize: RFPercentage(2),
        color: gStyles.color_1
    }
})

export default Searchbar;