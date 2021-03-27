import React, { useState,useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from "../../firebase"
import { UserContext } from '../components/userContext'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'


const Taxi = () => {
    const [date, setDate] = useState(new Date())
    const [hour, setHour] = useState(new Date())
    const [passenger, setPassenger] = useState(null)
    const [type, setType] = useState("")
    const [adress, setAdress] = useState("")

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
        setShowDate(Platform.OS === 'ios');
        setHour(currentHour);
      };

    const handleShowDate = () => {
        setShowDate(true)
    }

    const handleShowHour = () => {
        setShowHour(true)
    }

    const handleSubmit = () => {
        setPassenger(null)
        setType('')
        setAdress('')
        return db.collection("mySweatHotel")
        .doc("country")
        .collection("France")
        .doc("collection")
        .collection("customer")
        .doc("collection")
        .collection('hotel')
        .doc('region')
        .collection(userDB.region)
        .doc('departement')
    }

      
    moment.locale('fr')

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image source={{uri: "https://cdn2.iconfinder.com/data/icons/car-11/100/taxi3-512.png"}} style={styles.img} />
            <View style={styles.containerText}>
                <Text style={styles.text}>Réserver un taxi</Text>
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="Date de réservation" autofocus type="text" value={moment(date).format('L')} 
                onPress={handleShowDate} />
                <Input placeholder="Heure de réservation" type="text" value={moment(hour).format('LT')} 
                onPress={handleShowHour} />
                <Input placeholder="Nombre de passager(s)" type="number" value={passenger} 
                onChangeText={(text) => setPassenger(text)} />
                <Input placeholder="Type de véhicule" type="text" value={type} 
                onChangeText={(text) => setType(text)} />
                <Input placeholder="Adresse de la destination"  type="text" value={adress} 
                onChangeText={(text) => setAdress(text)} />
            </View>
            <Button onPress={() => navigation.navigate('Home')} containerStyle={styles.button} title="Réserver maintenant" />
            
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

export default Taxi

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
        width: 200,
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
