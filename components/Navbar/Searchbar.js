import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Dimensions, Text, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
    const [loading, setLoading] = useState(true);
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const inputRef = useRef();
    const en = language === 'en';

    useEffect(() => {
        if(!text.length)
            setResults([[], [], [], []]);
    }, [text]);

    const searchInput = (text) => {
        if(!text.length)
            setResults([[], [], [], []]);
        else
            fetch(`${Constants.manifest.extra.apiUrl}/search/input`, {
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
                    <View style={{...searchStyles.subContainer, alignItems: en ? 'flex-start' : 'flex-end'}}>
                        <TextLato style={searchStyles.title}>{languageText.stores}</TextLato>
                        {stores.map(store => {
                            return <TextLato key={Math.random()} style={{marginVertical: 3, fontSize: RFPercentage(1.5), color: gStyles.color_1}}>{store.title}</TextLato>;
                        })}
                        <TextLato style={searchStyles.etcText}>{languageText.searchStores}</TextLato>
                    </View>
                    <View style={{...searchStyles.subContainer, alignItems: en ? 'flex-start' : 'flex-end'}}>
                        <TextLato style={searchStyles.title}>{languageText.products}</TextLato>
                        {products.map(product => {
                            return  <TouchableOpacity key={Math.random()} onPress={() => navigation.push('Product', {product})}>
                                        <TextLato style={{marginVertical: 3, fontSize: RFPercentage(1.5), color: gStyles.color_1}}>{product.title[language]}</TextLato>
                                    </TouchableOpacity>
                        })}
                        <TouchableOpacity key={Math.random()} onPress={() => navigation.push('ProductsList', {criteria: text})}>
                            <TextLato style={searchStyles.etcText}>{languageText.searchProducts}</TextLato>
                        </TouchableOpacity>
                    </View>
                    <View style={{...searchStyles.subContainer, alignItems: en ? 'flex-start' : 'flex-end'}}>
                        <TextLato style={searchStyles.title}>{languageText.categories}</TextLato>
                        {categories.map(category => {
                            return <TouchableOpacity key={Math.random()} onPress={() => navigation.push('Category', category)}>
                                        <TextLato style={{marginVertical: 3, fontSize: RFPercentage(1.5), color: gStyles.color_1}}>{category.name[language]}</TextLato>
                                    </TouchableOpacity>
                        })}
                        <TextLato style={searchStyles.etcText}>{languageText.searchCategories}</TextLato>
                    </View>
                    <View style={{...searchStyles.subContainer, alignItems: en ? 'flex-start' : 'flex-end'}} onPress={() => navigation.push('Subcategory', subcategory)}>
                        <TextLato style={searchStyles.title}>{languageText.subcategories}</TextLato>
                        {subcategories.map(subcategory => {
                            return <TextLato key={Math.random()} style={{marginVertical: 3, fontSize: RFPercentage(1.5), color: gStyles.color_1}}>{subcategory.name[language]}</TextLato>
                        })}
                        <TextLato style={searchStyles.etcText}>{languageText.searchSubcategories}</TextLato>
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
        display: 'flex',
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
    }
})

export default Searchbar;