import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import TextLato from '../../components/utils/TextLato';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from '../../components/utils/Icon';
import StorePopularProducts from '../../components/Store/StorePopularProducts';
import { gStyles } from '../../global.style';
import { ScrollView } from 'react-native-gesture-handler';
import { useLanguageText } from '../../hooks/language';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const StoreProducts = ({navigation}) => {
    const text = useLanguageText('storeProducts');
    return (
        <View style={styles.container}>
            <StoreNavbar title={text.title} />
            <ScrollView>
                <View style={{flexDirection: 'row', marginTop: height * 0.03, justifyContent: 'center'}}>
                    <View style={{width: width * 1/3, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => navigation.push('AddProduct')} style={{...styles.button, backgroundColor: gStyles.color_2}}>
                            <Icon type={'Entypo'} name={'plus'} color={'white'} size={RFPercentage(4)} />
                            <TextLato bold style={styles.buttonText}>{text.add}</TextLato>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: width * 1/3, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => navigation.push('ProductOptions')} style={{...styles.button, backgroundColor: gStyles.color_2}}>
                            <Icon type={'AntDesign'} name={'copy1'} color={'white'} size={RFPercentage(4)} />
                            <TextLato bold style={styles.buttonText}>{text.options}</TextLato>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: width * 1/3, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => navigation.push('UpdateProductPick')} style={{...styles.button, backgroundColor: gStyles.color_2}}>
                            <Icon type={'Entypo'} name={'pencil'} color={'white'} size={RFPercentage(4)} />
                            <TextLato bold style={styles.buttonText}>{text.update}</TextLato>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{width: width * 1/4, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => navigation.push('DeleteProduct')} style={{...styles.button, backgroundColor: gStyles.color_2}}>
                            <Icon type={'Feather'} name={'trash'} color={'white'} size={RFPercentage(4)} />
                            <TextLato bold style={styles.buttonText}>{text.remove}</TextLato>
                        </TouchableOpacity>
                    </View> */}
                </View>
                <StorePopularProducts />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    topImage: {
        width: '70%',
        aspectRatio: 1286/799
    },
    button: {
        marginHorizontal: '5%',
        backgroundColor: gStyles.background,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.31,
        paddingHorizontal: width * 0.02,
        height: height * 0.13,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontSize: RFPercentage(1.4),
        textAlign: 'center',
        marginTop: height * 0.02,
    }
})

export default StoreProducts;