const { StyleSheet } = require("react-native");
import { RFPercentage } from 'react-native-responsive-fontsize';
import {gStyles} from '../../../global.style';

exports.style = StyleSheet.create({
    buttonContainer: {
        backgroundColor: gStyles.color_2,
        borderRadius: 100
    },
    text: {
        fontSize: RFPercentage(10)
    }
})