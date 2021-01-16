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

function MainHomeView(props){
    const language = useLanguageText('mainHomeView');
    const [ads, setAds] = useState([]);
    useEffect(() => {
        console.log('api', Constants.manifest.extra.apiUrl)
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/main`)
        .then(res => res.json())
        .then(res => setAds(res))
        .catch(err => console.log('yo', err));
    }, [])
    return(
            <ScrollView>
                <TopAds />
                <Categories />
                {ads[0] && <Ad ad={ads[0]} />}
                <ScrollCards cards={getMostPopularStores(props)} title={language && language.titlePop} />
                {/* <ScrollCards countdown cards={getDealsOfTheDay(props)} title={language && language.titleDealsOfTheDay} /> */}
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

const getDealsOfTheDay = (props) => {
    const products = [{
        _id: 0,
        shortName: 'Adidas Running Shoes X23',
        image: 'https://www.pngkit.com/png/full/3-31523_adidas-shoes-clipart-adidas-logo-adidas-shoes-png.png',
        price: 1000,
        discount: 0.4,
        seller: {
            name: 'Adidas',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png',
            width: 30,
            height: 20
        }
    }, {
        _id: 1,
        shortName: 'Jubilee Air Jordans',
        image: 'https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/588807a7-e33e-4b9b-af57-6688d33daf33/air-jordan-11-jubilee-release-date.jpg',
        price: 5900,
        discount: 0.2,
        seller: {
            name: 'Nike',
            logo: 'https://i.pinimg.com/originals/9c/d1/bf/9cd1bf6c2d1a88e8ac473f62a2898c62.png',
            width: 30,
            height: 30
        },

    }, {
        _id: 2,
        shortName: 'Nike Sportswear Down-Fill Windrunner',
        image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/4f3a666c-b4cb-4ab6-b92a-3da6d69ba32e/sportswear-down-fill-windrunner-jacket-hHNjxL.jpg',
        price: 4500,
        discount: 0.3,
        seller: {
            name: 'Nike',
            logo: 'https://i.pinimg.com/originals/9c/d1/bf/9cd1bf6c2d1a88e8ac473f62a2898c62.png',
            width: 30,
            height: 30
        },

    }];

    return [
        <ProductCard key={Math.random()} product={products[0]} />,
        <ProductCard key={Math.random()} product={products[1]} />,
        <ProductCard key={Math.random()} product={products[2]} />,
        <ProductCard key={Math.random()} product={products[0]} />,
        <ProductCard key={Math.random()} product={products[0]} />,
        <ProductCard key={Math.random()} product={products[1]} />,
        <ProductCard key={Math.random()} product={products[2]} />,
        <ProductCard key={Math.random()} product={products[0]} />
    ]
}