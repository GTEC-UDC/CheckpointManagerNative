import React from "react";

import {Picker} from '@react-native-picker/picker';
import { Text, View } from 'react-native';



export default function RouteSelector({routes, currentRoute, setCurrentRoute, setCurrentCheckpoints, setCurrentCheckpoint}) {
    const handleChange = (itemValue, itemIndex) => {
                let route = itemValue;
                setCurrentRoute(route);
                setCurrentCheckpoints(route.points);
                setCurrentCheckpoint({point:route.points[0], index:0});
      };

  return (
        <View>
            <Text id="label-ruta">Route</Text>
            <Picker
            labelId="label-ruta"
            id="select-ruta"
            value={currentRoute}
            name ="route"
            onChange={handleChange}
            >
            {routes.map((ob, i) => (<Picker.Item label={ob.tag} value={ob} key={ob.tag}/>))}
            </Picker>
        </View>
  );
}