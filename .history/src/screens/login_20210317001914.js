import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Inpput, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const Login = () => {
    const [e, sete] = useState(initialState)


    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text>My Sweat Hotel</Text>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    
})
