import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { gStyles } from '../../../global.style';
import Icon from '../../utils/Icon';
import TextLato from '../../utils/TextLato';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height ]

const ProductReviewCard = (props) => {
    const review = props.review;
    const loggedIn = useSelector(state => state.authReducer.loggedIn);
    const stars = [0, 1, 2, 3, 4].map((elem) => {
        const num = review.stars - elem;
        return num > 0.5 ? 
            <Icon type="FontAwesome" key={elem} name="star" size={RFPercentage(1.5)} color={gStyles.starColor} /> : num > 0 ?
            <Icon type="FontAwesome" key={elem} name="star-half" size={RFPercentage(1.5)} color={gStyles.starColor} /> :
            null
    })
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.clientIcon} source={{uri : "https://i.imgur.com/Q6x4k3s.png"}} />
                <TextLato bold style={styles.clientName}>{review.client.firstName} {review.client.lastName}</TextLato>
            </View>
            <View style={{flexDirection: 'row', marginBottom: height * 0.015}}>{stars}</View>
            <TextLato style={styles.reviewText}>{review.review}</TextLato>
            <View style={{position: 'absolute', bottom: 0, width: '100%',alignItems: 'center', paddingBottom: height * 0.01}}>
                {loggedIn && 
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center',alignItems: 'center'}}>
                    <View style={styles.helpfulButton}><Icon size={RFPercentage(2)} color={gStyles.color_0} type="Feather" name="thumbs-up" /></View>
                    <View style={styles.helpfulButton}><Icon size={RFPercentage(2)} color={gStyles.color_0} type="Feather" name="thumbs-down" /></View>
                </View>}
                <TextLato style={styles.helpfulText}>{review.helpful.length - review.notHelpful.length} People found this review helpful</TextLato>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#ccc',
        borderRadius: 10,
        borderWidth: 2,
        // backgroundColor: 'white',
        padding: RFPercentage(1.5),
        paddingBottom: height * 0.1,
        width: width * 0.7,
        marginRight: width * 0.02
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.015
    },
    clientIcon: {
        width: width * 0.07,
        aspectRatio: 1,
        borderRadius: 200
    },
    clientName: {
        fontSize: RFPercentage(1.7),
        marginLeft: width * 0.03,
    },
    reviewText: {
        fontSize: RFPercentage(1.5)
    },
    helpfulText: {
        fontSize: RFPercentage(1.4),
        color: '#999',
        marginTop: height * 0.01
    },
    helpfulButton: {
        backgroundColor: '#ddd',
        width: width * 0.1,
        marginHorizontal: width * 0.02,
        borderRadius: 200,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductReviewCard;