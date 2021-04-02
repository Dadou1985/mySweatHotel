import React, { useLayoutEffect, useState, useContext, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { auth, db, storage } from "../../firebase"
import { SimpleLineIcons } from '@expo/vector-icons';
import { UserContext } from '../components/userContext'
import moment from 'moment'
import { Button, Input, Overlay } from 'react-native-elements';
import {
  Grayscale,
  Sepia,
  Tint,
  ColorMatrix,
  concatColorMatrices,
  invert,
  contrast,
  saturate,
} from 'react-native-color-matrix-image-filters'

const UserProfile = () => {
    const [img, setImg] = useState(null)
    const [url, setUrl] = useState("")
    const [room, setRoom] = useState(userDB.room)
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)
    const [visible, setVisible] = useState(true)
    const [email, setEmail] = useState(user.email)
    const [name, setName] = useState(user.displayName)
    const [checkoutDate, setCheckoutDate] = useState(userDB.checkoutDate)

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
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <View style={{flex: 2, width: "100%"}}>
              <ImageBackground source={{uri: user.photoURL}} style={styles.image}>
                <Text>hello</Text>
              </ImageBackground>
            </View>
            <View style={{flex: 2, flexDirection: "column", width: "100%", padding: 10, alignItems: "center"}}>
              <Text style={{fontSize: 30, fontWeight: "bold", marginBottom: 20}}>{user.displayName}</Text>
              <Text style={{fontSize: 20, marginBottom: 20}}>{userDB.hotelName}</Text>
              <Text style={{fontSize: 15, marginBottom: 10}}>Vous occupez actuellement la chambre {userDB.room}</Text>
              <Text style={{fontSize: 14, marginBottom: 20}}>Check-out prévu pour le {moment(userDB.checkoutDate).format('LL')}</Text>
              <Button title="Actualiser votre profil" containerStyle={styles.button} onPress={() => setVisible(true)} />            
            </View>

            <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
              <View style={{flex: 1, width: "100%", flexDirection: "column", alignItems: "center"}}>
                <Text>Actualisation du profil</Text>
                <View>
                  <Input placeholder="Nom" autofocus type="text" value={name} 
                  onChangeText={(text) => setName(text)} />
                  <Input placeholder="Email" type="email" value={email} 
                  onChangeText={(text) => setEmail(text)} />
                  <Input placeholder="Numéro de chambre" secureTextEntry type="number" value={room} 
                  onChangeText={(text) => setRoom(text)} />
                  <Input placeholder="Date de check-out" secureTextEntry type="text" value={checkoutDate} 
                  onChangeText={(text) => setCheckoutDate(text)}  />
                  <TouchableOpacity style={{flexDirection: "row", width: 300, alignItems: "center", justifyContent: "center"}} onPress={pickImage}>
                    <MaterialIcons name="add-a-photo" size={24} color="grey" />                    
                    <Text style={{fontSize: 20, color: "grey", marginLeft: 10}}>Ajouter une image</Text>
                  </TouchableOpacity>
                </View>
                <Button title="Actualiser maintenant" containerStyle={styles.button} />
              </View>
            </Overlay>
        </KeyboardAvoidingView>
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
  button: {
    width: 200,
    marginTop: 10,
    borderRadius: 30

}
})
