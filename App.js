import React, {useState, Component} from 'react';
import {StyleSheet, Text , View, FlatList,Alert,TouchableWithoutFeedback,Keyboard} from 'react-native';
import Header from './components/header';
import TodoItem from './components/toDoItem';
import AddTodo from './components/addTodo';


export default function App(){
  const[todos, setTodos]= useState([
    {text:'buy coffee',key:'1'},
    {text:'create an app',key:'2'},
    {text:'play on the switch',key:'3'}
  ]);

  const pressHandler =(key) =>{
    setTodos((precTodos)=>{
      return precTodos.filter(todos => todos.key !=key);
    });
  }

  const submitHandler = (text) => {
    if(text.length > 3){
      setTodos((prevTodos) => {
        return [
          { text: text, key: Math.random().toString()},
          ...prevTodos
        ];
      })
    }
    else
    {
      Alert.alert('OOPS!','more than 3 chars',[
        {text:'Understod!',onPress: ()=>console.log("alert closed")}
      ]);
    }
    
    
  }
  return(
    <TouchableWithoutFeedback onPress={() =>{
        Keyboard.dismiss();
    }}>   
       <View style={style.container}>
        <Header />
        <View style={style.content}>
          <AddTodo submitHandler={submitHandler}/>
          <View style={style.list}>
          <FlatList 
            data={todos}
            renderItem={({ item }) => (
              <TodoItem item={ item} pressHandler={pressHandler} />
            )}
            />
          </View>
        </View>


      </View>
      </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create(
  {
    container:{
      flex: 1,
      backgroundColor: '#fff',
    },
    content: {
      flex:1,
      padding: 40,
    },
    list: {
      flex: 1,
      marginTop: 20,      
    }
  });

