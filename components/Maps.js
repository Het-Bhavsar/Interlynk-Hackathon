import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Alert,
  Text,
  PermissionsAndroid,
  Image
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

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
        <View pointerEvents="none">
          <MapView
            ref={(ref) => (this.map = ref)}
            style={styles.map}
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
            
          </MapView>
          
    
        </View>
       
      </View>
    );
  }
}
const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 20 : 0,
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
