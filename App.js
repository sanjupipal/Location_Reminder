import 'react-native-gesture-handler';
import React, {useState, Component, useEffect} from 'react';
import {StyleSheet, Button, Text , View, FlatList,Alert,TouchableWithoutFeedback,Keyboard,Image,backgroundColor} from 'react-native';
import TodoList from './components/todo_list';
import CreateTask from './components/create_task';
import Detail from './components/detail';
import PlaceAutoComplete from './components/placeAutoComplete';

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import Header from './components/Shared/Head'
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';




const Stack = createStackNavigator();
export default function App(){
  useEffect(()=>{
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 0,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      url: null,
      httpHeaders: {
        'X-FOO': 'bar'
      },
      // customize post properties
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        foo: 'bar' // you can also add your own properties
      }
    });
    BackgroundGeolocation.on('location', (location) => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      // BackgroundGeolocation.startTask(taskKey => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
      //   BackgroundGeolocation.endTask(taskKey);
      // });
      console.log("ssdsd", location);
    });
    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
      console.log("ssdsd", location);
      // Actions.sendLocation(stationaryLocation);
    });
    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });
  });
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home"
      screenOptions={{
        // headerStyle: {
        // backgroundColor: 'silver',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
        headerStatusBarHeight:50,  
        headerBackground:()=> <Header />, 
      }}>

        <Stack.Screen name="Tasks" component={TodoList}/>
        <Stack.Screen name="Create" component={CreateTask} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="PlaceAuto" component={PlaceAutoComplete} />
     
      </Stack.Navigator>
    </NavigationContainer>
    );
}