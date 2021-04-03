import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState, useContext } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { auth, db } from "../../firebase"
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import { UserContext } from '../components/userContext'
import moment from 'moment'
import { Divider } from 'react-native-elements';
import { showMessage, hideMessage } from "react-native-flash-message";

const ClickNwaitDrawer = () => {
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)
    
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default ClickNwaitDrawer

const styles = StyleSheet.create({})
