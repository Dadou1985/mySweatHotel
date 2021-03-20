import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const Timer = () => {
    const [date, setDate] = useState("")
    const [hour, setHour] = useState("")

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image source={{uri: "https://image.flaticon.com/icons/png/512/62/62834.png"}} style={styles.img} />
            <View style={styles.containerText}>
                <Text style={styles.text}>Réveil</Text>
            </View>
            <View style={styles.inputContainer}>
            <Input placeholder="Date de réveil" autofocus type="text" value={date} 
                onChangeText={(text) => setDate(text)} />
                <Input placeholder="Heure de réveil" type="text" value={hour} 
                onChangeText={(text) => setHour(text)} />
            </View>        
            <Button onPress={() => navigation.navigate('Home')} containerStyle={styles.button} title="Programmer maintenant" />
        </KeyboardAvoidingView>
    )
}

export default Timer

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
        width: 250,
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