import React from 'react';
import { View, Dimensions, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const ConfirmPurchase = ({navigation, route}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.titleImage} source={{uri: 'https://img.icons8.com/bubbles/2x/purchase-order.png'}} />
            <TextLato bold style={styles.title}>Order Placed</TextLato>
            <TextLato style={styles.subtitle}>Sit back and relax. Your order will be reviewed by the store owners and will be back to you in no time!</TextLato>
            <TextLato italic style={styles.title}>Order #: {route.params.code}</TextLato>
            <TouchableOpacity onPress={() => navigation.popToTop()} activeOpacity={0.6} style={{width: width * 0.8, marginTop: height * 0.1}}>
                <View style={styles.buttonContainer}>
                    <TextLato bold style={styles.buttonText}>GO HOME</TextLato>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: width * 0.12
    },
    titleImage: {
        width: width * 0.6,
        aspectRatio: 1,
        marginTop: height * 0.1
    },
    title: {
        fontSize: RFPercentage(3),
        marginTop: height * 0.03
    },
    subtitle: {
        textAlign: 'center',
        marginTop: height * 0.015
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: height * 0.02,
        backgroundColor: gStyles.color_0,
        borderRadius: 10,
        width: '100%'

    },
    buttonText: {
        color: 'white',
        fontSize: RFPercentage(2)
    }
})

export default ConfirmPurchase;