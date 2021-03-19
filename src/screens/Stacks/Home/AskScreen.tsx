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
    const respuestaFinal = values.filter(function(el: any){
      return el != null;
    })
    const data = {
      ...props.route.params.vivienda,
      EncuestaId: 1,
      Estudiantes: props.route.params.estudiantes,
      respuestas: respuestaFinal,
      Incidentes: incidentes
    }
    let cola = new Queue();
    cola.addElement(data);
    console.log('data', data)
    setIndicator(false);
    Alert.alert('Envuesta guardada', 'Se ha guardado satisfactoriamente la encuesta.',
      [
        {
          text: 'Ok',
          onPress: () => { props.navigation.navigate('HomeStackScreen', { screen: 'Home', params: { token: props.route.params.token } }) }
        }
      ]);
  }
  const recibeData = (value: any) => {
    console.log(value);
    console.log('valor');
    let isChecker : boolean = (value.data.basura) ? true : false;
    console.log(isChecker);
    
    if(!isChecker){
      
      console.log('recibido', value);
    const temp = values;
    console.log(values);
    
    temp[value.index] = value.data;
    console.log('despues');
    console.log(temp[value.index]);
    
    console.log(temp);
    
    setValues(temp);
    // console.log('in state',values)
    let valid = values.filter((element: any) => isEmpty(element))
    console.log(valid);
    
    setValid(valid.length > 0 ? true : false);
    console.log('otro valid', valid);
    // console.log(valid)
    }else{
      if(!value.delete){
        let temp = [...values];
        temp.push(value.data)
        setValues(temp)
      }else{
        let temp = [...values];
        let respuestaFinal = values.filter(function(el: any){
          return el != null;
        })
        var removedIndex = respuestaFinal.map(function(item) { return item.respuestaId; }).indexOf(value.data.respuestaId);
        
        respuestaFinal.splice(removedIndex, 1)
        setValues(respuestaFinal)
        console.log(respuestaFinal);
        
      }
     
    }
    
  }
  const isEmpty = (obj: any) => {
    for (var key in obj) {
      // console.log(obj)
      if (obj[key] == null || obj[key] == "")
        return true;
    }
    return false;
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
      <Text style={styles.title}>Visita</Text>
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
        disabled={valid}
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