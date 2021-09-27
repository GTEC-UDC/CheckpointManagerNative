import React, { useState, useEffect } from 'react';
import {Button} from 'react-native-paper';
import { Text, View } from 'react-native';

  
export default function RouteCheckpointControl({routeStarted, setRouteStarted, currentRoute, 
  currentCheckpoints, currentCheckpoint, setCurrentCheckpoint,
  currentPath, setCurrentPath,
  currentIndex, setCurrentIndex,showConfirmStop, setShowConfirmStop, reachedEndRoute, setReachedEndRoute}) {

    // useEffect(() => {
    //     if (!routeStarted){
    //         setIndexCheckpoint(currentCheckpoint.index);
    //         setCurrentIndex(0);
    //         //setCurrentPath({routeTag:currentRoute.tag, routeId:currentRoute._id, checkpoints:[]});
    //     }
    // }, [currentCheckpoint, routeStarted, currentRoute]);





    const handleClick = () => {
               let newPath = currentPath;
               let ts = Math.floor(Date.now() / 1000)
               let indexCheckpoint = currentCheckpoint.index;
              newPath.routeTag = currentRoute.tag;
              newPath.routeId = currentRoute._id;
              //let floor = currentCheckpoints[indexCheckpoint].floor ? currentCheckpoints[indexCheckpoint].floor : "";
              //  newPath.checkpoints[currentIndex] = {
              //    tag:currentCheckpoints[indexCheckpoint].tag, 
              //    x:currentCheckpoints[indexCheckpoint].x,
              //    y:currentCheckpoints[indexCheckpoint].y,
              //    floor:floor,
              //    timestamp:ts};

                 newPath.checkpoints[currentIndex] = {
                  id:currentCheckpoints[indexCheckpoint]._id,
                  timestamp:ts};
               setCurrentPath(newPath);
               console.log(currentPath);
               if ((indexCheckpoint + 1) >= currentCheckpoints.length){
                  setRouteStarted(false);
                  setShowConfirmStop(true);
                  setCurrentCheckpoint({point:{tag:"END", x:0, y:0, floor:"-"}, index:0});
                  setReachedEndRoute(true)
               } else {
                 console.log("CurrentIndex: " + currentIndex);
                  
                  setCurrentCheckpoint({point:currentCheckpoints[currentIndex + 1], index:currentIndex + 1});
                  setCurrentIndex(currentIndex+1);
               }
      };
  

    return (
        <View>
            <Button
              mode="contained"
              onPress={handleClick}
              name="checkpoint"
              disabled={!routeStarted}
              style={{ marginTop:50}}
              contentStyle={{height:150, alignContent:'center', alignItems:'center'}}
              labelStyle={{fontSize:40, color: 'white'}}
            >
              Checkpoint
            </Button>
        </View>
    );
  }