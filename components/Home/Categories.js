import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { gStyles } from '../../global.style';
import CategoryCard from '../cards/CategoryCard';
import { useLanguage } from '../../hooks/language';
import Icon from '../utils/Icon';
import TextLato from '../utils/TextLato';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import HTTP from '../../src/utils/axios';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

function Categories(){
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();
    const language = useLanguage();
    const en = language === 'en';
    useEffect(() => {
        HTTP('/category')
        .then(res => setCategories(res.slice(0, 5)))
    }, []);
    if(!categories.length)
        return (
            <View style={{...styles.categoriesContainer, flexDirection: en ? 'row' : 'row-reverse'}}>
                {[0,1,2,3,4,5].map(num => (
                    <View key={num} style={{borderWidth: 0, width: width * 0.32, alignItems: 'center'}}>
                        <View style={{...styles.cardContainer, backgroundColor: '#aaa'}}>
                            <ActivityIndicator color={'white'} size={RFPercentage(3)} />
                        </View>
                    </View>
                ))}
            </View>
        )
    return(
            <View style={{...styles.categoriesContainer, flexDirection: en ? 'row' : 'row-reverse'}}>
                {categories.map(category => (
                    <CategoryCard key={category._id} details={category} />
                ))}
                <TouchableOpacity onPress={() => navigation.push('Categories')} activeOpacity={0.8} style={{borderWidth: 0, width: width * 0.32, alignItems: 'center'}}>
                    <View style={styles.cardContainer}>
                        <Icon type={'AntDesign'} size={40} color={'black'} name={'plus'} style={styles.icon} />
                        <TextLato style={styles.title}>{en ? 'View All' : 'الكل'}</TextLato>
                    </View>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 18,
    },
    categoriesContainer: {
        width: '100%',
        justifyContent: 'center',
        borderWidth: 0,
        flexWrap: 'wrap'
    },
    cardContainer: {
        height: Dimensions.get('window').width * 0.3,
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 2,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        marginTop: height * 0.01
    },
    icon: {
    },
    title: {
        color: 'black',
        fontSize: RFPercentage(1.5),
        textAlign: 'center',
        marginTop: height * 0.01,
        width: width * 0.2
    }
});

export default Categories;