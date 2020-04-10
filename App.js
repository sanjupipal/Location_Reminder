import 'react-native-gesture-handler';
import React, {useState, Component} from 'react';
import {StyleSheet, Button, Text , View, FlatList,Alert,TouchableWithoutFeedback,Keyboard} from 'react-native';
import TodoList from './components/todo_list';
import CreateTask from './components/create_task';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
const Stack = createStackNavigator();
export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home">
        <Stack.Screen name="Tasks" component={TodoList} />
        <Stack.Screen name="Create" component={CreateTask} />
      </Stack.Navigator>
    </NavigationContainer>
    );
}