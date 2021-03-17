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
            <View style={styles.containerImg}>
                <Image source={{uri: "https://www.shareicon.net/data/128x128/2016/09/01/822715_user_512x512.png"}} style={{width: 100, height: 100}} />
           
                <Image source={{uri: "https://www.shareicon.net/data/128x128/2016/09/01/822715_user_512x512.png"}} style={{width: 100, height: 100}} />
            </View>
            <Image source={{uri "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.fr%2Fpin%2F812688695252735038%2F&psig=AOvVaw2TbtDMtZdUQaJrnrQGe4Ph&ust=1616033298359000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCb7qiftu8CFQAAAAAdAAAAABAD"}}
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
