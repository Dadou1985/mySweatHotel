import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from "../../firebase"
import Registrator from "../components/HotelRegistrator"

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [room, setRoom] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        let unsubscribe = auth.onAuthStateChanged(function(user) {
            if (user) {
                navigation.replace('Home')
            } 
          });
        return unsubscribe
    }, [])

    useEffect(() => {
        const getHotel = () => {
            return db.collection("mySweatHotel")
                    .doc('country')
                    .collection('France')
                    .doc('collection')
                    .collection('hotel')
                }

        let unsubscribe = getHotel.onSnapshot(function(snapshot) {
            const snapInfo = []
          snapshot.forEach(function(doc) {          
            snapInfo.push({
                id: doc.id,
                ...doc.data()
              })        
            });
            console.log(snapInfo)
            setDetails(snapInfo)
        });
        return unsubscribe
    }, [input])

    const Login = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                phoneNumber: room,
            })
        })
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.containerText}>
                <Text style={styles.text}>My</Text>
                <Text style={styles.text}>Sweat</Text>
                <Text style={styles.text}>Hotel</Text>
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autofocus type="email" value={email} 
                onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Mot de passe" secureTextEntry type="password" value={password} 
                onChangeText={(text) => setPassword(text)} />
                <Input placeholder="Numéro de chambre" type="number" value={room} 
                onChangeText={(text) => setRoom(text)} />
            </View>
            <Button onPress={Login} containerStyle={styles.button} title="Connexion" />
            <Button onPress={() => navigation.navigate('Inscription')} containerStyle={styles.button} title="Créer un compte" type="clear" />
        </KeyboardAvoidingView>
    )
}

export default Login

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
        fontSize: 40,
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
