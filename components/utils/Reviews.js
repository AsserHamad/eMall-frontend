import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { gStyles } from '../../global.style';
import Icon from './Icon';
import TextLato from './TextLato';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

export default ({reviews, size, style, number}) => {
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
            {number && <TextLato style={{fontSize: size, marginHorizontal: width * 0.01}}>({reviews.number})</TextLato>}
        </View>
    )
}