import React, { useState, useLayoutEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons'; 


const Register = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")


    const handleSubmit = (event) => {
        event.preventDefault()
        setEmail("")
        setPassword('')
        setco
            if(password === confPassword){
               return firebase.freeRegister({username: name, email: email, password: password})
                .catch(error=>{
                    if(error.message){
                        alert("Inscription invalide")
                    }else{}
                })
            }else{
                setFormValue({name: "",email: "", password: "", confPassword: ""})
                return alert("Désolé, confirmation de mot de passe incorrecte !")
            }
      }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.containerText}>
                <Text style={styles.text}>Créer un compte</Text>
            </View>    
                <View style={styles.inputContainer}> 
                <Input placeholder="Nom" autofocus type="text" value={name} 
                onChange={(text) => setName(text)} />
                <Input placeholder="Email" type="email" value={email} 
                onChange={(text) => setEmail(text)} />
                <Input placeholder="Mot de passe" secureTextEntry type="password" value={password} 
                onChange={(text) => setPassword(text)} />
                <Input placeholder="Confirmation du mot de passe" secureTextEntry type="confirmPassword" value={confirmPassword} 
                onChange={(text) => setConfirmPassword(text)}
                onSubmitEditing={handleSubmit} />
            </View>
            <View style={{marginBottom: 15}}>
                <TouchableOpacity style={{flexDirection: "row", width: 300, alignItems: "center", justifyContent: "center"}}>
                <MaterialIcons name="add-a-photo" size={24} color="grey" />                    
                <Text style={{fontSize: 20, color: "grey", marginLeft: 10}}>Ajouter une image</Text>
                </TouchableOpacity>
            </View>
            <Button onPress={() => navigation.navigate('Connexion')} containerStyle={styles.button} title="Connexion" type="clear" />
            <Button containerStyle={styles.button} title="Créer un compte" onPress={handleSubmit} />
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
