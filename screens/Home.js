import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Button } from 'react-native';
import { useFonts } from 'expo-font';
import Navbar from '../components/Navbar/Navbar';
import Constants from 'expo-constants';
import MainHomeView from '../components/Home/MainHomeView/MainHomeView';
import { gStyles } from '../global.style';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';

function Home(props){
    const [fontsLoaded] = useFonts({
      'Lato': require('../assets/fonts/Lato-Regular.ttf')
    });

    return(
        <View style={styles.container}>
            <Navbar navigation={props.navigation} />
            <ScrollView style={{height: Dimensions.get('window').height - 60}}>
                <MainHomeView />
            </ScrollView>
            <TouchableHighlight style={styles.cartButton}>
                <FontAwesome5 color="white" size={20} name="cart-plus" />
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Lato',
        backgroundColor: gStyles.background,
        paddingTop: Constants.statusBarHeight,
        flex: 1
    },
    cartButton: {
        backgroundColor: gStyles.primary,
        width: 70,
        height: 70,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
        bottom: 0,
        zIndex: 9,
        alignSelf:'flex-end'
    }
});

export default Home;