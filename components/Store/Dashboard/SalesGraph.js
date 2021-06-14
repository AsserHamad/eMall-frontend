import React, {useState, useEffect} from 'react';
import { LineChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet, View } from 'react-native';
import { gStyles } from '../../../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import { useSelector } from 'react-redux';
import TotalSales from './TotalSales';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const SalesGraph = () => {
    const token = useSelector(state => state.authReducer.token);
    const [data, setData] = useState([0,0,0]);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/previous-sales`, {headers: {token}})
        .then(res => res.json())
        .then(sales => {
            const s = sales.map(monthSales => monthSales.reduce((elem, next) => elem + next.amount, 0));
            setData(s);
        })
    }, [])
    return(
        <View style={styles.container}>
            <TotalSales />
            {/* <TextLato style={styles.title} bold>Monthly Sales</TextLato> */}
            <LineChart
                data={{
                    labels: ["Jan", "Feb", "Mar"],
                    datasets: [{data}]
                }}
                width={width} // from react-native
                height={300}
                // transparent
                // withHorizontalLabels={false}
                withHorizontalLines={false}
                withVerticalLines={false}
                withShadow={false}
                // withVerticalLabels={false}
                // yAxisLabel="$"
                // yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                
                chartConfig={{
                    backgroundColor: gStyles.color_3,
                    backgroundGradientFrom: "#2C62FF",
                    backgroundGradientTo: "#2C62FF",
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    propsForLabels: {
                        fontSize: RFPercentage(1.5),
                        fontFamily: 'Lato'
                    },
                    style: {
                        paddingTop: 20
                        // borderRadius: 6,
                    },
                    propsForDots: {
                        r: "2",
                        strokeWidth: "2",
                        stroke: "white"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    alignItems: 'center',
                    borderRadius: 6,
                }}
            />
            </View>
            )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2C62FF',
        width: width,
        // marginTop: height * 0.05
    },
    title: {
        color: 'white',
        marginTop: height * 0.02,
        marginLeft: width * 0.03,
        fontSize: RFPercentage(2)
    }
})

export default SalesGraph;