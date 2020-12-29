import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
import { VirtualizedList } from 'react-native';

const ProductFullCard = (props) => {
    const product = props.product;
    console.log(product)
    return (
        <View style={styles.container}>
            <Text>{product.shortName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        height: 200,
        backgroundColor: 'red',
        marginVertical: 5
    }
})

export default ProductFullCard;