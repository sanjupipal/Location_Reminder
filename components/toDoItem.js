import React from 'react';
import {StyleSheet, Text ,TouchableOpacity,View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TodoItem({ item, pressHandler }){
    return(
        <View style ={styles.item}> 
        <Text style = {styles.itemText}>{item.text}</Text>
        <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <View style ={styles.element}>  
                <MaterialIcons name='delete' size={22} color='red'/> 
            </View>            
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        padding: 6,
        marginTop: 16,
        //borderColor: '#bbb',
        //borderWidth: 1,
       // borderStyle: 'dashed',
       // borderRadius: 10,
        //flexDirection: '',
         
    },
    itemText: {
        marginLeft:20, 
        fontSize: 18,
    },
    element:{ 
        marginLeft:100,
        alignSelf:"flex-end",
        padding: 1,
        marginTop: 1,
        borderColor: 'pink',
        borderWidth: 1,
    }
})