import React from 'react';
import {StyleSheet, Text , View} from 'react-native';

export default function header(){
    
   return(
    <View style={styles.header}>
    <Text style={styles.title}>Reminders</Text>
    </View>
   )
}
const styles = StyleSheet.create({
    header:{
        height:80,
        paddingTop:38,
        backgroundColor: 'skyblue'
    },
    title:{
        textAlign: 'center',
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textShadowColor:"black"
    }
});