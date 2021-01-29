import React, { useEffect } from "react"
import NetInfo from "@react-native-community/netinfo";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native"
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../RouteStack";
import Color from '../../../constants/Colors';
import Storage from "../../../constants/Storage";
import EncuestaServices from "../../../services/EncuestaServices";
type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
  token: string;
};

const HomeScreen = (props: Props) => {
  const rest = () => {
    NetInfo.fetch().then(state => {
      //if internet valid
      if (state.isConnected && state.isInternetReachable) {
        EncuestaServices.getPreguntas(props.token)
          .then(result => {
            Storage.setItem('preguntas', result.data);
          })
          .catch(error => {
            console.log(error)
          })
      }
    })
  }
  const logout = () => {
    Storage.removeItem('usuario');
    props.navigation.navigate('Login')
  }
  useEffect(() => {
    rest();
    return () => {
    }
  })
  return (
    <View style={styles.content}>
      <TouchableOpacity
        style={styles.btns}
        onPress={() => props.navigation.navigate('DataInit', { token: props.token })}
      >
        <Text style={styles.btnText}>Iniciar nueva encuesta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btns}
        onPress={logout}
      >
        <Text style={styles.btnText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  content: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  btns: {
    padding: 10,
    marginTop: 10,
    backgroundColor: Color.primary,
    borderRadius: 10,
    width: 150
  },
  btnText: {
    color: Color.light,
    alignSelf: 'center',
    textAlign: 'center'
  }
})
export default HomeScreen;