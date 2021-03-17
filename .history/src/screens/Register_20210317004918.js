import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setname] = useState("")

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <Text >My Sweat Hotel</Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autofocus type="email" value={email} 
                onChange={(text) => setEmail(text)} />
                <Input placeholder="Mot de passe" autofocus type="password" value={password} 
                onChange={(text) => setEmail(text)} />
            </View>
            <Button containerStyle={styles.button} title="Connexion" />
            <Button containerStyle={styles.button} title="Créer un compte" type="outline" />
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    }
})
