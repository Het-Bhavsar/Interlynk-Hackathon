import React, { useState, useEffect, Component } from "react";

import {
  StyleSheet,
  Button,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import BluetoothStateManager from "react-native-bluetooth-state-manager";
import { BleManager } from "react-native-ble-plx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {mintTheToken,giveMeBalance} from "../components/SmartContractFunction";
import Maps from "../components/Maps";

const BluetoothManager = new BleManager();
const log = (msg, level = "log") => {
  const verbose = true;
  verbose && console[level](msg);
};

export default class BLEfunctionMVP extends Component {
  constructor(props) {
    super();
    this.state = {
      scaning: false,
      walletAddress: "",
      data: [],
      bluetoothState: "PoweredOff",
    };
    this.deviceMap = new Map();
    
    this.controls = {
      scanningTime: 7000,
    };
  }
  async stopScan() {
    log("device scan stoped");
    this.setState({ scaning: false });
    await BluetoothManager.stopDeviceScan();
    
  }
  async scan() {
    console.log("inside scanning function", this.state.scaning)
    if (!this.state.scaning) {
      this.deviceMap.clear();
        log("going to scan")
      BluetoothManager.startDeviceScan(null, null, (error, device) => {
        this.setState({ scaning: true });

        if (error) {
          console.log("startDeviceScan error:", error);
          if (error.errorCode == 102) {
            Alert.alert("Bluettoth is off", "Please turn on Bluetooth", [
              {
                text: "Enable",
                onPress: () => {
                  this.enableBluettoth();
                },
              },
            ]);
          }
          this.setState({ scaning: false });
        } else {
          // console.log(device.id, device.name);
          this.deviceMap.set(device.id, device);
          this.setState({ data: [...this.deviceMap.values()] }); //Use Map type to save the searched bluetooth devices, make sure the list does not show duplicate devices
        }
      });
      this.scanTimer && clearTimeout(this.scanTimer);
      this.scanTimer = setTimeout(() => {
        if (this.state.scaning) {
          this.stopScan();
          this.setState({ scaning: false });
          log(`scanned total ${this.state.data.length} devices`);

        }
      }, this.controls.scanningTime); //Stop searching after given scanning time second
    } else {
      this.stopScan();
      this.setState({ scaning: false });
    }
  }

  getData = async () => {
    const value = await AsyncStorage.getItem("@storage_Key");
    if (value !== null) {
      let data = JSON.parse(value);
      this.setState({ walletAddress: data.wallet.address });
      console.log(this.state.walletAddress);
    }
  };
  // enables the bluettoth
  enableBluettoth() {
    BluetoothStateManager.enable().then((result) => {
      log("bluettoth is enabled");
    });
  }

  componentDidMount() {
    // monitors blutooth state, and gives promote on off state.
    console.log("hello from ble functions")
    this.onStateChangeListener = BluetoothManager.onStateChange((state) => {
      this.setState({ bluetoothState: state });
      if (state === "PoweredOff") {
        Alert.alert("Bluettoth is off", "Please turn on Bluetooth", [
          {
            text: "Enable",
            onPress: () => {
              this.enableBluettoth();
            },
          },
        ]);
      } else if (state === "PoweredOn") {
        log("powerd is on from the onstate");
        this.scan();
      }
    }, true /*=emitCurrentState*/);
    this.getData();
    setInterval(async() => {
        let amount = this.state.data.length/15;
        console.log(amount);
        await mintTheToken(this.state.walletAddress,amount);
        this.setState({data:[]});
        this.scan(); 
    }, 10000);
    
   

  }
  
  componentWillUnmount() {
    BluetoothManager.destroy();
  }
  render() {
    return (
    <Maps navigation={this.props.navigation} walletAddress={this.state.walletAddress} scannedDevices={this.state.data &&this.state.data.length}/>

    );
  }
}