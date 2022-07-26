import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Alert,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Animated,
  Image
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { Icon } from "@rneui/themed";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import CustomMarker from "../components/CustomeMarker"
//Make sure that there is only one instance of BleManager globally, and the BleModule class holds Bluetooth connection information


export default class Maps extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      liveLocation: {
        latitude: -1,
        longitude: -1,
      },
      
      gotLocation: false,
    };
  }
  componentDidMount() {
    this.getUserLocation();
    this.animation = new Animated.Value(0);
  }

  
  getBluttothConnectPermission = async () => {
    console.log("getBluttothConnectPermission")
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            liveLocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            gotLocation: true,
          });
          this.map.animateToRegion(this.state.liveLocation, 0);
        },
        (error) => {
          console.log(error);
          Alert.alert(error.message.toString());
        },
        {
          showLocationDialog: true,
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );
    }
  };
  getBluttothScanPermission = async () => {
    console.log("getBluttothScanPermission");
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            liveLocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            gotLocation: true,
          });
          this.map.animateToRegion(this.state.liveLocation, 0);
        },
        (error) => {
          console.log(error);
          Alert.alert(error.message.toString());
        },
        {
          showLocationDialog: true,
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );
    }
  };
  getUserLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            liveLocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            gotLocation: true,
          });
          this.map.animateToRegion(this.state.liveLocation, 0);
        },
        (error) => {
          console.log(error);
          Alert.alert(error.message.toString());
        },
        {
          showLocationDialog: true,
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        
        <View
        //  pointerEvents="none"
        >
          <MapView
            ref={(ref) => (this.map = ref)}
            style={styles.map}
            showsMyLocationButton={false}
            initialRegion={{
              latitude: 21.237702,
              longitude: 72.789032,
              latitudeDelta: 0.0001,
              longitudeDelta: 0.0001,
            }}
            //your region data goes here.
            onMapReady={() => {
              this.map.fitToCoordinates(this.state.liveLocation);
            }}
            customMapStyle={mapStyle}
            showsUserLocation
            loadingEnabled
            userLocationAnnotationTitle="You"
          >
           {/*Make sure the Marker component is a child of MapView. Otherwise it won't render*/}
      
      {/* want this */}
      <Marker coordinate={{latitude:this.state.liveLocation.latitude+0.001,longitude:this.state.liveLocation.longitude+0.002}} >
      <CustomMarker/>
      </Marker>
      {/* want this */}
      <Marker coordinate={{latitude:this.state.liveLocation.latitude-0.001,longitude:this.state.liveLocation.longitude-0.002}} >
      <CustomMarker/>

      </Marker>
      <Marker coordinate={{latitude:this.state.liveLocation.latitude-0.002,longitude:this.state.liveLocation.longitude-0.003}} >
      <CustomMarker/>

      </Marker>
      <Marker coordinate={{latitude:this.state.liveLocation.latitude+0.003,longitude:this.state.liveLocation.longitude+0.001}} >
      <CustomMarker/>

      </Marker>
          </MapView>
            
        </View>
            <TouchableOpacity style={styles.overlay} onPress={()=>{this.props.navigation.navigate("Setting")}} >
        
        <Icon name="gear" type="font-awesome"   size={25} color="black"  />
      </TouchableOpacity>
    
        <View style={styles.balanceContainer}>
      <Text style={styles.balanceText}>Your Balance</Text>
      <Text style={styles.balance}>{this.props.walletBalance} INT</Text>
    </View>
      </View>
    );
  }
}
const mapStyle =[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]




const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top:15,
    bottom: 0,
    left:15,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 20 : 0,
  },
  icon: {
    
    position: 'absolute',
   
  
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'red',
    opacity: 0.3,
  },
  balanceContainer:{
    position: 'absolute',

    backgroundColor: "rgba(0,0,0,1)",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 25,
    marginTop:windowHeight-220,
    width: windowWidth,
    height: windowHeight/3
  },
  balanceText:{
    fontFamily: "roboto-regular",
    color: "white",
    fontSize: 25,
    marginTop: windowHeight /20,
    marginLeft: windowWidth /3
  },
  balance:{
    fontFamily: "roboto-regular",
    color: "white",
    fontSize: 25,
    marginTop: windowHeight /40,
    marginLeft: windowWidth/2.5
  },
  item: {
    flexDirection: "column",
    borderColor: "rgb(235,235,235)",
    borderStyle: "solid",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    paddingVertical: 8,
  },
  buttonView: {
    height: 30,
    backgroundColor: "rgb(33, 150, 243)",
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "flex-start",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
  content: {
    marginTop: 5,
    marginBottom: 15,
  },
  textInput: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "white",
    height: 50,
    fontSize: 16,
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
