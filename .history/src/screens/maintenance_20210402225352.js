import React, { useState, useContext, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'; 
import { UserContext } from '../components/userContext'
import { auth, db, storage } from "../../firebase"
import * as ImagePicker from 'expo-image-picker';
import { showMessage, hideMessage } from "react-native-flash-message";


const Maintenance = () => {
    const [type, setType] = useState("")
    const [details, setDetails] = useState("")
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)
    const [img, setImg] = useState(null)
    const [url, setUrl] = useState("")

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
            type: "success",
          })
        }
      };
  

      const handleChangePhotoUrl = async(event) => {
        event.preventDefault()
        const response = await fetch(img)
        const blob = await response.blob()

        const uploadTask = storage.ref(`msh-photo-maintenance/${type}`).put(blob)
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {console.log(error)},
          () => {
            storage
              .ref("msh-photo-maintenance")
              .child(type)
              .getDownloadURL()
              .then(url => {
                const uploadTask = () => {
                    setType('')
                    setDetails('')
                    
                    if(userDB.hotelDept === "PARIS") {
                      return db.collection("mySweatHotel")
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
                    .collection('maintenance')
                    .add({
                        author: user.displayName,
                        date: new Date(),
                        client: user.displayName,
                        room: userDB.room,
                        type: type,
                        details: details,
                        markup: Date.now(),
                        img: url,
                    }).then(function(docRef){
                        console.log(docRef.id)
                    }).catch(function(error) {
                        console.error(error)
                    })
                    }else{
                      return db.collection("mySweatHotel")
                    .doc("country")
                    .collection("France")
                    .doc("collection")
                    .collection('hotel')
                    .doc('region')
                    .collection(userDB.hotelRegion)
                    .doc('departement')
                    .collection(userDB.hotelDept)
                    .doc(`${userDB.hotelId}`)
                    .collection('maintenance')
                    .add({
                        author: user.displayName,
                        date: new Date(),
                        client: user.displayName,
                        room: userDB.room,
                        type: type,
                        details: details,
                        markup: Date.now(),
                        img: url,
                    }).then(function(docRef){
                        console.log(docRef.id)
                    }).catch(function(error) {
                        console.error(error)
                    })
                    }
                }
                  return setUrl(url, uploadTask())})
          }
        )
      } 

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
             <StatusBar style="light" />
            <Image source={{uri: "https://static.thenounproject.com/png/41655-200.png"}} style={styles.img} />
            <View style={styles.containerText}>
                <Text style={styles.text}>Maintenance</Text>
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="Type de problème" type="text" value={type} 
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
                message: "Votre signalement a été transmis au service de maintenance !",
                type: "success",
              })
            }} containerStyle={styles.button} title="Signaler maintenant" />
        </KeyboardAvoidingView>
    )
}

export default Maintenance

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    containerText: {
        marginBottom: 50
    },
    text: {
        fontSize: 30,
        textAlign: "center"
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10, 
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
