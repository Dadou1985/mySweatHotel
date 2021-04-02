import React, { useLayoutEffect, useState, useContext, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { auth, db, storage } from "../../firebase"
import { SimpleLineIcons } from '@expo/vector-icons';
import { UserContext } from '../components/userContext'


const UserProfile = () => {
    const [img, setImg] = useState(null)
    const [url, setUrl] = useState("")
    const [room, setRoom] = useState(null)
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)

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
                                photoURL: url
                            })
                        })
                }
                  return setUrl(url, uploadTask())})
          }
        )
      } 

    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({})
