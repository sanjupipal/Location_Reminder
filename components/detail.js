import React, {useState, Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    AsyncStorage,
    Button,
    TextInput,
    Keyboard,
    Platform,
    ImageBackground
} from "react-native";
import {MaterialIcons } from '@expo/vector-icons';

const isAndroid = Platform.OS == "android";
const viewPadding = 80;

export default class Detail extends Component {
    state = {
        text: null,
        schedule: {},
        location: {}
    };
    
    componentDidMount() {
        console.log('detail mounting');
        const params = this.props.route.params;
        console.log('detail picked: ', params);
        this.setState({...params});  
    }
  
    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.text}>  
                {this.state.text}
                </Text>            
            <Text style={styles.inlineText} >
               <MaterialIcons name="date-range" size={60} /> {this.state.schedule.date}
                </Text>                
            <Text style={styles.inlineText} >
            <MaterialIcons name="update" size={60} />{this.state.schedule.startTime}
                </Text>
            <Text style={styles.inlineText} >
            <MaterialIcons name="update" size={60} /> {this.state.schedule.endTime}
                </Text>
                <Text style={styles.inlineText} >
                <MaterialIcons name="location-on" size={60} /> {this.state.location.name}
                </Text>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F3F4",
        padding: viewPadding,
        paddingTop: 20,
        flexDirection:'column',
    },
    text:{
        flex:1,
        fontSize:25,
        
    },
    inlineText:{
        flex:1,
        fontStyle:'italic',
        fontSize:25,
        // borderBottomWidth:1,
        // marginBottom:60,
        borderRadius:6,
        elevation:3,
        backgroundColor:'#fff',
        shadowOffset:{width:1,height:1},
        shadowColor:0.3,
        shadowRadius:2,
        marginHorizontal:4,
        marginVertical:6,

    }
    
});
