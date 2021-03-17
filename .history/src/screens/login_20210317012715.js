import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <View stye={styles.containerText}>
                <Text style={styles.text}>My</Text>
                <Text style={styles.text}>Sweat</Text>
                <Text style={styles.text}>Hotel</Text>
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autofocus type="email" value={email} 
                onChange={(text) => setEmail(text)} />
                <Input placeholder="Mot de passe" autofocus type="password" value={password} 
                onChange={(text) => setPassword(text)} />
            </View>
            <Button containerStyle={styles.button} title="Connexion" />
            <Button onPress={() => navigation.navigate('Inscription')} containerStyle={styles.button} title="Créer un compte" type="outline" />
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
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 50
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
