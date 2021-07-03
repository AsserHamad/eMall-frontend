import React from 'react';
import { ScrollView } from 'react-native';
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
import FeaturedProducts from './FeaturedProducts';
import FeaturedStores from './FeaturedStores';

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
                {/* <ScrollCards title={language && language.titlePop} cards={getMostPopularStores()} /> */}
                <FeaturedStores />
                {ads[0] && <Ad ad={ads[0]} />}
                <DealsOfTheDay />
                {ads[1] && <Ad ad={ads[1]} />}
                <FeaturedProducts />
                {ads[2] && <Ad ad={ads[2]} />}
                <Footer />
            </ScrollView>
    )
}

// Returns an array of StoreCards
const getMostPopularStores = () => {
    const [stores, setStores] = useState([]);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/most-popular`)
        .then(res => res.json())
        .then(res => setStores(res))
    }, [])
    return stores.map(store => <StoreCard key={store._id} store={store} />);
};

export default MainHomeView;