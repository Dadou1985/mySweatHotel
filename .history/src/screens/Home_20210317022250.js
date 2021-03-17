import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View></View>
            <View></View>
            <View></View>
            <View></View>
        </KeyboardAvoidingView>
    )
}

export default Home

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
