import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SellerCard from '../components/cards/Seller/SellerCard';
import Header from '../components/Header';
import Navbar from '../components/Navbar/Navbar';
import { gStyles } from '../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialIcons } from '@expo/vector-icons';

const products = [
    {
        _id: `${Math.random()}`,
        shortName: 'Adidas Running Shoes X23',
        image: 'https://www.pngkit.com/png/full/3-31523_adidas-shoes-clipart-adidas-logo-adidas-shoes-png.png',
        price: 1000,
        description: {
            en: "A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. "
        },
    seller: {
        name: 'Adidas',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png',
        width: 30,
        height: 20
    }
    },{
        _id: `${Math.random()}`,
        shortName: 'Jubilee Air Jordans',
        image: 'https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/588807a7-e33e-4b9b-af57-6688d33daf33/air-jordan-11-jubilee-release-date.jpg',
        price: 5900,
        discount: 0.2,  
        description: {
            en: "A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. "
    },
        seller: {
            name: 'Nike',
            logo: 'https://i.pinimg.com/originals/9c/d1/bf/9cd1bf6c2d1a88e8ac473f62a2898c62.png',
            width: 30,
            height: 30
        },
    },{
        _id: `${Math.random()}`,
        shortName: 'Adidas Running Shoes X23',
        image: 'https://www.pngkit.com/png/full/3-31523_adidas-shoes-clipart-adidas-logo-adidas-shoes-png.png',
        price: 1000,
        description: {
            en: "A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. "
    },
        seller: {
            name: 'Adidas',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png',
            width: 30,
            height: 20
        }
    },{
        _id: `${Math.random()}`,
        shortName: 'Jubilee Air Jordans',
        image: 'https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/588807a7-e33e-4b9b-af57-6688d33daf33/air-jordan-11-jubilee-release-date.jpg',
        price: 5900,
        discount: 0.2,  
        description: {
            en: "A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. "
    },
        seller: {
            name: 'Nike',
            logo: 'https://i.pinimg.com/originals/9c/d1/bf/9cd1bf6c2d1a88e8ac473f62a2898c62.png',
            width: 30,
            height: 30
        },
    },{
            _id: `${Math.random()}`,
            shortName: 'Adidas Running Shoes X23',
            image: 'https://www.pngkit.com/png/full/3-31523_adidas-shoes-clipart-adidas-logo-adidas-shoes-png.png',
            price: 1000,
            discount: 0.4,      
        description: {
            en: "A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. "
    },
            seller: {
                name: 'Adidas',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png',
                width: 30,
                height: 20
            }
    },{
        _id: `${Math.random()}`,
        shortName: 'Jubilee Air Jordans',
        image: 'https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/588807a7-e33e-4b9b-af57-6688d33daf33/air-jordan-11-jubilee-release-date.jpg',
        price: 5900,
        discount: 0.2,  
        description: {
            en: "A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. A great shoe for running, walking or whatever you need it to be. This shoe is amazing in every way possible. "
    },
        seller: {
            name: 'Nike',
            logo: 'https://i.pinimg.com/originals/9c/d1/bf/9cd1bf6c2d1a88e8ac473f62a2898c62.png',
            width: 30,
            height: 30
        },
    }
];

