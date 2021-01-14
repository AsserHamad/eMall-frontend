import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SellerCard from '../components/cards/Seller/SellerCard';
import Header from '../components/Header';
import { gStyles } from '../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useLanguage } from '../hooks/language';
import TextLato from '../components/utils/TextLato';
import HeaderSearchbar from '../components/HeaderSearchbar';
import { useNavigation } from '@react-navigation/native';

const CategoryPage = (props) => {
    const [prods, setProds] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const details = props.route.params;
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/find-by-category`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({category: details._id, search })
        })
        .then(res => res.json())
        .then(res => {
            setSellers([...res, ...res, ...res, ...res, ...res, ...res, ...res]);
            setProds(res.products);
        });
    }, []);
    return (
        <View style={styles.container}>
            <Header search details={{title: details.name.en}} />
            {/* <HeaderSearchbar text={search} setText={setSearch} /> */}
            <SubcategoriesScroll details={details} />
            <View>

            </View>
            {/* <Image source={{uri: details.banner}} style={styles.banner} /> */}
            {!sellers.length ? <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size={height * 0.1} color={gStyles.primary_light} /></View> :
            <FlatList
                data={sellers}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <SellerCard key={item._id*Math.random()} seller={item} />}
                keyExtractor={product => `${Math.random()}`}
                // getItemCount={(data) => data.length}
                // onEndReached={() => {
                //     setLoading(true);
                //     setTimeout(() => {
                //         setProds(prods => prods.concat(products));
                //     }, 1000)
                // }}
                // getItem={(products, index) => {
                //     const product = products[index];
                //     return {
                //         ...product,
                //         key: `${product._id}${Math.random()}`
                //     }
                // }}
            />}
            {loading && <Text style={{position: 'absolute', bottom: 0}}>LOADING</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    banner: {
        width,
        aspectRatio: 3.9
    },
    sortButton: {
        position: 'absolute',
        width: width * 0.2,
        height: width * 0.2,
        zIndex: 2,
        bottom: height * 0.03,
        right: width * 0.08,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    }
});

export default CategoryPage;

const subs = [
    {
        _id: `${Math.random()}`,
        name: {
            en: `Pants`,
        },
        image: 'https://i.pinimg.com/originals/56/fd/17/56fd178072129c8eaf5dc1460d587d7a.png'
    },
    {
        _id: `${Math.random()}`,
        name: {
            en: `Dresses`,
        },
        image: 'https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png'
    },
    {
        _id: `${Math.random()}`,
        name: {
            en: `Children`,
        },
        image: 'https://lh3.googleusercontent.com/proxy/0BdfuWc_Twk4hIFJI3VHE1hD6Bl8BESiKCXWyjktX6Sy5w-AmsK275PgqE_C4eNR8pUG-GAJPISwqCQee3VdSShK9metj1y9fKCegY6QTH_FDiSxswA0LZaFy1UjDEyagaS1T3a6'
    },
    {
        _id: `${Math.random()}`,
        name: {
            en: `Shirts`,
        },
        image: 'https://lh3.googleusercontent.com/proxy/zQaHwWBFkpQ6oFhcRYhQdk9nLPuwNuk_Xpsp7xKUd53E8fgEUlAIygtupHweNGhG68ouodme04ygf03uZyVzAEfacJtqUc-Ik77jnD_XX8KYJECcG_qRlvY6Thm0mj2NRDIrN8I'
    },
    {
        _id: `${Math.random()}`,
        name: {
            en: `Shirts`,
        },
        image: 'https://lh3.googleusercontent.com/proxy/zQaHwWBFkpQ6oFhcRYhQdk9nLPuwNuk_Xpsp7xKUd53E8fgEUlAIygtupHweNGhG68ouodme04ygf03uZyVzAEfacJtqUc-Ik77jnD_XX8KYJECcG_qRlvY6Thm0mj2NRDIrN8I'
    },
    {
        _id: `${Math.random()}`,
        name: {
            en: `Shirts`,
        },
        image: 'https://lh3.googleusercontent.com/proxy/zQaHwWBFkpQ6oFhcRYhQdk9nLPuwNuk_Xpsp7xKUd53E8fgEUlAIygtupHweNGhG68ouodme04ygf03uZyVzAEfacJtqUc-Ik77jnD_XX8KYJECcG_qRlvY6Thm0mj2NRDIrN8I'
    },
    {
        _id: `${Math.random()}`,
        name: {
            en: `Shirts`,
        },
        image: 'https://lh3.googleusercontent.com/proxy/zQaHwWBFkpQ6oFhcRYhQdk9nLPuwNuk_Xpsp7xKUd53E8fgEUlAIygtupHweNGhG68ouodme04ygf03uZyVzAEfacJtqUc-Ik77jnD_XX8KYJECcG_qRlvY6Thm0mj2NRDIrN8I'
    },
    {
        _id: `${Math.random()}`,
        name: {
            en: `Shirts`,
        },
        image: 'https://lh3.googleusercontent.com/proxy/zQaHwWBFkpQ6oFhcRYhQdk9nLPuwNuk_Xpsp7xKUd53E8fgEUlAIygtupHweNGhG68ouodme04ygf03uZyVzAEfacJtqUc-Ik77jnD_XX8KYJECcG_qRlvY6Thm0mj2NRDIrN8I'
    }
    
]
const SubcategoriesScroll = ({details}) => {
    const navigation = useNavigation();
    const [subcategories, setSubcategories] = useState([]);
    const language = useLanguage();
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/subcategory/find-by-category/${details._id}`)
        .then(res => res.json())
        .then(res => setSubcategories([...res, ...subs]))
    }, [])
    return(
        <View style={{height: height * 0.11, borderColor: '#ddd', borderBottomWidth: 1}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={subcategoryStyles.scrollView} contentContainerStyle={{justifyContent: 'center'}}>
            {subcategories.map(subcategory => (
                <TouchableOpacity key={Math.random()} style={subcategoryStyles.touchableBlock} activeOpacity={0.4} onPress={() => navigation.push('Subcategory', {...subcategory})}>
                    <View key={subcategory._id} style={subcategoryStyles.container}>
                        <Image style={{width: width * 0.13, aspectRatio: 1, borderRadius: 100 }} source={{uri: subcategory.image}} />
                    </View>
                        <TextLato style={{fontSize: RFPercentage(1.4), textAlign: 'center'}}>{subcategory.name[language]}</TextLato>
                </TouchableOpacity>
            ))}
        </ScrollView>
        </View>
    )
}

const subcategoryStyles = StyleSheet.create({
    touchableBlock: {
    },
    container: {
        width: width * 0.17,
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3,
        borderWidth: 2,
        borderColor: gStyles.secondary_medium
    },
    scrollView: {
        
    }
})