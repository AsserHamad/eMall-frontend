import React from 'react';
import { ScrollView } from 'react-native';
import ProductCard from '../cards/ProductCard';
import StoreCard from '../cards/StoreCard';
import ScrollCards from '../ScrollCards';
import Categories from './Categories';
import TopAds from './TopAds';
import Footer from './Footer';
import {useLanguageText} from '../../hooks/language';
import Ad from './Ad';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import { useState } from 'react';
import DealsOfTheDay from '../../screens/DealsOfTheDay';

function MainHomeView(props){
    const language = useLanguageText('mainHomeView');
    const [ads, setAds] = useState([]);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/main`)
        .then(res => res.json())
        .then(res => setAds(res))
        .catch(err => console.log('yo', err));
    }, [])
    return(
            <ScrollView>
                <TopAds />
                <Categories />
                <ScrollCards cards={getMostPopularStores(props)} title={language && language.titlePop} />
                {ads[0] && <Ad ad={ads[0]} />}
                {/* <ScrollCards countdown cards={getDealsOfTheDay(props)} title={language && language.titleDealsOfTheDay} /> */}
                <DealsOfTheDay />
                {ads[1] && <Ad ad={ads[1]} />}
                <Footer />
            </ScrollView>
    )
}

export default MainHomeView;

// Returns an array of StoreCards
const getMostPopularStores = () => {
    const [stores, setStores] = useState([]);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/most-popular`)
        .then(res => res.json())
        .then(res => setStores([...res, ...res, ...res, ...res, ...res, ...res, ...res, ...res, ...res, ...res, ]))
    }, [])
    return stores.map(store => <StoreCard key={Math.random()} store={store} />);
};