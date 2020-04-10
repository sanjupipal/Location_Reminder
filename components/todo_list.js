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
    Platform
} from "react-native";
  
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
      Keyboard.addListener(
        isAndroid ? "keyboardDidShow" : "keyboardWillShow",
        e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
      );
  
      Keyboard.addListener(
        isAndroid ? "keyboardDidHide" : "keyboardWillHide",
        () => this.setState({ viewPadding: viewPadding })
      );
  
      Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
    }
  
    onCreate = () => {

    }
    render() {
      return (
        <View
          style={[styles.container, { paddingBottom: this.state.viewPadding }]}
        >
          <FlatList
            style={styles.list}
            data={this.state.tasks}
            renderItem={({ item, index }) =>
              <View>
                <View style={styles.listItemCont}>
                  <Text>
                    {item.text}
                  </Text>
                  <Text>
                    {item.schedule.date}
                  </Text>
                  <Text>
                    {item.schedule.startTime}
                  </Text>
                  <Text>
                    {item.schedule.endTime}
                  </Text>
                  <Button title="X" onPress={() => this.deleteTask(index)} />
                </View>
                <View style={styles.hr} />
              </View>}
            />
            <Button  title="Create" onPress={()=>this.props.navigation.navigate('Create')} />
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
      AsyncStorage.setItem("TASKS", null);
      return callback([]);
      return AsyncStorage.getItem("TASKS", (err, tasks) =>
        this.convertToArrayOfObject(tasks, callback)
      );
    },
    save(tasks) {
      AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
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
    }
  });
  
//   AppRegistry.registerComponent("TodoList", () => TodoList);