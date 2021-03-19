import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'

const Chat = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions
        return () => {
            cleanup
        };
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
