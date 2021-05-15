import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer, NavigationAction } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/login'
import RegisterScreen from './src/screens/Register'
import ChatScreen from './src/screens/chat'
import RoomChangeScreen from './src/screens/RoomChange'
import MaintenanceScreen from './src/screens/maintenance'
import TimerScreen from './src/screens/Timer'
import TaxiScreen from './src/screens/Taxi'
import Information from './src/screens/Information'
import UserProfileScreen from './src/screens/userProfile'
import FlashMessage from "react-native-flash-message"

import { UserContext } from './src/components/userContext'

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerTitleStyle: {color: "black"},
  headerTintColor: "black"
}

export default function App() {
  const [userDB, setUserDB] = useState(null)

  return (
    <>
    <UserContext.Provider value={{userDB, setUserDB}}>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Connexion"
        screenOptions={globalScreenOptions}
        >
            <Stack.Screen name="Connexion" component={LoginScreen} options={{headerLeft: null}} />
            <Stack.Screen name="Inscription" component={RegisterScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Délogement" component={RoomChangeScreen} />
            <Stack.Screen name="Maintenance" component={MaintenanceScreen} />
            <Stack.Screen name="Réveil" component={TimerScreen} />
            <Stack.Screen name="Taxi" component={TaxiScreen}/>
            <Stack.Screen name="Information" component={Information} />
            <Stack.Screen name="My Sweet Hotel" component={UserProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
    <FlashMessage position="top" />
    </>
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
