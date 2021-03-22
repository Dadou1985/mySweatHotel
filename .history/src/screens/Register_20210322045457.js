import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'; 
import { auth, db, storage } from "../../firebase"
import * as ImagePicker from 'expo-image-picker';


const Register = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [img, setImg] = useState(null)
    const [url, setUrl] = useState("")

    const freeRegister = () => {
        return db.collection("mySweatHotel")
        .doc("country")
        .collection("France")
        .doc("collection")
        .collection("customer")
        .doc("collection")
        
        .doc(name)
        .set({
          email: email,
          password: password,
          markup: Date.now()
        })
        .then(()=> navigation.navigate('Home'))   
      }
    
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
        const uploadTask = storage.ref(`msh-photo-user/${name}`).put(img)
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {console.log(error)},
          () => {
            storage
              .ref("msh-photo-user")
              .child(name)
              .getDownloadURL()
              .then(url => {
                const uploadTask = () => {
                    auth.createUserWithEmailAndPassword(email, password)
                        .then((authUser) => {
                            authUser.user.updateProfile({
                                photoURL: url,
                                displayName: name
                            })
                        })
                }
                  return setUrl(url, uploadTask())})
          }
        )
      } 

      console.log("$$$$$$", img)

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.containerText}>
                <Text style={styles.text}>Créer un compte</Text>
            </View>    
            <View style={styles.inputContainer}> 
                <Input placeholder="Nom" autofocus type="text" value={name} 
                onChangeText={(text) => setName(text)} />
                <Input placeholder="Email" type="email" value={email} 
                onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Mot de passe" secureTextEntry type="password" value={password} 
                onChangeText={(text) => setPassword(text)} />
                <Input placeholder="Confirmation du mot de passe" secureTextEntry type="confirmPassword" value={confirmPassword} 
                onChangeText={(text) => setConfirmPassword(text)}
                onSubmitEditing={freeRegister}  />
            </View>
            <View style={{marginBottom: 15}}>
                <TouchableOpacity style={{flexDirection: "row", width: 300, alignItems: "center", justifyContent: "center"}} onPress={openImagePickerAsync}>
                <MaterialIcons name="add-a-photo" size={24} color="grey" />                    
                <Text style={{fontSize: 20, color: "grey", marginLeft: 10}}>Ajouter une photo de profile</Text>
                </TouchableOpacity>
            </View>
            <Button onPress={() => navigation.navigate('Connexion')} containerStyle={styles.button} title="Connexion" type="clear" />
            <Button containerStyle={styles.button} title="Créer un compte" onPress={(event) => {
                freeRegister()
                handleChangePhotoUrl(event)
                }} />
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    containerText: {
        marginBottom: 30
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
        marginTop: 10
    }
})
