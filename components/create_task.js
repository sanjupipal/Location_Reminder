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
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
// import uuid from 'react-native-uuid';
import PushNotification from 'react-native-push-notification';

const isAndroid = Platform.OS == "android";
const viewPadding = 360;
export default class CreateTask extends Component {
    resetSchedule(){
        return {
            date: moment(new Date()).format('MM-DD-YYYY'),
            startTime: moment().format('HH:mm'),
            endTime: moment().format('HH:mm')
        };
    }
    state = {
      tasks: [],
      text: "",
      mode: 'date',
      show: false,
      pickerDate: moment().toDate(),
      timePicker: null,
      schedule: {date: moment(new Date()).format('YYYY-MM-DD'),
      startTime: moment().format('HH:mm'),
      endTime: moment().format('HH:mm')}

    };
    
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        this.setState({show: false});
        if(this.state.mode == 'date'){
            this.setState({pickerDate: currentDate});
            this.state.schedule.date = moment(currentDate).format('MM-DD-YYYY');
            this.setState({schedule: this.state.schedule});
        } else {
            this.setState({pickerDate: currentDate});
            if(this.state.timePicker == 'start')
                this.state.schedule.startTime = moment(currentDate).format('HH:mm');
            else
                this.state.schedule.endTime = moment(currentDate).format('HH:mm');
            this.setState({schedule: this.state.schedule});
        }
    };
    
    showDatepicker = () => {
        this.setState({show: true});
        this.setState({mode: 'date'});
    };
    
    showTimepicker = timePicker => {
        this.setState({timePicker: timePicker, show: true, mode: 'time'});
    };
    changeTextHandler = text => {
      this.setState({ text: text });
    };
  
    addTask = () =>{
      console.log('before saving: ', this.state.tasks);
      let notEmpty = this.state.text.trim().length > 0;
      if (notEmpty) {
        const tasks = this.state.tasks;
        tasks.push({
          key: this.state.tasks.length, text: this.state.text, schedule: this.state.schedule
        });  
        this.setState({tasks});
        Tasks.save(this.state.tasks);
        this.props.navigation.navigate('Tasks');
        this.scheduleNotification();
      }
    };
    
    scheduleNotification(){
      const time = this.state.schedule.startTime.split(':');
      const hour = +time[0];
      const mins = +time[1];
      const scheduleTime = moment(this.state.schedule.date).add(hour, 'hour').add(mins, 'minutes').toDate();
      PushNotification.localNotificationSchedule({
        title: 'Task Notification',
        message: this.state.text,
        date: scheduleTime 
      });
    }
    cancel = () => {

    }
    componentDidMount() {
      console.log('mounting');
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
  
  render() {
    return (
      <View>
          <TextInput style={styles.textInput}
            onChangeText={this.changeTextHandler}
            // onSubmitEditing={this.addTask}
            value={this.state.text}
            placeholder="Remind me about"
            returnKeyType="done"
            returnKeyLabel="done"
          />
          <Text style={{fontSize:29,paddingLeft:20,fontStyle:'italic'}}>Schedule</Text>
          <View style={{paddingTop:10}}>
            <Text style={styles.inlineText} onPress={this.showDatepicker}>{this.state.schedule.date}</Text>
            <Text style={styles.inlineText} onPress={()=>this.showTimepicker('start')}>{this.state.schedule.startTime}</Text>
            <Text style={styles.inlineText} onPress={()=>this.showTimepicker('end')}>{this.state.schedule.endTime}</Text>
          </View>
          <View style={styles.Button}>
           
            <Button  title="Cancel" onPress={()=> this.props.navigation.navigate('Tasks')} />
            <Button  title="Submit" onPress={this.addTask} />
            {this.state.show && (
                <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={this.state.pickerDate}
                mode={this.state.mode}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
                />
            )}
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
      return AsyncStorage.getItem("TASKS", (err, tasks) =>{
        this.convertToArrayOfObject(tasks, callback)
      //  console.log("dasdas", tasks);
       tasks = tasks ? JSON.parse(tasks) : [];  
       return callback(tasks);
       // this.convertToArrayOfObject(tasks, callback)
     
      });
    },
    save(tasks) {
      console.log('saving: ', tasks);
      AsyncStorage.setItem("TASKS", JSON.stringify(tasks));
    }
  };

  const styles = StyleSheet.create({
    container: {
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
      marginTop:50,
      height: 70,
      paddingRight: 10,
      paddingLeft: 20,
      borderColor: "gray",
      borderWidth: isAndroid ? 0 : 1,
      width: "100%",
      fontSize:18,
    },
    inlineText: {
        fontSize:20,
        fontWeight: "bold",
        paddingRight: 0,
        paddingLeft:30,
        paddingTop:20,
        borderColor: "gray",
        borderWidth: isAndroid ? 0 : 1,
      },
      Button:{
        paddingTop:240,
        paddingLeft:90,
        paddingRight:90,
        justifyContent:'space-between',
        flexWrap:'wrap',
        flexDirection:'row',
        
      }
  });
  
//   AppRegistry.registerComponent("TodoList", () => TodoList);