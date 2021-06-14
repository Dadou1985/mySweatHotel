import React, { useState,useContext, useLayoutEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from "../../firebase"
import { UserContext } from '../components/userContext'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import 'moment/locale/fr';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { AntDesign } from '@expo/vector-icons';

const Taxi = ({ navigation }) => {
    const [date, setDate] = useState(new Date())
    const [hour, setHour] = useState(new Date())
    const [passenger, setPassenger] = useState(null)
    const [type, setType] = useState("Berline")
    const [adress, setAdress] = useState("")
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)

    const [showDate, setShowDate] = useState(false)
    const [showHour, setShowHour] = useState(false)

    const { t } = useTranslation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Taxi",
            headerBackTitleVisible: false,
            headerTitleAlign: "right",
            headerTitle: () =>(
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image source={{uri: "https://cdn2.iconfinder.com/data/icons/car-11/100/taxi3-512.png"}} style={styles.img} />
                    <Text style={{ color: "black", fontWeight : "bold", fontSize: 20}}>{t('taxi_titre')}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => {
                navigation.navigate("My Sweet Hotel")}}>
                    <AntDesign name="left" size={24} color="black" style={{marginLeft: 5}} />
                </TouchableOpacity>
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
        setPassenger(null)
        setType('Berline')
        setAdress('')
        
        return db.collection("hotels")
        .doc(userDB.hotelId)
        .collection('cab')
        .add({
            author: "effectué par le client",
            destination: adress,
            client: user.displayName,
            room: userDB.room,
            pax: passenger,
            model: type,
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
            <ImageBackground source={ require('../../img/pic_taxi2.png') } style={{
                flex: 1,
                resizeMode: "contain",
                justifyContent: "center",
                width: 460}}>
                </ImageBackground>
            </View>
            <View style={styles.inputContainer}>
                <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                    <View style={{marginBottom: 20, flexDirection: "column", alignItems: "center"}}>
                        <Text>{t('taxi_jour')}</Text>
                        <Button type="clear" title={moment(date).format('L')} 
                        onPress={handleShowDate} />
                    </View>
                    <View style={{marginBottom: 20, flexDirection: "column", alignItems: "center"}}>
                        <Text>{t('taxi_heure')}</Text>
                        <Button type="clear" title={moment(hour).format('LT')} 
                            onPress={handleShowHour} />
                    </View>   
                </View> 
                <View style={{marginBottom: 20, flexDirection: "column", alignItems: "center"}}>
                        <Text>{t('taxi_type')}</Text>
                        <View style={{flexDirection: "row", width: 400, justifyContent: "center", marginTop: 15}}>
                            <Button containerStyle={styles.typeButton} title={t('berline')} type={type === "Berline" ? "solid" : "clear"} raised={true} onPress={() => setType("Berline")} />
                            <Button containerStyle={styles.typeButton} title={t('van')} type={type === "Van" ? "solid" : "clear"} raised={true} onPress={() => setType("Van")} />
                        </View>
                </View>
                <Input placeholder={t('passager')} type="number" value={passenger} 
                onChangeText={(text) => setPassenger(text)} />
                <Input placeholder={t('taxi_adresse_destination')}  type="text" value={adress} 
                onChangeText={(text) => setAdress(text)} />
            </View>
            <Button raised={true} onPress={() => {
                handleSubmit()
                showMessage({
                    message: t('taxi_message_succes'),
                    type: "success",
                  })
                }} containerStyle={styles.button} title={t('taxi_bouton')} />
            
            {showDate &&
            <DateTimePicker
                testID="dateTimePicker"
                locale={i18next.language}
                value={date}
                mode='date'
                is24Hour={true}
                minimumDate={new Date()}
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
        justifyContent: "space-between",

    },
    containerText: {
        flex: 2,
    },
    text: {
        fontSize: 30,
        textAlign: "center",
        color:"white",
        marginBottom: 50, 

    },
    inputContainer: {
        width: 300,
        marginTop: 20, 

    },
    typeButton: {
        width: 125,
        marginTop: 10,
        borderColor: "white",
        marginLeft: 5,
        marginRight: 5 
    },
    button: {
        width: 200,
        marginTop: 10,
        marginBottom: 50, 
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
