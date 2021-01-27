/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NetInfo from "@react-native-community/netinfo";
import { RootStackParamList } from './src/RouteStack';
import Storage from './src/constants/Storage';
import HomeStackScreen from './src/screens/Stacks/HomeStackScreen';
import LoginScreen from './src/screens/Stacks/Authentication/LoginScreen';
import SplashScreen from 'react-native-splash-screen';
import EncuestaServices from './src/services/EncuestaServices';
import Snackbar from 'react-native-snackbar';
import Color from './src/constants/Colors';

const Drawer = createDrawerNavigator<RootStackParamList>();
const deviceWidth = Dimensions.get('window').width;

const App = () => {

  const rest = () => {

    NetInfo.fetch().then(state => {
      //if internet valid
      if (state.isConnected && state.isInternetReachable) {
        EncuestaServices.getPreguntas()
          .then((result) => {
            //console.log(result);
            if (result) {
              console.log(result.data)
              Storage.setItem('preguntas', result.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      //else internet not valid
      Storage.getItem('preguntas')
        .then((result) => {
          if (result) {
            
          }
        });
    })
  }
  useEffect(() => {
    SplashScreen.hide();
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      Snackbar.show({
        text: state.isConnected ? 'Conectado a internet.' : 'Sin conexión a internet.',
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'UNDO',
          textColor: Color.success,
          onPress: () => { /* Do something. */ },
        },
      });
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });

    rest();
    return () => {
      // Orientation.unlockAllOrientations();
      // Unsubscribe
      unsubscribe();
    }
  });
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Home" component={HomeStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
