import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import TextLato from '../../components/utils/TextLato';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from '../../components/utils/Icon';
import { gStyles } from '../../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const StoreProducts = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StoreNavbar title={'Products'} />
            <View style={styles.top}>
                <View style={{width: '50%'}}>
                    <TextLato bold style={{fontSize: RFPercentage(3), textAlign: 'center', paddingTop: height * 0.05}}>My Products</TextLato>
                </View>
                <Image source={{uri: 'https://i.imgur.com/LjKR8NI.png'}} style={styles.topImage} />
            </View>
            <View style={{flexDirection: 'row', marginTop: height * 0.03}}>
                <View style={{width: width * 1/4, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => navigation.push('Add Product')} style={{...styles.button, backgroundColor: '#007dfd'}}>
                        <Icon type={'Entypo'} name={'plus'} color={'white'} size={RFPercentage(4)} />
                        <TextLato bold style={styles.buttonText}>Add Product</TextLato>
                    </TouchableOpacity>
                </View>
                <View style={{width: width * 1/4, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => navigation.push('Add Product')} style={{...styles.button, backgroundColor: '#007dfd'}}>
                        <Icon type={'AntDesign'} name={'copy1'} color={'white'} size={RFPercentage(4)} />
                        <TextLato bold style={styles.buttonText}>Add Variant</TextLato>
                    </TouchableOpacity>
                </View>
                <View style={{width: width * 1/4, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => navigation.push('Add Product')} style={{...styles.button, backgroundColor: '#007dfd'}}>
                        <Icon type={'Entypo'} name={'pencil'} color={'white'} size={RFPercentage(4)} />
                        <TextLato bold style={styles.buttonText}>Update Product</TextLato>
                    </TouchableOpacity>
                </View>
                <View style={{width: width * 1/4, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => navigation.push('Add Product')} style={{...styles.button, backgroundColor: '#007dfd'}}>
                        <Icon type={'Feather'} name={'trash'} color={'white'} size={RFPercentage(4)} />
                        <TextLato bold style={styles.buttonText}>Remove Product</TextLato>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    top: {
        flexDirection: 'row'
    },
    topImage: {
        width: '50%',
        aspectRatio: 1286/799
    },
    button: {
        marginHorizontal: '5%',
        backgroundColor: gStyles.color_0,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.22,
        paddingHorizontal: width * 0.02,
        height: height * 0.13,
        borderRadius: 20
    },
    buttonText: {
        color: 'white',
        fontSize: RFPercentage(1.7),
        textAlign: 'center',
        marginTop: height * 0.02,
    }
})

export default StoreProducts;