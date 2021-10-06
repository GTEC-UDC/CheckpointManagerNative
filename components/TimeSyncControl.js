import React, { useState} from "react";
import { View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

export default function TimeSyncControl({navigation, httpClient}) {
  
    const [seq, setSeq] = useState("0");
    const [timeSent, setTimeSent] = useState(false);
  

    let tagButton = "Time Sync";
    let colorButton = "blue";
    let nameButton = "sync";
    let heightButton = 30;
    let fontSizeButton = 10;
    let marginTopButton = 10;


      const handleClick = (name) => {
        console.log("Button clicked");
         switch (name) {
              case "sync":
                  let timeSync = {};
                  timeSync.timestamp = Date.now();
                  timeSync.seq = seq;
                    setTimeSent(false);
                  httpClient.service('timesyncs').create(timeSync).then(() => {
                      console.log("Timesync saved");
                      setTimeSent(true);
                    }).catch((err) => {
                        //Maybe not authentication
                        navigation.navigate("Login");
                        console.log(err);
                    });
                  break;
             default:
                 break;      
         };
        };
  
      return (
          <View>
            <Button
              mode="contained"
              color={colorButton}
              name={nameButton}
              style={{ marginTop:marginTopButton}}
              contentStyle={{height:heightButton, alignContent:'center', alignItems:'center'}}
              labelStyle={{fontSize:fontSizeButton}}
              onPress={()=>handleClick(nameButton)}
            >
            {tagButton}
            </Button>
                <TextInput
                onChangeText={setSeq}
                value={seq}
                mode="outlined"
                label="Time sync sequence number"
            />
            { !timeSent ?
            <View></View>
            :
            <Text>Time Sync Sent</Text>}
          </View>
      );
    }