import React, { useLayoutEffect, useState, useContext, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';


const UserProfile = () => {
    const [img, setImg] = useState(null)
    const [url, setUrl] = useState("")
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)
    const [visible, setVisible] = useState(true)
    const [email, setEmail] = useState(user.email)
    const [name, setName] = useState(user.displayName)
    const [checkoutDate, setCheckoutDate] = useState(new Date())
    const [room, setRoom] = useState(userDB.room)
    const [showDate, setShowDate] = useState(false)


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

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || checkoutDate;
      setShowDate(Platform.OS === 'ios');
      setCheckoutDate(currentDate);
    };

    const handleSubmit = async() => {
      setImg(null)
      setUrl('')
      setRoom(userDB.room)
      setEmail(user.email)
      setName(user.displayName)
      setVisible(false)
      await db.collection("mySweatHotel")
        .doc("country")
        .collection("France")
        .doc("collection")
        .collection("customer")
        .doc("collection")
        .collection('users')
        .doc(user.displayName)
        .update({
          id: name,
          email: email,
          room: room,
        })
      await user.updateProfile({
        displayName: name,
      })
      return user.updateEmail(email)
    }

    const handlePhotoChange = () => {
      setImg
    }

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
                    handleSubmit(url)
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
              <TouchableOpacity style={{padding: 15}} onPress={pickImage}>
                    <MaterialIcons name="add-a-photo" size={35} color="grey" />                    
                  </TouchableOpacity>
              </ImageBackground>
            </View>
            <View style={{flex: 2, flexDirection: "column", width: "100%", padding: 10, alignItems: "center"}}>
              <Text style={{fontSize: 30, fontWeight: "bold", marginBottom: 20}}>{user.displayName}</Text>
              <Text style={{fontSize: 20, marginBottom: 20}}>{userDB.hotelName}</Text>
              <Text style={{fontSize: 15, marginBottom: 10}}>Vous occupez actuellement la chambre {userDB.room}</Text>
              <Text style={{fontSize: 14, marginBottom: 20}}>Check-out prévu pour le {moment(userDB.checkoutDate).format('LL')}</Text>
              <Button onPress={() => setShowDate(true)} type='clear' title="Modifier ma date de check-out" />
              <Button title="Actualiser votre profil" containerStyle={styles.button} onPress={() => setVisible(true)} />            
            </View>

            <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
              <View style={{width: "100%", flexDirection: "column", alignItems: "center", padding: 10}}>
                <Text style={{fontSize: 30, fontWeight: "bold", marginBottom: 20}}>Actualisation du profil</Text>
                <View style={styles.inputContainer}>
                  <Text>Nom</Text>
                  <Input placeholder="Nom" autofocus type="text" value={name} 
                  onChangeText={(text) => setName(text)} />
                  <Text>Email</Text>
                  <Input placeholder="Email" type="email" value={email} 
                  onChangeText={(text) => setEmail(text)} />
                  <Text>Numéro de chambre</Text>
                  <Input placeholder="Numéro de chambre" type="number" value={room} 
                  onChangeText={(text) => setRoom(text)} />
                </View>
                <Button title="Actualiser maintenant" containerStyle={styles.button} onPress={handleChangePhotoUrl} />
              </View>
            </Overlay>
            {showDate && (
                <DateTimePicker
                testID="dateTimePicker"
                value={checkoutDate}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
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
    justifyContent: 'center',
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  button: {
    width: 200,
    marginTop: 10,
    borderRadius: 3
  },
  inputContainer: {
    width: 300
},
})
