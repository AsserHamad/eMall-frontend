import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';

import TextLato from '../utils/TextLato';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Reviews from '../utils/Reviews';
import { useSelector } from 'react-redux';
import { gStyles } from '../../global.style';
import CustomModal from '../utils/CustomModal';
import Icon from '../utils/Icon';
import HTTP from '../../src/utils/axios';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const ReviewsComponent = ({ id, en, text }) => {
    const loggedIn = useSelector(state => state.authReducer.loggedIn);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [stars, setStars] = useState(0);
    const [review, setReview] = useState('');
    const token = useSelector(state => state.authReducer.token);
    
    const fetchReviews = () => {
        setLoading(true);
        HTTP(`/store/reviews/${id}`)
        .then(res => {
            setReviews(res);
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchReviews()
    }, []);


    const submit = () => {
        HTTP.post(`/client/store-review`, {
            store: id,
            stars,
            review
        })
        .then(res => {
            fetchReviews();
            setVisible(false);
        })
    }

    if(loading)
    return (
        <View style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={RFPercentage(5)} color={gStyles.color_2} />
        </View>
    )
    return (
        <ScrollView>
            <CustomModal modalVisible={visible} setModalVisible={setVisible} confirm={submit}>
                <View style={{width: width * 0.7, alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', marginBottom: height * 0.05}}>
                        {[1, 2, 3, 4, 5].map(num => {
                            return (
                                <TouchableOpacity onPress={() => setStars(num)} activeOpacity={0.6} key={num}>
                                    <Icon type="AntDesign" name={stars >= num ? 'star' : 'staro'} size={RFPercentage(5)} color={gStyles.starColor} />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <TextInput value={review} onChangeText={val => setReview(val)} multiline placeholder={text.typeReview} style={{width: '90%', marginBottom: height * 0.05}} />
                </View>
            </CustomModal>
            {loggedIn && <TouchableOpacity onPress={() => setVisible(true)} style={styles.addButton}>
                <TextLato bold style={{color: 'white', fontSize: RFPercentage(2)}}>{text.addReview}</TextLato>
            </TouchableOpacity>}
            {reviews.length > 0 ? reviews.map(review => {
                return (
                    <View style={{...styles.reviewContainer, alignItems: en ? 'flex-start' : 'flex-end'}} key={review._id}>
                        <View style={{...styles.titleContainer, flexDirection: en ? 'row' : 'row-reverse'}}>
                            <Image style={styles.profilePic}
                                source={{
                                    uri: review.client.image ?
                                    review.client.image : 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                                }}/>
                            <TextLato bold style={styles.name}>{review.client.firstName} {review.client.lastName}</TextLato>
                        </View>
                        <Reviews reviews={{average: review.stars}} size={RFPercentage(2.3)} style={{marginBottom: height * 0.03}} number={false} />
                        <TextLato style={{marginBottom: height * 0.05}}>{review.review}</TextLato>
                        {loggedIn && <View>

                        </View>}
                        <TextLato style={styles.helpful}>{review.helpful.length} {text.helpful}</TextLato>
                    </View>
                )
            }) : (
                <View style={{alignItems: 'center', marginTop: height * 0.04}}>
                    <TextLato bold style={{fontSize: RFPercentage(2)}}>This store has no reviews yet!</TextLato>
                    <Image source={{uri: 'https://imgur.com/ZooLIwj.png'}} style={{width: '80%', aspectRatio: 1}} />
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    addButton: {
        marginHorizontal: width * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: height * 0.014,
        borderRadius: 10,
        backgroundColor: gStyles.color_2,
        marginBottom: height * 0.02
    },
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
        alignItems: 'center',
        width: '100%',
        color: '#888'
    }
})

export default ReviewsComponent;