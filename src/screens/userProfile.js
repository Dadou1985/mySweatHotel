import React, { useLayoutEffect, useState, useContext, useEffect, useRef } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo, MaterialIcons, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { auth, db, storage } from "../../firebase"
import { UserContext } from '../components/userContext'
import moment from 'moment'
import { Button, Input, Overlay } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from "react-native-flash-message";
import ClickNwaitDrawer from '../components/ClickNwaitDrawer';



const UserProfile = ({navigation}) => {
    const [img, setImg] = useState(null)
    const [url, setUrl] = useState("")
    const [user, setUser] = useState(auth.currentUser)
    const {userDB, setUserDB} = useContext(UserContext)
    const [updateProfile, setUpdateProfile] = useState(false)
    const [updatePhoto, setUpdatePhoto] = useState(false)
    const [updateCheckout, setUpdateCheckout] = useState(false)
    const [email, setEmail] = useState('')
    const [date, setDate] = useState(new Date(Date.now()))
    const [room, setRoom] = useState(null)
    const [showDate, setShowDate] = useState(false)

    const Logout = async () => {
      await auth.signOut()
      .then(navigation.replace('Connexion'))
  }

  useLayoutEffect(() => {
      navigation.setOptions({
          headerRight: () => (
          <SimpleLineIcons 
          name="logout" 
          size={24} 
          color="white" 
          style={{marginRight: 20}}
          onPress={() => {
              Logout()
              setTimeout(() => {
                  showMessage({
                      message: "Vous venez de vous déconnecter !",
                      type: "info",
                    })
              }, 1000)
          }} />)
      })
  }, [])


    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
    
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImg(result.uri);
        setUpdatePhoto(true)    
      }

    };

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
       setShowDate(Platform.OS === 'ios');
       setDate(currentDate);
       if(userDB.checkoutDate !== moment(currentDate).format('L')) {
        setUpdateCheckout(true)
       }    
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
      }).then(() => {
        setRoom(userDB.room)
        setEmail(user.email)
        setUpdateProfile(false)
      })
  }

  const handleChangeEmail = () => {
    auth
    .signInWithEmailAndPassword(user.email, userDB.password)
    .then(function(userCredential) {
        userCredential.user.updateEmail(email)
    })
  }

    const handleSubmit = async() => {
      await handleChangeEmail()
      
      await db.collection("mySweetHotel")
        .doc("country")
        .collection("France")
        .doc("collection")
        .collection("customer")
        .doc("collection")
        .collection('users')
        .doc(user.displayName)
        .update({
          email: email,
          room: room,
        })

      await showMessage({
        messsage: "Votre profil a été actualisé avec succès !",
        type: "success"
      })

      return handleLoadUserDB()

    }

    const handleChangePhotoUrl = async() => {
      const response = await fetch(img)
      const blob = await response.blob()
      
      const uploadTask = storage.ref(`msh-photo-user/${user.displayName}`).put(blob)
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {console.log(error)},
          () => {
            storage
              .ref("msh-photo-user")
              .child(user.displayName)
              .getDownloadURL()
              .then(url => {
                const uploadTask = () => {
                  user.updateProfile({photoURL: url})
                  .then(() => navigation.replace('Home'))
                }
                  return setUrl(url, uploadTask())})
          }
        )
      } 
      

    const handleCheckoutDateChange = async() => {
      await db.collection("mySweetHotel")
      .doc("country")
      .collection("France")
      .doc("collection")
      .collection("customer")
      .doc("collection")
      .collection('users')
      .doc(user.displayName)
      .update({
        checkoutDate: date
      })

      await showMessage({
        message: "La date de votre check-out a été actualisée avec succès !",
        type: "success",
      })

      return handleLoadUserDB()     
    }

    const fadeAnim = useRef(new Animated.Value(-500)).current;

    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
      }).start();
    };
  
    const fadeOut = () => {
      Animated.timing(fadeAnim, {
        toValue: -500,
        duration: 1000,
      }).start();
    };
    
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <View style={{flex: 2, width: "100%"}}>
              <ImageBackground source={{uri: user.photoURL}} style={styles.image}>
              <TouchableOpacity style={{padding: 15}} onPress={pickImage}>
                    <MaterialIcons name="add-a-photo" size={35} color="grey" />                    
                  </TouchableOpacity>
              </ImageBackground>
            </View>
            <View style={{flex: 2, flexDirection: "column", width: "100%", padding: 10, alignItems: "center"}}>
              <Text style={{fontSize: 30, fontWeight: "bold", marginBottom: 20}}>{user.displayName}</Text>
              <Text style={{fontSize: 20, marginBottom: 20}}>{userDB.hotelName}</Text>
              <View style={{flexDirection: "row", justifyContent: "space-around", width: "70%"}}>
              <Text style={{fontSize: 15, marginBottom: 10}}>Vous occupez la chambre {userDB.room}</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => setUpdateProfile(true)}>
                  <Ionicons name="pencil-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: "row", justifyContent: "space-around", width: "80%"}}>
                <Text style={{fontSize: 14, marginBottom: 20}}>Check-out prévu pour le {moment(userDB.checkoutDate).format('LL')}</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {setShowDate(true)}}>
                  <Ionicons name="pencil-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: "row", justifyContent: "space-around", width: "100%", marginTop: 25, marginBottom: 25}}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Chat')}>
                  <Entypo name="chat" size={40} color="black" />            
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5}  onPress={() => navigation.navigate('Délogement')}>
                    <MaterialIcons name="room-preferences" size={45} color="black" />                
                </TouchableOpacity>            
                <TouchableOpacity activeOpacity={0.5}  onPress={() => navigation.navigate('Maintenance')}>
                    <Image source={{uri: "https://static.thenounproject.com/png/41655-200.png"}} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}  onPress={() => navigation.navigate('Réveil')}>
                    <Image source={{uri: "https://image.flaticon.com/icons/png/512/62/62834.png"}} style={styles.img} />
                </TouchableOpacity>           
                <TouchableOpacity activeOpacity={0.5}  onPress={() => navigation.navigate('Taxi')}>
                    <Image source={{uri: "https://cdn2.iconfinder.com/data/icons/car-11/100/taxi3-512.png"}} style={styles.img} />
                </TouchableOpacity>
              </View>
              <Button title="Utiliser le service Click & Wait" type="clear" onPress={fadeIn} /> 
              <ClickNwaitDrawer fadeAnim={fadeAnim} fadeOut={fadeOut} />
            </View>

            <Overlay isVisible={updateProfile} onBackdropPress={() => setUpdateProfile(false)}>
              <View style={{width: "100%", flexDirection: "column", alignItems: "center", padding: 10}}>
                <Text style={{fontSize: 30, fontWeight: "bold", marginBottom: 20}}>Actualisation du profil</Text>
                <View style={styles.inputContainer}>
                  <Text>Email</Text>
                  <Input placeholder="Email" type="email" value={email} 
                  onChangeText={(text) => setEmail(text)} />
                  <Text>Numéro de chambre</Text>
                  <Input placeholder="Numéro de chambre" type="number" value={room} 
                  onChangeText={(text) => setRoom(text)} />
                </View>
                <Button title="Actualiser maintenant" containerStyle={styles.button} onPress={handleSubmit} />
              </View>
            </Overlay>

            <Overlay isVisible={updatePhoto} onBackdropPress={() => setUpdatePhoto(false)}>
              <View style={{width: "80%"}}>
                <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 18, marginBottom: 15}}>Etes-vous sûr.e de vouloir changer ma photo de profil</Text>
                <Button title="Confirmer" style={{marginTop: 1, marginBottom: 1}} onPress={(event) => {
                  handleChangePhotoUrl(event)
                  setUpdatePhoto(false)
                  showMessage({
                    message: "Votre photo de profil a été actualisée avec succès !",
                    type: "success",
                  })
                }} />
                <View>
                  <Text style={{ fontSize: 10, textAlign: "center"}}>Vous serez redirigez vers l'écran d'accueil à l'issue de cette opération</Text>
                </View>
              </View>
            </Overlay>

            <Overlay isVisible={updateCheckout} onBackdropPress={() => setUpdateCheckout(false)}>
              <View style={{width: "80%"}}>
                <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 18, marginBottom: 15}}>Etes-vous sûr.e de vouloir changer la date de votre check-out</Text>
                <Button title="Confirmer" style={{marginTop: 1, marginBottom: 1}} onPress={() => {
                  handleCheckoutDateChange()
                  setUpdateCheckout(false)
                }} />
              </View>
            </Overlay>

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

export default UserProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  button: {
    width: 200,
    marginTop: 10,
    borderRadius: 3
  },
  inputContainer: {
    width: 300
  },
  img: {
      width: 40,
      height: 40,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  }
})
