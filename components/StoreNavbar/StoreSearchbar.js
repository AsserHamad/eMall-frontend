import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Dimensions, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import TextLato from '../utils/TextLato';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useLanguage } from '../../hooks/language';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { gStyles } from '../../global.style';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

function StoreSearchbar(){
    const language = useLanguage();
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const inputRef = useRef();

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
            <View style={styles.searchBar}>
                <View style={styles.searchIcon}>
                    <Ionicons name="md-search" color='#a3a3a3' size={ 15 } />
                </View>
                <TextInput
                    ref={inputRef}
                    onFocus={() => setShow(true)}
                    onBlur={() => setShow(false)}
                    placeholder={'Search for anything...'}
                    value={text}
                    onChangeText={text => {setText(text);searchInput(text)}}
                    style={styles.input}
                />
                    <View style={styles.closeIcon}>
                        <TouchableOpacity onPress={() => {inputRef.current.blur();setText("")}}>
                        <Ionicons name="md-close-circle" color='#a3a3a3' size={ RFPercentage(2.2) } />
                        </TouchableOpacity>
                    </View>
            </View>
            {show && <View style={searchStyles.container}>
                <View style={searchStyles.subContainer}>
                    <TextLato style={searchStyles.title}>Stores</TextLato>
                    {stores.map(store => {
                        return <TextLato key={Math.random()} style={{marginVertical: 3, fontSize: RFPercentage(1.5), color: gStyles.color_1}}>{store.title}</TextLato>
                    })}
                    <TextLato style={searchStyles.etcText}>Search for more stores...</TextLato>
                </View>
                <View style={searchStyles.subContainer}>
                    <TextLato style={searchStyles.title}>Products</TextLato>
                    {products.map(product => {
                        return  <TouchableOpacity key={Math.random()} onPress={() => navigation.push('Product', {product})}>
                                    <TextLato style={{marginVertical: 3, fontSize: RFPercentage(1.5), color: gStyles.color_1}}>{product.title[language]}</TextLato>
                                </TouchableOpacity>
                    })}
                    <TextLato style={searchStyles.etcText}>Search for more products...</TextLato>
                </View>
                <View style={searchStyles.subContainer}>
                    <TextLato style={searchStyles.title}>Categories</TextLato>
                    {categories.map(category => {
                        return <TouchableOpacity key={Math.random()} onPress={() => navigation.push('Category', category)}>
                                    <TextLato style={{marginVertical: 3, fontSize: RFPercentage(1.5), color: gStyles.color_1}}>{category.name[language]}</TextLato>
                                </TouchableOpacity>
                    })}
                    <TextLato style={searchStyles.etcText}>Search for more categories...</TextLato>
                </View>
                <View style={searchStyles.subContainer} onPress={() => navigation.push('Subcategory', subcategory)}>
                    <TextLato style={searchStyles.title}>Subcategories</TextLato>
                    {subcategories.map(subcategory => {
                        return <TextLato key={Math.random()} style={{marginVertical: 3, fontSize: RFPercentage(1.5), color: gStyles.color_1}}>{subcategory.name[language]}</TextLato>
                    })}
                    <TextLato style={searchStyles.etcText}>Search for more subcategories...</TextLato>
                </View>
            </View>}
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
        flexDirection: 'row',
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
        width: '77%',
        paddingRight: '5%',
        marginRight: 20
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

export default StoreSearchbar;