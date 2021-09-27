import React, { useState, useEffect } from 'react';
import client from '../feather';
import {Button} from 'react-native-paper';
import { Text, View } from 'react-native';



  
export default function RouteControl({navigation, routeStarted, setRouteStarted, currentRoute, 
  currentCheckpoints, currentCheckpoint, setCurrentCheckpoint,
  currentPath, setCurrentPath, indexCheckpoint, setIndexCheckpoint,
  currentIndex, setCurrentIndex,showConfirmStop, setShowConfirmStop, reachedEndRoute, setReachedEndRoute, httpClient}) {

    let tagButtonStart, colorButtonStart, nameButtonStart, heightButtonStart, fontSizeButtonStart, marginTopButtonStart;

    if (routeStarted){
        tagButtonStart = "Stop";
        colorButtonStart = "red";
        nameButtonStart = "stop";
        heightButtonStart = 40;
        fontSizeButtonStart = 20;
        marginTopButtonStart = 0;
    } else {
        tagButtonStart = "Start";
        colorButtonStart = "green";
        nameButtonStart = "start";
        heightButtonStart = 100;
        fontSizeButtonStart = 40;
        marginTopButtonStart = 40;
    }


    const handleClick = (name) => {
      console.log("Button clicked");
       switch (name) {
            case "start":
                setReachedEndRoute(false);
                setRouteStarted(true);

                break;
            case "stop":
                setShowConfirmStop(true);
                break;
            case "cancel":
                 setShowConfirmStop(false);
                break;
            case "confirm_stop":
                setReachedEndRoute(false);
                setRouteStarted(false);
                setShowConfirmStop(false);
                httpClient.service('paths').create(currentPath).then(() => {
                    console.log("Path saved");
                    setCurrentPath({routeTag:currentRoute.tag, routeId:currentRoute._id, checkpoints:[]});
                    setCurrentCheckpoint({point:currentRoute.points[0], index:0});
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
  




      if (showConfirmStop && reachedEndRoute){
        return (
          <View>
                <Button
                mode="outlined"
                name="confirm_stop"
                onPress={()=>handleClick("confirm_stop")}
                >
                Stop
                </Button>
          </View>);
      };

      if (showConfirmStop){
        return (
        
        <View>
            <Button
            mode="outlined"
            name="cancel"
            onPress={()=>handleClick("cancel")}
            >
            Cancel
        </Button>
        <Button
            mode="outlined"
            name="confirm_stop"
            onPress={()=>handleClick("confirm_stop")}
            >
            Yes, stop
            </Button>
        </View>);
      };

    return (
        <View>
          <Button
            mode="contained"
            color={colorButtonStart}
            name={nameButtonStart}
            style={{ marginTop:marginTopButtonStart}}
            contentStyle={{height:heightButtonStart, alignContent:'center', alignItems:'center'}}
            labelStyle={{fontSize:fontSizeButtonStart}}
            onPress={()=>handleClick(nameButtonStart)}
          >
          {tagButtonStart}
          </Button>
        </View>
    );
  }