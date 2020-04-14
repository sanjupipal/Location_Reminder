import React from 'react';
import {StyleSheet , Text,View} from 'react-native';

export default function Card(props){
    return(
        <View style ={styles.card}>

            <View style={styles.cardecontent} >
            {props.childern} 
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card:{
       borderRadius:6,
       elevation:3,
       backgroundColor:'#fff',
       shadowOffset:{width:1,height:1},
       shadowColor:0.3,
       shadowRadius:2,
       marginHorizontal:4,
       marginVertical:6,
    },
    cardecontent:{
        marginHorizontal:18,
        marginVertical:10,

    }
});