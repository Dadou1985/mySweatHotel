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


const UserProfile = ({navigation}) => {
    const [img, setImg] = useState(null)
    const [url, setUrl] = useState("")
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)
    const [updateProfile, setUpdateProfile] = useState(false)
    const [email, setEmail] = useState('')
    const [date, setDate] = useState(new Date(Date.now()))
    const [room, setRoom] = useState(null)
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
        //return photoAlert()
      }

    };

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
       setShowDate(Platform.OS === 'ios');
       setDate(currentDate);
       //checkoutDateAlert()
    };

    const handleLoadUserDB = () => {
      return db.collection("mySweatHotel")
      .doc("country")
      .collection("France")
      .doc("collection")
      .collection("customer")
      .doc("collection")
      .collection('users')
      .doc(user.displayName)
      .get()
      .then((doc) => {
          if (doc.exists) {
          setUserDB(doc.data())
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).then(() => {
        setRoom(userDB.room)
        setEmail(user.email)
        setVisible(false)
      })
  }

  const handleChangeEmail = () => {
    auth
    .signInWithEmailAndPassword(user.email, userDB.password)
    .then(function(userCredential) {
        userCredential.user.updateEmail(email)
    })
  }

    const handleSubmit = async() => {
      await handleChangeEmail()
      
      await db.collection("mySweatHotel")
        .doc("country")
        .collection("France")
        .doc("collection")
        .collection("customer")
        .doc("collection")
        .collection('users')
        .doc(user.displayName)
        .update({
          email: email,
          room: room,
        })

      return handleLoadUserDB()
    }

    const handleChangePhotoUrl = async() => {
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
                  user.updateProfile({photoURL: url})
                  .then(() => navigation.replace('Home'))
                }
                  return setUrl(url, uploadTask())})
          }
        )
      } 
      

    const handleCheckoutDateChange = async() => {
      await db.collection("mySweatHotel")
      .doc("country")
      .collection("France")
      .doc("collection")
      .collection("customer")
      .doc("collection")
      .collection('users')
      .doc(user.displayName)
      .update({
        checkoutDate: moment(date).format('L')
      })

      return handleLoadUserDB()     
    }

    const photoAlert = () => {
      Alert.alert(
        "Changer la photo de profil",
        "Etes-vous sûr.e de vouloir changer votre photo de profil ?",
        [
          {
            text: "Oui", onPress: () => handleChangePhotoUrl()

          }
        ],
        {cancelable: true}
      )
    }
      
    const checkoutDateAlert = () => {
      Alert.alert(
        "Changer la date de check-out",
        "Etes-vous sûr.e de vouloir changer la date de votre check-out ?",
        [
          {
            text: "Oui", onPress: () => handleCheckoutDateChange()

          }
        ],
        {cancelable: true}
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
              <Button title="Actualiser votre profil" containerStyle={styles.button} onPress={() => setUpdateProfile(true)} /> 
              <Button title="Actualiser votre photo" containerStyle={styles.button} onPress={(event) => handleChangePhotoUrl(event)} /> 
              <Button title="Actualiser votre checkout" containerStyle={styles.button} onPress={() => handleCheckoutDateChange()} /> 
            </View>

            <Overlay isVisible={updateProfile} onBackdropPress={() => setUpdateProfile(false)}>
              <View style={{width: "100%", flexDirection: "column", alignItems: "center", padding: 10}}>
                <Text style={{fontSize: 30, fontWeight: "bold", marginBottom: 20}}>Actualisation du profil</Text>
                <View style={styles.inputContainer}>
                  <Text>Email</Text>
                  <Input placeholder="Email" type="email" value={email} 
                  onChangeText={(text) => setEmail(text)} />
                  <Text>Numéro de chambre</Text>
                  <Input placeholder="Numéro de chambre" type="number" value={room} 
                  onChangeText={(text) => setRoom(text)} />
                </View>
                <Button title="Actualiser maintenant" containerStyle={styles.button} onPress={handleSubmit} />
              </View>
            </Overlay>

            <Overlay>
              <View>
                <Text>Changer ma photo de profil</Text>
                <Text>Confirmez-vous l'opération' ?</Text>
                <View>
                  <Text></Text>
                  <Button />
                </View>
              </View>
            </Overlay>

            {showDate && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
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
