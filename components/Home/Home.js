import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import Navbar from '../Navbar/Navbar';
import MainHomeView from './MainHomeView/MainHomeView';

function Home(props){
    const [fontsLoaded] = useFonts({
      'Lato': require('../../assets/fonts/Lato-Regular.ttf')
    });

    return(
        <View style={styles.container}>
            <Navbar setMenu={props.setMenu} />
            <ScrollView style={{height: Dimensions.get('window').height - 60}}>
                <MainHomeView />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Lato',
        
    }
});

export default Home;