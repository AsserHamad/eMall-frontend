import React from 'react';
import { Modal, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { gStyles } from '../../global.style';
import Icon from './Icon';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const CustomModal = ({children, modalVisible, setModalVisible, confirm = () => {}, close = () => {setModalVisible(false)}}) => {

    return (
        <View>
        <Modal
          animationType="fade"
          transparent={true}
          hideModalContentWhileAnimati
          onRequestClose={() => setModalVisible(false)}
          visible={modalVisible}
          >
            <View style={modalStyles.modalView}>
              <View style={modalStyles.modalContainer}>
                  {children}
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: height * 0.02}}>
                    <TouchableOpacity
                        style={{ ...modalStyles.openButton, backgroundColor: gStyles.color_2 }}
                        onPress={confirm}>
                        <Icon type={'Entypo'} name={'check'} color="white" size={RFPercentage(4)} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ ...modalStyles.openButton, backgroundColor: gStyles.color_3 }}
                        onPress={close}>
                        <Icon type={'Entypo'} name={'cross'} color="white" size={RFPercentage(4)} />
                    </TouchableOpacity>

                </View>
              </View>
            </View>
        </Modal>
      </View>
    );
}
  
const modalStyles = StyleSheet.create({
  modalView: {
    flex: 1,
    // margin: 30,
    backgroundColor: 'rgba(0,0,0,0.4)',
    // borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 35,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: height * 0.85
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: width * 0.02
    // elevation: 2,
  }
});

export default CustomModal;