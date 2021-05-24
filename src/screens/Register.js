import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'; 
import { auth, db, storage } from "../../firebase"
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants'
import { showMessage, hideMessage } from "react-native-flash-message";

const Register = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [userId, setUserId] = useState("")
    const [img, setImg] = useState(null)
    const [url, setUrl] = useState("")
    const [language, setLanguage] = useState("fr")
    const [fullLanguage, setFullLanguage] = useState("")
    const [internationalization, setInternationalization] = useState(
      [
        {language: "fr", fullLanguage: ""},
        {language: "ar", fullLanguage: ""},
        {language: "de", fullLanguage: ""},
        {language: "en", fullLanguage: ""},
        {language: "es", fullLanguage: ""},
        {language: "hi", fullLanguage: ""},
        {language: "it", fullLanguage: ""},
        {language: "ja", fullLanguage: ""},
        {language: "ja", fullLanguage: ""},
        {language: "ko", fullLanguage: ""},
        {language: "pt", fullLanguage: ""},
        {language: "ur", fullLanguage: ""},
        {language: "zh", fullLanguage: ""},
      ]
    )

    const freeRegister = (userId) => {
        return db.collection('guestUsers')
        .doc(userId)
        .set({
          username: name,
          email: email,
          password: password,
          language: language,
          lastTimeConnected: Date.now(),
          userId: userId,
          localLanguage: "fr"
        })  
      }

      useEffect(() => {
        let unsubscribe = auth.onAuthStateChanged(function(user) {
            if (user) {
                navigation.navigate('Information')
                setTimeout(() => {
                  showMessage({
                      message: "Bienvenu.e chez vous !",
                      type: "info",
                    })
              }, 3000);
            } 
          });
        return unsubscribe
    }, [])

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
        
        const uploadTask = storage.ref(`msh-photo-user/${name}`).put(blob)
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
                          freeRegister(authUser.user.uid)
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
                <Image source={require('../../img/mini-logo-msh.png')} style={{width: 150, height: 150}} />
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
                <TouchableOpacity style={{flexDirection: "row", width: 300, alignItems: "center", justifyContent: "center"}} onPress={pickImage}>
                <MaterialIcons name="add-a-photo" size={24} color="grey" />                    
                <Text style={{fontSize: 20, color: "grey", marginLeft: 10}}>Ajouter une photo de profile</Text>
                </TouchableOpacity>
            </View>
            <Button raised={true} onPress={() => navigation.navigate('Connexion')} containerStyle={styles.button} title="Connexion" type="clear" />
            <Button raised={true} containerStyle={styles.button} title="Créer un compte" onPress={(event) => {
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
        marginBottom: 30,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
        borderRadius: 30

    }
})
