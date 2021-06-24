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
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import DatePickerModal from 'react-native-modal'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Information = ({ navigation }) => {
    const [info, setInfo] = useState([])
    const [currentRoom, setCurrentRoom] = useState("Numéro de chambre")
    const [date, setDate] = useState(Date.now() + 86400000)
    const [showDate, setShowDate] = useState(false)
    const [formValue, setFormValue] = useState({username: "", email: "", region: "", departement: "", city: "", standing: "", phone: "", room: 0, code_postal: "", adress: "", website: "", mail: "", hotelId: "", hotelName: "", country: ""})
    const [filter, setFilter] = useState("")
    const [initialFilter, setInitialFilter] = useState("")
    const [hotelName, setHotelName] = useState("Lancer la recherche")
    const [hideAll, setHideAll] = useState(false)
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)
    const [userMemo, setUserMemo] = useState("")
    const [showModalHotel, setShowModalHotel] = useState(false)
    const [showModalRoom, setShowModalRoom] = useState(false)
    const [inputSearch, setInputSearch] = useState(true)
    const [searchButton, setSearchButton] = useState(false)
    const [checkoutButton, setCheckoutButton] = useState(false)
    const [inputRoom, setInputRoom] = useState(false)
    const [url, setUrl] = useState("")

    const deptDetails = [paris_arrondissement, ile_de_france, auvergne_rhone_alpes, bourgogne_franche_comte, bretagne, centre_val_de_loire, corse, grand_est, hauts_de_france, normandie, nouvelle_aquitaine, occitanie, pays_de_la_loire,provence_alpes_cote_d_azur]

    const { t } = useTranslation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "RoomChange",
            headerBackTitleVisible: false,
            headerTitleAlign: "right",
            headerTitle: () =>(
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    {userDB !== null ? 
                     <Text style={{ color: "black", fontWeight : "bold", fontSize: 20, marginLeft: 5}}>{t("prochain_sejour")}</Text> : <Text style={{ color: "black", fontWeight : "bold", fontSize: 20, marginLeft: 5}}>{t("trouver_hotel")}</Text>}
                </View>
            ),
            headerLeft: null
        })
    }, [navigation])

    useEffect(() => {
        const getHotel = () => {
            return db.collection("hotel")
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
                message: t("message_checkout_valide"),
                type: "info",
            })
        }, 2000);
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
        }).then(() => {
            return navigation.replace('My Sweet Hotel')
        })
    }

    const handleUpdateLanguage = () => {
        return db.collection('guestUsers')
        .doc(user.uid)
        .update({
            language: i18next.language
        })
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
            phone: formValue.phone,
            language: i18next.language
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

    const handlePlatformDate = () => {
        if(Platform.OS === 'ios') {
            return (
                <Modal 
                    animationType="slide"
                    visible={showDate} 
                    style={styles.datePickerModal}>
                    <View style={{
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "white",
                        marginTop: 55,
                        width: "100%",
                        height: "80%"
                    }}>
                        <View style={{
                            flexDirection: "row", 
                            width: 420, 
                            alignItems: "center", 
                            justifyContent: "center", 
                            marginBottom: 10, 
                            paddingTop: 10, 
                            paddingBottom: 10, 
                            backgroundColor: "lightblue"}}>
                            <Text style={{fontSize: 25, marginRight: 20}}>{t('reveil_jour')}</Text>
                            <TouchableOpacity>
                                <AntDesign name="closecircle" size={24} color="black" onPress={() => setShowDate(false)} />
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            testID="dateTimePicker"
                            locale={i18next.language}
                            value={date}
                            mode='date'
                            is24Hour={true}
                            minimumDate={Date.now() + 86400000}
                            display="spinner"
                            onChange={onChange}
                            style={styles.datePicker}
                        />
                        <Button raised={true} onPress={() => {
                            setShowHour(false)
                        }} containerStyle={styles.datePickerButton} title={t('validation')} />
                    </View>
                </Modal>
            )
        }else{
            return (
                <View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        locale={i18next.language}
                        value={date}
                        mode='date'
                        is24Hour={true}
                        minimumDate={Date.now() + 86400000}
                        display="default"
                        onChange={onChange}
                    />
                </View>
            )
        }
    }

    console.log(userDB)

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            {userDB.checkoutDate !== "" ? <View style={styles.containerText}>
                        <View style={styles.containerImg}>
                        <ImageBackground source={ require('../../img/booking11.png') } style={{
                            flex: 1,
                            resizeMode: "contain",
                            justifyContent: "center",
                            width: 410}}>
                        </ImageBackground>
                            <View style={{
                                position: "absolute",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%",
                                top: 500}}>
                                <Button containerStyle={styles.button} type="clear" title={t("oui")} onPress={handleLinkWebsite} />
                                <Button raised={true} containerStyle={styles.button} title={t("non")} onPress={async() => {
                                    await handleUpdateLanguage()
                                    handleLoadUserDB()
                                    return setTimeout(() => {
                                        showMessage({
                                            message: `${t("message_bienvenue")} ${user.displayName}`,
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
                            {/*inputSearch && <Input placeholder={t("code_postal")} type="text" value={initialFilter} 
                                onChangeText={(text) => setInitialFilter(text)} style={{marginBottom: 5, textAlign: "center"}} />*/}
                            {/*initialFilter.charAt(4) !== "" && */}
                            <Button 
                                raised={true} 
                                icon={<Ionicons name="search-circle" size={25} color="black" style={{marginRight: 5}} />}
                                onPress={() => {
                                    setShowModalHotel(true)
                                    setFilter(initialFilter)
                                    }} containerStyle={styles.button} title={hotelName === "Lancer la recherche" ? t("recherche_hotel") : hotelName} type="outline" />   
                                {checkoutButton && 
                                <Button 
                                    raised={true} 
                                    icon={<Ionicons name="calendar" size={24} color="black" style={{marginRight: 5}} />}
                                    onPress={() => {
                                        setShowDate(true)
                                        setHideAll(true)
                                        }} containerStyle={styles.button} title={inputRoom ? `${t("checkout_information")} ${moment(date).format('LL')}` : t("date_checkout")} type="outline" />}

                            {inputRoom && 
                             <Button 
                             raised={true} 
                             icon={<Ionicons name="bed-sharp" size={25} color="black" style={{marginRight: 5}} />}
                             onPress={() => {
                                 setShowModalRoom(true)
                                 }} containerStyle={styles.button} title={currentRoom !== "Numéro de chambre" ? `${t("chbre_num")} ${currentRoom}` : t("num_chbre")} type="outline" />}
                            {currentRoom !== "Numéro de chambre" &&
                            <Button raised={true} onPress={() => {
                                handleSubmit()
                                setTimeout(() => {
                                    showMessage({
                                        message: `${t("message_bienvenue")} ${user.displayName}`,
                                        type: "info",
                                      })
                                }, 3000);
                            }} containerStyle={styles.button} title={t("accueil")} />}
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
                        <Text style={{fontSize: 25, marginRight: 20}}>{t("selection_hotel")}</Text>
                        <TouchableOpacity>
                            <AntDesign name="closecircle" size={24} color="black" onPress={() => setShowModalHotel(false)} />
                        </TouchableOpacity>
                    </View>
                {info.length > 0 ? info.map(hotel =>(
                <TouchableOpacity onPress={() => {
                    setFormValue({
                        hotelId: hotel.id,
                        departement: hotel.departement,
                        region: hotel.region,
                        city: hotel.city,
                        code_postal: hotel.code_postal,
                        country: hotel.country,
                        room: hotel.room,
                        standing: hotel.classement,
                        website: hotel.website,
                        phone: hotel.phone
                    })
                    setHotelName(hotel.hotelName)
                    setUrl(hotel.website)
                    setShowModalHotel(false)
                    setCheckoutButton(true)
                    }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        padding: 15, 
                        marginBottom: 30}}>
                            {/*<FontAwesome5 name="building" size={24} color="black" style={{marginRight: 10}} />*/}
                            <Text style={{fontSize: 15}}>
                                {hotel.hotelName}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    )) :
                    <View style={styles.container2}>
                        <Text style={{fontSize: 20, textAlign: "center", marginBottom: 60}}>{t("no_partenaire")}</Text>
                        <Text style={{fontSize: 15, textAlign: "center", marginBottom: 60}}>{t("msh_team_message")}</Text>
                        <Text style={{fontSize: 10, textAlign: "center", marginBottom: 60}}>{t("msh_team_message2")}</Text>
                        <Text style={{fontSize: 10, textAlign: "center", marginBottom: 60, fontWeight: "bold"}}>{t("msh_team_message3")}</Text>
                        <View>
                            <Button raised={true} onPress={() => setShowModalHotel(false)} containerStyle={styles.button} type="outlined" title={t("retour_recherche")} />
                            <Button raised={true} onPress={() => Logout()} containerStyle={styles.button2} title={t("deconnexion_information")} />
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
                    }}>{t("num_chbre")}</Text>
                    <Input 
                        placeholder={t("entre_num_chbre")} 
                        type="number" 
                        value={currentRoom !== "Numéro de chambre" ? currentRoom : ""} 
                        onChangeText={(text) => setCurrentRoom(text)} style={{textAlign: "center", marginBottom: 5}} />  
                    <Button raised={true} onPress={() => setShowModalRoom(false)} containerStyle={{width: 300, borderRadius: 20, marginBottom: 15}} title={t("validation")} />
                </View>
            </Modal>

            {showDate && handlePlatformDate()}
           
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
    container2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 25
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
        borderRadius: 30,
    },
    button2: {
        width: 350,
        marginTop: 10,
        borderRadius: 30,
        marginBottom: 30
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
        minHeight: 750

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
    datePicker: {
        width: 350,
        height: 260,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "white",
        marginTop: 200
    },
    datePickerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 55,
        backgroundColor: "white"
      },
    datePickerButton: {
    width: 250,
    marginTop: 50, 
    marginBottom: 90,
    borderColor: "white",
    marginTop: 100
    },
})