const _sellers = [
    {
        _id: Math.random(),
        name: {
            en: 'The Body Shop'
        },
        logo: 'https://logos-world.net/wp-content/uploads/2020/11/The-Body-Shop-Logo.png',
        products,
        reviews: {
            average: 4,
            number: 200
        },
        categories: [
            {
                "name": {
                  "en": "Clothes",
                  "ar": "شسشس"
                },
                "description": {
                  "en": "Top brand clothing lines hand tailored for your convenience. These brands offer what most won't lorem ipsum.",
                  "ar": "تشنتسيمش"
                },
                "color": "#48C6DC",
                "_id": "5fd67d375af53f0774749e88",
                "icon": "md-shirt",
                "iconType": "Ionicons",
                "banner": "https://img.freepik.com/free-psd/new-style-sale-promotion-banner-template_85212-146.jpg?size=626&ext=jpg&ga=GA1.2.356975455.1604448000"
              },
              {
                "name": {
                  "en": "Electronics",
                  "ar": "سيشيسش سشي"
                },
                "description": {
                  "en": "Top brand clothing lines hand tailored for your convenience. These brands offer what most won't lorem ipsum.",
                  "ar": "تشنتسيمش"
                },
                "color": "#E74A5F",
                "_id": "5fda047bc727a200176616f0",
                "icon": "tv",
                "iconType": "FontAwesome5",
              },
              {
                "name": {
                  "en": "Appliances",
                  "ar": "سيشيسش سشي"
                },
                "description": {
                  "en": "Top brand clothing lines hand tailored for your convenience. These brands offer what most won't lorem ipsum.",
                  "ar": "تشنتسيمش"
                },
                "color": "#48DC5C",
                "_id": "5fe2831501527b00175b16fc",
                "icon": "toaster-oven",
                "iconType": "MaterialCommunityIcons",
              },
        ]
    },
    {
        _id: Math.random(),
        name: {
            en: 'The Body Shop'
        },
        logo: 'https://logos-world.net/wp-content/uploads/2020/11/The-Body-Shop-Logo.png',
        products,
        reviews: {
            average: 4.5,
            number: 200
        },        
    },
    {
        _id: Math.random(),
        name: {
            en: 'The Body Shop'
        },
        logo: 'https://logos-world.net/wp-content/uploads/2020/11/The-Body-Shop-Logo.png',
        products,
        reviews: {
            average: 2,
            number: 200
        },        
    },
    {
        _id: Math.random(),
        name: {
            en: 'The Body Shop'
        },
        logo: 'https://logos-world.net/wp-content/uploads/2020/11/The-Body-Shop-Logo.png',
        products,
        reviews: {
            average: 5,
            number: 200
        },        
    },
    {
        _id: Math.random(),
        name: {
            en: 'The Body Shop'
        },
        logo: 'https://logos-world.net/wp-content/uploads/2020/11/The-Body-Shop-Logo.png',
        products,
        reviews: {
            average: 3,
            number: 200
        },        
    },
    {
        _id: Math.random(),
        name: {
            en: 'The Body Shop'
        },
        logo: 'https://logos-world.net/wp-content/uploads/2020/11/The-Body-Shop-Logo.png',
        products,
        reviews: {
            average: 1.5,
            number: 200
        },        
    },
    {
        _id: Math.random(),
        name: {
            en: 'The Body Shop'
        },
        logo: 'https://logos-world.net/wp-content/uploads/2020/11/The-Body-Shop-Logo.png',
        products,
        reviews: {
            average: 4.5,
            number: 200
        },        
    },
    {
        _id: Math.random(),
        name: {
            en: 'The Body Shop'
        },
        logo: 'https://logos-world.net/wp-content/uploads/2020/11/The-Body-Shop-Logo.png',
        products,
        reviews: {
            average: 4.5,
            number: 200
        },        
    }
];

