import React, { useLayoutEffect, useState, useContext, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
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
      }
    };

    const handleChangePhotoUrl = async(event) => {
      event.preventDefault()
      const response = await fetch(img)
      const blob = await response.blob()
      
      const uploadTask = storage.ref(`msh-photo-user/${user.displayName}`).put(blob)
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {console.log(error)},
          () => {
            storage
              .ref("msh-photo-user")
              .child(user.displayName)
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
            <View>
              <ImageBackground source={user.photoURL} style={styles.image}>
                <Te
              </ImageBackground>
            </View>
            <Text></Text>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
})
