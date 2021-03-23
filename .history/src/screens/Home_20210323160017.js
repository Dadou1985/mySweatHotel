import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { auth, db } from "../../firebase"
import { SimpleLineIcons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';


const Home = ({ navigation }) => {
    const [user, setUser] = useState(auth.currentUser)
    const [showModal, setShowModal] = useState(true)
    const [room, setRoom] = useState(null)

    const Logout = () => {
        auth.signOut()
        .then(navigation.replace('Connexion'))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
            <SimpleLineIcons 
            name="logout" 
            size={24} 
            color="white" 
            style={{marginRight: 20}}
            onPress={Logout} />)
        })
    }, [])

    const userDB = db.collection("mySweatHotel")
    .doc("country")
    .collection("France")
    .doc("collection")
    .collection("customer")
    .doc("collection")
    .collection('users')
    .doc(user.displayName)
    .get()

    console.log("§§§§§§", userDB.data())

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.textContainer}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>Bienvenu.e à l'hôtel Mercure</Text>
                <Text>{user.displayName}</Text>
            </View>
           
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
                <Entypo name="chat" size={50} color="black" />            
            </TouchableOpacity>
           
            <View style={styles.containerTop}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Conciergerie')}>
                    <Image source={{uri: "https://static.thenounproject.com/png/496897-200.png"}} style={styles.img} />
                </TouchableOpacity>            
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Maintenance')}>
                    <Image source={{uri: "https://static.thenounproject.com/png/41655-200.png"}} style={styles.img} />
                </TouchableOpacity>
            </View>
            
                <Image source={{uri: user.photoURL}}
                style={{width: 150, height: 150, position: "absolute", borderRadius: 100, top: 320}}
                onPress={() => navigation.navigate('Chat')} />
            
            <View style={styles.containerBottom}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Réveil')}>
                    <Image source={{uri: "https://image.flaticon.com/icons/png/512/62/62834.png"}} style={styles.img} />
                </TouchableOpacity>           
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Taxi')}>
                    <Image source={{uri: "https://cdn2.iconfinder.com/data/icons/car-11/100/taxi3-512.png"}} style={styles.img} />
                </TouchableOpacity>
            </View>
            {/*<Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{fontSize: 20, textAlign: "center"}}>Bonjour {user.email}</Text>
                            <Input 
                            placeholder="Entrez votre numéro de chambre" 
                            autofocus 
                            type="number" 
                            value={room} 
                            onChangeText={(text) => setRoom(text)} />
                            <Button title="Enregistrer" />
                            <Button title="Fermer" type="clear" onPress={() => setShowModal(false)} />
                        </View>
                    </View>
            </Modal>*/}
        </KeyboardAvoidingView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    containerTop: {
        width: "100%",
        height: "25%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    containerBottom: {
        width: "100%",
        height: "25%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    textContainer: {
        flexDirection: "column",
        alignItems: "center",
        height: 100
    },
    img: {
        width: 50,
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        width: 350,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
})
