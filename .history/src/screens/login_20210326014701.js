import React, { useState, useEffect, useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from "../../firebase"
import { UserContext } from '../components/userContext'
import moment from 'moment'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {userDB, setUserDB} = useContext(UserContext)

    useEffect(() => {
        let unsubscribe = auth.onAuthStateChanged(function(user) {
            if (user) {
                navigation.navigate('Information')
            } 
          });
        return unsubscribe
    }, [])

    console.log(moment(new Date()).format('L'))

    const Login = () => {
        setEmail('') 
        setPassword('')
        auth.signInWithEmailAndPassword(email, password)
    }


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
        borderColor: "white",
        borderRadius: 30
 
    }
})
