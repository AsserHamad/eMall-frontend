import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Dimensions, KeyboardAvoidingView, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TextLato from '../utils/TextLato';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useLanguage, useLanguageText } from '../../hooks/language';
import useDebounce from '../../hooks/debounce';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { gStyles } from '../../global.style';
import Icon from '../utils/Icon';
import HTTP from '../../src/utils/axios';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const types = [{
    en: 'Stores',
    ar: 'قيد الانتظار',
    status: 0
}, {
    en: 'Products',
    ar: 'جاهز للإستلام',
    status: 1
}, {
    en: 'Categories',
    ar: 'منتهى',
    status: 2
}, {
    en: 'Subcategories',
    ar: 'ملغى',
    status: 3
}]

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
    const [status, setStatus] = useState(0);
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
            HTTP.post('/search/input', {criteria: text})
            .then(res => setResults(res))
    }

    const setResults = ([stores, products, categories, subcategories]) => {
        setStores(stores);
        setProducts(products);
        setCategories(categories);
        setSubcategories(subcategories);
    }

    const handleChange = (text) => {
        console.log('getting ', text)
        setText(text);
        searchInput(text);
    }
    return(
        <View>
            <View style={{...styles.searchBar, flexDirection: en ? 'row' : 'row-reverse'}}>
                <View style={styles.searchIcon}>{show?
                <TouchableOpacity onPress={() => {inputRef.current.blur();setShow(false);inputRef.current.clear()}}>
                    <Icon type={'Feather'} name={`arrow-${en ? 'left': 'right'}`} color='#a3a3a3' size={ 25 } />
                </TouchableOpacity>
                :
                    <Icon type={'Ionicons'} name="md-search" color='#a3a3a3' size={ 15 } />
                }
                </View>
                <TextInput
                    ref={inputRef}
                    onFocus={() => setShow(true)}
                    placeholder={languageText.searchPlaceholder}
                    onChangeText={useDebounce(handleChange, 200)}
                    style={{...styles.input, fontFamily: en ? 'Lato' : 'Cairo', textAlign: en ? 'left' : 'right'}}
                />
                    <View style={styles.closeIcon}>
                        <TouchableOpacity onPress={() => inputRef.current.clear()}>
                            <Icon type="Ionicons" name="md-close-circle" color='#a3a3a3' size={ 20 } />
                        </TouchableOpacity>
                    </View>
            </View>
            {show && <ScrollView style={searchStyles.container}>
                {/* STATUS BUTTON */}
                <ScrollView style={{height: height * 0.05, transform: en ? [] : [{scaleX: -1}]}} contentContainerStyle={{alignItems: 'center'}} horizontal showsHorizontalScrollIndicator={false}>
                    {types.map(stat => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            key={stat.status}
                            onPress={() => setStatus(stat.status)} 
                            style={{...styles.statusButton, backgroundColor: stat.status === status ? gStyles.color_2: 'white', transform: en ? [] : [{scaleX: -1}]}}>
                            <TextLato style={{ color: stat.status === status ? 'white' : 'black'}}>{stat[language]}</TextLato>
                        </TouchableOpacity>
                    )
                })}
                </ScrollView>

                    {/* Stores */}
                    {status === 0 && <View style={{...searchStyles.subContainer, alignItems: en ? 'flex-start' : 'flex-end'}}>
                        {stores.map(store => {
                            return (
                            <TouchableOpacity style={searchStyles.linkContainer} key={store._id} onPress={() => navigation.push('Store', {store: {_id: store._id}})}>
                                <Image source={{uri: store.logo}} style={searchStyles.image} />
                                <TextLato bold style={searchStyles.linkStyle}>{store.title}</TextLato>
                            </TouchableOpacity>);
                        })}
                        <TouchableOpacity onPress={() => navigation.push('SearchPage', {criteria: text, path: `/store/search`, type: 'Store'})}>
                            <TextLato style={searchStyles.etcText}>{languageText.searchStores}</TextLato>
                        </TouchableOpacity>
                    </View>}

                    {/* Products */}
                    {status === 1 && <View style={{...searchStyles.subContainer, alignItems: en ? 'flex-start' : 'flex-end'}}>
                        {products.map(product => {
                            return (
                            <TouchableOpacity key={product._id} style={searchStyles.linkContainer} onPress={() => navigation.push('Product', {product})}>
                            <Image source={{uri: product.images[0]}} style={searchStyles.image} />
                                <TextLato bold style={searchStyles.linkStyle}>{product.title[language]}</TextLato>
                            </TouchableOpacity>);
                        })}
                        <TouchableOpacity onPress={() => navigation.push('SearchPage', {criteria: text, path: `/product/search`, type: 'Product', skipRequest: 30})}>
                            <TextLato style={searchStyles.etcText}>{languageText.searchProducts}</TextLato>
                        </TouchableOpacity>
                    </View>}

                    {/* Categories */}
                    {status === 2 && <View style={{...searchStyles.subContainer, alignItems: en ? 'flex-start' : 'flex-end'}}>
                        {categories.map(category => {
                            return (
                            <TouchableOpacity style={searchStyles.linkContainer} key={category._id} onPress={() => navigation.push('Category', category)}>
                            <Image source={{uri: category.image}} style={searchStyles.image} />
                                <TextLato bold style={searchStyles.linkStyle}>{category.name[language]}</TextLato>
                            </TouchableOpacity>);
                        })}
                        <TouchableOpacity onPress={() => navigation.push('SearchPage', {criteria: text, path: `/category/search`, type: 'Category', skipRequest: 20})}>
                            <TextLato style={searchStyles.etcText}>{languageText.searchCategories}</TextLato>
                        </TouchableOpacity>
                    </View>}

                    {/* Subcategories */}
                    {status === 3 && <View style={{...searchStyles.subContainer, alignItems: en ? 'flex-start' : 'flex-end'}} onPress={() => navigation.push('Subcategory', subcategory)}>
                        {subcategories.map(subcategory => {
                            return (
                            <TouchableOpacity style={searchStyles.linkContainer} key={subcategory._id} onPress={() => navigation.push('Subcategory', subcategory)}>
                            <Image source={{uri: subcategory.image}} style={searchStyles.image} />
                                <TextLato bold style={searchStyles.linkStyle}>{subcategory.name[language]}</TextLato>
                            </TouchableOpacity>);
                        })}
                        <TouchableOpacity onPress={() => navigation.push('SearchPage', {criteria: text, path: `/subcategory/search`, type: 'Subcategory', skipRequest: 20})}>
                            <TextLato style={searchStyles.etcText}>{languageText.searchSubcategories}</TextLato>
                        </TouchableOpacity>
                    </View>}
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
        marginBottom: 5
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
    statusButton: {
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.015,
        borderRadius: 100,
        marginHorizontal: width * 0.007,
    }

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
        paddingVertical: height * 0.01,
        marginVertical: 3,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 2,
        width: width * 0.95,
        alignItems: 'center'
    },
    linkStyle: {
        fontSize: RFPercentage(1.5),
        color: 'black'
    },
    image: {
        width: width * 0.1,
        aspectRatio: 1,
        marginHorizontal: 10
    }
})

export default Searchbar;