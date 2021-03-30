import React, {useState, useEffect} from 'react';
import TextLato from '../../utils/TextLato';
import { Dimensions, StyleSheet, View } from 'react-native';
import { gStyles } from '../../../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from '../../utils/Icon';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { Constants } from 'react-native-unimodules';
import AnimatedProgressWheel from 'react-native-progress-wheel';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const PerformanceView = (props) => {
    const token = useSelector(state => state.authReducer.token);
    const [performance, setPerformance] = useState(undefined);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/performance`, {headers: {token}})
        .then(res => res.json())
        .then(res => setPerformance(res.performance));
    }, [])
    if(performance === undefined)
        return (
            <View>

            </View>
        )
    return (
        <LinearGradient colors={[gStyles.color_0, gStyles.color_2]} start={{ x: -1, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <TextLato style={styles.text}>Performance Measure</TextLato>
                </View>
                <AnimatedProgressWheel
                    progress={100 - performance}
                    animateFromValue={0}
                    duration={5000}
                    color={'red'}
                    fullColor={'white'}
                    width={10}
                    size={80}
                />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        borderRadius: 0,
        paddingVertical: height * 0.03,
        paddingLeft: width * 0.05,
        
    },
    text: {
        color: 'white',
        fontSize: RFPercentage(1.6),
        textTransform: 'uppercase',
        marginTop: height * 0.05,
        width: '65%'
    }
})

export default PerformanceView;