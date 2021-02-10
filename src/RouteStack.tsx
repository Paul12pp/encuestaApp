import 'react-native-gesture-handler';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    HomeStackScreen: NavigatorScreenParams<HomeStackParamList>;
    AuthenticationStackScreen: undefined;
    Login: undefined;
    Splash: undefined;
    Stack: undefined;
};
export type HomeStackParamList={
    Home: { token: string};
    DataInit: {token:string;};
    SecondStep: undefined;
    FirstStep: undefined;
    Ask: { token: string,estudiantes:any[],vivienda:any };
}

export const RootStack = createStackNavigator<RootStackParamList>();

export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'HomeStackScreen'>;

export type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'HomeStackScreen'
>;
