import React, { useState } from "react"
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
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
      <TextInput
        mode="outlined"
        style={styles.inputs}
        label="Usuario"
        left={
          <TextInput.Icon
            name={() => <Icon
              name='user'
              size={24}
              color='black'
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
        left={
          <TextInput.Icon
            name={() => <Icon
              name='lock'
              size={24}
              color='black'
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
    marginHorizontal:10
  },
  btnEnter: {
    padding: 10,
    marginTop: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 150
  },
  btnText: {
    color: 'white',
    alignSelf: 'center'
  }
});
export default LoginScreen;