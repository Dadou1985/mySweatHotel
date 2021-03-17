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
        display: "flex",
        flexDirection: "row",
        justi
    }
})
