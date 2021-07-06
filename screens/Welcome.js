import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, View, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import TextLato from '../components/utils/TextLato';
import { gStyles } from '../global.style';
import { useLanguage } from '../hooks/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height, ]

const { Value, timing } = Animated;

export default ({navigation, route}) => {
    const language = useLanguage();
    const en = language === 'en';
    const [state, setState] = useState(0);
    const changeLanguage = () => {
        const newLang = `${language === 'en' ? 1 : 0}`;
        AsyncStorage.setItem('@language', newLang)
        .then(() => {
            Updates.reloadAsync()
        })
    }
    
    const logoOpacity = useRef(new Value(0)).current;
    const welcomeOpacity = useRef(new Value(0)).current;
    const textOpacity = useRef(new Value(0)).current;
    useEffect(() => {
        timing(logoOpacity, {
            duration: 1200,
            toValue: 1,
            useNativeDriver: true
        }).start();
        const t = setTimeout(() => {
              
            timing(welcomeOpacity, {
                duration: 500,
                toValue: 1,
                useNativeDriver: true
            }).start();
            
            timing(textOpacity, {
                duration: 1000,
                toValue: 1,
                useNativeDriver: true
              }).start();
        }, 10);
        return () => {clearTimeout(t)}
    }, []);

    const fadeTextToBlackThenBack = () => {
        timing(textOpacity, {
            duration: 500,
            toValue: 0,
            useNativeDriver: true
          }).start();
          setTimeout(() => {
            setState(1);
            timing(textOpacity, {
                duration: 500,
                toValue: 1,
                useNativeDriver: true
              }).start();

          }, 600);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={gStyles.color_2} />
            <Animated.View style={{...styles.imageBackground, width: 170, aspectRatio: 1, backgroundColor: 'rgba(255,255,255,0.1)', opacity: logoOpacity}}>
                <View style={{...styles.imageBackground, width: 140, aspectRatio: 1, backgroundColor: 'rgba(255,255,255,0.2)'}}>
                    <View style={styles.imageBackground}>
                        <Image source={require('../assets/logoM.png')} style={styles.image} />
                    </View>
                </View>
            </Animated.View>
            <Animated.View style={{opacity: welcomeOpacity}}>
                <TextLato bold style={styles.welcome}>{en ? 'Welcome to E-Mall' : 'اهلا بكم في ايمول'}</TextLato>
            </Animated.View>
            <Animated.View style={{opacity: textOpacity, height: height * 0.3}}>
                {state === 0 ? (
                    <>
                        <TouchableOpacity onPress={() => navigation.push('ClientRegister')} style={styles.touchableContainer}>
                            <TextLato style={styles.touchableText}>{en ? 'New Customer?' : 'زبون جديد'}</TextLato>
                        </TouchableOpacity>

                        <TextLato style={{textAlign: 'center', color: 'white', marginVertical: height * 0.03, fontSize: RFPercentage(2)}}>
                            {en ? 'OR' : 'ام'}
                        </TextLato>
                        
                        <TouchableOpacity onPress={() => navigation.push('ClientLogin')} style={styles.touchableContainer}>
                            <TextLato style={styles.touchableText}>{en ? 'Returning Customer' : 'زبون عائد'}</TextLato>
                        </TouchableOpacity>
                    </>
                )
                : (
                    <>
                        <TouchableOpacity onPress={() => navigation.push('ClientRegister')} style={styles.touchableContainer}>
                            <TextLato style={styles.touchableText}>{en ? 'Are you here to shop?' : 'هل انت هنا للتسوق؟'}</TextLato>
                        </TouchableOpacity>
                        
                        <TextLato style={{textAlign: 'center', color: 'white', marginVertical: height * 0.03, fontSize: RFPercentage(2)}}>{en ? 'OR' : 'ام'}</TextLato>
                        
                        <TouchableOpacity onPress={() => navigation.push('SellerRegister')} style={styles.touchableContainer}>
                            <TextLato style={styles.touchableText}>{en ? 'Are you here to sell?' : 'هل انت هنا للبيع؟'}</TextLato>
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity onPress={changeLanguage}>
                    <TextLato reverse bold style={{textAlign: 'center', color: 'white', marginTop: height * 0.06, fontSize: RFPercentage(2.5)}}>{en ? 'العربية' : 'English'}</TextLato>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.color_2,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBackground: {
        backgroundColor: '#fff',
        borderRadius: 200,
        width: 110,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 80,
        height: 80
    },
    welcome: {
        fontSize: RFPercentage(3.5),
        marginVertical: height * 0.06,
        color: 'white'
    },
    touchableContainer: {
        borderRadius: 100,
        paddingVertical: height * 0.02,
        borderColor: 'white',
        borderWidth: 2,
        width: width * 0.7,
        alignItems: 'center'
    },
    touchableText: {
        textAlign: 'center',
        fontSize: RFPercentage(1.7),
        color: 'white'
    }
})