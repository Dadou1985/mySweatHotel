import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'; 
import { auth, db } from "../../firebase"
import * as ImagePicker from 'expo-image-picker';


const Register = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")

    const freeRegister = () => {
        auth.createUserWithEmailAndPassword(email, password);
        return db.collection("mySweatHotel")
        .doc('collections')
        .collection("users")
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
          alert("Nous avons besoin de votre aval pour accéder au contenu  de votre appareil");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
      }

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
                <TouchableOpacity style={{flexDirection: "row", width: 300, alignItems: "center", justifyContent: "center"}}>
                <MaterialIcons name="add-a-photo" size={24} color="grey" />                    
                <Text style={{fontSize: 20, color: "grey", marginLeft: 10}}>Ajouter une photo de profile</Text>
                </TouchableOpacity>
            </View>
            <Button onPress={() => navigation.navigate('Connexion')} containerStyle={styles.button} title="Connexion" type="clear" />
            <Button containerStyle={styles.button} title="Créer un compte" onPress={freeRegister} />
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
