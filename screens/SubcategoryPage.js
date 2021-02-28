import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import { gStyles } from '../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import SellerCardsList from '../components/utils/SellerCardsList';

const image = `https://img.freepik.com/free-psd/new-style-sale-promotion-banner-template_85212-146.jpg?size=626&ext=jpg&ga=GA1.2.356975455.1604448000`;
const SubcategoryPage = (props) => {
    const details = props.route.params;
    const [aspectRatio, setAspectRatio] = useState(0);
    useEffect(() => {
        Image.getSize(image, (width, height) => setAspectRatio(width / height));
    }, []);
    return (
        <View style={styles.container}>
            <Header details={{title: details.name.en}} />
            <View style={styles.sortButton}>
                <MaterialIcons name="sort" size={40} color={gStyles.color_0} />
            </View>
            <Image source={{uri: image}} style={{...styles.banner, aspectRatio}} />
            <SellerCardsList url={`${Constants.manifest.extra.apiUrl}/store/find-by-subcategory`} body={{subcategory: {...details}}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    banner: {
        width
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