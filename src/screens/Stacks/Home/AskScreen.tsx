import React, { useEffect, useState } from "react"
import { FlatList, Dimensions, SafeAreaView, StyleSheet, Text, Platform, Alert, ToastAndroid, ActivityIndicator } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import NetInfo from "@react-native-community/netinfo";
import Storage from "../../../constants/Storage";
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../RouteStack";
import PreguntaComponent from '../../../components/PreguntaComponent';
import Color from '../../../constants/Colors';
import EncuestaServices from "../../../services/EncuestaServices";
import Queue from "../../../constants/Queue";
import { TextInput } from "react-native-paper";
import axios from "axios";

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const AskScreen = (props: Props) => {
  const [listado, setListado] = useState([]);
  const [values, setValues] = useState<any>([]);
  const [valid, setValid] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [incidentes, setIncidentes] = useState('');
  const [source, setSource] = useState(axios.CancelToken.source());
  const [time, setTime] = useState(0);

  const press = () => {
    setIndicator(true);
    const data = {
      ...props.route.params.vivienda,
      EncuestaId: 1,
      Estudiantes: props.route.params.estudiantes,
      respuestas: values,
      Incidentes: incidentes
    }
    timeOut();
    EncuestaServices.postRespuestas(props.route.params.token, data, source.token)
      .then(result => {
        timeOut(true);
        Platform.OS == 'ios' ? Alert.alert('Envuesta enviada', 'Se ha enviado satisfactoriamente la encuesta.') : ToastAndroid.show("Encuesta enviada satisfactoriamente.", ToastAndroid.LONG);
        props.navigation.navigate('HomeStackScreen', { screen: 'Home', params: { token: props.route.params.token } })
        setIndicator(false);
      })
      .catch(error => {
        timeOut(true);
        console.log('error enviando', error);
        if (error = "[Error: Network Error]") {
          console.log('network')
          let cola = new Queue();
          cola.addElement(data);
          Alert.alert('Sin conexión', 'Encuesta guardada localmente para futura sincronización.',
            [
              {
                text: 'Ok',
                onPress: () => props.navigation.navigate('HomeStackScreen', { screen: 'Home', params: { token: props.route.params.token } })
              }
            ]);
        }
        if (error.response) {

          let cola = new Queue();
          cola.addElement(data);
          console.log(error.response.data);
          if (error.response.status === 401) {
            Alert.alert('Token vencido', 'Inice sesión con Internet.',
              [
                {
                  text: 'Ok',
                  onPress: logout
                }
              ]);
          }
          console.log(error.response.headers);
        }
        setIndicator(false);
      })

    console.log(data);
  }
  const recibeData = (value: any) => {
    // console.log('recibido', value);
    const temp = values;
    temp[value.index] = value.data;
    setValues(temp);
    // console.log('in state',values)
    let valid = values.filter((element: any) => isEmpty(element))
    setValid(valid.length > 0 ? true : false);
    // console.log('otro valid', valid);
    // console.log(valid)
  }
  const isEmpty = (obj: any) => {
    for (var key in obj) {
      // console.log(obj)
      if (obj[key] == null || obj[key] == "")
        return true;
    }
    return false;
  }
  const timeOut=(terminator = false)=>{
    if(Platform.OS=='android'){
      if(terminator) {
        clearTimeout(time);
      } else {
          setTime(setTimeout(function(){
            console.log('cancelado');
            source.cancel();
          }, 10000))
      }
    }
  }

  const logout = () => {
    Storage.removeItem('usuario');
    props.navigation.navigate('Login')
  }
  useEffect(() => {
    // console.log(props.route.params.vivienda)
    Storage.getItem('preguntas').then((result) => {
      // console.log('listado',result);  
      setListado(result);
    })
  }, []);
  return (
    <SafeAreaView style={styles.content}>
      <Text style={styles.title}>Encuesta</Text>
      {listado &&
        <FlatList style={styles.list}
          data={listado}
          initialNumToRender={7}
          onEndReached={() => console.log('el final')}
          contentContainerStyle={{ flexGrow: 1 }}

          renderItem={({ item, index }) =>
            <PreguntaComponent key={index} enviaData={recibeData} data={item} value={index} estudiantes={props.route.params.estudiantes} />
          }
          keyExtractor={(item, index) => index.toString()}
        />}
      <TextInput
        mode="outlined"
        style={styles.inputs}
        label="Incidencias"
        value={incidentes}
        multiline={true}
        numberOfLines={3}
        onChangeText={(text: any) => setIncidentes(text)}
        theme={{ colors: { primary: Color.primary } }}
        left={
          <TextInput.Icon
            name={() => <Icon
              name='comment'
              size={24}
              color={Color.dark}
            />}
            onPress={() => { }}
          />
        }
      />
      <TouchableOpacity
        disabled={indicator}
        style={[styles.btns, { backgroundColor: valid ? Color.secondary : Color.primary }]}
        onPress={press}
      >
        <Text style={styles.btnText}>Enviar encuesta</Text>
      </TouchableOpacity>
      <ActivityIndicator animating={indicator} style={styles.indicator} size="small" color={Color.success} />
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
  },
  indicator: {
    marginTop: 10
  },
  inputs: {
    width: deviceWidth / 1.2,
    marginHorizontal: 10,
    marginTop: 5
  },
})
export default AskScreen;