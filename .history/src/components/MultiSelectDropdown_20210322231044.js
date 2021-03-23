import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { auth } from "../../firebase"
import { SimpleLineIcons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';

const MultiSelectDropdown = ({data}) => {
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{fontSize: 20, textAlign: "center"}}>Bonjour {user.email}</Text>
                            <Input 
                            placeholder="Entrez votre numéro de chambre" 
                            autofocus 
                            type="number" 
                            value={const MultiSelectDropdown = ({data}) => {
                            } 
                            onChangeText={(text) => setRoom(text)} />
                        </View>
                    </View>
            </Modal>
        </View>
    )
}

export default MultiSelectDropdown

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        width: 350,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
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
})
