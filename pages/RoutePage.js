import React, { useState, useEffect } from "react";
import RouteSelector from '../components/RouteSelector';
import CheckpointSelector from '../components/CheckpointSelector';
import CheckpointInfo from '../components/CheckpointInfo';
import RouteControl from "../components/RouteControl";
import RouteCheckpointControl from "../components/RouteCheckpointControl";
import {getClient} from '../feather';
import { Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useIsLogged} from '../context/IsLoggedState';
import {useSettings} from '../context/SettingsState';
import {useHttpClient} from '../context/HTTPClientState';



export default function RoutePage({navigation}) {


    const [routes, setRoutes] = useState([]);
    const [routeStarted, setRouteStarted] = useState(false);
    const [currentRoute, setCurrentRoute] = useState({});
    const [currentCheckpoints, setCurrentCheckpoints] = useState([]);
    const [currentCheckpoint, setCurrentCheckpoint] = useState({point:undefined, index:0});

    const [currentPath, setCurrentPath] = useState({routeTag:currentRoute.tag, checkpoints:[]});
    const [indexCheckpoint, setIndexCheckpoint] = useState(currentCheckpoint.index);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showConfirmStop, setShowConfirmStop] = useState(false);
    const [reachedEndRoute, setReachedEndRoute] = useState(false);

    const [isLogged, setIsLogged] = useIsLogged();

    const {endpoint, uuid} = useSettings();
  
    const [endpointUrl, SetEndpointUrl] = endpoint;
    const [bleUUID, setBleUUID] = uuid

    const [httpClient, setHttpClient] = useHttpClient();

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
        padding: 0,
      },
      mainContainer: {
        flex: 1,
        flexDirection: "column",
        margin:40
      },
      input: {
        backgroundColor: 'white',
        borderColor: 'transparent',
        height: 50,
        padding: 10,
        marginBottom: 20,
        borderRadius: 4,
      }});
    


    useEffect(() => {
      httpClient.service('routes').find({}).then((routes) => {
            console.log(routes.data);
            setRoutes(routes.data);
            setCurrentRoute(routes.data[0]);
            setCurrentCheckpoints(routes.data[0].points)
            setCurrentCheckpoint({point:routes.data[0].points[0], index:0});
            setCurrentPath({routeTag:routes.data[0].tag, checkpoints:[]})
            setCurrentIndex(0);
            setIndexCheckpoint(0);
          }).catch((err) => {
              //Maybe not authentication
              navigation.navigate('Login');
              console.log(err);
          });
    }, []);

    useEffect(() => {
     if (!isLogged){
      navigation.navigate('Login');
     }
    }, [isLogged]);

    

    return (

      <ScrollView>

          { routeStarted || reachedEndRoute? 
        <View style={styles.mainContainer}>
                <RouteControl
                  navigation ={navigation}
                  routeStarted={routeStarted}
                  setRouteStarted={setRouteStarted}
                  currentRoute={currentRoute}
                  currentCheckpoints={currentCheckpoints} 
                  currentCheckpoint={currentCheckpoint}
                  setCurrentCheckpoint={setCurrentCheckpoint}
                  currentPath={currentPath}
                  setCurrentPath={setCurrentPath}
                  indexCheckpoint={indexCheckpoint}
                  setIndexCheckpoint={setIndexCheckpoint}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  showConfirmStop={showConfirmStop}
                  setShowConfirmStop={setShowConfirmStop}
                  reachedEndRoute={reachedEndRoute}
                  setReachedEndRoute={setReachedEndRoute}
                  httpClient={httpClient}
                  bleUUID={bleUUID}
                  />

                <View>
                <CheckpointInfo 
                currentCheckpoint={currentCheckpoint}/>
                </View>
                {showConfirmStop?
                    <View item />
                  :
                  <RouteCheckpointControl
                    routeStarted={routeStarted}
                    setRouteStarted={setRouteStarted}
                    currentRoute={currentRoute}
                    currentCheckpoints={currentCheckpoints} 
                    currentCheckpoint={currentCheckpoint}
                    setCurrentCheckpoint={setCurrentCheckpoint}
                    currentPath={currentPath}
                    setCurrentPath={setCurrentPath}
                    indexCheckpoint={indexCheckpoint}
                    setIndexCheckpoint={setIndexCheckpoint}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    showConfirmStop={showConfirmStop}
                    setShowConfirmStop={setShowConfirmStop}
                    reachedEndRoute={reachedEndRoute}
                    setReachedEndRoute={setReachedEndRoute}
                    />

                }
                </View>
              :
              <View style={styles.mainContainer}>
              <RouteSelector 
                  routes={routes} 
                  currentRoute={currentRoute} 
                  setCurrentRoute={setCurrentRoute}
                  setCurrentCheckpoints={setCurrentCheckpoints}
                  setCurrentCheckpoint={setCurrentCheckpoint} />
              <RouteControl
                  navigation ={navigation}
                  routeStarted={routeStarted}
                  setRouteStarted={setRouteStarted}
                  currentRoute={currentRoute}
                  currentCheckpoints={currentCheckpoints} 
                  currentCheckpoint={currentCheckpoint}
                  setCurrentCheckpoint={setCurrentCheckpoint}
                  currentPath={currentPath}
                  setCurrentPath={setCurrentPath}
                  indexCheckpoint={indexCheckpoint}
                  setIndexCheckpoint={setIndexCheckpoint}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  showConfirmStop={showConfirmStop}
                  setShowConfirmStop={setShowConfirmStop}
                  reachedEndRoute={reachedEndRoute}
                  setReachedEndRoute={setReachedEndRoute}
                  httpClient={httpClient}
                  bleUUID={bleUUID}
                  />
              </View>
          }
        
        </ScrollView>

    );
}