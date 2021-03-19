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
                <View>
                    <Avatar rounded />
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
