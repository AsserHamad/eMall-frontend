import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProductCard from '../cards/ProductCard';
import StoreCard from '../cards/StoreCard';
import ScrollCards from '../ScrollCards';
import Categories from './Categories';
import TopAds from './TopAds';

function MainHomeView(props){
    return(
        <ScrollView>
            <TopAds />
            <Categories />
            
            <ScrollCards cards={getMostPopularStores(props)} title="Most Popular Stores" />
            <ScrollCards countdown cards={getDealsOfTheDay(props)} title="Deals Of The Day" />
        </ScrollView>
    )
}

const styles = StyleSheet.create({

});

export default MainHomeView;

// Returns an array of StoreCards
const getMostPopularStores = () => {
    const stores = [{
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/The-Body-Shop-Logo.svg/480px-The-Body-Shop-Logo.svg.png',
        name: 'The Body Shop',
        categories: [0, 1, 2]
    }, {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png',
        name: 'Adidas',
        categories: [0, 1]
    }, {
        logo: 'https://i.pinimg.com/originals/9c/d1/bf/9cd1bf6c2d1a88e8ac473f62a2898c62.png',
        name: 'Nike',
        categories: [1, 2]
    }];
    return [
        <StoreCard key={Math.random()} store={stores[0]} />,
        <StoreCard key={Math.random()} store={stores[1]} />,
        <StoreCard key={Math.random()} store={stores[2]} />,
        <StoreCard key={Math.random()} store={stores[0]} />,
        <StoreCard key={Math.random()} store={stores[0]} />,
        <StoreCard key={Math.random()} store={stores[1]} />,
        <StoreCard key={Math.random()} store={stores[2]} />,
        <StoreCard key={Math.random()} store={stores[0]} />
    ]
};

const getDealsOfTheDay = (props) => {
    const products = [{
        id: 0,
        shortName: 'Adidas Running Shoes X23',
        image: 'https://www.pngkit.com/png/full/3-31523_adidas-shoes-clipart-adidas-logo-adidas-shoes-png.png',
        price: 1000,
        discount: 0.4,
        seller: {
            name: 'Adidas',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png',
            width: 30,
            height: 20
        },
        // seller: {
        //     name: 'The Body Shop',
        //     logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/The-Body-Shop-Logo.svg/480px-The-Body-Shop-Logo.svg.png',
        //     width: 30,
        //     height: 30
        // }
    }, {
        id: 1,
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
        id: 2,
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
        <ProductCard cart={props.cart} setCart={props.setCart} key={Math.random()} product={products[0]} />,
        <ProductCard cart={props.cart} setCart={props.setCart} key={Math.random()} product={products[1]} />,
        <ProductCard cart={props.cart} setCart={props.setCart} key={Math.random()} product={products[2]} />,
        <ProductCard cart={props.cart} setCart={props.setCart} key={Math.random()} product={products[0]} />,
        <ProductCard cart={props.cart} setCart={props.setCart} key={Math.random()} product={products[0]} />,
        <ProductCard cart={props.cart} setCart={props.setCart} key={Math.random()} product={products[1]} />,
        <ProductCard cart={props.cart} setCart={props.setCart} key={Math.random()} product={products[2]} />,
        <ProductCard cart={props.cart} setCart={props.setCart} key={Math.random()} product={products[0]} />
    ]
}