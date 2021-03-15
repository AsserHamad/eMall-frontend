import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../components/Header';
import { gStyles } from '../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
import Constants from 'expo-constants';
import { useLanguage } from '../hooks/language';
import TextLato from '../components/utils/TextLato';
import { useNavigation } from '@react-navigation/native';
import SellerCardsList from '../components/utils/SellerCardsList';
import Icon from '../components/utils/Icon';
import CustomModal from '../components/utils/CustomModal';

const CategoryPage = (props) => {
    const details = props.route.params;
    const language = useLanguage();
    const en = language === 'en';
    const [sortVisible, setSortVisible] = useState(false);
    return (
        <View style={styles.container}>
            <Header search details={{title: details.name[language]}} />
            <SubcategoriesScroll details={details} />
            <TouchableOpacity style={styles.sortContainer} onPress={() => setSortVisible(m => !m)}>
                <Icon type={'FontAwesome5'} name={'sort'} size={RFPercentage(3)} />
                <TextLato bold style={{marginHorizontal: width * 0.02, fontSize: RFPercentage(2.5)}}>{en ? 'Sort' : 'رتب'}</TextLato>
            </TouchableOpacity>
            {sortVisible && (
                <ScrollView horizontal contentContainerStyle={{paddingHorizontal: width * 0.03, paddingVertical: height * 0.02}}>
                    <TouchableOpacity style={styles.sortChoice}>
                        <TextLato style={{fontSize: RFPercentage(1.3)}}>Price: High to Low</TextLato>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sortChoice}>
                        <TextLato style={{fontSize: RFPercentage(1.3)}}>Price: Low to High</TextLato>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sortChoice}>
                        <TextLato style={{fontSize: RFPercentage(1.3)}}>Popularity</TextLato>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sortChoice}>
                        <TextLato style={{fontSize: RFPercentage(1.3)}}>Newest Arrivals</TextLato>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sortChoice}>
                        <TextLato style={{fontSize: RFPercentage(1.3)}}>Rating</TextLato>
                    </TouchableOpacity>
                </ScrollView>
            )}
            <SellerCardsList url={`${Constants.manifest.extra.apiUrl}/store/find-by-category`} body={{category: details._id}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    banner: {
        width,
        aspectRatio: 3.9
    },
    sortButton: {
        position: 'absolute',
        width: width * 0.2,
        height: width * 0.2,
        zIndex: 2,
        bottom: height * 0.03,
        right: width * 0.08,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    sortContainer: {
        paddingVertical: height * 0.01,
        flexDirection: 'row',
        width,
        paddingHorizontal: width * 0.05,
        alignItems: 'center',
    },
    sortChoice: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.01,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#888',
        marginRight: width * 0.02
    }
});

export default CategoryPage;

const SubcategoriesScroll = ({details}) => {
    const navigation = useNavigation();
    const [subcategories, setSubcategories] = useState([]);
    const language = useLanguage();
    const en = language === 'en';
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/subcategory/find-by-category/${details._id}`)
        .then(res => res.json())
        .then(res => setSubcategories(res))
    }, [])
    return(
        <ScrollView 
            showsHorizontalScrollIndicator={false} 
            horizontal 
            style={{...subcategoryStyles.scrollView, transform: en ? [] : [{scaleX: -1}]}} 
            contentContainerStyle={{justifyContent: 'center'}}
        >
            {subcategories.map(subcategory => (
                <TouchableOpacity key={Math.random()} style={{...subcategoryStyles.touchableBlock, transform: en ? [] : [{scaleX: -1}]}} activeOpacity={0.4} onPress={() => navigation.push('Subcategory', {...subcategory})}>
                    <View key={subcategory._id} style={subcategoryStyles.container}>
                        <Image style={{width: width * 0.13, aspectRatio: 1, borderRadius: 100 }} source={{uri: subcategory.image}} />
                    </View>
                        <TextLato style={{fontSize: RFPercentage(1.4), textAlign: 'center'}}>{subcategory.name[language]}</TextLato>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const subcategoryStyles = StyleSheet.create({
    touchableBlock: {
    },
    container: {
        width: width * 0.17,
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3,
        borderWidth: 2,
        borderColor: gStyles.color_3
    },
    scrollView: {
        width,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        paddingVertical: height * 0.02
    }
})