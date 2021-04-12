import React, { useLayoutEffect, useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { Avatar } from "react-native-elements"
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';
import { UserContext } from '../components/userContext'
import { auth, db } from "../../firebase"
import moment from 'moment'

import { getPendingResultAsync } from 'expo-image-picker';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const Chat = ({ navigation }) => {
    const [input, setInput] = useState("")
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)
    const [messages, setMessages] = useState([])
    const [chatRoom, setChatRoom] = useState(null)


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () =>(
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Entypo name="chat" size={24} color="black" />            
                    <Text style={{ color: "white", marginLeft: 10, fontWeight : "bold"}}>Chat Réception</Text>
                </View>
            )
        })
    }, [navigation])

    useEffect(() => {
        const getMessages = () => {
            if(userDB.dept === 'PARIS') {
                return db.collection("mySweetHotel")
                .doc("country")
                .collection("France")
                .doc("collection")
                .collection('hotel')
                .doc('region')
                .collection(userDB.hotelRegion)
                .doc('departement')
                .collection(userDB.hotelDept)
                .doc("Arrondissement")
                .collection(userDB.hotelArrondissement)
                .doc(`${userDB.hotelId}`)
                .collection('chat')
                .doc(user.displayName)
                .collection("chatRoom")
                .orderBy("markup", "desc")
            }else{
                return db.collection("mySweetHotel")
                .doc("country")
                .collection("France")
                .doc("collection")
                .collection('hotel')
                .doc('region')
                .collection(userDB.hotelRegion)
                .doc('departement')
                .collection(userDB.hotelDept)
                .doc(`${userDB.hotelId}`)
                .collection('chat')
                .doc(user.displayName)
                .collection("chatRoom")
                .orderBy("markup", "desc")
            }
                }

        let unsubscribe = getMessages().onSnapshot(function(snapshot) {
            const snapInfo = []
          snapshot.forEach(function(doc) {          
            snapInfo.push({
                id: doc.id,
                ...doc.data()
              })        
            });
            console.log(snapInfo)
            setMessages(snapInfo)
        });
        return unsubscribe
    }, [])

    const getChatRoom = () => {
        return db.collection('mySweetHotel')
        .doc('country')
        .collection('France')
        .doc('collection')
        .collection('hotel')
        .doc('region')
        .collection(userDB.hotelRegion)
        .doc('departement')
        .collection(userDB.hotelDept)
        .doc(`${userDB.hotelId}`)
        .collection('chat')
        .doc(user.displayName)
        .get()
        .then((doc) => {
            if (doc.exists) {
            setChatRoom(doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }


    const createRoomnameSubmit = () => {
        return db.collection('mySweetHotel')
          .doc('country')
          .collection('France')
          .doc('collection')
          .collection('hotel')
          .doc('region')
          .collection(userDB.hotelRegion)
          .doc('departement')
          .collection(userDB.hotelDept)
          .doc(`${userDB.hotelId}`)
          .collection('chat')
          .doc(user.displayName)
          .set({
            title: user.displayName,
            room: userDB.room,
            user: user.uid,
            markup: Date.now(),
            status: true
        })      
      }

    const updateRoomnameSubmit = () => {
        return db.collection('mySweetHotel')
          .doc('country')
          .collection('France')
          .doc('collection')
          .collection('hotel')
          .doc('region')
          .collection(userDB.hotelRegion)
          .doc('departement')
          .collection(userDB.hotelDept)
          .doc(`${userDB.hotelId}`)
          .collection('chat')
          .doc(user.displayName)
          .update({
            status: true,
            markup: Date.now()
        })      
      }

    const sendMessage = () => {
        Keyboard.dismiss()
        setInput("")

        if(userDB.hotelDept === "PARIS") {
            return db.collection("mySweetHotel")
        .doc("country")
        .collection("France")
        .doc("collection")
        .collection('hotel')
        .doc('region')
        .collection(userDB.hotelRegion)
        .doc('departement')
        .collection(userDB.hotelDept)
        .doc("Arrondissement")
        .collection(userDB.hotelArrondissement)
        .doc(`${userDB.hotelId}`)
        .collection('chat')
        .doc(user.displayName)
        .collection("chatRoom")
        .add({
            author: user.displayName,
            date: new Date(),
            room: userDB.room,
            email: user.email,
            photo: user.photoURL,
            text: input,
            markup: Date.now(),
        }).then(function(docRef){
            console.log(docRef.id)
          }).catch(function(error) {
            console.error(error)
          })
        }else{
            return db.collection("mySweetHotel")
        .doc("country")
        .collection("France")
        .doc("collection")
        .collection('hotel')
        .doc('region')
        .collection(userDB.hotelRegion)
        .doc('departement')
        .collection(userDB.hotelDept)
        .doc(`${userDB.hotelId}`)
        .collection('chat')
        .doc(user.displayName)
        .collection("chatRoom")
        .add({           
            author: user.displayName,
            date: new Date(),
            room: userDB.room,
            email: user.email,
            photo: user.photoURL,
            text: input,
            markup: Date.now(),
        }).then(function(docRef){
            console.log(docRef.id)
          }).catch(function(error) {
            console.error(error)
          })
        }
    }

    console.log(chatRoom)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
             behavior={Platform.OS === "ios" ? "padding" : "height"}
             style={styles.container}
             keyboardVerticalOffset={90}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} />

                 <>
                <ScrollView contentContainerStyle={{ padding: 20 }}>
                    {messages.map(message => {
                        if(message.author === user.displayName){
                            if(moment(messages.date).format('L') === moment(new Date()).format('L')) {
                               return <View style={{
                                    padding: 15,
                                    color: "white",
                                    backgroundColor: "lightblue",
                                    alignSelf: 'flex-end',
                                    borderRadius: 20,
                                    marginRight: 15,
                                    marginBottom: 20,
                                    maxWidth: "80%",
                                    position: "relative"
                                }}>
                                    <Avatar
                                    position="absolute"
                                    rounded
                                    bottom={-15}
                                    right={-5}
                                    size={30}
                                    source={{ uri: message.photo}} />
                                    <Text>{message.text}</Text>
                                </View>
                            }else{
                                return <View style={{
                                    padding: 15,
                                    backgroundColor: "#ECECEC",
                                    color: "gray",
                                    alignSelf: 'flex-end',
                                    borderRadius: 20,
                                    marginRight: 15,
                                    marginBottom: 20,
                                    maxWidth: "80%",
                                    position: "relative"
                                }}>
                                    <Avatar
                                    position="absolute"
                                    rounded
                                    bottom={-15}
                                    right={-5}
                                    size={30}
                                    source={{ uri: message.photo}} />
                                    <Text>{message.text}</Text>
                                </View>
                            }
                        }else{
                            if(moment(messages.date).format('L') === moment(new Date()).format('L')) {
                                return <View style={{
                                    padding: 15,
                                    color: "white",
                                    backgroundColor: "purple",
                                    alignSelf: 'flex-start',
                                    borderRadius: 20,
                                    marginLeft: 15,
                                    marginBottom: 20,
                                    maxWidth: "80%",
                                    position: "relative"
                                }}>
                                    <Avatar
                                    position="absolute"
                                    rounded
                                    bottom={-15}
                                    left={-5}
                                    size={30}
                                    source={{ uri: "https://cdn.wallpapersafari.com/73/48/aVIBA4.jpg"}} />
                                    <Text>{message.text}</Text>
                                </View>
                            }else{
                                return <View style={{
                                    padding: 15,
                                    backgroundColor: "gray",
                                    color: "black",
                                    alignSelf: 'flex-start',
                                    borderRadius: 20,
                                    marginLeft: 15,
                                    marginBottom: 20,
                                    maxWidth: "80%",
                                    position: "relative",
                                }}>
                                    <Avatar
                                    position="absolute"
                                    rounded
                                    bottom={-15}
                                    left={-5}
                                    size={30}
                                    source={{ uri: "https://cdn.wallpapersafari.com/73/48/aVIBA4.jpg"}} />
                                    <Text>{message.text}</Text>
                                </View>
                            }
                        }
                    })}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput 
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        onSubmitEditing={sendMessage}
                        placeholder="Envoyer un message"
                        style={styles.input}
                    />
                    <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={async() => {
                        await getChatRoom()
                        if(chatRoom !== null) {
                            return updateRoomnameSubmit()
                            .then(sendMessage())
                        }else{
                            return createRoomnameSubmit()
                            .then(sendMessage())
                        }
                        }}>
                        <FontAwesome name="send" size={24} color="black" />
                    </TouchableOpacity>

                </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 30
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15
    }
})