const CategoryPage = (props) => {
    const [prods, setProds] = useState(products);
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState({country: 'usa'});
    const details = props.route.params;
    useEffect(() => {
        const timer = setTimeout(() => setSellers(_sellers), 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [])
    useEffect(() => {
        setLoading(false);
    }, [prods])
    return (
        <View style={styles.container}>
            <Header details={{title: details.name.en}} navigation={props.navigation} />
            <SubcategoriesScroll navigation={props.navigation} />
            <View style={styles.sortButton}>
                <MaterialIcons name="sort" size={40} color={gStyles.primary_light} />
            </View>
            {/* <Image source={{uri: details.banner}} style={styles.banner} /> */}
            <FlatList
                data={sellers}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                renderItem={({ item }) => <SellerCard key={item._id*Math.random()} seller={item} />}
                keyExtractor={product => `${product._id}${Math.random()}`}
                // getItemCount={(data) => data.length}
                // onEndReached={() => {
                //     setLoading(true);
                //     setTimeout(() => {
                //         setProds(prods => prods.concat(products));
                //     }, 1000)
                // }}
                // getItem={(products, index) => {
                //     const product = products[index];
                //     return {
                //         ...product,
                //         key: `${product._id}${Math.random()}`
                //     }
                // }}
            />
            {loading && <Text style={{position: 'absolute', bottom: 0}}>LOADING</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    }
});

export default CategoryPage;

const SubcategoriesScroll = ({navigation}) => {
    const subcategories = [
        {
            _id: `${Math.random()}`,
            name: {
                en: `Shirts`,
            },
            image: 'https://lh3.googleusercontent.com/proxy/zQaHwWBFkpQ6oFhcRYhQdk9nLPuwNuk_Xpsp7xKUd53E8fgEUlAIygtupHweNGhG68ouodme04ygf03uZyVzAEfacJtqUc-Ik77jnD_XX8KYJECcG_qRlvY6Thm0mj2NRDIrN8I'
        },
        {
            _id: `${Math.random()}`,
            name: {
                en: `Pants`,
            },
            image: 'https://i.pinimg.com/originals/56/fd/17/56fd178072129c8eaf5dc1460d587d7a.png'
        },
        {
            _id: `${Math.random()}`,
            name: {
                en: `Dresses`,
            },
            image: 'https://i.pinimg.com/originals/d6/0c/ae/d60cae213c52ae8111a55da8ff28e5b8.png'
        },
        {
            _id: `${Math.random()}`,
            name: {
                en: `Children`,
            },
            image: 'https://lh3.googleusercontent.com/proxy/0BdfuWc_Twk4hIFJI3VHE1hD6Bl8BESiKCXWyjktX6Sy5w-AmsK275PgqE_C4eNR8pUG-GAJPISwqCQee3VdSShK9metj1y9fKCegY6QTH_FDiSxswA0LZaFy1UjDEyagaS1T3a6'
        },
        {
            _id: `${Math.random()}`,
            name: {
                en: `Shirts`,
            },
            image: 'https://lh3.googleusercontent.com/proxy/zQaHwWBFkpQ6oFhcRYhQdk9nLPuwNuk_Xpsp7xKUd53E8fgEUlAIygtupHweNGhG68ouodme04ygf03uZyVzAEfacJtqUc-Ik77jnD_XX8KYJECcG_qRlvY6Thm0mj2NRDIrN8I'
        },
        {
            _id: `${Math.random()}`,
            name: {
                en: `Shirts`,
            },
            image: 'https://lh3.googleusercontent.com/proxy/zQaHwWBFkpQ6oFhcRYhQdk9nLPuwNuk_Xpsp7xKUd53E8fgEUlAIygtupHweNGhG68ouodme04ygf03uZyVzAEfacJtqUc-Ik77jnD_XX8KYJECcG_qRlvY6Thm0mj2NRDIrN8I'
        },
        {
            _id: `${Math.random()}`,
            name: {
                en: `Shirts`,
            },
            image: 'https://lh3.googleusercontent.com/proxy/zQaHwWBFkpQ6oFhcRYhQdk9nLPuwNuk_Xpsp7xKUd53E8fgEUlAIygtupHweNGhG68ouodme04ygf03uZyVzAEfacJtqUc-Ik77jnD_XX8KYJECcG_qRlvY6Thm0mj2NRDIrN8I'
        },
        {
            _id: `${Math.random()}`,
            name: {
                en: `Shirts`,
            },
            image: 'https://lh3.googleusercontent.com/proxy/zQaHwWBFkpQ6oFhcRYhQdk9nLPuwNuk_Xpsp7xKUd53E8fgEUlAIygtupHweNGhG68ouodme04ygf03uZyVzAEfacJtqUc-Ik77jnD_XX8KYJECcG_qRlvY6Thm0mj2NRDIrN8I'
        },
        {
            _id: `${Math.random()}`,
            name: {
                en: `Shirts`,
            },
            image: 'https://lh3.googleusercontent.com/proxy/zQaHwWBFkpQ6oFhcRYhQdk9nLPuwNuk_Xpsp7xKUd53E8fgEUlAIygtupHweNGhG68ouodme04ygf03uZyVzAEfacJtqUc-Ik77jnD_XX8KYJECcG_qRlvY6Thm0mj2NRDIrN8I'
        }
        
    ]
    return(
    <ScrollView showsHorizontalScrollIndicator={false} horizontal style={subcategoryStyles.scrollView} contentContainerStyle={{justifyContent: 'center'}}>
        {subcategories.map(subcategory => (
            <TouchableOpacity key={Math.random()} activeOpacity={0.4} onPress={() => navigation.push('Subcategory', {...subcategory})}>
                <View key={subcategory._id} style={subcategoryStyles.container}>
                    <Image style={{width: width * 0.13, aspectRatio: 1, borderRadius: 100 }} source={{uri: subcategory.image}} />
                </View>
                    <Text style={{fontSize: RFPercentage(1.4), textAlign: 'center'}}>{subcategory.name.en}</Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
    )
}

const subcategoryStyles = StyleSheet.create({
    container: {
        width: width * 0.17,
        height: width * 0.17,
        backgroundColor: 'white',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3,
        borderWidth: 2,
        borderColor: gStyles.secondary_medium
    },
    scrollView: {
        height: width * 0.32,
        borderBottomColor: gStyles.secondary_light,
        borderBottomWidth: 2
    }
})