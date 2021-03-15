import React, {useState, useEffect} from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import Icon from '../../components/utils/Icon';
import { useLanguageText, useLanguage } from '../../hooks/language';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const Profile = ({navigation, route}) => {
    const account = useSelector(state => state.authReducer.account);
    const image = account && account.image ? account.image : 'https://i.imgur.com/Q6x4k3s.png';
    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('profile');
    return (
        <View style={styles.container}>
            <ImageBackground imageStyle={{opacity: 0.6}} source={{uri: 'https://imgur.com/3XlqWj1.png'}} style={styles.topContainer}>
            <TouchableOpacity style={[styles.backContainer, {alignItems: en ? 'flex-start' : 'flex-end'}]} onPress={() => navigation.goBack()}>
                <Icon type="Feather" name={`arrow-${en ? 'left' : 'right'}`} size={RFPercentage(5)} color="black" />
            </TouchableOpacity>
            </ImageBackground>
            <View style={styles.profileContainer}>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end', transform: [{translateY: -50}]}}>
                        <Image style={styles.image} source={{uri: image}} />
                    </View>
                    <View style={{paddingVertical: 13, width: width * 0.4}}>
                        <TextLato bold style={{fontSize: RFPercentage(2), textTransform: 'uppercase', width: width * 0.35}}>{account.firstName} {account.lastName}</TextLato>
                        <TextLato italic style={{fontSize: RFPercentage(1.5)}}>{account && account.email}</TextLato>
                    </View>
                </View>

                {/* LIST */}
                <View style={{paddingHorizontal: width * 0.1}}>
                    <ListItem reverse={!en} type="MaterialCommunityIcons" name="face-profile" text={text.myProfile} destination="MyProfile" />
                    <ListItem reverse={!en} type="FontAwesome5" name="truck-moving" text={text.myOrders} destination="Orders" />
                    <ListItem reverse={!en} type="Entypo" name="address" text={text.myAddresses} destination="Addresses" />
                    <ListItem reverse={!en} type="FontAwesome" name="dollar" text={text.myPayments} destination="MyPayments" />
                    
                </View>
            </View>
        </View>
    )
}

const ListItem = ({type, name, text, destination, reverse}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity activeOpacity={0.7} style={{alignItems: 'center', flexDirection: !reverse ? 'row' : 'row-reverse', marginVertical: 13}} onPress={() => navigation.push(destination)}>
            <Icon style={{marginHorizontal: width * 0.1, fontSize: 20, width: width * 0.13, alignItems: 'center'}} type={type} name={name} size={width * 0.08} />
            <View>
                <TextLato style={{textTransform: 'uppercase'}}>{text}</TextLato>
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
        marginHorizontal: width * 0.05,
        marginTop: height * 0.03,
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
        aspectRatio: 1,
        marginRight: width * 0.1
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