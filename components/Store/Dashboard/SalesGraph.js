import React, {useState, useEffect} from 'react';
import TextLato from '../../utils/TextLato';
import { LineChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet, View } from 'react-native';
import { gStyles } from '../../../global.style';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const SalesGraph = (props) => {
    return(
        <View style={styles.container}>
            <TextLato>Sales Per Month</TextLato>
            <View style={{alignItems: 'center'}}>
                
            <LineChart
                data={{
                labels: ["January", "February", "March", "April"],
                datasets: [
                    {
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                    }
                ]
                }}
                width={width * 0.9} // from react-native
                height={220}
                withHorizontalLabels={false}
                transparent
                withHorizontalLines={false}
                withVerticalLines={false}
                withShadow={false}
                withVerticalLabels={false}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: gStyles.secondary_dark,
                    backgroundGradientFrom: gStyles.primary_medium,
                    backgroundGradientTo: gStyles.secondary_dark,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 6,
                        alignItems: 'center'
                    },
                    propsForDots: {
                        r: "3",
                        strokeWidth: "2",
                        stroke: "white"
                    }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 6
                }}
            />
            </View>
            </View>
            )

}

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        marginTop: height * 0.05
    }
})

export default SalesGraph;