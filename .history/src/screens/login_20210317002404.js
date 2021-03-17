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
            <View>
                <Input placeholder="Email" autofocus type="email" value={email} 
                onChange={(text) => setEmail(text)} />
                <Input placeholder="password" autofocus type="email" value={email} 
                onChange={(text) => setEmail(text)} />
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    
})
