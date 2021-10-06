import React, { useState, useEffect} from "react";
import { Text, View, StyleSheet, PermissionsAndroid} from 'react-native';
import {getClient} from '../feather';
import { useForm, Controller } from "react-hook-form";
import {TextInput, Button} from 'react-native-paper';

import {useIsLogged} from '../context/IsLoggedState';
import {useSettings} from '../context/SettingsState';
import {useHttpClient} from '../context/HTTPClientState';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { withTheme } from 'react-native-paper';
import Beacons from 'react-native-beacons-manager';
  

const styles = StyleSheet.create({
  avatar: {
    margin: 10,
    borderRadius: 4
  },
  label: {
    color: 'black',
    width: '100%',
    textAlign: 'center',
    fontSize:30
  },
  labelError: {
    color: 'red',
    width: '100%',
    textAlign: 'center',
    fontSize:18,
    marginTop:30
  },
  button: {
    color: 'white',
    borderRadius: 4
  },
  container: {
    flex: 3,
    justifyContent: 'center',
    padding: 8,
    
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'blue',
    color: 'black',
    height: 50,
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
  }});

export function LoginPage({navigation}) {

  const { control, handleSubmit, formState: { errors } } = useForm();

  const [isLogged, setIsLogged] = useIsLogged();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const [isTryingLogging, setIsTriyingLoggin] = useState(false);

  const {endpoint, uuid} = useSettings();
  
  const [endpointUrl, SetEndpointUrl] = endpoint;
  const [bleUUID, setBleUUID] = uuid;

  const [httpClient, setHttpClient] = useHttpClient();


  useEffect(() => {
    setHttpClient(getClient(endpointUrl));
}, [endpointUrl]);

    useEffect(() => {
      if (Platform.OS=="ios"){
        
        //Beacons.startMonitoringForRegion(region);
        
        //Beacons.startUpdatingLocation();

       Beacons.BeaconsEventEmitter.addListener(
          'authorizationStatusDidChange',
          (info) => console.log('authorizationStatusDidChange: ', info)
       );

       Beacons.requestWhenInUseAuthorization();
      } else {
        //ANDROID
        try {
          const granted = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                  'title': 'Location Permission',
                  'message': 'We need to access location to scan the beacons.'
              }
          )
          console.log('here', granted);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("Location Permitted")
          } else {
              console.log("Location permission denied")
          }
      } catch (err) {
          console.warn(err)
      }
      }
  }, []);



  const clickLogin = () => {
    console.log("Clicked login");
    setHasError(false);
    setIsTriyingLoggin(true);
    
    httpClient.authenticate({
      strategy: 'local',
      email, password
    }).then((login)=>{
      console.log("Push route");
      setIsTriyingLoggin(false);
      setIsLogged(true);
      navigation.navigate('Route')
      
    }).catch(error => {
      console.log(error);
      setIsTriyingLoggin(false);
      setHasError(true);});
  };

  let errorMessage;

  if (hasError){
    errorMessage = <Text style={styles.labelError}>Wrong email or password</Text>;
  } else {
    errorMessage = <Text></Text>;
  }
  return (
    //<Container component="main" maxWidth="xs">
      <View style={styles.mainContainer}>
        <View style={{margin:60}}>
        <Text style={styles.label}>
              Login
        </Text>
        <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={() => (
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            mode="outlined"
            label="Email"
            disabled={isTryingLogging}
          />
        )}
        name="email"
        defaultValue=""
      />

      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={() => (
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            mode="outlined"
            label="Password"
            secureTextEntry={true}
            disabled={isTryingLogging}
          />
        )}
        name="password"
        defaultValue=""
      />

       <Button icon="login" mode="contained" labelStyle={{color:'white'}} onPress={clickLogin} loading={isTryingLogging} disabled={isTryingLogging}>
          Sign In
       </Button>
          {errorMessage}
      </View>
      </View>
  );
}


export default withTheme(LoginPage);