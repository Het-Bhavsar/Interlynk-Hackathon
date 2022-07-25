import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Alert,
  Text,
  PermissionsAndroid,
  TouchableOpacity
} from "react-native";
import MapView, { Marker,OverlayComponent } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { Icon } from "@rneui/themed";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        
        <View >
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
          />
            
            <TouchableOpacity style={styles.overlay} onPress={()=>{this.props.navigation.navigate("Setting")}} >
        
        <Icon name="align-justify" type="font-awesome"   size={25} color="white"  />
      </TouchableOpacity>
    
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
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
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
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
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
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
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
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
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
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
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
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
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
        "color": "#4e6d70"
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
