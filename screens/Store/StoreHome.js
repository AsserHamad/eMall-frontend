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

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const StoreHome = ({navigation, route}) => {
    const seller = useSelector(state => state.authReducer.account);
    const store = useSelector(state => state.authReducer.store);
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.nameContainer}>
                <TextLato style={styles.name}>Hello, {seller.name}</TextLato>
                <TextLato italic style={styles.jobTitle}>{seller.title}</TextLato>
            </View>
            <SalesGraph />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + height * 0.03,
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