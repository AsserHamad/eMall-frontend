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

const products = [
    {
    _id: 0,
    shortName: 'Adidas Running Shoes X23',
    image: 'https://www.pngkit.com/png/full/3-31523_adidas-shoes-clipart-adidas-logo-adidas-shoes-png.png',
    price: 1000,
    discount: 0.4,
    seller: {
        name: 'Adidas',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png',
        width: 30,
        height: 20
    }
    }, {
        _id: 1,
        shortName: 'Jubilee Air Jordans',
        image: 'https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/588807a7-e33e-4b9b-af57-6688d33daf33/air-jordan-11-jubilee-release-date.jpg',
        price: 5900,
        discount: 0.2,
        seller: {
            name: 'Nike',
            logo: 'https://i.pinimg.com/originals/9c/d1/bf/9cd1bf6c2d1a88e8ac473f62a2898c62.png',
            width: 30,
            height: 30
        },

    }, {
        _id: 2,
        shortName: 'Nike Sportswear Down-Fill Windrunner',
        image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/4f3a666c-b4cb-4ab6-b92a-3da6d69ba32e/sportswear-down-fill-windrunner-jacket-hHNjxL.jpg',
        price: 4500,
        discount: 0.3,
        seller: {
            name: 'Nike',
            logo: 'https://i.pinimg.com/originals/9c/d1/bf/9cd1bf6c2d1a88e8ac473f62a2898c62.png',
            width: 30,
            height: 30
        },

    }, {
        _id: 0,
        shortName: 'Adidas Running Shoes X23',
        image: 'https://www.pngkit.com/png/full/3-31523_adidas-shoes-clipart-adidas-logo-adidas-shoes-png.png',
        price: 1000,
        discount: 0.4,
        seller: {
            name: 'Adidas',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png',
            width: 30,
            height: 20
        }
    }, {
        _id: 1,
        shortName: 'Jubilee Air Jordans',
        image: 'https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/588807a7-e33e-4b9b-af57-6688d33daf33/air-jordan-11-jubilee-release-date.jpg',
        price: 5900,
        discount: 0.2,
        seller: {
            name: 'Nike',
            logo: 'https://i.pinimg.com/originals/9c/d1/bf/9cd1bf6c2d1a88e8ac473f62a2898c62.png',
            width: 30,
            height: 30
        },

    }, {
    _id: 2,
    shortName: 'Nike Sportswear Down-Fill Windrunner',
    image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/4f3a666c-b4cb-4ab6-b92a-3da6d69ba32e/sportswear-down-fill-windrunner-jacket-hHNjxL.jpg',
    price: 4500,
    discount: 0.3,
    seller: {
        name: 'Nike',
        logo: 'https://i.pinimg.com/originals/9c/d1/bf/9cd1bf6c2d1a88e8ac473f62a2898c62.png',
        width: 30,
        height: 30
    },

}];

const SubcategoryPage = (props) => {
    const [prods, setProds] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState({country: 'usa'});
    const details = props.route.params;
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/find-by-subcategory`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({subcategory: {...details}})
        })
        .then(res => res.json())
        .then(res => {
            setSellers(res);
            setProds(res.products);
        });
    }, []);
    return (
        <View style={styles.container}>
            <Header details={{title: details.name.en}} />
            <View style={styles.sortButton}>
                <MaterialIcons name="sort" size={40} color={gStyles.primary_light} />
            </View>
            <Image source={{uri: "https://img.freepik.com/free-psd/new-style-sale-promotion-banner-template_85212-146.jpg?size=626&ext=jpg&ga=GA1.2.356975455.1604448000"}} style={styles.banner} />
            {!sellers.length ? <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size={height * 0.1} color={gStyles.primary_light} /></View> :
            <FlatList
                data={sellers}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                renderItem={({ item }) => <SellerCard key={item._id*Math.random()} seller={item} />}
                keyExtractor={product => `${product._id}${Math.random()}`}
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
        alignItems: 'center'
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

export default SubcategoryPage;