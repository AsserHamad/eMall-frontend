import React, {useState, useEffect} from 'react';
import TextLato from '../../utils/TextLato';
import { ActivityIndicator, Dimensions, Image, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { gStyles } from '../../../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import useCredit from '../../../hooks/credit';
import Header from '../../Header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useLanguage, useLanguageText } from '../../../hooks/language';
import { Constants } from 'react-native-unimodules';
import { useSelector } from 'react-redux';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];


const RequestWithdrawal = () => {
    const credit = useCredit();
    const language = useLanguage();
    const text = useLanguageText('requestWithdrawal');
    const [disabled, setDisabled] = useState(true);
    const token = useSelector(state => state.authReducer.token);
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    useEffect(() => {
        setDisabled(credit <= 10);
    }, [credit])

    const requestWidthrawal = () => {
        setLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/store/request-withdrawal`, {
            method: 'post',
            headers: {
                token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            setLoading(false);
            setConfirmed(true);
        })
    }
    if(loading)
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                <ActivityIndicator size={RFPercentage(4)} color={gStyles.color_0} />
            </View>
        )
    if(confirmed) {
        return (
            <View style={styles.container}>
                <Header details={{title: text.title}} />
                <Image style={styles.image} source={{uri: 'https://i.imgur.com/nXxOuMw.png'}} />
                <View style={styles.mainContainer}>
                    <TextLato bold style={{...styles.title, textAlign: 'center'}}>Request Submitted Successfully!</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.7), marginTop: height * 0.01, textAlign: 'center'}}>
                        Please hold on while we process your request. Our admins will get back to your shortly.
                    </TextLato>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Header details={{title: text.title}} />
            <ScrollView>
                <KeyboardAvoidingView>
                    <Image style={styles.image} source={{uri: 'https://imgur.com/vc604zy.png'}} />
                    <View style={styles.mainContainer}>
                        <TextLato bold style={styles.title}>{text.request}</TextLato>
                        <TextLato style={styles.subtitle}>{text.credit}</TextLato>
                        <TextLato bold style={styles.funds}>{credit} {text.egp}</TextLato>
                        {/* <TextLato italic style={styles.subtitle}>Please enter the amount you would like to withdraw below</TextLato> */}
                        <TextLato italic style={styles.subtitle}>{text.subtitle}</TextLato>
                        {/* <TextInput
                            style={{...styles.input, fontFamily: language === 'en' ? 'Lato' : 'Cairo'}}
                            keyboardType={'number-pad'}
                            value={value}
                            onChangeText={input => setValue(input)}
                        /> */}
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{...styles.submitButton, backgroundColor: disabled ? gStyles.color_0 : gStyles.color_2}}
                    onPress={() => disabled ? null : requestWidthrawal()}>
                    <TextLato style={{color: 'white'}}>{text.submit}</TextLato>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width,
        aspectRatio: 790/610,
        marginBottom: height * 0.02
    },
    title: {
        fontSize: RFPercentage(2.5),
        // textAlign: 'center'
    },
    disclaimer: {
        fontSize: RFPercentage(1.8),
        color: gStyles.active,
        // textAlign: 'center'

    },
    subtitle: {
        fontSize: RFPercentage(1.8),
        marginTop: height * 0.01,
        color: 'black'
        // textAlign: 'center'
    },
    funds: {
        fontSize: RFPercentage(4),
        marginTop: height * 0.01,
        // textAlign: 'center',
        color: gStyles.color_2
    },
    mainContainer: {
        marginHorizontal: width * 0.07,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    input: {
        marginTop: height * 0.05,
        width: width * 0.4,
        borderBottomWidth: 2,
        borderColor: gStyles.color_1,
        color: gStyles.color_1,
        fontSize: RFPercentage(2),
        // textAlign: 'center'
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.02,
        marginHorizontal: width * 0.05,
        marginTop: height * 0.03,
        backgroundColor: gStyles.color_0
    }
})

export default RequestWithdrawal;