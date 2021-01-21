import React from "react"
import { Button, Text, StyleSheet, View, TouchableOpacity } from "react-native"
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../RouteStack";
import Color from '../../../constants/Colors';
type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const HomeScreen = (props: Props) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity
        style={styles.btns}
        onPress={() => props.navigation.navigate('DataInit')}
      >
        <Text style={styles.btnText}>Iniciar nueva encuesta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btns}
        onPress={() => props.navigation.navigate('Login')}
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
  btns:{
    padding: 10,
    marginTop: 10,
    backgroundColor: Color.primary,
    borderRadius: 10,
    width: 150
  },
  btnText: {
    color: Color.light,
    alignSelf: 'center',
    textAlign:'center'
  }
})
export default HomeScreen;