import React, { useState, useLayoutEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")

    

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.containerText}>
                <Text style={styles.text}>My</Text>
                <Text style={styles.text}>Sweat</Text>
                <Text style={styles.text}>Hotel</Text>
            </View>    
                <View style={styles.inputContainer}> 
                <Input placeholder="Nom" autofocus type="text" value={name} 
                onChange={(text) => setName(text)} />
                <Input placeholder="Email" type="email" value={email} 
                onChange={(text) => setEmail(text)} />
                <Input placeholder="Mot de passe" secureTextEntry type="password" value={password} 
                onChange={(text) => setPassword(text)} />
                <Input placeholder="Confirmation du mot de passe" secureTextEntry type="confirmPassword" value={confirmPassword} 
                onChange={(text) => setConfirmPassword(text)} />
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
    containerText: {
        marginBottom: 30
    },
    text: {
        fontSize: 50,
        textAlign: "center"
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    }
})
