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
import SalesGraph from '../../components/Store/Dashboard/SalesGraph';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import { useNavigation } from '@react-navigation/native';

const StoreProducts = () => {
    const navigation = useNavigation()
    return (
        <View>
            <StoreNavbar title={'Products'} />
            <TouchableOpacity onPress={() => navigation.push('Add Product')}>
                <TextLato>+ Add a Product</TextLato>
            </TouchableOpacity>
        </View>
    )
}

export default StoreProducts;