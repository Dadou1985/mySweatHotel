import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'; 


const Maintenance = () => {
    const [type, setType] = useState("")
    const [details, setDetails] = useState("")
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
             <StatusBar style="light" />
            <Image source={{uri: "https://static.thenounproject.com/png/41655-200.png"}} style={styles.img} />
            <View style={styles.containerText}>
                <Text style={styles.text}>Maintenance</Text>
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="Type de problème" type="text" value={type} 
                onChangeText={(text) => setType(text)} />
                <Input placeholder="Plus de détails"  type="text" value={details} 
                onChange={(text) => setDetails(text)} />
            </View>
            <View style={{marginBottom: 55}}>
                <TouchableOpacity style={{flexDirection: "row", width: 300, alignItems: "center", justifyContent: "center"}}>
                <MaterialIcons name="add-a-photo" size={24} color="grey" />                    
                <Text style={{fontSize: 20, color: "grey", marginLeft: 10}}>Ajouter une image</Text>
                </TouchableOpacity>
            </View>
            <Button onPress={() => navigation.navigate('Home')} containerStyle={styles.button} title="Signaler maintenant" />
        </KeyboardAvoidingView>
    )
}

export default Maintenance

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    containerText: {
        marginBottom: 50
    },
    text: {
        fontSize: 30,
        textAlign: "center"
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10, 
        borderColor: "white" 
    },
    img: {
        width: 70,
        height: 70,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
})
