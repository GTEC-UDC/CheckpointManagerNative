import React, { useState} from "react";
import { Text, View, StyleSheet} from 'react-native';
import client from '../feather';
import { useForm, Controller } from "react-hook-form";
import {TextInput, Button} from 'react-native-paper';

import {useSettings} from '../context/SettingsState';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

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
  button: {
    color: 'white',
    height: 100,
    backgroundColor: '#ec5990',
    borderRadius: 4,
    margin: 40
  },
  container: {
    flex: 3,
    justifyContent: 'center',
    padding: 8,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column"
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    height: 50,
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
  }});

export default function SettingsPage({navigation}) {

  const { control, handleSubmit, formState: { errors } } = useForm();

  const {endpoint, uuid} = useSettings();
  
  const [endpointUrl, SetEndpointUrl] = endpoint;
  const [bleUUID, setBleUUID] = uuid;



  return (
    //<Container component="main" maxWidth="xs">
      <View style={styles.mainContainer}>
        <View style={{margin:60}}>
        <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={() => (
          <TextInput
            style={styles.input}
            onChangeText={SetEndpointUrl}
            value={endpointUrl}
            mode="outlined"
            label="Endpoint"
          />
        )}
        name="Endpoint"
        defaultValue="http://10.0.2.2:3031"
      />

      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={() => (
          <TextInput
            style={styles.input}
            onChangeText={setBleUUID}
            value={bleUUID}
            mode="outlined"
            label="BLE UUID"
          />
        )}
        name="BLE UUID"
        defaultValue="D7F8B7E3-559A-4AF8-8715-3A56C4030F64"
      />
      </View>
      </View>
  );
}