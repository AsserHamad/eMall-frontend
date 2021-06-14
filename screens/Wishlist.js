import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
import { connect } from 'react-redux';
import WishlistCard from '../components/cards/WishlistCard';
import Navbar from '../components/Navbar/Navbar';
import { gStyles } from '../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import TextLato from '../components/utils/TextLato';
import { useLanguageText } from '../hooks/language';

function Wishlist(props){
    const text = useLanguageText('wishlist');
    return (
    <View style={styles.container}>
        <Navbar />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
            <TextLato style={styles.headerText}>{text.myWishlist}</TextLato>
            <Image source={{uri: 'https://imgur.com/IUXbbOB.png'}} style={{width: width * 0.35, aspectRatio: 783/553}} />
            <TextLato italic style={{textAlign: 'center', color: 'black', width: '60%', fontSize: RFPercentage(1.5)}}>{text.wishlistDescription}</TextLato>
        </View>
            {props.wishlist.products.map(item => {
                return <WishlistCard key={item._id} item={item} />
            })}
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginBottom: height * 0.01,
        paddingVertical: height * 0.02
    },
    headerText: {
        color: gStyles.color_3,
        fontSize: RFPercentage(2.5),
        letterSpacing: RFPercentage(0.6),
    }
})

const mapStateToProps = (state) => {
    return {
        wishlist: state.wishlistReducer.wishlist
    }
}

export default connect(mapStateToProps)(Wishlist);