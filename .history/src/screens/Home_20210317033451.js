import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Maid from '../img/maid.svg'

const Home = () => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.textContainer}>Bienvenu.e à l'hôtel Mercure</Text>
            <View style={styles.containerTop}>
                <Image source={{uri: "https://static.thenounproject.com/png/496897-200.png"}} style={{width: 100, height: 100, shadowOffset: 10}} />
            
                <Image source={{uri: "https://static.thenounproject.com/png/41655-200.png"}} style={{width: 100, height: 100}} />
            </View>
            <Image source={{uri: "https://i.pinimg.com/originals/cb/59/ff/cb59ffb54f7bcca4dbbc1517a65c1f01.jpg"}} style={{width: 200, height: 200, position: "absolute", borderRadius: 100, top: 300}} />
            <View style={styles.containerBottom}>
                <Image source={{uri: "https://image.flaticon.com/icons/png/512/62/62834.png"}} style={{width: 100, height: 100}} />
           
                <Image source={{uri: "https://cdn2.iconfinder.com/data/icons/car-11/100/taxi3-512.png"}} style={{width: 100, height: 100}} />
            </View>
        </KeyboardAvoidingView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    containerTop: {
        width: "100%",
        height: "25%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    containerBottom: {
        width: "100%",
        height: "35%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    textContainer: {
        fontSize: 25,
        marginTop: 30
    }
})
