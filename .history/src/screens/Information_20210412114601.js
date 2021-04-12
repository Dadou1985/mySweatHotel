import React, { useState, useEffect, useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from "../../firebase"
import RegionDetails from '../../hotels/regionDetailsSheet.json'
import { paris_arrondissement, ile_de_france, auvergne_rhone_alpes, bourgogne_franche_comte, bretagne, centre_val_de_loire, corse, grand_est, hauts_de_france, normandie, nouvelle_aquitaine, occitanie, pays_de_la_loire,provence_alpes_cote_d_azur } from "../../hotels"
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from '../components/userContext'
import moment from 'moment'
import { showMessage, hideMessage } from "react-native-flash-message";


const Information = ({ navigation }) => {
    const [info, setInfo] = useState([])
    const [room, setRoom] = useState(null)
    const [date, setDate] = useState(new Date(Date.now()))
    const [showDate, setShowDate] = useState(false)
    const [region, setRegion] = useState('Sélectionner une région')
    const [departement, setDepartement] = useState('Sélectionner un département')
    const [arrondissement, setArrondissement] = useState('Sélectionner un arrondissement')
    const [hotel, setHotel] = useState("Sélectionner votre hôtel")
    const [hotelId, setHotelId] = useState(null)
    const [number, setNumber] = useState(0)
    const [showModalRegion, setShowModalRegion] = useState(false)
    const [showModalDepartement, setShowModalDepartement] = useState(false)
    const [showModalArrondissement, setShowModalArrondissement] = useState(false)
    const [showModalHotel, setShowModalHotel] = useState(false)
    const [showHotelButton, setShowHotelButton] = useState(false)
    const [hideAll, setHideAll] = useState(false)
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)

    const deptDetails = [paris_arrondissement, ile_de_france, auvergne_rhone_alpes, bourgogne_franche_comte, bretagne, centre_val_de_loire, corse, grand_est, hauts_de_france, normandie, nouvelle_aquitaine, occitanie, pays_de_la_loire,provence_alpes_cote_d_azur]

    useEffect(() => {
        const getHotel = () => {
            if(departement === 'PARIS') {
                return db.collection("mySweetHotel")
                    .doc('country')
                    .collection('France')
                    .doc('collection')
                    .collection('hotel')
                    .doc("region")
                    .collection(region)
                    .doc('departement')
                    .collection(departement)
                    .doc("arrondissement")
                    .collection(arrondissement)
            }else{
                return db.collection("mySweetHotel")
                    .doc('country')
                    .collection('France')
                    .doc('collection')
                    .collection('hotel')
                    .doc("region")
                    .collection(region)
                    .doc('departement')
                    .collection(departement)
            }
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
    }, [region, departement, arrondissement])
        
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
        setTimeout(() => {
            showMessage({
                message: "La date de votre check-out a bien été enregistrée !",
                type: "info",
              })
        }, 1000);
      };
    
    const handleLoadUserDB = () => {
        return db.collection("mySweetHotel")
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
        }).then(() => navigation.replace('My Sweet Hotel'))
    }

    const handleSubmit = async () => {
        await db.collection("mySweetHotel")
        .doc("country")
        .collection("France")
        .doc("collection")
        .collection("customer")
        .doc("collection")
        .collection('hotel')
        .doc("region")
        .collection(region)
        .doc('departement')
        .collection(departement)
        .doc(`${hotelId}`)
        collect
        .doc(user.displayName)
        .update({
            hotelId: hotelId,
            hotelName: hotel,
            hotelRegion: region,
            hotelDept: departement,
            hotelArrondissement: arrondissement,
            room: room,
            checkoutDate: date,
            towel: true,
            soap: true,
            toiletPaper: true,
            hairDryer: true,
            pillow: true,
            blanket: true,
            iron: true,
            babyBed: true
        })
        return handleLoadUserDB()
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            {userDB !== null && moment(userDB.checkoutDate).format('L') !== moment(new Date()).format('L') && new Date().getHours() < 13 ? <View style={styles.containerText}>
                        <Text style={styles.text}>Un besoin particulier...</Text>
                        <View style={{marginTop: 40}}>
                            <TouchableOpacity>
                                <Image source={{uri: "https://cdn4.iconfinder.com/data/icons/everyday-objects-line-art-1/128/towels-512.png"}} style={styles.img} />    
                            </TouchableOpacity>
                            <View style={{marginTop: 15}}>
                                <Button title='Oui' type="clear" />
                                <Button title='Non, merci' onPress={() => {
                                    handleLoadUserDB()
                                    setTimeout(() => {
                                        showMessage({
                                            message: `Nous sommes heureux de vous revoir, ${user.displayName}`,
                                            type: "info",
                                          })
                                    }, 3000);
                                }} />
                            </View>
                        </View>
                    </View>
                : <View style={styles.containerText}>
                        <Text style={styles.text}>Trouvez votre hôtel</Text>
                        <View style={styles.buttonView}>
                            {!hideAll &&
                                    <Button onPress={() => setShowModalRegion(true)} containerStyle={styles.button} title={region} />}
                            {!hideAll && region !== "Sélectionner une région" ?
                                <Button onPress={() => setShowModalDepartement(true)} containerStyle={styles.button} title={departement} /> : <></>}
                            {!hideAll && departement === "PARIS" && departement !== "Sélectionner une département" ?
                                <Button onPress={() => setShowModalArrondissement(true)} containerStyle={styles.button} title={arrondissement} /> : <></>}
                            {showHotelButton &&
                                <Button onPress={() => setShowModalHotel(true)} containerStyle={styles.button} title={hotel} />}    
                            {!hideAll && hotel !== "Sélectionner votre hôtel" &&
                                <Button onPress={() => {
                                    setShowDate(true)
                                    setHideAll(true)
                                    }} containerStyle={styles.button} title="Date de fin de séjour" />}    
                        </View>
                        <View style={{width: 350, marginTop: 20}}>
                            {hideAll &&
                                <Input placeholder="Entrer votre numéro de chambre" type="number" value={room} 
                                onChangeText={(text) => setRoom(text)} style={{textAlign: "center", marginBottom: 5}} />}
                            {room !== null &&
                            <Button onPress={() => {
                                handleSubmit()
                                setTimeout(() => {
                                    showMessage({
                                        message: `Nous sommes heureux de vous revoir, ${user.displayName}`,
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
            visible={showModalRegion} 
            style={styles.centeredView}>
                <ScrollView contentContainerStyle={styles.modalView}>
                {RegionDetails.map(region =>(
                    <View style={{padding: 15, 
                    marginBottom: 30, 
                    borderBottomWidth: 1, 
                    borderBottomColor: "lightgrey", 
                    width: "100%"}}>
                        <TouchableOpacity onPress={() => {
                                setRegion(region.region)
                                setNumber(region.number)
                                setShowModalRegion(false)
                                }}>
                            <Text style={{fontSize: 15}}>
                                {region.region}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    ))}
                </ScrollView>
            </Modal>

            <Modal 
            animationType="slide"
            transparent={true}
            visible={showModalDepartement} 
            style={styles.centeredView}>
                <ScrollView contentContainerStyle={styles.modalView}>
                {deptDetails[number].map(dept =>(
                    <View style={{padding: 15, 
                    marginBottom: 30, 
                    borderBottomWidth: 1, 
                    borderBottomColor: "lightgrey", 
                    width: "100%"}}>
                        <TouchableOpacity>
                            <Text style={{fontSize: 15}} onPress={() => {
                                if(departement === "PARIS") {
                                    setDepartement(dept.nom)
                                    setShowModalDepartement(false)
                                }else{
                                    setDepartement(dept.nom)
                                    setShowHotelButton(true) 
                                    setShowModalDepartement(false)
                                }
                                }}>
                                {dept.nom}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    ))}
                </ScrollView>
            </Modal>

            <Modal 
            animationType="slide"
            transparent={true}
            visible={showModalArrondissement} 
            style={styles.centeredView}>
                <ScrollView contentContainerStyle={styles.modalView}>
                {deptDetails[0].map(dept =>(
                    <View style={{padding: 15, 
                    marginBottom: 30, 
                    borderBottomWidth: 1, 
                    borderBottomColor: "lightgrey", 
                    width: "100%"}}>
                        <TouchableOpacity>
                            <Text style={{fontSize: 15}} onPress={() => {
                                setArrondissement(dept.nom)
                                setShowModalArrondissement(false)
                                }}>
                                {dept.nom}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    ))}
                </ScrollView>
            </Modal>

            <Modal 
            animationType="slide"
            transparent={true}
            visible={showModalHotel} 
            style={styles.centeredView}>
                <ScrollView contentContainerStyle={styles.modalView}>
                {info.map(hotel =>(
                    <View style={{padding: 15, 
                    marginBottom: 30, 
                    borderBottomWidth: 1, 
                    borderBottomColor: "lightgrey", 
                    width: "100%"}}>
                        <TouchableOpacity>
                            <Text style={{fontSize: 15}} onPress={() => {
                                setHotel(hotel.hotelName)
                                setHotelId(hotel.id)
                                setShowModalHotel(false)
                                }}>
                                {hotel.hotelName}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    ))}
                </ScrollView>
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
        padding: 10
    },
    containerText: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 30
    },
    text: {
        fontSize: 30,
        textAlign: "center"
    },
    button: {
        width: 300,
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
        margin: 10,
        marginTop: 70,
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
      buttonView: {
          flexDirection: "column",
          alignItems: "center",
          marginTop: 30
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