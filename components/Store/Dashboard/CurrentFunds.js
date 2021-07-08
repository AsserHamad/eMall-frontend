import React, { useState } from 'react';
import TextLato from '../../utils/TextLato';
import { Dimensions, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import useCredit from '../../../hooks/credit';
import useFocus from '../../../hooks/focus';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useLanguageText } from '../../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];


const CurrentFunds = () => {
    const credit = useCredit(refresh);
    const navigation = useNavigation();
    const text = useLanguageText('sellerDashboard');
    
    const [refresh, setRefresh] = useState(true);
    useFocus(() => setRefresh(refresh => !refresh), navigation);
    return (
        <View style={styles.container}>
        <TextLato bold style={styles.salesTitle}>{text.storeCredit}</TextLato>
        <TextLato italic style={styles.salesSubtitle}>{text.description}</TextLato>
        <TouchableOpacity onPress={() => {navigation.push('RequestWithdrawal')}}>
            <TextLato bold style={styles.requestText}>{text.request}</TextLato>
        </TouchableOpacity>
            <TextLato bold style={styles.sales}>{credit.toFixed(2)} {text.egp}</TextLato>
            {/* <Icon style={styles.dollar} color={'rgba(255, 255, 255, 0.2)'} type="FontAwesome" size={RFPercentage(10)} name="dollar" /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.03,
        backgroundColor: '#EF6F6C'
    },
    salesTitle: {
        fontSize: RFPercentage(3),
        color: 'white'
    },
    salesSubtitle: {
        fontSize: RFPercentage(1.5),
        color: 'white',

    },
    requestText: {
        fontSize: RFPercentage(1.5),
        color: 'white',
        marginTop: height * 0.005,
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

export default CurrentFunds;