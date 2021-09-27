import React from "react";
import { Card, Title, Paragraph } from 'react-native-paper';

export default function CheckpointInfo({currentCheckpoint}) {
    
    let tag;

    if (currentCheckpoint.point!==undefined){
        tag = currentCheckpoint.point.tag;
    } else {
        tag = "--";
    }


  return (

        <Card elevation={3} style={{alignItems:'center', alignContent:'center', justifyContent:'center', flexWrap:'wrap'}}>
        <Card.Content style={{height:150, paddingHorizontal:0}}>
        <Paragraph style={{fontSize:20, textAlign:'center'}}>
            Next
        </Paragraph>
        <Title style={{fontSize:50, padding:40}}>
            {tag}
        </Title>
        </Card.Content>
    </Card>

  );
}