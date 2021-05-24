import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, ImageBackground } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from "../../firebase"
import { paris_arrondissement, ile_de_france, auvergne_rhone_alpes, bourgogne_franche_comte, bretagne, centre_val_de_loire, corse, grand_est, hauts_de_france, normandie, nouvelle_aquitaine, occitanie, pays_de_la_loire,provence_alpes_cote_d_azur } from "../../hotels"
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from '../components/userContext'
import moment from 'moment'
import 'moment/locale/fr';
import { showMessage, hideMessage } from "react-native-flash-message";
import * as Linking from 'expo-linking';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Information = ({ navigation }) => {
    const [info, setInfo] = useState([])
    const [currentRoom, setCurrentRoom] = useState("Numéro de chambre")
    const [date, setDate] = useState(new Date())
    const [showDate, setShowDate] = useState(false)
    const [formValue, setFormValue] = useState({username: "", email: "", region: "", departement: "", city: "", standing: "", phone: "", room: 0, code_postal: "", adress: "", website: "", mail: "", hotelId: "", hotelName: "", country: ""})
    const [filter, setFilter] = useState("")
    const [initialFilter, setInitialFilter] = useState("")
    const [hotelName, setHotelName] = useState("Lancer la recherche")
    const [hideAll, setHideAll] = useState(false)
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)
    const [showModalHotel, setShowModalHotel] = useState(false)
    const [showModalRoom, setShowModalRoom] = useState(false)
    const [inputSearch, setInputSearch] = useState(true)
    const [searchButton, setSearchButton] = useState(false)
    const [checkoutButton, setCheckoutButton] = useState(false)
    const [inputRoom, setInputRoom] = useState(false)
    const [url, setUrl] = useState("")

    const deptDetails = [paris_arrondissement, ile_de_france, auvergne_rhone_alpes, bourgogne_franche_comte, bretagne, centre_val_de_loire, corse, grand_est, hauts_de_france, normandie, nouvelle_aquitaine, occitanie, pays_de_la_loire,provence_alpes_cote_d_azur]

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "RoomChange",
            headerBackTitleVisible: false,
            headerTitleAlign: "right",
            headerTitle: () =>(
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    {userDB !== null ? 
                     <Text style={{ color: "black", fontWeight : "bold", fontSize: 20, marginLeft: 5}}>Réservez votre prochain séjour</Text> : <Text style={{ color: "black", fontWeight : "bold", fontSize: 20, marginLeft: 5}}>Trouvez votre hôtel</Text>}
                </View>
            )
        })
    }, [navigation])

    useEffect(() => {
        const getHotel = () => {
            return db.collection("hotels")
                .where("code_postal", "==", filter)
                .where("partnership", "==", true)
            }

        let unsubscribe = getHotel().onSnapshot(function(snapshot) {
            const snapInfo = []
          snapshot.forEach(function(doc) {          
            snapInfo.push({
                id: doc.id,
                ...doc.data()
              })        
            });
            console.log(snapInfo)
            setInfo(snapInfo)
        });
        return unsubscribe
    }, [filter])
        
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
        setInputRoom(true)
        setTimeout(() => {
            showMessage({
                message: "La date de votre check-out a bien été enregistrée !",
                type: "info",
              })
        }, 1000);
      };
    
    const handleLoadUserDB = () => {
        return db.collection('guestUsers')
        .doc(user.uid)
        .get()
        .then((doc) => {
            if (doc.exists) {
            setUserDB(doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).then(() => navigation.replace('My Sweet Hotel'))
    }

    const handleSubmit = async () => {
        await db.collection('guestUsers')
        .doc(user.uid)
        .update({
            hotelId: formValue.hotelId,
            hotelName: hotelName,
            hotelRegion: formValue.region,
            hotelDept: formValue.departement,
            city: formValue.city,
            classement: formValue.standing,            
            room: currentRoom,
            checkoutDate: moment(date.getTime()).format('LL'),
            towel: true,
            soap: true,
            toiletPaper: true,
            hairDryer: true,
            pillow: true,
            blanket: true,
            iron: true,
            babyBed: true, 
            website: formValue.website,
            phone: formValue.phone
            })
        return handleLoadUserDB()
    }

    const Logout = async () => {
        await auth.signOut()
        .then(navigation.replace('Connexion'))
    }

    const handleLinkWebsite = async() => {
        return Linking.openURL(userDB.website)
    }

console.log(userDB)

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            {userDB !== null ? <View style={styles.containerText}>
                        <View style={styles.containerImg}>
                        <ImageBackground source={ require('../../img/pic_booking2.png') } style={{
                            flex: 1,
                            resizeMode: "contain",
                            justifyContent: "center",
                            width: 500}}>
                        </ImageBackground>
                            <View style={{marginBottom: 0, marginTop: 0}}>
                                <Button title='Oui' type="clear" onPress={handleLinkWebsite} />
                                <Button style={{width: 300}} title='Non, merci' onPress={() => {
                                    handleLoadUserDB()
                                    setTimeout(() => {
                                        showMessage({
                                            message: `Nous sommes ravis de vous revoir, ${user.displayName}`,
                                            type: "info",
                                          })
                                    }, 2000);
                                }} />
                            </View>
                        </View>
                    </View>
                : <View style={styles.containerText}>
                    <View style={styles.containerImg}>
                        <ImageBackground source={ require('../../img/pic_hotels.png') } style={{
                            flex: 1,
                            width: 400}}>
                        </ImageBackground>
                    </View>
                        <View style={styles.buttonView}>
                            {inputSearch && <Input placeholder="Entrer le code postal de votre hôtel" type="text" value={initialFilter} 
                                onChangeText={(text) => setInitialFilter(text)} style={{marginBottom: 5, textAlign: "center"}} />}
                            {initialFilter.charAt(4) !== "" && 
                            <Button 
                                raised={true} 
                                icon={<Ionicons name="search-circle" size={25} color="black" style={{marginRight: 5}} />}
                                onPress={() => {
                                    setShowModalHotel(true)
                                    setFilter(initialFilter)
                                    }} containerStyle={styles.button} title={hotelName} type="outline" />}   
                                {checkoutButton && 
                                <Button 
                                    raised={true} 
                                    icon={<Ionicons name="calendar" size={24} color="black" style={{marginRight: 5}} />}
                                    onPress={() => {
                                        setShowDate(true)
                                        setHideAll(true)
                                        }} containerStyle={styles.button} title={inputRoom ? `Check-out le ${moment(date).format('LL')}` : "Date de fin de séjour"} type="outline" />}

                            {inputRoom && 
                             <Button 
                             raised={true} 
                             icon={<Ionicons name="bed-sharp" size={25} color="black" style={{marginRight: 5}} />}
                             onPress={() => {
                                 setShowModalRoom(true)
                                 }} containerStyle={styles.button} title={currentRoom !== "Numéro de chambre" ? `chambre n° ${currentRoom}` : currentRoom} type="outline" />}
                            {currentRoom !== "Numéro de chambre" &&
                            <Button raised={true} onPress={() => {
                                handleSubmit()
                                setTimeout(() => {
                                    showMessage({
                                        message: `Nous sommes ravis de vous revoir, ${user.displayName}`,
                                        type: "info",
                                      })
                                }, 3000);
                            }} containerStyle={styles.button} title="Accéder à la page d'accueil" />}
                        </View>
                    </View>
                
            }

            <Modal 
            animationType="slide"
            transparent={true}
            visible={showModalHotel} 
            style={styles.centeredView}>
                <ScrollView contentContainerStyle={styles.modalView}>
                    <View style={{
                        flexDirection: "row", 
                        width: 420, 
                        alignItems: "center", 
                        justifyContent: "center", 
                        marginBottom: 10, 
                        paddingTop: 10, 
                        paddingBottom: 10, 
                        backgroundColor: "lightblue"}}>
                        <Text style={{fontSize: 25, marginRight: 20}}>Sélectionner votre hôtel</Text>
                        <TouchableOpacity>
                            <AntDesign name="closecircle" size={24} color="black" onPress={() => setShowModalHotel(false)} />
                        </TouchableOpacity>
                    </View>
                {info.length > 0 ? info.map(hotel =>(
                <TouchableOpacity>
                    <View style={{padding: 15, 
                    marginBottom: 30, 
                    borderBottomWidth: 1, 
                    borderBottomColor: "lightgrey", 
                    width: "100%"}}>
                            <Text style={{fontSize: 15}} onPress={() => {
                                setFormValue({
                                    hotelId: hotel.id,
                                    departement: hotel.departement,
                                    region: hotel.region,
                                    classement: hotel.classement,
                                    city: hotel.city,
                                    code_postal: hotel.code_postal,
                                    country: hotel.country,
                                    room: hotel.room,
                                    city: hotel.city,
                                    standing: hotel.classement,
                                    website: hotel.website,
                                    phone: hotel.phone
                                })
                                setHotelName(hotel.hotelName)
                                setUrl(hotel.website)
                                setShowModalHotel(false)
                                setCheckoutButton(true)
                                }}>
                                {hotel.hotelName}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    )) :
                    <View style={styles.container}>
                        <Text style={{fontSize: 25, textAlign: "center", marginBottom: 20}}>Nous n'avons pas encore d'hôtel partenaire dans ce secteur</Text>
                        <Text style={{fontSize: 15, textAlign: "center", marginBottom: 20}}>L'équipe de MySweetHotel met tout en oeuvre pour étendre son réseau afin de vous offrir une expérience hôtelière de qualité.</Text>
                        <Text style={{fontSize: 10, textAlign: "center", marginBottom: 20}}>N'hésitez pas à parler de notre solution auprès de votre réception, vous leur rendrez un fier service!</Text>
                        <Text style={{fontSize: 10, textAlign: "center", marginBottom: 20, fontWeight: "bold"}}>Nous vous souhaitons un excellent séjour au sein de votre établissement.</Text>
                        <View>
                            <Button raised={true} onPress={() => setShowModalHotel(false)} containerStyle={styles.button} type="outlined" title="Revenir à la recherche" />
                            <Button raised={true} onPress={() => Logout()} containerStyle={styles.button} title="Se déconnecter" />
                        </View>
                    </View>}
                </ScrollView>
            </Modal>

            <Modal 
            animationType="slide"
            transparent={true}
            visible={showModalRoom} 
            style={styles.centeredView}>
                <View style={styles.modalRoom}>
                <Text style={{
                    width: 375, 
                    marginBottom: 10, 
                    fontSize: 20,
                    paddingTop: 10, 
                    paddingBottom: 10,
                    borderRadius: 5,
                    textAlign: "center", 
                    backgroundColor: "lightblue"
                    }}>Numéro de chambre</Text>
                    <Input 
                        placeholder="Entrer votre numéro de chambre" 
                        type="number" 
                        value={currentRoom !== "Numéro de chambre" ? currentRoom : ""} 
                        onChangeText={(text) => setCurrentRoom(text)} style={{textAlign: "center", marginBottom: 5}} />  
                    <Button raised={true} onPress={() => setShowModalRoom(false)} containerStyle={{width: 300, borderRadius: 20, marginBottom: 15}} title="Valider" />
                </View>
            </Modal>

            {showDate && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
           
        </KeyboardAvoidingView>
    )
}

export default Information

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    containerText: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 30
    },
    containerImg: {
        flex: 2,
      },
      containerInput: {
        flex: 3,
      },
    text: {
        fontSize: 30,
        textAlign: "center"
    },
    button: {
        width: 350,
        marginTop: 10,
        borderRadius: 30
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        marginTop: 55,
        backgroundColor: 'white',
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
    modalRoom: {
        margin: 20,
        marginTop: 265,
        borderRadius: 10,
        backgroundColor: 'white',
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
    buttonView: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 30,
        width: 350,

    },
    img: {marginLeft: 25,
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
})