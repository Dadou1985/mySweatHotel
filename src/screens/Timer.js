import React, { useState, useContext, useLayoutEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../components/userContext'
import { auth, db } from "../../firebase"
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import 'moment/locale/fr';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

const Timer = ({navigation}) => {
    const [date, setDate] = useState(new Date())
    const [hour, setHour] = useState(new Date())
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)

    const [showDate, setShowDate] = useState(false)
    const [showHour, setShowHour] = useState(false)

    const { t } = useTranslation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Timer",
            headerBackTitleVisible: false,
            headerTitleAlign: "right",
            headerTitle: () =>(
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image source={{uri: "https://image.flaticon.com/icons/png/512/62/62834.png"}} style={styles.img} />
                    <Text style={{ color: "black", fontWeight : "bold", fontSize: 20}}>Programmer un réveil</Text>
                </View>
            )
        })
    }, [navigation])

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
        return db.collection("hotels")
        .doc(userDB.hotelId)
        .collection('clock')
        .add({
            author: "effectué par le client",
            client: user.displayName,
            room: userDB.room,
            markup: Date.now(),
            hour: moment(hour).format('LT'),
            date: moment(date).format('L'),
            status: true
          }).then(function(docRef){
            console.log(docRef.id)
          }).catch(function(error) {
            console.error(error)
          })
    }

      
    moment.locale('fr')

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.containerText}>
            <ImageBackground source={ require('../../img/pic_timer.png') } style={{
                flex: 1,
                resizeMode: "contain",
                justifyContent: "center",
                width: 500}}>
                </ImageBackground>
            </View>
            <View style={{flexDirection: "column", justifyContent: "space-around", width: 300, marginTop: 60}}>
                <View style={{marginBottom: 20, flexDirection: "column", alignItems: "center"}}>
                    <Text style={{fontSize: 20}}>Choisir un jour</Text>
                    <Button type="clear" title={moment(date).format('L')} 
                    onPress={handleShowDate} />
                </View>
                <View style={{marginBottom: 20, flexDirection: "column", alignItems: "center"}}>
                    <Text style={{fontSize: 20}}>Choisir une heure</Text>
                    <Button type="clear" title={moment(hour).format('LT')} 
                        onPress={handleShowHour} />
                </View>   
            </View> 
            <Button raised={true} onPress={() => {
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
        justifyContent: "space-between",
    },
    containerText: {
        flex: 2,
    },
    text: {
        fontSize: 30,
        color: "white", 
        marginLeft: 100
    },
    inputContainer: {
        width: 300,
        marginTop: 30, 

    },
    button: {
        width: 250,
        marginTop: 50, 
        marginBottom: 90,
        borderColor: "white" 
    },
    img: {
        width: 24,
        height: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginRight: 5
    }
})