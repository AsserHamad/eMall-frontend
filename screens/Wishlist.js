import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
import { connect } from 'react-redux';
import WishlistCard from '../components/cards/WishlistCard';
import Navbar from '../components/Navbar/Navbar';
import { gStyles } from '../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';

function Wishlist(props){
    const [fontsLoaded] = useFonts({
      'Lato': require('../assets/fonts/Lato-Light.ttf')
    });
    return (
    <View style={styles.container}>
        <Navbar />
        <View style={styles.headerContainer}>
            <MaterialCommunityIcons  color={gStyles.color_3} size={RFPercentage(3.5)} name="heart" />
            <Text style={styles.headerText}>MY WISHLIST</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {props.wishlist.products.map(item => {
                return <WishlistCard key={item._id} item={item} />
            })}
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        backgroundColor: gStyles.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollContainer: {
        width,
        flexGrow: 1,
        alignItems: 'center'
    },
    headerContainer: {
        width: width * 0.9,
        height: height * 0.1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginBottom: height * 0.01
    },
    headerText: {
        marginTop: height * 0.01,
        color: gStyles.color_3,
        fontSize: RFPercentage(3),
        letterSpacing: RFPercentage(0.6),
        fontFamily: 'Lato',
    }
})

const mapStateToProps = (state) => {
    return {
        wishlist: state.wishlistReducer.wishlist
    }
}

export default connect(mapStateToProps)(Wishlist);