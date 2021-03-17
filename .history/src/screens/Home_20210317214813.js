import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Maid from '../img/maid.svg'

const Home = () => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.textContainer}>
                <Text style={{fontSize: 20}}>Bienvenu.e à l'hôtel Mercure</Text>
            </View>
           
            <TouchableOpacity style={styles.button}>
                <Image source={{uri: "https://static.thenounproject.com/png/159574-200.png"}} style={styles.img} />
            </TouchableOpacity>
           
            <View style={styles.containerTop}>
                <TouchableOpacity>
                    <Image source={{uri: "https://static.thenounproject.com/png/496897-200.png"}} style={styles.img} />
                </TouchableOpacity>            
                <TouchableOpacity>
                    <Image source={{uri: "https://static.thenounproject.com/png/41655-200.png"}} style={styles.img} />
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity>
                <Image source={{uri: "https://i.pinimg.com/originals/cb/59/ff/cb59ffb54f7bcca4dbbc1517a65c1f01.jpg"}} style={{width: 200, height: 200, position: "absolute", borderRadius: 100, top: 310}} />
            </TouchableOpacity>
            
            <View style={styles.containerBottom}>
                <TouchableOpacity>
                    <Image source={{uri: "https://image.flaticon.com/icons/png/512/62/62834.png"}} style={styles.img} />
                </TouchableOpacity>           
                <TouchableOpacity>
                    <Image source={{uri: "https://cdn2.iconfinder.com/data/icons/car-11/100/taxi3-512.png"}} style={styles.img} />
                </TouchableOpacity>
            </View>
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
        height: "25%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        height: 100
    },
    img: {
        width: 70,
        height: 70,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
})
