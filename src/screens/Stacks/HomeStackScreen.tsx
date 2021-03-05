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
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    StyleSheet,
} from 'react-native';

import { HomeStackParamList, ProfileScreenNavigationProp, ProfileScreenRouteProp, RootStackParamList } from '../../RouteStack';
import HomeScreen from './Home/HomeScreen';
import AskScreen from './Home/AskScreen';
import DataInitScreen from './Home/DataInitScreen';
import SecondStepScreen from './Home/DataInit/SecondStep';
import FirstStepScreen from './Home/DataInit/FirstStep';

type Props = {
    route: ProfileScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
};
  
const Drawer = createDrawerNavigator<HomeStackParamList>();

const HomeStackScreen = (props:Props) => {
    useEffect(()=>{
        console.log('stack',props.route.params)
    },[])
    return (
        <Drawer.Navigator initialRouteName="Home" screenOptions={{swipeEnabled:false,gestureEnabled:false}}>
            <Drawer.Screen name="Home" component={HomeScreen} initialParams={{token:props.route.params.token}} />
            <Drawer.Screen name="Ask" component={AskScreen} />
            <Drawer.Screen name="DataInit" component={DataInitScreen} initialParams={{token:props.route.params.token}} />
            <Drawer.Screen name="SecondStep" component={SecondStepScreen} />
            <Drawer.Screen name="FirstStep" component={FirstStepScreen} />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({

});

export default HomeStackScreen;
