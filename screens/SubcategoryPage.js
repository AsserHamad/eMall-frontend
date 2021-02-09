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
                <MaterialIcons name="sort" size={40} color={gStyles.color_0} />
            </View>
            <Image source={{uri: "https://img.freepik.com/free-psd/new-style-sale-promotion-banner-template_85212-146.jpg?size=626&ext=jpg&ga=GA1.2.356975455.1604448000"}} style={styles.banner} />
            {!sellers.length ? <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size={height * 0.1} color={gStyles.color_0} /></View> :
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