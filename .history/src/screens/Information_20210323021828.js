import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from "../../firebase"
import ModalDropdown from 'react-native-modal-dropdown';
import MultiSelectDropdown from '../components/MultiSelectDropdown'
import RegionDetails from '../../hotels/regionDetailsSheet.json'
import { paris_arrondissement, ile_de_france, auvergne_rhone_alpes, bourgogne_franche_comte, bretagne, centre_val_de_loire, corse, grand_est, hauts_de_france, normandie, nouvelle_aquitaine, occitanie, pays_de_la_loire,provence_alpes_cote_d_azur } from "../../hotels"


const Information = () => {
    const [info, setInfo] = useState([])
    const [region, setRegion] = useState('Sélectionner une région')
    const [departement, setDepartement] = useState('Sélectionner un département')
    const [arrondissement, setArrondissement] = useState('Sélectionner un arrondissement')
    const [hotel, setHotel] = useState("Sélectionner votre hôtel")
    const [number, setNumber] = useState(0)
    const [showModalRegion, setShowModalRegion] = useState(false)
    const [showModalDepartement, setShowModalDepartement] = useState(false)
    const [showModalArrondissement, setShowModalArrondissement] = useState(false)
    const [showModalHotel, setShowModalHotel] = useState(false)
    const [showHotelButton, setShowHotelButton] = useState(false)

    const deptDetails = [paris_arrondissement, ile_de_france, auvergne_rhone_alpes, bourgogne_franche_comte, bretagne, centre_val_de_loire, corse, grand_est, hauts_de_france, normandie, nouvelle_aquitaine, occitanie, pays_de_la_loire,provence_alpes_cote_d_azur]

    useEffect(() => {
        const getHotel = () => {
            if(departement === 'PARIS') {
                return db.collection("mySweatHotel")
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
                return db.collection("mySweatHotel")
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
    }, [])

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.containerText}>
                <Text style={styles.text}>Informations complémentaires</Text>
                <View style={styles.buttonView}>
                    <Text>Trouvez votre hôtel</Text>
                        <Button onPress={() => setShowModalRegion(true)} containerStyle={styles.button} title={region} />
                    {region !== "Sélectionner une région" ?
                        <Button onPress={() => setShowModalDepartement(true)} containerStyle={styles.button} title={departement} /> : <></>}
                    {departement === "PARIS" && departement !== "Sélectionner une département" ?
                        <Button onPress={() => setShowModalArrondissement(true)} containerStyle={styles.button} title={arrondissement} /> : <></>}
                    {showHotelButton &&
                    <Button onPress={() => setShowModalHotel(true)} containerStyle={styles.button} title={hotel} />}    
                </View>
            </View>

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
                                setShowModalRegion
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
                                }else{
                                    setDepartement(dept.nom)
                                    setShowHotelButton(true) 
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
                            <Text style={{fontSize: 15}} onPress={() => setArrondissement(dept.nom)}>
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
                            <Text style={{fontSize: 15}} onPress={() => setHotel(hotel.hotelName)}>
                                {hotel.hotelName}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    ))}
                </ScrollView>
            </Modal>


           
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
          marginTop: 50
      }
})