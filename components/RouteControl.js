import React, { useState, useEffect} from "react";
import {Button} from 'react-native-paper';
import {View, DeviceEventEmitter, Platform} from 'react-native';

import Beacons from 'react-native-beacons-manager';
  
export default function RouteControl({navigation, routeStarted, setRouteStarted, currentRoute, 
  currentCheckpoints, currentCheckpoint, setCurrentCheckpoint,
  currentPath, setCurrentPath, indexCheckpoint, setIndexCheckpoint,
  currentIndex, setCurrentIndex,showConfirmStop, setShowConfirmStop, reachedEndRoute, setReachedEndRoute, httpClient, bleUUID, setLastBeacons}) {


    const region = {
      identifier: 'Beacons',
      uuid: bleUUID
    };

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

    useEffect(() => {
      if (!routeStarted){
      if (Platform.OS=="android") {
        Beacons.detectIBeacons();
      console.log("Setting Andoird beacon ranging listener");
      DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
        console.log('Found beacons!', data.beacons);
        setLastBeacons(data.beacons.map((aBeacon)=>{
          aBeacon.battery =(aBeacon.minor & 0XFF00) >> 8;
          return aBeacon;
        }));
        if (data.beacons.length>0){
          console.log('Found beacons!', data.beacons)
          httpClient.service('beaconreports').create({scans:data.beacons}).then(() => {
            console.log("Beacon Report saved");
          }).catch((err) => {
              console.log(err);
          });
        }
      });
    } else {
      console.log("Setting IOS beacon ranging listener");
      Beacons.BeaconsEventEmitter.addListener('beaconsDidRange', (data) => {
        setLastBeacons(data.beacons.map((aBeacon)=>{
          aBeacon.battery =(aBeacon.minor & 0XFF00) >> 8;
          return aBeacon;
        }));
        if (data.beacons.length>0){
          console.log('Found beacons!', data.beacons)
          httpClient.service('beaconreports').create({scans:data.beacons}).then(() => {
            console.log("Beacon Report saved");
          }).catch((err) => {
              console.log(err);
          });
        }
      });
    }
  }

  }, []);


  navigation.addListener('beforeRemove', (e) => {
      if (reachedEndRoute==false && routeStarted==true){

        Beacons.stopRangingBeaconsInRegion(region).then(()=>{
          console.log('Beacons ranging stopped succesfully!');
        }).catch((err)=>{
          console.log('Beacons ranging not stopped, error: ${err}');
        });

        if (Platform.OS=="android") {
          DeviceEventEmitter.removeAllListeners('beaconsDidRange');
        } else {
          Beacons.BeaconsEventEmitter.removeAllListeners('beaconsDidRange');
        }

      }
  });


    const handleClick = (name) => {
      console.log("Button clicked");
       switch (name) {
            case "start":
                setReachedEndRoute(false);
                setRouteStarted(true);
                  Beacons.startRangingBeaconsInRegion(region).then(()=>{
                    console.log('Beacons ranging started succesfully! in region ' + JSON.stringify(region));
                  }).catch((err)=>{
                    console.log('Beacons ranging not started, error: ${err}');
                  });

                break;
            case "stop":
                setShowConfirmStop(true);
                break;
            case "cancel":
                 setShowConfirmStop(false);
                break;
            case "confirm_stop":
                  Beacons.stopRangingBeaconsInRegion(region).then(()=>{
                    console.log('Beacons ranging stopped succesfully!');
                  }).catch((err)=>{
                    console.log('Beacons ranging not stopped, error: ${err}');
                  });

                  if (Platform.OS=="android") {
                    DeviceEventEmitter.removeAllListeners('beaconsDidRange');
                  } else {
                    Beacons.BeaconsEventEmitter.removeAllListeners('beaconsDidRange');
                  }

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