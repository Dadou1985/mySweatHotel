import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Maid from '../img/maid.svg'

const Home = () => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
                <Image source={{}} style={{width: 50, height: 200}} />
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
    }
})
