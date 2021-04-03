import React, { useLayoutEffect, useState, useContext } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { auth, db } from "../../firebase"
import { UserContext } from '../components/userContext'
import { showMessage } from "react-native-flash-message";

const ClickNwaitDrawer = ({fadeIn, fadeOut}) => {
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
            <Animated.View style={[{}]}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>Click & Wait</Text>
                <View style={styles.cncContainer}>
                    {userDB.towel &&
                        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => {
                        handleClickAndWait("towel")
                        handleDeleteItemChoosen({towel: false})
                        showMessage({
                            message: "Votre demande a été transmise à la réception !",
                            type: "success",
                          })
                    }}>
                        <Image source={{uri: "https://cdn4.iconfinder.com/data/icons/everyday-objects-line-art-1/128/towels-512.png"}} style={styles.img} />    
                    </TouchableOpacity>}
                        {userDB.soap &&
                            <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => {
                        handleClickAndWait("soap")
                        handleDeleteItemChoosen({soap: false})
                        showMessage({
                            message: "Votre demande a été transmise à la réception !",
                            type: "success",
                          })
                    }}>
                        <Image source={{uri: "https://cdn0.iconfinder.com/data/icons/beauty-and-fashion-14/512/Soap_bar-512.png"}} style={styles.img} />    
                    </TouchableOpacity> }
                    {userDB.toiletPaper &&
                        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => {
                        handleClickAndWait("toilet-paper")
                        handleDeleteItemChoosen({toiletPaper: false})
                        showMessage({
                            message: "Votre demande a été transmise à la réception !",
                            type: "success",
                          })
                    }}>
                        <Image source={{uri: "https://www.clipartmax.com/png/middle/181-1817034_toilet-trauma-youtube-toilet-paper-roll-icon.png"}} style={styles.img} />    
                    </TouchableOpacity>}  
                    {userDB.hairDryer &&
                        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => {
                        handleClickAndWait("hair-dryer")
                        handleDeleteItemChoosen({hairDryer: false})
                        showMessage({
                            message: "Votre demande a été transmise à la réception !",
                            type: "success",
                          })
                    }}>
                        <Image source={{uri: "https://www.clipartmax.com/png/middle/177-1778082_hair-dryer-icon-hair-dryer.png"}} style={styles.img} />    
                    </TouchableOpacity> }    
                </View>
                <View style={styles.cncContainer}>
                    {userDB.pillow &&
                        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => {
                        handleClickAndWait("pillow")
                        handleDeleteItemChoosen({pillow: false})
                        showMessage({
                            message: "Votre demande a été transmise à la réception !",
                            type: "success",
                          })
                    }}>
                        <Image source={{uri: "https://cdn.iconscout.com/icon/premium/png-256-thumb/pillow-1427897-1207484.png"}} style={styles.img} />    
                    </TouchableOpacity>}
                    {userDB.blanket &&
                        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => {
                        handleClickAndWait("blanket")
                        handleDeleteItemChoosen({blanket: false})
                        showMessage({
                            message: "Votre demande a été transmise à la réception !",
                            type: "success",
                          })
                    }}>
                        <Image source={{uri: "https://www.pinclipart.com/picdir/middle/159-1599759_weighted-blanket-blanket-clipart.png"}} style={styles.img} />    
                    </TouchableOpacity>}  
                    {userDB.iron &&
                        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => {
                        handleClickAndWait("iron")
                        handleDeleteItemChoosen({iron: false})
                        showMessage({
                            message: "Votre demande a été transmise à la réception !",
                            type: "success",
                          })
                    }}>
                        <Image source={{uri: "https://secure.webtoolhub.com/static/resources/icons/set73/c814a79e.png"}} style={styles.img} />    
                    </TouchableOpacity>}  
                    {userDB.babyBed &&
                        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => {
                        handleClickAndWait("baby-bed")
                        handleDeleteItemChoosen({babyBed: false})
                        showMessage({
                            message: "Votre demande a été transmise à la réception !",
                            type: "success",
                          })
                    }}>
                        <Image source={{uri: "https://www.pngkey.com/png/full/548-5481965_baby-bed-with-a-mobile-toy-with-hanging.png"}} style={styles.img} />    
                    </TouchableOpacity> } 
                </View>
            </Animated.View>
        </View>
    )
}

export default ClickNwaitDrawer

const styles = StyleSheet.create({})
