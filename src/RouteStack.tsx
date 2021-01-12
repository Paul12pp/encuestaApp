import 'react-native-gesture-handler';
import {  RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    HomeStackScreen:undefined;
    AuthenticationStackScreen:undefined;
    Home: undefined;
    DataInit: undefined;
    Ask:undefined;
    Login:undefined;
    Splash: undefined;
    Stack: undefined;
    Details: { item: any }|undefined;
};

export const RootStack = createStackNavigator<RootStackParamList>();

export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Home'
>;
