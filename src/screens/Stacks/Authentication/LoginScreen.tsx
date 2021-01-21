import React, { useState } from "react"
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../../../constants/Colors';
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../RouteStack";

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};
const deviceWidth = Dimensions.get('window').width;

const LoginScreen = (props: Props) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  return (
    <View style={styles.content}>
      {/* <Text>Login</Text> */}
      <Image style={styles.imageLogo} resizeMode='contain' source={require('../../../assets/img/logo.png')}/>
      <TextInput
        mode="outlined"
        style={styles.inputs}
        label="Usuario"
        theme={{colors: {primary: Color.primary}}}
        left={
          <TextInput.Icon
            name={() => <Icon
              name='user'
              size={24}
              color={Color.dark}
            />} // where <Icon /> is any component from vector-icons or anything else
            onPress={() => { }}
          />
        }
        value={user}
        onChangeText={text => setUser(text)}
      />
      <TextInput
        mode="outlined"
        style={styles.inputs}
        label="Clave"
        value={pass}
        onChangeText={text => setPass(text)}
        theme={{colors: {primary: Color.primary}}}
        left={
          <TextInput.Icon
            name={() => <Icon
              name='lock'
              size={24}
              color={Color.dark}
            />} // where <Icon /> is any component from vector-icons or anything else
            onPress={() => { }}
          />
        }
      />
      <TouchableOpacity
        style={styles.btnEnter}
        onPress={() => props.navigation.navigate('Home')}
      >
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  content: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  inputs:{ 
    width: deviceWidth/1.2,
    marginHorizontal:10,
    borderColor:Color.primary
  },
  btnEnter: {
    padding: 10,
    marginTop: 10,
    backgroundColor: Color.primary,
    borderRadius: 10,
    width: 150
  },
  btnText: {
    color: Color.light,
    alignSelf: 'center'
  },
  imageLogo: {
    alignSelf: 'center',
    marginTop: -20,
    height: 90,
    width: 220,
    marginBottom: 10
  },
});
export default LoginScreen;