import React, {useState, useEffect} from 'react';
import TextLato from '../../utils/TextLato';
import { Dimensions, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { Constants } from 'react-native-unimodules';
import { useLanguageText } from '../../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];


const PendingFunds = () => {
    const token = useSelector(state => state.authReducer.token);
    const [funds, setFunds] = useState('-');
    const text = useLanguageText('sellerDashboard');

    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/pending-funds`, {headers: {token}})
        .then(res => res.json())
        .then(payments => {
            setFunds(payments.result)
        })
    }, []);
    return (
        <View style={styles.container}>
        <TextLato bold style={styles.salesTitle}>{text.pending}</TextLato>
        <TextLato italic style={styles.salesSubtitle}>{text.pendingDescription}</TextLato>
        <TextLato bold style={styles.sales}>{funds} {text.egp}</TextLato>
        {/* <Icon style={styles.dollar} color={'rgba(255, 255, 255, 0.2)'} type="FontAwesome" size={RFPercentage(10)} name="dollar" /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.03,
        backgroundColor: '#2c4f5b'
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

export default PendingFunds;