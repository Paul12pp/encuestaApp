/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
} from 'react-native';

import { RootStackParamList } from '../../RouteStack';
import HomeScreen from './Home/HomeScreen';
import AskScreen from './Home/AskScreen';
import DataInitScreen from './Home/DataInitScreen';

declare const global: { HermesInternal: null | {} };
const deviceWidth = Dimensions.get('window').width;
const Drawer = createDrawerNavigator<RootStackParamList>();

const HomeStackScreen = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Ask" component={AskScreen} />
            <Drawer.Screen name="DataInit" component={DataInitScreen} />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({

});

export default HomeStackScreen;
