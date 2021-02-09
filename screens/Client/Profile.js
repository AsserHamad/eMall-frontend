import React, {useState, useEffect} from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Icon from '../../components/utils/Icon';
import Footer from '../../components/Home/Footer';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const Profile = ({navigation, route}) => {
    const account = useSelector(state => state.authReducer.account);
    console.log(account)
    const image = account && account.image ? account.image : 'https://p.favim.com/orig/2018/10/01/cartoon-profile-picture-cute-Favim.com-6346120.jpg';
    return (
        <View style={styles.container}>
            <ImageBackground imageStyle={{opacity: 0.6}} source={{uri: image}} style={styles.topContainer}>
            <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
                <Icon type="Feather" name="arrow-left" size={RFPercentage(4)} color="black" />
            </TouchableOpacity>
            </ImageBackground>
            <View style={styles.profileContainer}>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end', transform: [{translateY: -50}]}}>
                        <Image style={styles.image} source={{uri: image}} />
                        <View style={styles.titleContainer}>
                            <Icon type={'FontAwesome'} name="pencil" size={13} color="white" />
                        </View>
                    </View>
                    <View style={{paddingVertical: 13, width: width * 0.4}}>
                        <TextLato bold style={{fontSize: RFPercentage(2)}}>ASSER HAMAD</TextLato>
                        <TextLato italic style={{fontSize: RFPercentage(1.5)}}>{account && account.email}</TextLato>
                    </View>
                </View>

                {/* LIST */}
                <View style={{paddingHorizontal: width * 0.1}}>
                    <ListItem type="MaterialCommunityIcons" name="face-profile" text="my profile" />
                    <ListItem type="FontAwesome5" name="truck-moving" text="my orders" destination="Orders" />
                    <ListItem type="Entypo" name="address" text="my addresses" destination="Addresses" />
                    <ListItem type="FontAwesome" name="dollar" text="my payments" />
                    
                </View>
            </View>
        </View>
    )
}

const ListItem = ({type, name, text, destination}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity activeOpacity={0.7} style={{alignItems: 'center', flexDirection: 'row', marginVertical: 13}} onPress={() => navigation.push(destination)}>
            <Icon style={{marginLeft: width * 0.1, fontSize: 20, width: width * 0.13, alignItems: 'center'}} type={type} name={name} size={width * 0.08} />
            <View>
                <TextLato style={{textTransform: 'uppercase', marginLeft: width * 0.11}}>{text}</TextLato>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: gStyles.background
    },
    backContainer: {
        marginLeft: width * 0.02,
        marginTop: height * 0.01,
    },
    topContainer: {
        width: '100%',
        height: height * 0.4,
        backgroundColor: gStyles.color_0
    },
    profileContainer: {
        backgroundColor: gStyles.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        transform: [{translateY: -height * 0.07}]
    },
    image: {
        width: width * 0.3,
        borderRadius: 100,
        aspectRatio: 1
    },
    titleContainer: {
        backgroundColor: gStyles.color_3,
        borderRadius: 100,
        padding: 8,
        borderWidth: 3,
        borderColor: gStyles.background,
        transform: [{translateX: -30}]}
})

export default Profile;