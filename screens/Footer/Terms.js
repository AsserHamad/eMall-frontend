import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../../components/Header';
import Icon from '../../components/utils/Icon';
import TextLato from '../../components/utils/TextLato';
import { gStyles } from '../../global.style';
import { useLanguage, useLanguageText } from '../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const Terms = (props) => {

    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('terms');

    return (
        <View style={styles.container}>
            <Header details={{details: 'Contact Us'}} />
            <TextLato bold style={styles.title}>{text.terms}</TextLato>
            <ScrollView contentContainerStyle={{marginHorizontal: width * 0.05}}>
                <TextLato bold>E-Mall Privacy Policy</TextLato>

                <TextLato style={{fontSize: RFPercentage(3), marginTop: height * 0.03}} bold>Privacy Policy</TextLato>

                <TextLato>Last updated: 24/3/2021</TextLato>

                <TextLato>E-Mall ("us", "we", or "our") operates E-Mall (the "App"). This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the App.</TextLato>

                <TextLato>We use your Personal Information only for providing and improving the App. By using the App, you agree to the collection and use of information in accordance with this policy.</TextLato>

                <TextLato>Information Collection And Use</TextLato>

                <TextLato>While using our App, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name, phone number, or personal ID.</TextLato>

                <TextLato style={{fontSize: RFPercentage(3), marginTop: height * 0.03}} bold>Log Data</TextLato>

                <TextLato>Like many app operators, we collect information that your browser sends whenever you visit our App.</TextLato>

                <TextLato>This Log Data may include information such as your computer's Internet Protocol ("IP") address, mobile type, mobile OS,, the pages of our App that you visit, the time and date of your visit, the time spent on those pages and other statistics.</TextLato>

                <TextLato>In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this data.</TextLato>


                <TextLato style={{fontSize: RFPercentage(3), marginTop: height * 0.03}} bold>Communications</TextLato>

                <TextLato>We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information that we think would be of importance to you. These may include new relevant products, items of interest on sale, specifically if they’re included on the wishlist. We will also send relevant emails or SMS messages regarding order details such as when an order is being picked up and when the expected delivery date would be.</TextLato>

                <TextLato style={{fontSize: RFPercentage(3), marginTop: height * 0.03}} bold>Cookies</TextLato>

                <TextLato>Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your device from a web server and are stored on your phone's internal storage.</TextLato>

                <TextLato>Like many apps, we use "cookies" to collect information. You can opt out of accepting cookies. However, if you do not accept cookies, you may not be able to use some portions of our App, such as having a preferred language and staying logged in.</TextLato>

                <TextLato style={{fontSize: RFPercentage(3), marginTop: height * 0.03}} bold>Security</TextLato>

                <TextLato>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security. Volatile details such as passwords are encrypted, and cannot be in any way, shape or form become decrypted in a humane manner. We use the latest technologies to do our absolute best at protecting your data.</TextLato>

                <TextLato>Changes To This Privacy Policy</TextLato>

                <TextLato>This Privacy Policy is effective as of (21/3/2021) and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.</TextLato>

                <TextLato>We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.</TextLato>

                <TextLato>If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our app.</TextLato>

                <TextLato>In addition to our own privacy policy, this app runs with “Expo” and thus extends their own privacy policy linked below.
                https://expo.io/privacy</TextLato>

                <TextLato>Contact Us</TextLato>

                <TextLato>If you have any questions about this Privacy Policy, please contact us at eMall.eg.official@gmail.com.</TextLato>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pinContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.1,
    },
    title: {
        fontSize: RFPercentage(3.5),
        marginHorizontal: width * 0.05,
        marginBottom: height * 0.02
    }
})

export default Terms;