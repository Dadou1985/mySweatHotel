import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import { Avatar } from "react-native-elements"
import { StatusBar } from 'expo-status-bar';


const Chat = ({ navigation }) => {
    const [input, setInput] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () =>(
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Avatar 
                    rounded
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUgvALeuYiz-aak81IWy2kutu92BErr0k4tQ&usqp=CAU"}} />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight : "bold"}}>Chat Réception</Text>
                </View>
            )
        })
    }, [navigation])

    return (
        <SafeAreaView>
            <StatusBar style="light" />
            <KeyboardAvoidingView
             behavior={Platform.OS === "ios" ? "padding" : "height"}
             style={styles.container}
             keyboardVerticalOffset={90}>
                <ScrollView>

                </ScrollView>
                <View>
                    <TextInput 
                        value={input}
                        onChange={(text)}
                    ></TextInput>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({})
