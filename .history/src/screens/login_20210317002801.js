import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text>My Sweat Hotel</Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autofocus type="email" value={email} 
                onChange={(text) => setEmail(text)} />
                <Input placeholder="Mot de passe" autofocus type="password" value={password} 
                onChange={(text) => setEmail(text)} />
            </View>
            <Button style={styles.button} title="Connexion" />
            <Button style={styles.button} title="Créer un compte" type="outline" />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container={}
})
