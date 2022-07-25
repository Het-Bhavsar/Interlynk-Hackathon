import React, { Component } from "react";

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const BluetoothManager = new BleManager();
const log = (msg, level = "log") => {
  const verbose = true;
  verbose && console[level](msg);
};

const delay = (milisec) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      log(`watiting for ${milisec} from delay function`);
      resolve("");
    }, milisec);
  });
};

export default class BLEfunction extends Component {
  constructor() {
    super();
    this.state = {
      scaning: false,
      isConnecting: false,
      isConnected: false,
      data: [],
      bluetoothState: "PoweredOff",
      bluetoothBuferData: [],
      storageData:""
    };
    this.deviceMap = new Map();
    this.controls = {
      scanningTime: 5000,
      connectionTimeout: 9000,
      characteristicsReadingTime: 2000,
    };
  }

  initUUID() {
    this.readServiceUUID = [];
    this.readCharacteristicUUID = [];
    this.writeWithResponseServiceUUID = [];
    this.writeWithResponseCharacteristicUUID = [];
    this.writeWithoutResponseServiceUUID = [];
    this.writeWithoutResponseCharacteristicUUID = [];
    this.nofityServiceUUID = [];
    this.nofityCharacteristicUUID = [];
  }

  componentDidMount() {
    // monitors blutooth state, and gives promote on off state.
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
  }
  getData=async()=>{
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      let data = JSON.parse(value);
      this.setState({storageData:data})
    }

  }
  // enables the bluettoth
  enableBluettoth() {
    BluetoothStateManager.enable().then((result) => {
      log("bluettoth is enabled");
    });
  }
  stopScan() {
    log("device scan stoped");
    this.setState({ scaning: false });
    BluetoothManager.stopDeviceScan();
  }

  disconnetDevice(id) {
    log("disconnecting device");
    BluetoothManager.cancelDeviceConnection(id);
    this.setState({ isConnected: false });
    console.log("disconnected", id);
  }
  async scan() {
    if (!this.state.scaning) {
      this.deviceMap.clear();
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
          this.state.data.map((device) => console.log(device.id,device.name));
          this.connectLoopFunction();
        }
      }, this.controls.scanningTime); //Stop searching after given scanning time second
    } else {
      this.stopScan();
      this.setState({ scaning: false });
    }
  }

  async connectLoopFunction() {
    if (!this.state.scaning && !this.state.isConnected) {
      log("going for connection");

      for (let index = 0; index < this.state.data.length; index++) {
        let device = this.state.data[index];
        log(`index of id ${device.id} is ${index}`);
        let something = await this.connectToDevice(
          device,
          index,

          this.fetchServicesAndCharacteristicsForDevice
        );
        await delay (7000);

        log('-----------------something-------------')
        log(something);
        log(`next device connection ${index}`);
        if(something){
          axios({
            method: "post",
            url: "https://interlynk.herokuapp.com/BLEdata",
            data: {
              bleData:something,
              walletAddres:this.state.storageData&&this.state.storageData.wallet.address
            },
          }).then((response) => {
            console.log("data has been sent");
          });
        }
      }
      
    }
  }

  async connectToDevice(
    device,
    index,
    fetchServicesAndCharacteristicsForDevice
  ) {
    if (BluetoothManager.isConnecting) {
      this.disconnetDevice();
      console.log(
        "Cannot open another connection process while the current bluetooth is connecting"
      );
      return;
    }
    let deviceConnected = await device.isConnected();

    if (deviceConnected) {
      log("device is already connect disconneting it first");
      await this.disconnetDevice(device.id);
    }

    let newData = [...this.deviceMap.values()];
    newData[index].isConnecting = true; //connecting
    this.setState({ data: newData });
    this.pheripheralId = device.id;
  let returnBlutoothData=  await BluetoothManager.connectToDevice(device.id)
      .then(async (device) => {
        deviceConnected = await device.isConnected();
        log(`connected to ${device.id}`);
        newData[index].isConnecting = false;
        this.setState({ data: [newData[index]], isConnected: true });
        const discoveredDevice =
          await device.discoverAllServicesAndCharacteristics();

      let servicesMap=   await fetchServicesAndCharacteristicsForDevice(
          discoveredDevice,
          index,
          // this.parseServersMap,
          // this.read
        );
     let  servicesUUIDObject  =await this.parseServersMap(servicesMap);
    let bluttothData = await this.read(servicesUUIDObject, device.id);
    log("data from the connection function");
        log(bluttothData);
        return bluttothData;
      })
      .catch((err) => {
        newData[index].isConnecting = false;
        this.setState({ data: [...newData] });
        log(`this is error ${err.code}`);
        log(err);
      });
return returnBlutoothData;
    // setTimeout(() => {
    //   if (deviceConnected) {
    //     log(
    //       "device is already connect disconneting it first from the interval"
    //     );
    //     this.disconnetDevice(device.id);
    //   }
    //   return;
    // }, this.controls.connectionTimeout);
  }

  async fetchServicesAndCharacteristicsForDevice(
    device,
    index,
  ) {
    log("callback function fetchServicesAndCharacteristicsForDevice is called");
    const servicesMap = {};
    const services = await device.services();

    for (let service of services) {
      const characteristicsMap = {};
      const characteristics = await service.characteristics();

      for (let characteristic of characteristics) {
        characteristicsMap[characteristic.uuid] = {
          uuid: characteristic.uuid,
          isReadable: characteristic.isReadable,
          isWritableWithResponse: characteristic.isWritableWithResponse,
          isWritableWithoutResponse: characteristic.isWritableWithoutResponse,
          isNotifiable: characteristic.isNotifiable,
          isNotifying: characteristic.isNotifying,
          value: characteristic.value,
        };
      }

      servicesMap[service.uuid] = {
        uuid: service.uuid,
        isPrimary: service.isPrimary,
        characteristicsCount: characteristics.length,
        characteristics: characteristicsMap,
      };
    }
    
    return servicesMap;
  }
  async parseServersMap(servicesMap) {
    log("hello fro preservers Map");
    let readServiceUUID = [];
    let readCharacteristicUUID = [];
    let writeWithResponseServiceUUID = [];
    let writeWithResponseCharacteristicUUID = [];
    let writeWithoutResponseServiceUUID = [];
    let writeWithoutResponseCharacteristicUUID = [];
    let nofityServiceUUID = [];
    let nofityCharacteristicUUID = [];

    for (let suuid of Object.keys(servicesMap)) {
      const service = servicesMap[suuid];
      const characteristics = service.characteristics;

      for (let cuuid of Object.keys(characteristics)) {
        const characteristic = characteristics[cuuid];

        if (characteristic.isReadable) {
          readServiceUUID.push(service.uuid);
          readCharacteristicUUID.push(characteristic.uuid);
        }
        if (characteristic.isWritableWithResponse) {
          writeWithResponseServiceUUID.push(service.uuid);
          writeWithResponseCharacteristicUUID.push(characteristic.uuid);
        }
        if (characteristic.isWritableWithoutResponse) {
          writeWithoutResponseServiceUUID.push(service.uuid);
          writeWithoutResponseCharacteristicUUID.push(characteristic.uuid);
        }
        if (characteristic.isNotifiable) {
          nofityServiceUUID.push(service.uuid);
          nofityCharacteristicUUID.push(characteristic.uuid);
        }
      }
    }

    // log(`readServiceUUID ${readServiceUUID}`);
    // log(`readCharacteristicUUID ${readCharacteristicUUID}`);
    // log(`writeWithResponseServiceUUID ${writeWithResponseServiceUUID}`);
    // log(
    //   `writeWithResponseCharacteristicUUID ${writeWithResponseCharacteristicUUID}`
    // );
    // log(`writeWithoutResponseServiceUUID ${writeWithoutResponseServiceUUID}`);
    // log(
    //   `writeWithoutResponseCharacteristicUUID ${writeWithoutResponseCharacteristicUUID}`
    // );
    // log(`nofityServiceUUID ${nofityServiceUUID}`);
    // log(`nofityCharacteristicUUID ${nofityCharacteristicUUID}`);
    let servicesUUIDObject = {
      readServiceUUID: readServiceUUID,
      readCharacteristicUUID: readCharacteristicUUID,
      writeWithResponseServiceUUID: writeWithResponseServiceUUID,
      writeWithResponseCharacteristicUUID: writeWithResponseCharacteristicUUID,
      writeWithoutResponseServiceUUID: writeWithoutResponseServiceUUID,
      writeWithoutResponseCharacteristicUUID:
        writeWithoutResponseCharacteristicUUID,
      nofityServiceUUID: nofityServiceUUID,
      nofityCharacteristicUUID: nofityCharacteristicUUID,
    };
    log(servicesUUIDObject);
    return servicesUUIDObject;
  }
  async read(servicesUUIDObject, deviceId) {
    log("hello from read function");
    let readCharacteristicArray = servicesUUIDObject.readCharacteristicUUID;
    let tempBluettothBufferData = { deviceId: deviceId, characteristis: [] };
    await readCharacteristicArray.map(async (characteristicUUiD, index) => {
      await BluetoothManager.readCharacteristicForDevice(
        deviceId,

        servicesUUIDObject.readServiceUUID[index],
        servicesUUIDObject.readCharacteristicUUID[index]
      ).then(
        (characteristic) => {
          console.log("read success", characteristicUUiD, characteristic.value);
          tempBluettothBufferData.characteristis.push({
            characteristicUUiD: characteristicUUiD,
            value: characteristic.value,
          });
        },
        (error) => {
          console.log("read fail: ", error);
          console.log("read fail: " + error.reason);
          return;
        }
      );
    });
    await delay(3000);
    // log(tempBluettothBufferData);
    log("disconneting devoice");
    BluetoothManager.cancelDeviceConnection(deviceId);
    return tempBluettothBufferData;

  }

  render() {
    return null;
  }
}
