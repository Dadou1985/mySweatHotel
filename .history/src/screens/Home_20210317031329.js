import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Maid from '../img/maid.svg'

const Home = () => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            
            <View style={styles.containerImg}>
                <Image source={{uri: "https://www.shareicon.net/data/128x128/2016/09/01/822715_user_512x512.png"}} style={{width: 100, height: 100}} />
            
                <Image source={{uri: "https://www.shareicon.net/data/128x128/2016/09/01/822715_user_512x512.png"}} style={{width: 100, height: 100}} />
            </View>
            <Image source={{uri: "https://i.pinimg.com/originals/cb/59/ff/cb59ffb54f7bcca4dbbc1517a65c1f01.jpg"}} style={{width: 200, height: 200, position: "absolute", borderRadius: 100}} />

            <View style={styles.containerImg}>
                <Image source={{uri: "https://www.shareicon.net/data/128x128/2016/09/01/822715_user_512x512.png"}} style={{width: 100, height: 100}} />
           
                <Image source={{uri: "https://www.shareicon.net/data/128x128/2016/09/01/822715_user_512x512.png"}} style={{width: 100, height: 100}} />
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
    containerImg: {
        width: "100%",
        height: "50%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
})
