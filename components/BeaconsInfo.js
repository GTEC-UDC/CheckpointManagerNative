import React from "react";
import { DataTable } from 'react-native-paper';
import { Text, View,ScrollView } from 'react-native';



export default function BeaconsInfo({lastBeacons}) {

  return (
      <ScrollView>
        <View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Major</DataTable.Title>
                    <DataTable.Title numeric>RSSI</DataTable.Title>
                    <DataTable.Title numeric>Battery</DataTable.Title>
                </DataTable.Header>
            {lastBeacons.map((ob, i) => (
                <DataTable.Row key={i}>
                    <DataTable.Cell numeric>{ob.major}</DataTable.Cell>
                    <DataTable.Cell numeric>{ob.rssi}</DataTable.Cell>
                    <DataTable.Cell numeric>{ob.battery}</DataTable.Cell>
                </DataTable.Row>
            ))}
            </DataTable>
        </View>
        </ScrollView>
  );
}