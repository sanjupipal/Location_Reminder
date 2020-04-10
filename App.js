import 'react-native-gesture-handler';
import React, {useState, Component} from 'react';
import {StyleSheet, Button, Text , View, FlatList,Alert,TouchableWithoutFeedback,Keyboard} from 'react-native';
import TodoList from './components/todo_list';
import CreateTask from './components/create_task';
import Detail from './components/detail';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();
export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      
      >
        <Stack.Screen name="Tasks" component={TodoList} />
        <Stack.Screen name="Create" component={CreateTask} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
    );
}