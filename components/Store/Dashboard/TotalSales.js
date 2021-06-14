import React, {useState, useEffect} from 'react';
import TextLato from '../../utils/TextLato';
import { Dimensions, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from '../../utils/Icon';
import { Constants } from 'react-native-unimodules';
import { useSelector } from 'react-redux';
import { useLanguage, useLanguageText } from '../../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const TotalSales = () => {
    const token = useSelector(state => state.authReducer.token);
    const [sales, setSales] = useState('-');
    const text = useLanguageText('sellerDashboard');
    const language = useLanguage();
    const en = language === 'en';
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/month-sales`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            setSales(res.result);
        })
    }, [])
    return (
        <View style={styles.container}>
            <TextLato bold style={styles.salesTitle}>{text.totalSales}</TextLato>
            <TextLato italic style={styles.salesSubtitle}>{text.salesDescription}</TextLato>
            <TextLato bold style={styles.sales}>{sales} {text.egp}</TextLato>
            <Icon style={{position: 'absolute', bottom: height * 0.02, right: en ? width * 0.05 : undefined, left: en ? undefined : width * 0.05}} color={'rgba(255, 255, 255, 0.2)'} type="FontAwesome" size={RFPercentage(10)} name="money" />
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
        
    }
})

export default TotalSales;