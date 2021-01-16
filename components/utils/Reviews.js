import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { gStyles } from '../../global.style';
import Icon from './Icon';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

export default ({reviews, size, style}) => {
    const stars = [0, 1, 2, 3, 4].map((elem) => {
        const num = reviews.average - elem;
        return num > 0.5 ? 
            <Icon type="FontAwesome" key={Math.random()} name="star" size={size} color={gStyles.starColor} /> : num > 0 ?
            <Icon type="FontAwesome" key={Math.random()} name="star-half" size={size} color={gStyles.starColor} /> :
            null
    })
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', ...style}}>
            {stars}
            {reviews.number && <Text style={{fontSize: size, marginLeft: width * 0.01}}>({reviews.number})</Text>}
        </View>
    )
}