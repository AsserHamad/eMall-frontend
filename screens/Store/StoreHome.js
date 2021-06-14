import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import SalesGraph from '../../components/Store/Dashboard/SalesGraph';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import TotalViews from '../../components/Store/Dashboard/TotalViews';
import CurrentFunds from '../../components/Store/Dashboard/CurrentFunds';
import PendingFunds from '../../components/Store/Dashboard/PendingFunds';
import { useLanguage, useLanguageText } from '../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const StoreHome = () => {
    const seller = useSelector(state => state.authReducer.account);
    const store = useSelector(state => state.authReducer.store);
    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('sellerDashboard');
    return(
        <View style={styles.container}>
            <StoreNavbar title={text.dashboard} />
            <ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom: height * 0.04}}>
                <View style={styles.nameContainer}>
                    <TextLato style={styles.name}>{en ? 'Hello, ' : 'مرحبا, '}{seller.name}</TextLato>
                    <TextLato italic style={styles.jobTitle}>{seller.title}</TextLato>
                </View>
                <View style={{marginTop: height * 0.02, flexDirection: 'row', padding: width * 0.05, backgroundColor: 'white'}}>
                    <View style={{width: '70%', justifyContent: 'center'}}><TextLato bold style={{fontSize: RFPercentage(3)}}>{store.title}</TextLato></View>
                    <View style={{width: '30%', alignItems: 'center', justifyContent: 'center'}}><Image source={{uri: store.logo}} style={{width: width * 0.15, height: width * 0.15, resizeMode: 'contain'}} /></View>
                </View>

                {/* CURRENT FUNDS */}
                <CurrentFunds />

                {/* PENDING FUNDS */}
                <PendingFunds />

                {/* GRAPH */}
                <SalesGraph />

                {/* VIEWS */}
                <TotalViews />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.background,
        alignItems: 'center',
        flex: 1
    },
    name: {
        fontSize: RFPercentage(3)
    },
    jobTitle: {
        fontSize: RFPercentage(2)
    },
    nameContainer: {
        width: width * 0.9
    }
})

export default StoreHome;