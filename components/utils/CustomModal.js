import React from 'react';
import { Modal, StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';

const CustomModal = ({children, modalVisible, setModalVisible}) => {

    return (
        <Modal
            // animationType="fade"
            // transparent={true}
            // onRequestClose={close}
            // animationIn="slideInLeft"
            // animationOut="slideOutRight"
            // useNativeDriver={true}
            // visible={modalVisible}
            >
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => console.log('hi')}><Text>hi</Text></TouchableOpacity>
                    {children}
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
      backgroundColor: 'white',
      margin: 30,
      borderRadius: 10,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }
});

export default CustomModal;