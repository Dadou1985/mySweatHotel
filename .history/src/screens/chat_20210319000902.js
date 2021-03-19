import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import { Avatar } from "react-native-elements"

const Chat = ({ navigation }) => {
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
                    <Text style={{ color}}>Chat Réception</Text>
                </View>
            )
        })
    }, [navigation])

    return (
        <SafeAreaView>
            <ScrollView>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({})
