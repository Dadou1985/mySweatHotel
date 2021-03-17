import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const Taxi = () => {
    const [date, setDate] = useState("")
    const [hour, setHour] = useState("")
    const [passenger, setPassenger] = useState(null)
    const [type, setType] = useState("")
    const [adress, setAdress] = useState("")

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.containerText}>
                <Text style={styles.text}>Réserver un taxi</Text>
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="date de réservation" autofocus type="text" value={date} 
                onChange={(text) => setDate(text)} />
                <Input placeholder="Hour" type="text" value={hour} 
                onChange={(text) => setPassword(text)} />
            </View>
            <Button onPress={() => navigation.navigate('Home')} containerStyle={styles.button} title="Connexion" />
            <Button onPress={() => navigation.navigate('Inscription')} containerStyle={styles.button} title="Créer un compte" type="outline" />
        </KeyboardAvoidingView>
    )
}

export default Taxi

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
    }
})
