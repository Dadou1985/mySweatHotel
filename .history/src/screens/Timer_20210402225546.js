import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../components/userContext'
import { auth, db } from "../../firebase"
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import { showMessage, hideMessage } from "react-native-flash-message";


const Timer = () => {
    const [date, setDate] = useState(new Date())
    const [hour, setHour] = useState(new Date())
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)

    const [showDate, setShowDate] = useState(false)
    const [showHour, setShowHour] = useState(false)

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
      };

      const onTimeChange = (event, selectedHour) => {
        const currentHour = selectedHour || hour;
        setShowHour(Platform.OS === 'ios');
        setHour(currentHour);
      };

    const handleShowDate = () => {
        setShowDate(true)
    }

    const handleShowHour = () => {
        setShowHour(true)
    }

    const handleSubmit = () => {
        if(userDB.hotelDept === "PARIS") {
            return db.collection("mySweatHotel")
        .doc("country")
        .collection("France")
        .doc("collection")
        .collection('hotel')
        .doc('region')
        .collection(userDB.hotelRegion)
        .doc('departement')
        .collection(userDB.hotelDept)
        .doc("Arrondissement")
        .collection(userDB.hotelArrondissement)
        .doc(`${userDB.hotelId}`)
        .collection('clock')
        .add({
            author: user.displayName,
            date: date,
            client: user.displayName,
            room: userDB.room,
            markup: Date.now(),
            hour: hour  
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
        .collection('clock')
        .add({
            author: user.displayName,
            date: date,
            client: user.displayName,
            room: userDB.room,
            markup: Date.now(),
            hour: hour  
        }).then(function(docRef){
            console.log(docRef.id)
          }).catch(function(error) {
            console.error(error)
          })
        }
    }

      
    moment.locale('fr')

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image source={{uri: "https://image.flaticon.com/icons/png/512/62/62834.png"}} style={styles.img} />
            <View style={styles.containerText}>
                <Text style={styles.text}>Réveil</Text>
            </View>
            <View style={styles.inputContainer}>
            <Button type="clear" title={moment(date).format('L')} 
                onPress={handleShowDate} />
            <Button type="clear" title={moment(hour).format('LT')} 
                onPress={handleShowHour} />
            </View>        
            <Button onPress={() => {
                handleSubmit()
                showMessage({
                    message: "Votre demande de réveil a été transmise à la réception !",
                    type: "success",
                  })
                }} containerStyle={styles.button} title="Programmer maintenant" />
            
            {showDate &&
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={onDateChange}
                />}

            {showHour && 
            <DateTimePicker
                testID="dateTimePicker"
                value={hour}
                mode='time'
                is24Hour={true}
                display="default"
                onChange={onTimeChange}
                />}
        </KeyboardAvoidingView>
    )
}

export default Timer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    containerText: {
        marginBottom: 50
    },
    text: {
        fontSize: 30,
        textAlign: "center"
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 250,
        marginTop: 10, 
        borderColor: "white" 
    },
    img: {
        width: 70,
        height: 70,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
})