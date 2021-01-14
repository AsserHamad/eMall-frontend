import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const Ad = (props) => {
    const [aspectRatio, setAspectRatio] = useState(4/3);
    const ad = props.ad;
    const navigation = useNavigation();
    useEffect(() => {
        Image.getSize(ad.image, (width, height) => setAspectRatio(width/height))
    }, []);
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.push(ad.type === 0 ? 'Product' : 'Store', {product: {_id: ad.destination}})}>
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
    }
})

export default Ad;