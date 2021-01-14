import React, { useState, useEffect } from 'react';
import { View, Image, ScrollableView, StyleSheet, Dimensions } from 'react-native';
import Header from '../components/Header';
import TextLato from '../components/utils/TextLato';
import Constants from 'expo-constants';
import { gStyles } from '../global.style';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const Store = (props) => {
    const [store, setStore] = useState(null);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/${props.route.params.store._id}`)
        .then(res => res.json())
        .then(res => {console.log(res);setStore(res)});
    }, []);
    return store ? (
        <View style={styles.container}>
            <Header details={{title: store.title}} />
            <View style={styles.headerContainer}>
                <Image source={{uri: store.page.coverImage}} style={styles.cover} />
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Image source={{uri: store.logo}} style={styles.logo} />
                    </View>
                    <TextLato>Heyyyyyyyyyyyyyyyyyyyyyyyy</TextLato>
                </View>
                <TextLato>{store.title}</TextLato>
            </View>
        </View>
    ) : <TextLato>Loading...</TextLato>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gStyles.background
    },
    cover: {
        width: '100%',
        height: height * 0.15
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: width * 0.05,
        transform: [{translateY: -height * 0.05}],
        alignItems: 'center'
    },
    logoContainer: {
        padding: width * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.24,
        backgroundColor: gStyles.background,
        borderRadius: 100,
    },
    logo: {
        width: width * 0.22,
        aspectRatio: 1
    }
})

export default Store;