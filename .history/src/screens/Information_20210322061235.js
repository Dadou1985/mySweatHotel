import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from "../../firebase"
import {Picker} from '@react-native-picker/picker';
import RegionDetails from '../../hotels/regionDetailsSheet.json'
import { paris_arrondissement, ile_de_france, auvergne_rhone_alpes, bourgogne_franche_comte, bretagne, centre_val_de_loire, corse, grand_est, hauts_de_france, normandie, nouvelle_aquitaine, occitanie, pays_de_la_loire,provence_alpes_cote_d_azur } from "../../hotels"


const Information = () => {
    const [info, setInfo] = useState([])
    const [region, setRegion] = useState('Sélectionner une région')
    const [departement, setDepartement] = useState('YVELINES')
    const [arrondissement, setArrondissement] = useState('')
    const [number, setNumber] = useState(0)

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
            </View>
            <View>
            <Picker
                selectedValue={region}
                onValueChange={(itemValue, itemIndex) =>
                    setRegion(itemValue)
                }>
                {RegionDetails.map(region =>(
                    <Picker.Item label={region.region} value={region.region} ={() => setNumber(region.number)} />
                ))
                }
            </Picker>
            <Picker
                selectedValue={departement}
                onValueChange={(itemValue, itemIndex) =>
                    setDepartement(itemValue)
                }>
                {deptDetails[number].map(dept =>(
                    <Picker.Item label={dept.nom} value={dept.nom} />
                ))
                }
            </Picker>
            </View>
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
        width: 200,
        marginTop: 10
    }
})