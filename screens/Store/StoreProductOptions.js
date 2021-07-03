import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';
import TextLato from '../../components/utils/TextLato';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from '../../components/utils/Icon';
import CustomModal from '../../components/utils/CustomModal';
import Header from '../../components/Header';
import { gStyles } from '../../global.style';
import ProductPicker from '../../components/utils/ProductPicker';
import { useEffect, useState } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Constants } from 'react-native-unimodules';
import { useSelector } from 'react-redux';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const StoreProductOptions = ({navigation}) => {
    const [pickedProduct, setPickedProduct] = useState({});
    const [type, setType] = useState(0);
    const token = useSelector(state => state.authReducer.token);
    const options = [
        <Variants token={token} id={pickedProduct._id} />,
        <Options token={token} id={pickedProduct._id} />,
        <Specs token={token} id={pickedProduct._id} />
    ];
    return (
        <View style={{flex: 1, backgroundColor: gStyles.background}}>
            <Header details={{title: ''}} />
            <ScrollView style={styles.container}>

                {!Object.keys(pickedProduct).length ? [
                    <TextLato bold style={{fontSize: RFPercentage(2.5), marginVertical: height * 0.02, textAlign: 'center'}}>Pick a Product</TextLato>,
                    <ProductPicker pickedProduct={pickedProduct} setPickedProduct={setPickedProduct} />
                ] : [
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={{...styles.topButton, backgroundColor: type === 0 ? gStyles.color_2 : gStyles.color_0}} onPress={() => setType(0)}>
                            <TextLato style={styles.topButtonText}>Variants</TextLato>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.topButton, backgroundColor: type === 1 ? gStyles.color_2 : gStyles.color_0}} onPress={() => setType(1)}>
                            <TextLato style={styles.topButtonText}>Options</TextLato>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.topButton, backgroundColor: type === 2 ? gStyles.color_2 : gStyles.color_0}} onPress={() => setType(2)}>
                            <TextLato style={styles.topButtonText}>Specifications</TextLato>
                        </TouchableOpacity>
                    </View>,
                    options[type]
                ]
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.background
    },
    backContainer: {
        marginVertical: height * 0.02,
        marginHorizontal: width * 0.05
    },
    top: {
        flexDirection: 'row'
    },
    topImage: {
        width: '50%',
        aspectRatio: 1286/799
    },
    button: {
        marginHorizontal: '5%',
        backgroundColor: gStyles.color_0,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.22,
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.1,
        borderRadius: 20
    },
    buttonText: {
        color: 'white',
        fontSize: RFPercentage(1.7),
        textAlign: 'center',
        marginTop: height * 0.02,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: height * 0.04
    },
    topButton: {
        marginHorizontal: width * 0.01,
        borderRadius: 20,
        backgroundColor: gStyles.color_0,
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.03
    },
    topButtonText: {
        color: 'white',
        fontSize: RFPercentage(2)
    }
})

