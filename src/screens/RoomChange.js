import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'; 
import { UserContext } from '../components/userContext'
import { auth, db, storage } from "../../firebase"
import * as ImagePicker from 'expo-image-picker';
import { showMessage, hideMessage } from "react-native-flash-message";


const RoomChange = ({ navigation }) => {
    const [type, setType] = useState("")
    const [details, setDetails] = useState("")
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)
    const [img, setImg] = useState(null)
    const [url, setUrl] = useState("")

    useLayoutEffect(() => {
      navigation.setOptions({
          title: "RoomChange",
          headerBackTitleVisible: false,
          headerTitleAlign: "right",
          headerTitle: () =>(
              <View style={{flexDirection: "row", alignItems: "center"}}>
                  <MaterialIcons name="room-preferences" size={24} color="black" />                
                  <Text style={{ color: "black", fontWeight : "bold", fontSize: 20, marginLeft: 5}}>Délogement</Text>
              </View>
          )
      })
  }, [navigation])

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
      
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImg(result.uri);
          showMessage({
            message: "Votre photo a bien été sélectionnée !",
            type: "info",
          })
        }
      };
  

      const handleChangePhotoUrl = async(event) => {
        event.preventDefault()
        const response = await fetch(img)
        const blob = await response.blob()

        const uploadTask = storage.ref(`msh-photo-roomChange/${type}`).put(blob)
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {console.log(error)},
          () => {
            storage
              .ref("msh-photo-roomChange")
              .child(type)
              .getDownloadURL()
              .then(url => {
                const uploadTask = () => {
                    setType('')
                    setDetails('')

                   return db.collection("hotels")
                    .doc(userDB.hotelId)
                    .collection('roomChange')
                    .add({
                        author: user.displayName,
                        date: new Date(),
                        client: user.displayName,
                        fromRoom: userDB.room,
                        reason: type,
                        details: details,
                        markup: Date.now(),
                        img: url,
                        status: true
                    }).then(function(docRef){
                        console.log(docRef.id)
                    }).catch(function(error) {
                        console.error(error)
                    })
                }
                  return setUrl(url, uploadTask())})
          }
        )
      } 

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
             <StatusBar style="light" />
            <View style={styles.containerText}>
            <ImageBackground source={ require('../../img/pic_roomChange.png') } style={{
                flex: 1,
                resizeMode: "contain",
                justifyContent: "center",
                width: 500}}>
                </ImageBackground>
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="Motif de la demande" type="text" value={type} 
                onChangeText={(text) => setType(text)} />
                <Input placeholder="Plus de détails"  type="text" value={details} 
                onChangeText={(text) => setDetails(text)} />
            </View>
            <View style={{marginBottom: 55}}>
                <TouchableOpacity style={{flexDirection: "row", width: 300, alignItems: "center", justifyContent: "center"}} onPress={pickImage}>
                <MaterialIcons name="add-a-photo" size={24} color="grey" />                    
                <Text style={{fontSize: 20, color: "grey", marginLeft: 10}}>Ajouter une image</Text>
                </TouchableOpacity>
            </View>
            <Button onPress={(event) => {
              handleChangePhotoUrl(event)
              showMessage({
                message: "Votre demande de délogement a été transmise à la réception !",
                type: "success",
              })
            }} containerStyle={styles.button} title="Demander maintenant" />
        </KeyboardAvoidingView>
    )
}

export default RoomChange

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
    },
    containerText: {
      flex: 2,
    },
    text: {
        fontSize: 30,
        textAlign: "center",
        color: "white"
    },
    inputContainer: {
        width: 300,
        marginTop: 30, 

    },
    button: {
        width: 200,
        marginTop: 10, 
        marginBottom: 90,
        borderColor: "white" 
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

