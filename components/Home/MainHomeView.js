import React from 'react';
import { ScrollView } from 'react-native';
import Categories from './Categories';
import TopAds from './TopAds';
import Footer from './Footer';
import Ad from './Ad';
import { useEffect } from 'react';
import { useState } from 'react';
import DealsOfTheDay from '../../screens/DealsOfTheDay';
import FeaturedProducts from './FeaturedProducts';
import FeaturedStores from './FeaturedStores';
import HTTP from '../../src/utils/axios';

function MainHomeView(){
    const [ads, setAds] = useState([]);
    useEffect(() => {
        HTTP('/advertisement/main')
        .then(res => setAds(res))
        .catch(err => console.log('yo', err));
    }, [])
    return(
            <ScrollView>
                <TopAds />
                <Categories />
                <DealsOfTheDay />
                {ads[0] && <Ad ad={ads[0]} />}
                <FeaturedStores />
                {ads[1] && <Ad ad={ads[1]} />}
                <FeaturedProducts />
                {ads[2] && <Ad ad={ads[2]} />}
                <Footer />
            </ScrollView>
    )
}

export default MainHomeView;