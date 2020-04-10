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
    Platform,TouchableOpacity
} from "react-native";
import { Entypo } from '@expo/vector-icons';

  const isAndroid = Platform.OS == "android";
  const viewPadding = 10;
export default class TodoList extends Component {
    state = {
      tasks: [],
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
    componentDidMount() {
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
    }
  
    onCreate = () => {

    }
    render() {
      return (
        <View style={{flex:1}}>
        <View style={{marginTop:20,flex:1}}>
          <FlatList
            style={styles.list}
            data={this.state.tasks}
            renderItem={({ item, index }) =>
              <View>
                <View style={styles.listItemCont}>
                  <Text style={styles.listItem} onPress={()=>this.props.navigation.navigate('Detail', {...item})}>
                    {item.text}
                  </Text>
                  <Button title="X" onPress={() => this.deleteTask(index)} />
                </View>
                <View style={styles.hr} />
              </View>}
            />
        </View>
        <View style={styles.Button}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Create')}>
        <View>  
            <Entypo name="squared-plus" size={70} color="green" />
        </View>            
        </TouchableOpacity>
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
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
      padding: viewPadding,
      paddingTop: 20
    },
    list: {
      width: "100%"
    },
    listItem: {
      paddingTop: 2,
      paddingBottom: 2,
      fontSize: 18
    },
    hr: {
      height: 1,
      backgroundColor: "gray"
    },
    listItemCont: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    textInput: {
      height: 40,
      paddingRight: 10,
      paddingLeft: 10,
      borderColor: "gray",
      borderWidth: isAndroid ? 0 : 1,
      width: "100%"
    },
    Button:{
      flex:0,
      marginLeft:20,
      flexDirection:'row-reverse',
      alignSelf:'flex-end'
    }
  });
  
//   AppRegistry.registerComponent("TodoList", () => TodoList);