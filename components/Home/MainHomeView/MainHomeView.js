import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProductCard from '../../cards/ProductCard';
import StoreCard from '../../cards/StoreCard';
import ScrollCards from '../../ScrollCards/ScrollCards';
import Categories from './Categories/Categories';
import TopAds from './TopAds/TopAds';

function MainHomeView(){
    return(
        <ScrollView>
            <TopAds />
            <Categories />
            
            <ScrollCards cards={getMostPopularStores()} title="Most Popular Stores" />
            <ScrollCards countdown cards={getDealsOfTheDay()} title="Deals Of The Day" />
        </ScrollView>
    )
}

const styles = StyleSheet.create({

});

export default MainHomeView;

// Returns an array of StoreCards
const getMostPopularStores = () => {
    const store = {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/The-Body-Shop-Logo.svg/480px-The-Body-Shop-Logo.svg.png',
        name: 'The Body Shop',
        categories: [0, 1, 2]
    }
    return [
        <StoreCard key={Math.random()} store={store} />,
        <StoreCard key={Math.random()} store={store} />,
        <StoreCard key={Math.random()} store={store} />,
        <StoreCard key={Math.random()} store={store} />
    ]
};

const getDealsOfTheDay = () => {
    const product={
        shortName: 'Adidas Running Shoes X23',
        image: 'https://www.pngkit.com/png/full/3-31523_adidas-shoes-clipart-adidas-logo-adidas-shoes-png.png',
        price: 1000,
        discount: 0.4,
        seller: {
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/The-Body-Shop-Logo.svg/480px-The-Body-Shop-Logo.svg.png'
        }
    }
    return [
        <ProductCard key={Math.random()} product={product} />,
        <ProductCard key={Math.random()} product={product} />,
        <ProductCard key={Math.random()} product={product} />,
        <ProductCard key={Math.random()} product={product} />
    ]
}