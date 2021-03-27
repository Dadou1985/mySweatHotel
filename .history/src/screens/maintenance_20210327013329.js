import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'; 
import { UserContext } from '../components/userContext'
import { auth, db } from "../../firebase"
import * as ImagePicker from 'expo-image-picker';


const Maintenance = () => {
    const [type, setType] = useState("")
    const [details, setDetails] = useState("")
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)
    const [img, setImg] = useState(null)
    const [url, setUrl] = useState("")

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Nous avons besoin de votre aval pour accéder aux photos, medias et fichiers de votre appareil");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (pickerResult.cancelled === true) {
            return;
          }

          function dataURItoBlob(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);
        
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ab], {type: mimeString});
        
        }

        let blob = dataURItoBlob(pickerResult.uri)
      
          setImg( blob );
      }

      const handleChangePhotoUrl = (event) => {
        event.preventDefault()
        const uploadTask = storage.ref(`msh-photo-maintenance/${type}`).put(img)
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
                <TouchableOpacity style={{flexDirection: "row", width: 300, alignItems: "center", justifyContent: "center"}}>
                <MaterialIcons name="add-a-photo" size={24} color="grey" />                    
                <Text style={{fontSize: 20, color: "grey", marginLeft: 10}}>Ajouter une image</Text>
                </TouchableOpacity>
            </View>
            <Button onPress={() => navigation.navigate('Home')} containerStyle={styles.button} title="Signaler maintenant" />
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
