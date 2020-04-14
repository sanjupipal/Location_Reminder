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
    ImageBackground,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Feather,AntDesign } from '@expo/vector-icons';
// import uuid from 'react-native-uuid';
import PushNotification from 'react-native-push-notification';
import Card from './Shared/Card';

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
      endTime: moment().format('HH:mm')},
      location: {}
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
          key: this.state.tasks.length, text: this.state.text, schedule: this.state.schedule, location: this.state.location
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
        const params = this.props.route.params;
        console.log('create params', params);
        if(params)
          this.setState({location: params.location});
      });
    }
  
  render() {
    return (
      <View >
        
          <TextInput 
            style={styles.textInput}
            onChangeText={this.changeTextHandler}
            value={this.state.text}
            placeholder="Remind me about"
            returnKeyType="done"
            returnKeyLabel="done"/>
          
          <Text style={styles.schedule}>Location</Text>
          
          <ImageBackground source={require('./Shared/Map.jpeg')}style={styles.map}>
          <Text style={styles.MapButton} onPress={()=> this.props.navigation.navigate('PlaceAuto')}></Text> 
          </ImageBackground>         
          
          <Text style={styles.schedule}>{this.state.location.name}</Text> 

          <Text style={styles.schedule}>Schedule</Text>  

          <Feather name='calendar' size={40} color='#839192' />          
          <Text style={styles.date} onPress={this.showDatepicker}>{this.state.schedule.date}</Text>

          <AntDesign name='clockcircleo' size={40} color='#52BE80' />  
          <Text style={styles.date} onPress={()=>this.showTimepicker('start')}>{this.state.schedule.startTime}</Text>

          <AntDesign name='clockcircle' size={40} color='#EC7063' />  
          <Text style={styles.date} onPress={()=>this.showTimepicker('end')}>{this.state.schedule.endTime}</Text>
          
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
    textInput: {
      marginTop:10,
      height: 50,
      paddingRight: 10,
      paddingLeft: 10,
      borderWidth: isAndroid ? 0 : 1,
      width: "100%",
      fontSize:22,
      borderBottomWidth:1,
      borderColor:'silver',
      backgroundColor:'#fff',
      shadowOffset:{width:1,height:1},
      shadowColor:0.3,
      shadowRadius:2,
    },
    inlineText: {
        fontSize:16,
        fontWeight: "bold",
        paddingRight: 0,
        paddingLeft:30,
        paddingTop:10,
        borderColor: "silver",
        borderWidth: isAndroid ? 0 : 1,
        backgroundColor:'#fff',
        shadowOffset:{width:1,height:1},
        shadowColor:0.3,
        shadowRadius:2,
      },
      Button:{
        paddingTop:60,
        paddingLeft:90,
        paddingRight:90,
        justifyContent:'space-between',
        flexWrap:'wrap',
        flexDirection:'row',        
      },
      schedule:{
        paddingTop:10,
        fontSize:20,
        paddingLeft:10,
        fontStyle:'italic',
        marginBottom:15,
      },
      date:{
        fontSize:22 , marginLeft:50, fontStyle:'italic',borderBottomColor:"silver", borderBottomWidth:1,flex:0,marginTop:15,marginBottom:10,
        backgroundColor:'#fff',
        shadowOffset:{width:1,height:1},
        shadowColor:0.3,
        shadowRadius:2,
      },
      map:{ 
        marginLeft:20,
        padding:20,
        width:"100%",
        height:100,
      },
      MapButton:{
        width:'100%',
        height:'100%',
        alignSelf:'center'
      }
  });
  
//   AppRegistry.registerComponent("TodoList", () => TodoList);