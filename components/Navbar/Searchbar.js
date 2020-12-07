import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const width = Dimensions.get('window').width;

function Searchbar(){
    const [text, setText] = useState('');
    return(
        <View style={styles.searchBar}>
            <View style={styles.icon}>
                <Ionicons name="md-search" color='#a3a3a3' size={ 15 } />
            </View>
            <TextInput placeholder={'Search for anything...'} value={text} onChangeText={text => setText(text)} style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        width: width * 0.97,
        height: 40,
        backgroundColor: '#FFCECE',
        borderRadius: 100,
        alignItems: 'center',
        marginTop: 3,
        display: 'flex',
        flexDirection: 'row',
    },
    icon: {
        width: '10%',
        alignItems: 'center'
    },
    input: {
        height: '100%',
        width: '80%',
        paddingRight: '5%',
        marginRight: 20
    },

})

export default Searchbar;