import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.containerText}>
                <Text style={styles.text}>My</Text>
                <Text style={styles.text}>Sweat</Text>
                <Text style={styles.text}>Hotel</Text>
            </View>            <View style={styles.inputContainer}>
                <Input placeholder="Nom" autofocus type="name" value={name} 
                onChange={(text) => setName(text)} />
                <Input placeholder="Email" autofocus type="email" value={email} 
                onChange={(text) => setEmail(text)} />
                <Input placeholder="Mot de passe" autofocus type="password" value={password} 
                onChange={(text) => setEmail(text)} />
            </View>
            <Button onPress={() => navigation.navigate('Connexion')} containerStyle={styles.button} title="Connexion" type="outline" />
            <Button containerStyle={styles.button} title="Créer un compte" />
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
