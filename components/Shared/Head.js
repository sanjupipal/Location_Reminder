import React from 'react';
import {StyleSheet , Text,View,Image, ImageBackground} from 'react-native';

export default function Header(){
    return(
        <ImageBackground source={require('/home/sanju/Location_Reminder/components/Shared/logo.jpeg')} style ={styles.head}>

            <View >            
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    head:{
        width:'100%' ,
        height:'100%',
        flexDirection:'row', 
        justifyContent:'center',
        alignItems:'center'     
        
    },
});