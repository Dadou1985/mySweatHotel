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
            <Image source={{uri: "https://cdn2.iconfinder.com/data/icons/car-11/100/taxi3-512.png"}} style={styles.img} />
            <View style={styles.containerText}>
                <Text style={styles.text}>Réserver un taxi</Text>
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="Date de réservation" autofocus type="text" value={date} 
                onChange={(text) => setDate(text)} />
                <Input placeholder="Heure de réservation" type="text" value={hour} 
                onChange={(text) => setHour(text)} />
                <Input placeholder="Nombre de passager(s)" type="number" value={passenger} 
                onChange={(text) => setPassenger(text)} />
                <Input placeholder="Type de véhicule" type="text" value={type} 
                onChange={(text) => setType(text)} />
                <Input placeholder="Adresse de la destination"  type="text" value={adress} 
                onChange={(text) => setAdress(text)} />
            </View>
            <Button onPress={() => navigation.navigate('Home')} containerStyle={styles.button} title="Réserver maintenant" />
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
