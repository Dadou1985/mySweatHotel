import 'react-native-gesture-handler';
import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/login'
import RegisterScreen from './src/screens/Register'
import HomeScreen from './src/screens/Home'
import ChatScreen from './src/screens/chat'
import RoomChangeScreen from './src/screens/RoomChange'
import MaintenanceScreen from './src/screens/maintenance'
import TimerScreen from './src/screens/Timer'
import TaxiScreen from './src/screens/Taxi'
import Information from './src/screens/Information'
import UserProfileScreen from './src/screens/userProfile'
import FlashMessage from "react-native-flash-message";

import { UserContext } from './src/components/userContext'

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: "lightblue"},
  headerTitleStyle: {color: "white"},
  headerTintColor: "white"
}

export default function App() {
  const [userDB, setUserDB] = useState(null)



  return (
    <UserContext.Provider value={{userDB, setUserDB}}>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Connexion"
        screenOptions={globalScreenOptions}>
            <Stack.Screen name="Connexion" component={LoginScreen} />
            <Stack.Screen name="Inscription" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Délogement" component={RoomChangeScreen} />
            <Stack.Screen name="Maintenance" component={MaintenanceScreen} />
            <Stack.Screen name="Réveil" component={TimerScreen} />
            <Stack.Screen name="Taxi" component={TaxiScreen}/>
            <Stack.Screen name="Information" component={Information} />
            <Stack.Screen name="Portail utilisateur" component={UserProfileScreen} />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    </UserContext.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
