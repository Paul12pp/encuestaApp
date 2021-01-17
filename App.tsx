/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { RootStackParamList } from './src/RouteStack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStackScreen from './src/screens/Stacks/HomeStackScreen';
import LoginScreen from './src/screens/Stacks/Authentication/LoginScreen';
import SplashScreen from 'react-native-splash-screen';

const deviceWidth = Dimensions.get('window').width;
const Drawer = createDrawerNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    return () => {
      // Orientation.unlockAllOrientations();
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
