import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Maid from '../img/maid.svg'

const Home = () => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
                <Image source={{uri: "https://i.pinimg.com/originals/cb/59/ff/cb59ffb54f7bcca4dbbc1517a65c1f01.jpg"}} style={{width: 50, height: 200}} />
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
