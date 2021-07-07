import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import TextLato from '../components/utils/TextLato';
import Loading from '../components/utils/Loading';
import * as Updates from 'expo-updates';
import { gStyles } from '../global.style';

const Updating = () => {
    const [updating, setUpdating] = useState(true);
    useEffect(() => {
        Updates.checkForUpdateAsync()
        .then(update => {
            if (update.isAvailable) {
                setUpdating(false);
            } else {
              Updates.reloadAsync();
            }
        })
    }, []);
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../assets/logoM.png')} style={{width: 50, height: 50}} />
            <TextLato style={{color: 'black', fontSize: 20}}>Updating App, please wait...</TextLato>
            {updating ? <View style={{height: '40%'}}><Loading size="60%" /></View> : (
                <>
                    <View style={{height: '60%', justifyContent: 'flex-end'}} />
                </>
             ) }
            <TouchableHighlight activeOpacity={0.7} style={{backgroundColor: gStyles.color_2, borderRadius: 10, paddingVertical: 15, paddingHorizontal: 20}} onPress={() => Updates.reloadAsync()}>
                <TextLato style={{color: 'white'}}>Reload App</TextLato>
            </TouchableHighlight>
        </View>
    )
}

export default Updating;