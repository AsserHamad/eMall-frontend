import React, { useState, useEffect } from 'react';
import { View, Image, ScrollableView, StyleSheet, Dimensions, Text } from 'react-native';
import Header from '../../components/Header';
import TextLato from '../../components/utils/TextLato';
import Constants from 'expo-constants';
import { gStyles } from '../../global.style';
import Icon from '../../components/utils/Icon';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import SalesGraph from '../../components/Store/Dashboard/SalesGraph';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import TotalViews from '../../components/Store/Dashboard/TotalViews';
import CurrentFunds from '../../components/Store/Dashboard/CurrentFunds';
import PendingFunds from '../../components/Store/Dashboard/PendingFunds';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const StoreHome = ({navigation, route}) => {
    const seller = useSelector(state => state.authReducer.account);
    const store = useSelector(state => state.authReducer.store);
    console.log(store);
    return(
        <View style={styles.container}>
            <StoreNavbar title={'Dashboard'} />
            <ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom: height * 0.04}}>
                <View style={styles.nameContainer}>
                    <TextLato style={styles.name}>Hello, {seller.name}</TextLato>
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
                <View>
                    <TotalViews />
                </View>

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