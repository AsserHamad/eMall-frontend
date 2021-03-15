import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, View, ScrollView } from 'react-native';
import Header from '../components/Header';
import { gStyles } from '../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import SellerCardsList from '../components/utils/SellerCardsList';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../hooks/language';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../components/utils/Icon';
import TextLato from '../components/utils/TextLato';
import { RFPercentage } from 'react-native-responsive-fontsize';

const image = `https://img.freepik.com/free-psd/new-style-sale-promotion-banner-template_85212-146.jpg?size=626&ext=jpg&ga=GA1.2.356975455.1604448000`;
const SubcategoryPage = (props) => {
    const details = props.route.params;
    const [aspectRatio, setAspectRatio] = useState(0);
    const [filter, setFilter] = useState('');
    useEffect(() => {
        Image.getSize(image, (width, height) => setAspectRatio(width / height));
    }, []);
    return (
        <View style={styles.container}>
            <Header details={{title: details.name.en}} />
            <FiltersScroll details={details} selected={filter} setSelected={setFilter} />
            <SellerCardsList url={`${Constants.manifest.extra.apiUrl}/store/find-by-subcategory`} body={{subcategory: {...details}, filter}} refresh={filter} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1
    },
    banner: {
        width
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
    }
});

export default SubcategoryPage;

const FiltersScroll = ({details, selected, setSelected}) => {
    const navigation = useNavigation();
    const language = useLanguage();
    const [filters, setFilters] = useState([]);
    const en = language === 'en';
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/subcategory/filters/${details._id}`)
        .then(res => res.json())
        .then(res => setFilters(res))
    }, [])
    return(
        <ScrollView 
            showsHorizontalScrollIndicator={false} 
            horizontal 
            style={{...subcategoryStyles.scrollView, transform: en ? [] : [{scaleX: -1}]}} 
            contentContainerStyle={{justifyContent: 'center'}}
        >
            {filters.map(filter => (
                <TouchableOpacity
                    key={Math.random()}
                    style={{...subcategoryStyles.touchableBlock, transform: en ? [] : [{scaleX: -1}]}} 
                    activeOpacity={0.4} 
                    onPress={() => setSelected(filter._id)}>
                    <View key={filter._id} style={{...subcategoryStyles.container, backgroundColor: selected === filter._id ? gStyles.color_2 : gStyles.color_3}}>
                        <Icon size={RFPercentage(5)} color={'white'} type={filter.iconType} name={filter.icon} />
                    </View>
                        <TextLato style={{fontSize: RFPercentage(1.7), textAlign: 'center', marginTop: height * 0.01}}>{filter.name[language]}</TextLato>
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
        backgroundColor: gStyles.color_3,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3,
    },
    scrollView: {
        width,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        paddingVertical: height * 0.02
    }
})