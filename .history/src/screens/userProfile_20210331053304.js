import React, { useLayoutEffect, useState, useContext, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { auth, db, storage } from "../../firebase"
import { SimpleLineIcons } from '@expo/vector-icons';
import { UserContext } from '../components/userContext'
import moment from 'moment'

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
        <View style={styles.container}>
            <View style={{flex: 3, width: "100%"}}>
              <ImageBackground source={{uri: user.photoURL}} style={styles.image}>
                <Text>hello</Text>
              </ImageBackground>
            </View>
            <View style={{flex: 2, flexDirection: "column", width: "100%", padding: 10, alignItems: "center"}}>
              <Text style={{fontSize: 30, fontWeight: "bold", }}>{user.displayName}</Text>
              <Text style={{fontSize: 20}}>{userDB.hotelName}</Text>
              <Text style={{fontSize: 15}}>Vous occupez actuellement la chambre {userDB.room}</Text>
              <Text style={{fontSize: 14}}>Check-out prévu pour le {moment(userDB.checkoutDate).format('LL')}</Text>
            </View>

        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
})
