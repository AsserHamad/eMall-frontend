import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Searchbar(){
    const [text, setText] = useState('');
    return(
        <View style={styles.searchBar}>
            <View style={styles.icon}>
                <FontAwesomeIcon icon={faSearch} color='#a3a3a3' size={ 15 } />
            </View>
            <TextInput placeholder={'Search for anything...'} value={text} onChangeText={text => setText(text)} style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        width: '60%',
        height: 40,
        backgroundColor: '#FFCECE',
        borderRadius: 100,
        // justifyContent: 'center',
        alignItems: 'center',
        // textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    icon: {
        width: '14%',
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