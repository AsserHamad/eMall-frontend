import React from 'react';
import { Dimensions, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from './utils/Icon';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const HeaderSearchbar = (props) => {
    const [text, setText] = [props.text, props.setText];
    return (
        <View style={styles.searchBar}>
            <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
                <View style={styles.searchIcon}>
                    <Icon type="Ionicons" name="md-search" color='#a3a3a3' size={ RFPercentage(2.2) } />
                </View>
                <TextInput
                    placeholder={'Search for anything...'}
                    value={text}
                    onChangeText={text => {setText(text)}}
                    onSubmitEditing={() => setText('ayyyy')}
                    style={styles.input}
                />
                    <View style={styles.closeIcon}>
                        <TouchableOpacity onPress={() => {setText("")}}>
                        <Icon type="Ionicons" name="md-close-circle" color='#a3a3a3' size={ RFPercentage(2.2) } />
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width
    },
    searchBar: {
        width: width * 0.95,
        minHeight: 40,
        // backgroundColor: '#FFCECE',
        backgroundColor: 'white',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3,
        flexDirection: 'row',
    },
    searchIcon: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeIcon: {
        width: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: '100%',
        width: '77%',
        paddingRight: '5%',
        marginRight: 20
    },
})

export default HeaderSearchbar;