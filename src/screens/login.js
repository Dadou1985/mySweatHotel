import React, { useState, useEffect, useContext } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth, db } from "../../firebase"
import { UserContext } from '../components/userContext'
import { showMessage } from "react-native-flash-message"

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {userDB, setUserDB} = useContext(UserContext)
    const [language, setLanguage] = useState("fr")
    const [fullLanguage, setFullLanguage] = useState("")

    const handleGuestRegistration = (userId) => {
        return db.collection('guestUsers')
        .doc(userId)
        .update({language: language})
    }

    useEffect(() => {
        
        let unsubscribe = auth.onAuthStateChanged(function(user) {
            if (user) {
                handleGuestRegistration(user.uid)
                navigation.navigate('Information')
                setTimeout(() => {
                    showMessage({
                        message: "Vous êtes connecté !",
                        type: "info",
                    })
                }, 1000);
            } 
          });
        return unsubscribe
    }, [])

    console.log("//////", userDB)

    const Login = () => {
        auth.signInWithEmailAndPassword(email.trim(), password)
        .then(() => {
            setEmail('') 
            setPassword('')
        })
    }

    const internationalization = [
        {language: "fr", fullLanguage: ""},
        {language: "ar", fullLanguage: ""},
        {language: "de", fullLanguage: ""},
        {language: "en", fullLanguage: ""},
        {language: "es", fullLanguage: ""},
        {language: "hi", fullLanguage: ""},
        {language: "it", fullLanguage: ""},
        {language: "ja", fullLanguage: ""},
        {language: "ja", fullLanguage: ""},
        {language: "ko", fullLanguage: ""},
        {language: "pt", fullLanguage: ""},
        {language: "ur", fullLanguage: ""},
        {language: "zh", fullLanguage: ""},
      ]


    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.containerText}>
                <Text style={styles.text}>My</Text>
                <Text style={styles.text}>Sweet</Text>
                <Text style={styles.text}>Hotel</Text>
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autofocus type="email" value={email} 
                onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Mot de passe" secureTextEntry type="password" value={password} 
                onChangeText={(text) => setPassword(text)} />
            </View>
            <Button onPress={() => {
                Login()
                }} containerStyle={styles.button} title="Connexion" />
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
        borderColor: "white",
        borderRadius: 30
 
    }
})
