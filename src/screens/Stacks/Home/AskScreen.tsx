import React, { useEffect, useState } from "react"
import {FlatList, Dimensions, SafeAreaView, StyleSheet, Text, Platform } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import Storage from "../../../constants/Storage";
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../RouteStack";
import PreguntaComponent from '../../../components/PreguntaComponent';
import Color from '../../../constants/Colors';

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
  token: string;
};
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const AskScreen = (props: Props) => {
  const [listado, setListado] = useState([]);
  useEffect(() => {
    Storage.getItem('preguntas').then((result) => {
      //console.log('listado',result);  
      setListado(result);
      console.log('data', result)
    })
    console.log(listado);
  }, []);
  return (

    <SafeAreaView style={styles.content}>
      <Text style={styles.title}>Encuesta</Text>
      {/* <PreguntaComponent data={listado[0]} /> */}
      {/* { */}
      {listado &&
        <FlatList style={styles.list}
          data={listado}
          initialNumToRender={7}
          onEndReached={() => console.log('el final')}
          contentContainerStyle={{flexGrow:1}}
          renderItem={({ item, index }) =>
            <PreguntaComponent key={index} data={item} />
          }
          keyExtractor={(item, index) => index.toString()}
        />}
      <TouchableOpacity
        style={styles.btns}
        onPress={() => props.navigation.navigate('Home', { token: props.token })}
      >
        <Text style={styles.btnText}>Enviar encuesta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf:'center'
    // backgroundColor: Color.primary
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  list: {
    flex: 1,
    // width: deviceWidth,
    // backgroundColor: Color.warning
    // height:deviceHeight,
    // marginBottom: Platform.OS === 'android' ? 30 : 1,
    // backgroundColor:Color.danger
  },
  btns: {
    padding: 10,
    marginTop: 10,
    backgroundColor: Color.primary,
    borderRadius: 10,
    width: 150,
    marginBottom: 5
  },
  btnText: {
    color: Color.light,
    alignSelf: 'center',
    textAlign: 'center'
  }
})
export default AskScreen;