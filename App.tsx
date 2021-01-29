/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  View
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NetInfo from "@react-native-community/netinfo";
import { RootStackParamList } from './src/RouteStack';
import HomeStackScreen from './src/screens/Stacks/HomeStackScreen';
import LoginScreen from './src/screens/Stacks/Authentication/LoginScreen';
import SplashScreen from 'react-native-splash-screen';
import Snackbar from 'react-native-snackbar';
import Color from './src/constants/Colors';
import Storage from './src/constants/Storage';

const Drawer = createDrawerNavigator<RootStackParamList>();
const deviceWidth = Dimensions.get('window').width;

const App = () => {

  const [isSignedIn, setiIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    SplashScreen.hide();
    // Subscribe BackHandler
    const backSubscribe = BackHandler.addEventListener('hardwareBackPress', () => true);
    // Subscribe NetInfo
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
    Storage.getItem('usuario')
      .then(result => {
        if (result) {
          setIsLoading(false);
          setiIsSignedIn(true)
        } else {
          setIsLoading(false);
        }
      })
    return () => {
      // Orientation.unlockAllOrientations();
      // Unsubscribe
      unsubscribe();
      backSubscribe.remove();
    }
  });
  if (isLoading) {
    return (
      <View style={styles.viewIndicator}>
        <ActivityIndicator style={styles.indicator} size="large" color={Color.success} />
      </View>
    )
  }
  return (
    <>
      {isSignedIn &&
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home" screenOptions={{ swipeEnabled: false, gestureEnabled: false }}>
            <Drawer.Screen name="Home" component={HomeStackScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      }
      {!isSignedIn &&
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Login" screenOptions={{ swipeEnabled: false, gestureEnabled: false }}>
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Home" component={HomeStackScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      }
    </>
  );
};

const styles = StyleSheet.create({
  viewIndicator:{
    flex:1,
    justifyContent:'center'
  },
  indicator: {
    alignSelf: 'center'
  }

});

export default App;
