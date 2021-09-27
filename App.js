// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { StatusBar } from 'expo-status-bar';
//import './App.css';

import React, { useState } from "react";

import LoginPage from './pages/LoginPage';
import RoutePage from './pages/RoutePage';
import SettingsPage from './pages/SettingsPage';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Button} from 'react-native-paper';


import {IsLoggedProvider} from './context/IsLoggedState';
import {SettingsProvider} from './context/SettingsState';
import {HttpClientProvider} from './context/HTTPClientState';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

function App() {

  const Stack = createNativeStackNavigator();

  return (
    <SettingsProvider value={{endpoint:"http://10.0.2.2:3031",uuid:"D7F8B7E3-559A-4AF8-8715-3A56C4030F64"}}>
      <HttpClientProvider>
    <IsLoggedProvider>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginPage}   options={({ navigation, route }) => ({
              headerRight: () => (
                <Button
                  onPress={() => navigation.push('Settings')}
                  icon="cog"
                  title="Info"
                  mode="contained"
                  labelStyle={{color:'white'}}
                >Settings</Button>
              )})} />
            <Stack.Screen name="Route" component={RoutePage} />
            <Stack.Screen name="Settings" component={SettingsPage} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </IsLoggedProvider>
    </HttpClientProvider>
    </SettingsProvider>

  );
}

export default App;