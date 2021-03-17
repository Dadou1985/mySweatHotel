import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Maid from '../img/'

const Home = () => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <View>
                <Image source={{}}
            </View>
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
