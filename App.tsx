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
  StyleSheet,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  View,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NetInfo from "@react-native-community/netinfo";
import { RootStackParamList } from './src/RouteStack';
import HomeStackScreen from './src/screens/Stacks/HomeStackScreen';
import SplashScreen from 'react-native-splash-screen';
import Color from './src/constants/Colors';
import Storage from './src/constants/Storage';
import LoginScreen from './src/screens/Stacks/Authentication/LoginScreen';
import navigationRef from './src/constants/navigationRef';
import { ShowSnack } from './src/constants/Snackbar';
 

const Drawer = createDrawerNavigator<RootStackParamList>();
const deviceWidth = Dimensions.get('window').width;

const App = () => {
  const [isSignedIn, setiIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token,setToken] = useState('');

  const logout = () => {
    Storage.removeItem('usuario');
    navigationRef.navigate('Login')
  }
  useEffect(() => {
    SplashScreen.hide();
    const backSubscribe = BackHandler.addEventListener('hardwareBackPress', () => true);
    // Subscribe NetInfo
    const unsubscribe = NetInfo.addEventListener(state => {
      ShowSnack.show( state.isConnected ? 'Conectado a internet.' : 'Sin conexión a internet.',Color.success)
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
    Storage.getItem('usuario')
      .then(result => {
        if (result) {
          setToken(result.token);
          setIsLoading(false);
          setiIsSignedIn(true)
        } else {
          setIsLoading(false);
        }
      })
    return () => {
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
        <NavigationContainer ref={navigationRef}>
          <Drawer.Navigator initialRouteName="HomeStackScreen" screenOptions={{ swipeEnabled: false, gestureEnabled: false }}>
            <Drawer.Screen name="HomeStackScreen" component={HomeStackScreen} initialParams={{token:token}} />
            <Drawer.Screen name="Login" component={LoginScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      }
      {!isSignedIn &&
        <NavigationContainer ref={navigationRef}>
          <Drawer.Navigator initialRouteName="Login" screenOptions={{ swipeEnabled: false, gestureEnabled: false }}>
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="HomeStackScreen" component={HomeStackScreen} />
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
