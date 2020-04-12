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
    Platform,TouchableOpacity,
    PermissionsAndroid
} from "react-native";
import { Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import PushNotification from 'react-native-push-notification';
import RNLocation from 'react-native-location';

  const isAndroid = Platform.OS == "android";
  const viewPadding = 10;
export default class TodoList extends Component {
    state = {
      tasks: [],
      latitude: null,
      longitude: null
    };
  
    
    deleteTask = i => {
      this.setState(
        prevState => {
          let tasks = prevState.tasks.slice();
  
          tasks.splice(i, 1);
  
          return { tasks: tasks };
        },
        () => Tasks.save(this.state.tasks)
      );
    };
    configureLocation = async() =>{
      // RNLocation.configure({
      //   distanceFilter: 5.0
      // })
       
      const granted = await RNLocation.requestPermission({
        android: {
          detail: "fine"
        }
      });
      if (granted) {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
          this.setState({latitude: locations[0].latitude, longitude: locations[0].longitude});
        });
      }
    }
    componentDidMount() {
      
      PushNotification.configure({
        onNotification: function(notification) {
          console.log("NOTIFICATION:", notification);
        },
      });
      console.log('todolist mounting');
      Keyboard.addListener(
        isAndroid ? "keyboardDidShow" : "keyboardWillShow",
        e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
      );
  
      Keyboard.addListener(
        isAndroid ? "keyboardDidHide" : "keyboardWillHide",
        () => this.setState({ viewPadding: viewPadding })
      );
      
      this.props.navigation.addListener('focus', () => {
        Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
      });

      this.configureLocation();
    }
  
    onCreate = () => {

    }
    render() {
      return (
        <View style={styles.container}>
            <View style={styles.FlatList}>
            <FlatList
            data={this.state.tasks}
            renderItem={({ item, index }) =>
            <View style={styles.FlatListInLine}>
              <Text style={styles.text} onPress={()=>this.props.navigation.navigate('Detail', {...item})}>
              {item.text}
              </Text>
              <TouchableOpacity onPress={() => this.deleteTask(index)}>
                <MaterialCommunityIcons name="delete-forever" size ={30} color="#CB4335 "/>
              </TouchableOpacity>
              </View>}/>
            </View>
          <View style={styles.Icon}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Create')}> 
              <Entypo name="squared-plus" size={70} color="#229954" />          
              </TouchableOpacity>
          </View>
          <View>
            <Text>{this.state.latitude}</Text>
            <Text>{this.state.longitude}</Text>
          </View>
        </View>
      );
    }
  }

  let Tasks = {
    convertToArrayOfObject(tasks, callback) {
      return callback(
        tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
      );
    },
    convertToStringWithSeparators(tasks) {
      return tasks.map(task => task.text).join("||");
    },
    all(callback) {
      return AsyncStorage.getItem("TASKS", (err, tasks) =>
      {
        // AsyncStorage.setItem("TASKS", '');
        console.log("tasks: ", tasks);
        tasks = tasks ? JSON.parse(tasks) : [];  
        return callback(tasks);
        // this.convertToArrayOfObject(tasks, callback)
      });
    },
    save(tasks) {
      AsyncStorage.setItem("TASKS", JSON.stringify(tasks));
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5FCFF",
      padding: viewPadding,
      paddingTop: 20,
    },
    FlatList:{
      flex:1,
      marginLeft:10,
      marginTop:10,
      marginRight:10,
    },
    FlatListInLine:{
        flex:2,
        marginLeft:10,
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor:'silver'
        
    },
    Icon:{
      flex:0,
      flexDirection:'row-reverse',
      marginLeft:30,
      marginBottom:40
    },
    text:{
      flex:1,
      fontSize:20,
      marginTop:5,
    }
  });
  
//   AppRegistry.registerComponent("TodoList", () => TodoList);