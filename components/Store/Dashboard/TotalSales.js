import React, {useState, useEffect} from 'react';
import TextLato from '../../utils/TextLato';
import { Dimensions, StyleSheet, View } from 'react-native';
import { gStyles } from '../../../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from '../../utils/Icon';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const TotalSales = (props) => {

    return (
        <View style={styles.container}>
            <TextLato bold style={styles.salesTitle}>Total Sales for this Month</TextLato>
            <TextLato italic style={styles.salesSubtitle}>Finances made during the month of January</TextLato>
            <TextLato bold style={styles.sales}>3,700 EGP</TextLato>
            <Icon style={styles.dollar} color={'rgba(255, 255, 255, 0.2)'} type="FontAwesome" size={RFPercentage(10)} name="dollar" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.03,
        backgroundColor: '#2C62FF'
    },
    salesTitle: {
        fontSize: RFPercentage(3),
        color: 'white'
    },
    salesSubtitle: {
        fontSize: RFPercentage(1.5),
        color: 'white',
        marginBottom: height * 0.05

    },
    sales: {
        fontSize: RFPercentage(4),
        color: 'white'
    },
    dollar: {
        position: 'absolute',
        bottom: height * 0.02,
        right: width * 0.05,
    }
})

export default TotalSales;