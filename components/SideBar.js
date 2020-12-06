import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { gStyles } from '../global.style';


function SideBar(props) {
    return (
        <ScrollView>
            <View style={styles.topView}>
                <ImageBackground style={styles.topDots} imageStyle={{borderRadius:100}} source={{uri: 'https://cdn.hipwallpaper.com/i/29/69/M5kWUT.png'}}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/logoM.png')} style={styles.logo} />
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.container}>
                <DrawerNavigatorItems {...props} />
            </View>
        </ScrollView>
    )
    };

const styles = StyleSheet.create({
    topView: {
        width: '100%',
        height: 180,
        backgroundColor: gStyles.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topDots: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: gStyles.background,
        borderWidth: 4,
        borderColor: gStyles.secondary,
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    logo: {
        width: 100,
        height: 100
    },
    container: {
        right: 0,
    },
});

export default SideBar;