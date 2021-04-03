import React, { useLayoutEffect, useState, useContext } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { auth, db } from "../../firebase"
import { UserContext } from '../components/userContext'
import { showMessage } from "react-native-flash-message";

const ClickNwaitDrawer = () => {
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)

    const handleClickAndWait = (item) => {
        if(userDB.hotelDept === 'PARIS') {
            return db.collection("mySweatHotel")
        .doc("country")
        .collection("France")
        .doc("collection")
        .collection('hotel')
        .doc('region')
        .collection(userDB.hotelRegion)
        .doc('departement')
        .collection("PARIS")
        .doc("Arrondissement")
        .collection(userDB.hotelArrondissement)
        .doc(`${userDB.hotelId}`)
        .collection('housekeeping')
        .doc("item")
        .collection(item)
        .add({
            client: user.displayName,
            room: userDB.room,
            checkoutDate: userDB.checkoutDate
,            createdAt: new Date(),
            markup: Date.now(),
        }).then(function(docRef){
            console.log(docRef.id)
          }).catch(function(error) {
            console.error(error)
          })
        }else{
            return db.collection("mySweatHotel")
        .doc("country")
        .collection("France")
        .doc("collection")
        .collection('hotel')
        .doc('region')
        .collection(userDB.hotelRegion)
        .doc('departement')
        .collection(userDB.hotelDept)
        .doc(`${userDB.hotelId}`)
        .collection('housekeeping')
        .doc("item")
        .collection(item)
        .add({
            client: user.displayName,
            room: userDB.room,
            checkoutDate: userDB.checkoutDate
,            createdAt: new Date(),
            markup: Date.now(),
        }).then(function(docRef){
            console.log(docRef.id)
          }).catch(function(error) {
            console.error(error)
          })
        }
    }

    const handleDeleteItemChoosen = async(item) => {
        await db.collection("mySweatHotel")
        .doc("country")
        .collection("France")
        .doc("collection")
        .collection("customer")
        .doc("collection")
        .collection('users')
        .doc(user.displayName)
        .update(
            item
        )
        db.collection("mySweatHotel")
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
        })
    }

    return (
        <View style={{width: "100%", flexDirection: "column", alignItems: "center"}}>
                <Ani
            </View>
    )
}

export default ClickNwaitDrawer

const styles = StyleSheet.create({})
