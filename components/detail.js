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
const viewPadding = 80;

export default class Detail extends Component {
    state = {
        text: null,
        schedule: {}
    };
    
    componentDidMount() {
        console.log('detail mounting');
        const params = this.props.route.params;
        console.log('detail picked: ', params);
        this.setState({...params});  
    
    }
  
    render() {
      return (
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            <Text style={styles.text}>{this.state.text}</Text>
            {/* <Text style={styles.text}>Schedule</Text> */}
            <Text style={styles.inlineText} onPress={this.showDatepicker}>{this.state.schedule.date}</Text>
            <Text style={styles.inlineText} onPress={()=>this.showTimepicker('start')}>{this.state.schedule.startTime}</Text>
            <Text style={styles.inlineText} onPress={()=>this.showTimepicker('end')}>{this.state.schedule.endTime}</Text>
        </View>
      );
    }
  }

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
    inlineText: {
        fontSize: 12,
        fontWeight: "bold",
        paddingRight: 0,
        paddingLeft: 50,
        borderColor: "gray",
        borderWidth: isAndroid ? 0 : 1,
    }
});
