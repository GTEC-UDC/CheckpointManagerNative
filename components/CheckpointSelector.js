import React from "react";
import {Picker} from '@react-native-picker/picker';
import { Text, View } from 'react-native';


export default function CheckpointSelector({currentCheckpoints, setCurrentCheckpoint, currentIndex, setCurrentIndex}) {

    const handleChange =(itemValue, itemIndex) => {
        setCurrentIndex(itemIndex);
        setCurrentCheckpoint({point:currentCheckpoints[itemValue], index:itemIndex});
      };

  return (

        <View>
            <Text id="label-checkpoint">Start point</Text>
            <Picker
                selectedValue={currentIndex}
                onValueChange={handleChange}>
                {currentCheckpoints.map((ob, i) => (<Picker.Item label={ob.tag} value={i} key={ob.tag}/>))}
            </Picker>
        </View>

  );
}