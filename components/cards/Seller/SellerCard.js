import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { 
    Ionicons,
    MaterialCommunityIcons,
    Feather,
    FontAwesome5,
    AntDesign,
    FontAwesome
} from '@expo/vector-icons';
import SellerCardProduct from './SellerCardProduct';
import TextLato from '../../utils/TextLato';

const SellerCard = props => {
    const seller = props.seller;
    return (
        <TouchableOpacity activeOpacity={1}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={{uri: seller.logo}} style={styles.logo} />
                </View>
                <View style={headerStyles.container}>
                    <TextLato style={headerStyles.title}>{seller.name.en}</TextLato>
                    <View style={styles.reviewsContainer}>
                        {[0, 1, 2, 3, 4].map((elem) => {
                            const num = seller.reviews.average - elem;
                            return num > 0.5 ? 
                                <FontAwesome key={Math.random()} name="star" size={RFPercentage(1.3)} color="#ffe234" /> : num > 0 ?
                                <FontAwesome key={Math.random()} name="star-half" size={RFPercentage(1.3)} color="#ffe234" /> :
                                null
                        })}
                        <Text style={styles.reviewNumber}>({seller.reviews.number})</Text>
                    </View>
                    <View style={styles.categoriesContainer}>
                        {seller.categories && seller.categories.map(details => {
                            switch(details.iconType){
                                case 'Ionicons': return <Ionicons key={Math.random()} name={details.icon} style={{...styles.category, backgroundColor: details.color}} size={RFPercentage(1.5)} />;
                                case 'MaterialCommunityIcons': return <MaterialCommunityIcons key={Math.random()} name={details.icon} style={{...styles.category, backgroundColor: details.color}} size={RFPercentage(1.5)} />;
                                case 'Feather': return <Feather key={Math.random()} name={details.icon} style={{...styles.category, backgroundColor: details.color}} size={RFPercentage(1.5)} />;
                                case 'FontAwesome5': return <FontAwesome5 key={Math.random()} name={details.icon} style={{...styles.category, backgroundColor: details.color}} size={RFPercentage(1.5)} />;
                                case 'AntDesign': return <AntDesign key={Math.random()} name={details.icon} style={{...styles.category, backgroundColor: details.color}} size={RFPercentage(1.5)} />;
                            }
                        })}
                    </View>
                </View>
                <ScrollView horizontal>
                    {seller.products.map(product => <SellerCardProduct key={Math.random()} product={product} />)}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.95,
        backgroundColor: 'white',
        shadowColor: 'black',
        marginTop: height * 0.06,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoContainer: {
        width: width * 0.23,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 100,
        position: 'absolute',
        top: -height * 0.05,
        left: width * 0.02,
        backgroundColor: 'white',
        // transform: [{translateX: width * 0.05}, {translateY: -height * 0.1}]
    },
    logo: {
        backgroundColor: 'white',
        width: width * 0.17,
        aspectRatio: 1,
        borderRadius: 100
    },
    reviewsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: height * 0.004,
        alignItems: 'center'
    },
    reviewNumber: {
        fontSize: RFPercentage(1.3),
        marginLeft: width * 0.01
    },
    categoriesContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: height * 0.005,
    },
    category: {
        width: width * 0.06,
        height: width * 0.06,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 100,
        marginRight: width * 0.005
    }
});

const headerStyles = StyleSheet.create({
    container: {
        marginLeft: width * 0.28,
        marginTop: height * 0.01
    },
    title: {
        fontSize: RFPercentage(2.2)
    }
})

export default SellerCard;