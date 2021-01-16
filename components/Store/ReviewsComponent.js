import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

import SellerCardProduct from '../cards/Seller/SellerCardProduct'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import TextLato from '../utils/TextLato';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Reviews from '../utils/Reviews';
import { useSelector } from 'react-redux';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const ReviewsComponent = ({ reviews }) => {
    const loggedIn = useSelector(state => state.authReducer.loggedIn);
    return (
        <ScrollView>
            {reviews.map(review => {
                return (
                    <View style={styles.reviewContainer} key={Math.random()}>
                        <View style={styles.titleContainer}>
                            <Image style={styles.profilePic}
                                source={{
                                    uri: review.client.image ?
                                    review.client.image : 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                                }}/>
                            <TextLato bold style={styles.name}>{review.client.firstName} {review.client.lastName}</TextLato>
                        </View>
                        <Reviews reviews={{average: 5}} size={RFPercentage(2.3)} style={{marginBottom: height * 0.03}} />
                        <TextLato style={{marginBottom: height * 0.05}}>{review.review}</TextLato>
                        {loggedIn && <View>

                        </View>}
                        <TextLato style={styles.helpful}>{review.helpful.length} people found this review helpful.</TextLato>
                    </View>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    reviewContainer: {
        marginHorizontal: width * 0.05,
        backgroundColor: 'white',
        padding: 20
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.01
    },
    profilePic: {
        width: width * 0.1,
        aspectRatio: 1,
        borderRadius: 100
    },
    name: {
        marginLeft: width * 0.03,
        fontSize: RFPercentage(2.3)
    },
    helpful: {
        textAlign: 'center',
        color: '#888'
    }
})

export default ReviewsComponent;