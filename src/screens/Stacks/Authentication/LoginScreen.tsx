import React, { useState } from "react"
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native"
import { TextInput } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../../../constants/Colors';
import Storage from "../../../constants/Storage";
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../RouteStack";
import EncuestaServices from "../../../services/EncuestaServices";
import Snackbar from "react-native-snackbar";

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};
const deviceWidth = Dimensions.get('window').width;

const LoginScreen = (props: Props) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [indicator, setIndicator] = useState(false);
  const login = () => {
    NetInfo.fetch().then(state => {
      //if internet valid
      if (state.isConnected && state.isInternetReachable) {
        setIndicator(true);
        EncuestaServices.login({ email: user, password: pass })
          .then((result) => {
            //console.log(result);
            if (result) {
              setIndicator(false);
              console.log(result)
              Storage.setItem('usuario', result.data);
              setUser('');
              setPass('');
              props.navigation.navigate('Home',{token:result.data.token})
            }
          })
          .catch((error) => {
            console.log(error);
            setIndicator(false);
            Snackbar.show({
              text: 'Ha ocurrido un error, revise los datos.',
              duration: Snackbar.LENGTH_LONG,
              action: {
                text: 'UNDO',
                textColor: Color.danger,
                onPress: () => { /* Do something. */ },
              },
            });
          });
      }else{
        Snackbar.show({
          text: 'Error de conexión, intente en otra vez.',
          duration: Snackbar.LENGTH_LONG,
          action: {
            text: 'UNDO',
            textColor: Color.danger,
            onPress: () => { /* Do something. */ },
          },
        });
      }
    });

  }
  return (
    <View style={styles.content}>
      {/* <Text>Login</Text> */}
      <Image style={styles.imageLogo} resizeMode='contain' source={require('../../../assets/img/logo.png')} />
      <TextInput
        mode="outlined"
        style={styles.inputs}
        label="Usuario"
        theme={{ colors: { primary: Color.primary } }}
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
        secureTextEntry={true}
        onChangeText={text => setPass(text)}
        theme={{ colors: { primary: Color.primary } }}
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
        disabled={indicator}
        style={styles.btnEnter}
        onPress={login}
      >
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
      <ActivityIndicator animating={indicator} style={styles.indicator} size="small" color={Color.success} />
    </View>
  )
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    width: deviceWidth / 1.2,
    marginHorizontal: 10,
    borderColor: Color.primary
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
  indicator:{
    marginTop:10
  }
});
export default LoginScreen;