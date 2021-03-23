import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { auth } from "../../firebase"
import { SimpleLineIcons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';

const MultiSelectDropdown = () => {
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
                            value={room} 
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
})