const Specs = ({id, token}) => {
    const [specs, setSpecs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enTitle, setEnTile] = useState('');
    const [arTitle, setArTile] = useState('');
    const [enDescription, setEnDescription] = useState('');
    const [arDescription, setArDescription] = useState('');

    useEffect(() => {
        if(id){
            fetchSpecs();
        }
    }, [id]);

    const fetchSpecs = () => {
        setLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/product/${id}`)
        .then(res => res.json())
        .then(res => {
            setSpecs(res.specifications);
            setLoading(false);
        })
    };

    const addSpec = () => {
        if(enTitle === '' || enDescription === '' || arDescription === '' || arDescription === '') return;
        fetch(`${Constants.manifest.extra.apiUrl}/product/options`, {
            method: 'put',
            headers: {'Content-Type': "application/json", token},
            body: JSON.stringify({product: {_id: id, $push: {
                specifications: {
                    title: {en: enTitle, ar: arTitle},
                    details: {en: enDescription, ar: arDescription}
                }
            }}})
        })
        .then(res => res.json())
        .then(res => {
            fetchSpecs();
        })
    }

    const removeSpec = (_id) => {
        fetch(`${Constants.manifest.extra.apiUrl}/product/options`, {
            method: 'put',
            headers: {'Content-Type': "application/json", token},
            body: JSON.stringify({product: {_id: id, $pull: {
                specifications: { _id}
            }}})
        })
        .then(res => res.json())
        .then(res => {
            fetchSpecs();
        })

    }
    if(loading)
        return <View style={{height: height * 0.1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator color={gStyles.color_2} size={RFPercentage(3)} /></View>
    
    return (
        <View>
            <TextLato bold style={{textAlign: 'center', fontSize: RFPercentage(2.5)}}>Specifications</TextLato>
            {specs.map(spec => {
                return (
                    <View key={spec._id} style={{backgroundColor: '#ddd', marginVertical: height * 0.01, flexDirection: 'row', paddingVertical: height * 0.01}}>
                        <View style={{width: '90%'}}>
                            <View style={{flexDirection: 'row', marginVertical: height * 0.01}}>
                                <TextLato style={specStyles.text}>{spec.title.en}</TextLato>
                                <TextLato style={specStyles.text}>{spec.details.en}</TextLato>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <TextLato style={{...specStyles.text, fontFamily: 'Cairo'}}>{spec.title.ar}</TextLato>
                                <TextLato style={{...specStyles.text, fontFamily: 'Cairo'}}>{spec.details.ar}</TextLato>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeSpec(spec._id)} style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon type="AntDesign" name="delete" size={24} style={{alignItems: 'center', justifyContent: 'center'}} color={gStyles.color_0} />
                        </TouchableOpacity>
                    </View>
                )
            })}
            <TextLato style={{marginVertical: height * 0.02, marginHorizontal: width * 0.03, fontSize: RFPercentage(2.5)}} bold>Add Specification</TextLato>
            <View style={{alignItems: 'center'}}>
                <View style={specStyles.inputContainer}>
                    <TextInput bold style={specStyles.input} placeholder={'English Title'} value={enTitle} onChangeText={val => setEnTile(val)} />
                    <TextInput style={specStyles.input} placeholder={'English Description'} value={enDescription} onChangeText={val => setEnDescription(val)} />
                </View>
                <View style={specStyles.inputContainer}>
                    <TextInput bold style={{...specStyles.input, fontFamily: 'Cairo'}} placeholder={'Arabic Title'} value={arTitle} onChangeText={val => setArTile(val)} />
                    <TextInput style={{...specStyles.input, fontFamily: 'Cairo'}} placeholder={'Arabic Description'} value={arDescription} onChangeText={val => setArDescription(val)} />
                </View>
            </View>
            <TouchableOpacity onPress={addSpec} style={specStyles.button}>
                <TextLato bold style={{color: 'white'}}>Add Spec</TextLato>
            </TouchableOpacity>
        </View>

    )
}

const specStyles = StyleSheet.create({
    text: {
        marginHorizontal: width * 0.02, 
        width: '45%', 
        textAlign: 'center',
        fontSize: RFPercentage(2)
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.01
    },
    input: {
        width: '44%',
        marginHorizontal: '2%',
        borderBottomColor: gStyles.color_0,
        borderBottomWidth: 1
    },
    button: {
        marginHorizontal: width * 0.05,
        marginVertical: height * 0.02,
        backgroundColor: gStyles.color_2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.02,
        borderRadius: 10
    }
})

const Options = ({id, token}) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enTitle, setEnTile] = useState('');
    const [arTitle, setArTile] = useState('');
    const [enFirstOption, setEnFirstOption] = useState('');
    const [arFirstOption, setARFirstOption] = useState('');
    const [extraPrice, setExtraPrice] = useState('');
    const [stock, setStock] = useState('');

    const [enParam, setEnParam] = useState('');
    const [arParam, setArParam] = useState('');
    const [extraParam, setExtraParam] = useState('');
    const [stockParam, setStockParam] = useState('');
    const [visible, setVisible] = useState(false);
    const [innerOption, setInnerOption] = useState(null);
    const [_id, set_Id] = useState(null);

    useEffect(() => {
        if(id){
            fetchOptions();
        }
    }, [id]);

    const openAddModal = (id) => {
        setInnerOption(null);
        setEnParam('');
        setArParam('');
        setExtraParam('');
        setStockParam('');
        set_Id(id);
        setVisible(true);
    }

    const openUpdateModal = (id, option) => {
        setInnerOption(option._id);
        setEnParam(option.title.en);
        setArParam(option.title.ar);
        setExtraParam(option.extraPrice + '');
        setStockParam(option.stock + '');
        set_Id(id);
        setVisible(true);
    }

    const fetchOptions = () => {
        setLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/product/${id}`)
        .then(res => res.json())
        .then(res => {
            setOptions(res.options);
            setLoading(false);
        })
    };

    const addOption = () => {
        if(enTitle === '') return;
        fetch(`${Constants.manifest.extra.apiUrl}/product/options`, {
            method: 'put',
            headers: {'Content-Type': "application/json", token},
            body: JSON.stringify({product: {_id: id, $push: {
                options: {
                    title: {en: enTitle, ar: arTitle},
                    options: [{title: {en: enFirstOption, ar: arFirstOption}, extraPrice: Number(extraPrice), stock: Number(stock)}]
                }
            }}})
        })
        .then(res => res.json())
        .then(res => {
            setVisible(false);
            fetchOptions();
        })
    }

    const addOptionParam = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/product/options/add-param`, {
            method: 'put',
            headers: {'Content-Type': "application/json", token},
            body: JSON.stringify({
                optionId: _id,
                option: {title: {en: enParam, ar: arParam}, extraPrice: Number(extraParam), stock: Number(stockParam)}
            })
        })
        .then(res => res.json())
        .then(res => {
            setVisible(false);
            fetchOptions();
        })
        
    }

    const updateOptionParam = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/product/options/update-param`, {
            method: 'put',
            headers: {'Content-Type': "application/json", token},
            body: JSON.stringify({
                productId: id,
                optionId: _id,
                innerOptionId: innerOption,
                option: {title: {en: enParam, ar: arParam}, extraPrice: Number(extraParam), stock: Number(stockParam)}
            })
        })
        .then(res => res.json())
        .then(res => {
            fetchOptions();
            setVisible(false);
        })

    }

    const removeOption = (_id) => {
        fetch(`${Constants.manifest.extra.apiUrl}/product/options`, {
            method: 'put',
            headers: {'Content-Type': "application/json", token},
            body: JSON.stringify({product: {_id: id, $pull: {
                specifications: { _id}
            }}})
        })
        .then(res => res.json())
        .then(res => {
            fetchSpecs();
        })

    }
    if(loading)
        return <View style={{height: height * 0.1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator color={gStyles.color_2} size={RFPercentage(3)} /></View>
    
    return (
        <View>
            <CustomModal modalVisible={visible} setModalVisible={setVisible} confirm={innerOption ? updateOptionParam : addOptionParam}>
                <TextLato bold style={{textAlign: 'center', marginVertical: height * 0.03, fontSize: RFPercentage(2.7)}}>{innerOption ? 'Updating Option' : 'Add Option'}</TextLato>
                <View>
                    <TextInput style={optionsStyles.miniInput} value={enParam} onChangeText={val => setEnParam(val)} placeholder="English Title" />
                    <TextInput style={optionsStyles.miniInput} value={arParam} onChangeText={val => setArParam(val)} placeholder="Arabic Title" />
                    <TextInput style={optionsStyles.miniInput} value={extraParam} onChangeText={val => setExtraParam(val)} placeholder="Extra Price" />
                    <TextInput style={optionsStyles.miniInput} value={stockParam} onChangeText={val => setStockParam(val)} placeholder="Stock" />
                </View>

            </CustomModal>
            <TextLato bold style={{textAlign: 'center', fontSize: RFPercentage(2.5)}}>Options</TextLato>
            {options.map(option => {
                return (
                    <View key={option._id}>
                        <View style={{backgroundColor: '#ddd', marginVertical: height * 0.01, paddingVertical: height * 0.01}}>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <TextLato style={{width: '50%', textAlign: 'center'}}>{option.title.en}</TextLato>
                                    <TextLato style={{width: '50%', textAlign: 'center', fontFamily: 'Cairo'}}>{option.title.ar}</TextLato>
                                </View>
                                <View style={optionsStyles.optionContainer}>
                                    <View style={{flexDirection: 'row', marginBottom: height * 0.03}}>
                                        <TextLato style={{width: '25%', fontSize: RFPercentage(1.7), textAlign: 'center'}} bold>English Title</TextLato>
                                        <TextLato style={{width: '25%', fontSize: RFPercentage(1.7), textAlign: 'center'}} bold>Arabic Title</TextLato>
                                        <TextLato style={{width: '25%', fontSize: RFPercentage(1.7), textAlign: 'center'}} bold>Extra Price</TextLato>
                                        <TextLato style={{width: '25%', fontSize: RFPercentage(1.7), textAlign: 'center'}} bold>Stock</TextLato>
                                    </View>
                                    {option.options.map(innerOption => {
                                        return (
                                            <TouchableOpacity onPress={() => openUpdateModal(option._id, innerOption)} style={{flexDirection: 'row', marginBottom: height * 0.01}} key={innerOption._id}>
                                                <TextLato style={{width: '25%', fontSize: RFPercentage(1.7), textAlign: 'center'}}>{innerOption.title.en}</TextLato>
                                                <TextLato style={{width: '25%', fontSize: RFPercentage(1.7), textAlign: 'center'}}>{innerOption.title.ar}</TextLato>
                                                <TextLato style={{width: '25%', fontSize: RFPercentage(1.7), textAlign: 'center'}}>{innerOption.extraPrice || 0}</TextLato>
                                                <TextLato style={{width: '25%', fontSize: RFPercentage(1.7), textAlign: 'center'}}>{innerOption.stock || 0}</TextLato>
                                            </TouchableOpacity>
                                        )
                                    })}
                                    <TouchableOpacity onPress={() => {openAddModal(option._id)}} style={optionsStyles.confirmButton}>
                                        <TextLato italic style={{color: 'white'}}>Add Option Parameter</TextLato>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                            <TouchableOpacity onPress={() => removeOption(option._id)} style={{marginVertical: height * 0.02, justifyContent: 'center', alignItems: 'center'}}>
                            <Icon type="AntDesign" name="delete" size={24} style={{alignItems: 'center', justifyContent: 'center'}} color={gStyles.color_0} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })}
            <TextLato style={{marginVertical: height * 0.02, marginHorizontal: width * 0.03, fontSize: RFPercentage(2.5)}} bold>Add Option</TextLato>
            <View style={{alignItems: 'center'}}>
                <View style={specStyles.inputContainer}>
                    <TextInput bold style={specStyles.input} placeholder={'English Title'} value={enTitle} onChangeText={val => setEnTile(val)} />
                    <TextInput bold style={{...specStyles.input, fontFamily: 'Cairo'}} placeholder={'Arabic Title'} value={arTitle} onChangeText={val => setArTile(val)} />
                </View>
                <TextLato italic style={{marginTop: height * 0.03}}>First Option</TextLato>
                <View style={{...specStyles.inputContainer, flexDirection: 'column'}}>
                    <TextInput style={{...specStyles.input, fontFamily: 'Cairo', width: width * 0.9, marginTop: height * 0.02}} placeholder={'English First Option Title'} value={enFirstOption} onChangeText={val => setEnFirstOption(val)} />
                    <TextInput style={{...specStyles.input, fontFamily: 'Cairo', width: width * 0.9, marginTop: height * 0.03}} placeholder={'Arabic First Option Title'} value={arFirstOption} onChangeText={val => setARFirstOption(val)} />
                    <TextInput style={{...specStyles.input, fontFamily: 'Cairo', width: width * 0.9, marginTop: height * 0.03}} placeholder={'Extra Price'} value={extraPrice} onChangeText={val => setExtraPrice(val)} />
                    <TextInput style={{...specStyles.input, fontFamily: 'Cairo', width: width * 0.9, marginTop: height * 0.03}} placeholder={'Stock'} value={stock} onChangeText={val => setStock(val)} />
                </View>
            </View>
            <TouchableOpacity onPress={addOption} style={specStyles.button}>
                <TextLato bold style={{color: 'white'}}>Add Option</TextLato>
            </TouchableOpacity>
        </View>

    )
}

const optionsStyles = StyleSheet.create({
    text: {
        marginHorizontal: width * 0.02, 
        width: '45%', 
        textAlign: 'center',
        fontSize: RFPercentage(2)
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.01
    },
    miniInput: {
        width: width * 0.7,
        marginHorizontal: '1%',
        borderBottomColor: gStyles.color_0,
        borderBottomWidth: 2,
        fontSize: RFPercentage(2.5),
        textAlign: 'left',
        marginVertical: height * 0.02,
        fontFamily: 'Cairo'
    },
    input: {
    },
    confirmButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        marginVertical: height * 0.03,
        backgroundColor: gStyles.color_2,
        borderRadius: 20
    },
    optionContainer: {
        marginHorizontal: width * 0.05,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#666',
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.02
    },
    button: {
        marginHorizontal: width * 0.05,
        marginVertical: height * 0.02,
        backgroundColor: gStyles.color_2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.02,
        borderRadius: 10
    }
})

const Variants = ({id, token}) => {
    const [loading, setLoading] = useState(true);
    const [variants, setVariants] = useState(null);
    const [enTitle, setEnTitle] = useState('Color');
    const [arTitle, setArTitle] = useState('اللون');
    const [enVariantTitle, setEnVariantTitle] = useState('Red');
    const [arVariantTitle, setArVariantTitle] = useState('احمر');
    const [visible, setVisible] = useState(false);
    
    const [editId, setEditId] = useState(null);
    const [pickedProduct, setPickedProduct] = useState(null);
    const [pickedProductEnTitle, setPickedProductEnTitle] = useState('');
    const [pickedProductArTitle, setPickedProductArTitle] = useState('');
    useEffect(() => {
        fetchVariants();
    }, []);
    
    const fetchVariants = () => {
        setLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/product/variant/${id}`)
        .then(res => res.json())
        .then(res => {
            setLoading(false);
            setVariants(res);
        })
    }

    const createVariant = () => {
        setLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/product/variant/`, {
                method: 'post',
                headers: {'Content-Type': "application/json", token},
                body: JSON.stringify({title: {en: enTitle, ar: arTitle}, product: id, variant: {en: enVariantTitle, ar: arVariantTitle}})
            }
        )
        .then(res => {
            fetchVariants();
        });
    }

    const updateOrCreate = () => {
        setLoading(true);
        if(editId){
            fetch(`${Constants.manifest.extra.apiUrl}/product/variant/`, {
                    method: 'put',
                    headers: {'Content-Type': "application/json", token},
                    body: JSON.stringify({
                        _id: variants._id,
                        variantId: editId,
                        variant: {
                            en: pickedProductEnTitle,
                            ar: pickedProductArTitle
                        },
                        product: pickedProduct._id
                    })
                }
            )
            .then(res => {
                setVisible(false);
                fetchVariants();
            });
        } else {
            fetch(`${Constants.manifest.extra.apiUrl}/product/variant/add`, {
                method: 'put',
                headers: {'Content-Type': "application/json", token},
                body: JSON.stringify({
                    _id: variants._id,
                    variant: {
                        en: pickedProductEnTitle,
                        ar: pickedProductArTitle
                    },
                    product: pickedProduct._id
                })
            })
            .then(res => {
                setVisible(false);
                fetchVariants();
            });
        }
    }

    const removeVariant = (variantId) => {
        setLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/product/variant`, {
            method: 'delete',
            headers: {'Content-Type': "application/json", token},
            body: JSON.stringify({
                _id: variants._id,
                variantId
            })
        })
        .then(res => {
            fetchVariants();
        });
    }

    if(loading)
        return <View><ActivityIndicator color={gStyles.color_2} size={RFPercentage(2.5)} /></View>
    if(variants === null)
    return (
        <View>
            <TextLato bold style={{textAlign: 'center', fontSize: RFPercentage(2.5)}}>Variants</TextLato>
            <View style={variantStyles.formContainer}>
                <TextLato style={variantStyles.inputTitle} bold>Set as a Variant</TextLato>
                <TextInput style={variantStyles.input} value={enTitle} onChangeText={val => setEnTitle(val)} placeholder={'English Title (e.g. Color)'} />
                <TextInput style={variantStyles.input} value={arTitle} onChangeText={val => setArTitle(val)} placeholder={'Arabic Title (e.g. اللون)'} />
                
                <TextLato style={variantStyles.inputTitle} bold>Product variant title</TextLato>
                <TextInput style={variantStyles.input} value={enVariantTitle} onChangeText={val => setEnVariantTitle(val)} placeholder={'English Title (e.g. Red)'} />
                <TextInput style={variantStyles.input} value={arVariantTitle} onChangeText={val => setArVariantTitle(val)} placeholder={'Arabic Title (e.g. احمر)'} />
            </View>
            <TouchableOpacity style={variantStyles.buttonContainer} onPress={createVariant}>
                <TextLato style={{color: 'white', fontSize: RFPercentage(2)}}>Initiate Variant</TextLato>
            </TouchableOpacity>
        </View>
    )
    return (
        <View>
            <TextLato bold style={variantStyles.title}>{variants.title.en}/{variants.title.ar}</TextLato>
            <View style={{alignItems: 'center', marginTop: height * 0.05, backgroundColor: 'white', paddingVertical: height * 0.02}}>
                <View style={{flexDirection: 'row', width: width * 0.98, alignItems: 'center', justifyContent: 'center', marginBottom: height * 0.02}}>
                    <TextLato bold style={{width: '25%', textAlign: 'center'}}>Variant</TextLato>
                    <TextLato bold style={{width: '25%', textAlign: 'center'}}>Product</TextLato>
                    <TextLato bold style={{width: '25%', textAlign: 'center'}}>Image</TextLato>
                    <TextLato bold style={{width: '25%', textAlign: 'center'}}>Actions</TextLato>
                </View>
                {variants.products.map(product => {
                    
                    return (
                        <View style={{flexDirection: 'row', width: width * 0.98, alignItems: 'center', justifyContent: 'center', marginVertical: height * 0.015}}>
                            <TextLato style={{width: '25%', textAlign: 'center', fontSize: RFPercentage(1.5)}}>{product.variant.en}</TextLato>
                            <TextLato style={{width: '25%', textAlign: 'center', fontSize: RFPercentage(1.5)}}>{product.product.title.en}</TextLato>
                            <Image source={{uri: product.product.images[0]}} style={{width: '25%', height: height * 0.1}} />
                            <View style={{width: '25%', justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity onPress={() => {
                                    setPickedProduct(product.product);
                                    setEditId(product._id);
                                    setPickedProductEnTitle(product.variant.en);
                                    setPickedProductArTitle(product.variant.ar);
                                    setVisible(true);
                                }} style={variantStyles.actionButtons}>
                                    <Icon type="Feather" name="edit" size={RFPercentage(2)} color={'white'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => removeVariant(product._id)} style={variantStyles.actionButtons}>
                                    <Icon type="AntDesign" name="delete" size={RFPercentage(2)} color={'white'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </View>
            <TouchableOpacity onPress={() => {
                setEditId(null);
                setPickedProduct({});
                setPickedProductEnTitle('');
                setPickedProductArTitle('');
                setVisible(true);
            }} style={variantStyles.buttonContainer}>
                <TextLato style={{color: 'white'}}>Add Product to Variant</TextLato>
            </TouchableOpacity>
            <CustomModal modalVisible={visible} setModalVisible={setVisible} close={() => {
                setEditId(null);
                setPickedProduct({});
                setPickedProductEnTitle('');
                setPickedProductArTitle('');
                setVisible(false);
            }}
            confirm={updateOrCreate}>
                <View style={{height: height * 0.7, width: width * 0.77}}>
                    <TextLato bold style={{textAlign: 'center'}}>{variants.title.en}/{variants.title.ar}</TextLato>
                    <TextLato style={variantStyles.inputTitle} bold>Product variant title</TextLato>
                    <TextInput style={variantStyles.input} value={pickedProductEnTitle} onChangeText={val => setPickedProductEnTitle(val)} placeholder={'English Title (e.g. Red)'} />
                    <TextInput style={variantStyles.input} value={pickedProductArTitle} onChangeText={val => setPickedProductArTitle(val)} placeholder={'Arabic Title (e.g. احمر)'} />
                    <ProductPicker pickedProduct={pickedProduct} setPickedProduct={setPickedProduct} style={{height: height * 0.1}} />
                </View>
            </CustomModal>
        </View>
    )
}

const variantStyles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: RFPercentage(3),
        fontFamily: 'Cairo'
    },
    formContainer: {
        marginHorizontal: width * 0.04,
        marginTop: height * 0.01
    },
    inputTitle: {
        fontSize: RFPercentage(2.5),
        marginVertical: height * 0.02
    },
    input: {
        fontSize: RFPercentage(2),
        fontFamily: 'Cairo',
        marginBottom: height * 0.02,
        paddingVertical: height * 0.01,
        borderBottomWidth: 1.5,
        borderColor: gStyles.color_2
    },
    buttonContainer: {
        width: width * 0.8,
        marginHorizontal: width * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: gStyles.color_2, 
        paddingVertical: height * 0.02,
        borderRadius: 100,
        marginTop: height * 0.05
    },
    actionButtons: {
        backgroundColor: gStyles.color_2,
        paddingVertical: width * 0.02,
        aspectRatio: 1,
        borderRadius: 100,
        marginBottom: height * 0.01,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StoreProductOptions;