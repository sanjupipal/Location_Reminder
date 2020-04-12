import React, {useState, Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    AsyncStorage,
    ScrollView,
    Button,
    TextInput,
    Keyboard,
    Platform,TouchableOpacity
} from "react-native";
import PlacesInput from 'react-native-places-input';
import RNLocation from 'react-native-location';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
const isAndroid = Platform.OS == "android";
const viewPadding = 360;

export default class PlaceAutoComplete extends Component {
    state = {
      cords: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      location: null
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
          this.setState({cords: {latitude: locations[0].latitude, longitude: locations[0].longitude}});
        });
      }
    }
    
    componentDidMount() {
      Keyboard.addListener(
        isAndroid ? "keyboardDidShow" : "keyboardWillShow",
        e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
      );
  
      Keyboard.addListener(
        isAndroid ? "keyboardDidHide" : "keyboardWillHide",
        () => this.setState({ viewPadding: viewPadding })
      );
      this.configureLocation();
    }
  
    render() {
      return (
        <View style={styles.container}>
          <PlacesInput
              placeHolder={'Some placeholder'}
              stylesContainer={{
                  position: 'relative',
                  alignSelf: 'stretch',
                  margin: 0,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  shadowOpacity: 0,
                  borderColor: '#dedede',
                  borderWidth: 1,
                  marginBottom: 10
              }}
              stylesList={{
                  top: 50,
                  borderColor: '#dedede',
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                  left: -1,
                  right: -1
              }}
              googleApiKey="AIzaSyDju_m5TT9dezjmt8l78QFAE3sAygPJNkM" 
              onSelect={place => {
                console.log(JSON.stringify(place));
                const geo = place.result.geometry.location;
                console.log(geo);
                this.setState({
                  cords: {latitude: geo.lat, longitude: geo.lng}, 
                  location: {
                    name:  place.result.name,
                    address: place.result.formatted_address,
                    cords: {latitude: geo.lat, longitude: geo.lng}
                  }
                });
              }} 
          />
          <View>
            <Text>{this.state.cords.latitude}</Text>
            <Text>{this.state.cords.longitude}</Text>
            <MapView
            style={styles.mapContainer}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: this.state.cords.latitude,
                longitude: this.state.cords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={this.state.cords}
                title="me"
                description=''
              />
            </MapView>
            <Button  title="Select this place" onPress={()=> this.props.navigation.navigate('Create', {location: this.state.location})} />
          </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  mapContainer: {
    height: '80%',
    width: '100%'
  },
  container: {
    // flex: 0,
    // backgroundColor: "#F5FCFF",
    // padding: viewPadding,
    // paddingTop: 20,
  },
  FlatList:{
    // flex:1,
    // marginLeft:10,
    // marginTop:10,
    // marginRight:10,
  },
  FlatListInLine:{
      // flex:2,
      // marginLeft:10,
      // flexWrap:'wrap',
      // flexDirection:'row',
      // justifyContent:'space-between',
      // borderBottomWidth:1,
      // borderColor:'silver'
      
  },
  Icon:{
    flex:0,
    flexDirection:'row-reverse',
    marginLeft:30,
    marginBottom:40
  },
  text:{
    // flex:1,
    // fontSize:20,
    // marginTop:5,
  }
});