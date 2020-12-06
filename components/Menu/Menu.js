import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { gStyles } from '../../global.style';

const window = Dimensions.get('window');

function Menu(){
    return(
        <ScrollView style={styles.container}>
            <View>
                <Text>a</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: window.width,
        height: window.height,
        backgroundColor: gStyles.primary,
        padding:50
    }
})

export default Menu;