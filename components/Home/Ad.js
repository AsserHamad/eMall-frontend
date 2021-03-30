import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { gStyles } from '../../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const Ad = (props) => {
    const [aspectRatio, setAspectRatio] = useState(4/3);
    const ad = props.ad;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Image.getSize(ad.image, (width, height) => {
            setAspectRatio(width/height);
            setLoading(false);
        })
    }, []);
    if(loading)
        return <View style={styles.loadingContainer}><ActivityIndicator size={RFPercentage(4)} color={gStyles.color_2} /></View>
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => 
                ad.adType === 0 ? navigation.push('Product', {product: {_id: ad.product}})  : navigation.push('Store', {store: {_id: ad.store}})}>
                <Image style={{width: width * 0.95, aspectRatio: aspectRatio, borderRadius: 5}} source={{uri: ad.image}} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        marginVertical: height * 0.01,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingContainer: {
        width: width * 0.95,
        borderRadius: 5,
        aspectRatio: 2,
        marginVertical: height * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        
        elevation: 2,
        backgroundColor: 'white',
        alignSelf: 'center'
    }
})

export default Ad;