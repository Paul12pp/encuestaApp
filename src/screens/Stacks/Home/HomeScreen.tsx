import React, { useEffect, useState } from "react"
import { Text, StyleSheet, View, TouchableOpacity, Alert, Dimensions, Platform, ToastAndroid, ActivityIndicator } from "react-native"
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../RouteStack";
import Icon from "react-native-vector-icons/MaterialIcons";
import Color from '../../../constants/Colors';
import Storage from "../../../constants/Storage";
import EncuestaServices from "../../../services/EncuestaServices";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShowSnack } from "../../../constants/Snackbar";
import { CommonActions } from "@react-navigation/native";

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const HomeScreen = (props: Props) => {
  const [userName, setUserName] = useState('');
  const [local, setLocal] = useState(0);
  const [inSincro, setInSincro] = useState(false);
  const[resting,setResting]=useState(false);
  const [parametros, setParametros] = useState({
    ByMe: 0,
    All: 0
  });
  const restPreguntas = () => {
    EncuestaServices.getPreguntas(props.route.params.token)
      .then(result => {
        Storage.setItem('preguntas', result.data);
      })
      .catch(error => {
        console.log('error home', error)
        if(error="[Error: Network Error]"){
          ShowSnack.show('Fallo de conexión cargando data esencial.',Color.danger)
        }
        if (error.response) {
          if (error.response.status === 401) {
            Alert.alert('Token vencido', 'Inice sesión con Internet.',
              [
                {
                  text: 'Ok',
                  onPress: logout
                }
              ]);
          }
    }
  });
  }
  const restParametros=()=>{
    setResting(true);
    console.log('resting toke', props.route.params.token)
    EncuestaServices.getParametros(props.route.params.token)
      .then(result => {
        setParametros({
          ByMe: result.data.ByMe,
          All: result.data.All
        })
        setResting(false);
      })
      .catch(error => {
        if (error = "[Error: Network Error]") {
          ShowSnack.show('Fallo de conexión cargando data esencial.',Color.danger)
        }
        console.log('error aqui', error)
        setResting(false);
      })
  }
  const restParentesco = () => {
    EncuestaServices.getParentesco(props.route.params.token)
      .then(result => {
        Storage.setItem('parentesco', result.data);
        console.log('parentesco', result.data)
      })
      .catch(error => {
        console.log(error)
        if (error = "[Error: Network Error]") {
          ShowSnack.show('Fallo de conexión cargando data esencial.',Color.danger)
        }
      })
  }
  const restCursos = () => {
    EncuestaServices.getCursos(props.route.params.token)
      .then(result => {
        Storage.setItem('cursos', result.data);
        console.log('cursos', result.data)
      })
      .catch(error => {
        console.log(error)
        if (error = "[Error: Network Error]") {
          ShowSnack.show('Fallo de conexión cargando data esencial.',Color.danger)
        }
      })
  }
  const verify = () => {
    Storage.getItem('respuestas')
    .then(result=>{
      if(result){
        console.log(result)
        setLocal(result.length)
      }else{
        setLocal(0)
      }
    })
    Storage.getItem('usuario')
      .then(result => {
        if (result) {
          setUserName(result.name);
        }
      })
  }
  const sincro = () => {
    setInSincro(true);
    ShowSnack.show('Sincronizando data.',Color.success)
    Storage.getItem('respuestas')
    .then(result=>{
      console.log(JSON.stringify(result));
      if(result){
        EncuestaServices.postListRespuestas(props.route.params.token, result)
          .then(result => {
            setInSincro(false);
            Storage.removeItem('respuestas')
            restParametros();
            verify();
            Platform.OS == 'ios' ? Alert.alert('Sincronización exitosa.', 'Se han enviado satisfactoriamente las encuestas.') : ToastAndroid.show("Sincronizado satisfactoriamente.", ToastAndroid.LONG);
          })
          .catch(error => {
            setInSincro(false);
            console.log(error);
            Alert.alert('Error','Ha ocurrido un error, intente en otro momento.');
            if(error.response){
              console.log(error.response)
            }
            if(error==="[Error: Network Error]"){
              Alert.alert('Sin conexión', 'Conectate a un red para sincronizar');
            }
          })
      }else{
        setInSincro(false);
        ShowSnack.show('No hay data para sincronizar.',Color.success)
      }
    })
    .catch(error=>{
      Alert.alert('Error','Ha ocurrido un error, intente en otro momento.');
      setInSincro(false);
    })
  }
  const logout = () => {
    Storage.removeItem('usuario');
    props.navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [
        { name: 'Login'},
      ],
    }))
    // props.navigation.navigate('Login')

  }
  useEffect(() => {
    verify();
    restPreguntas();
    restParametros();
    restParentesco();
    restCursos();
  },[])
  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.dashboard}>
        <View style={styles.viewUserName}>
          <Text style={styles.userName}>{userName}</Text>
          <Icon
            style={{ marginRight: 10 }}
            name='leaderboard'
            size={60}
            color={Color.danger
            }
          />
        </View>
        <View style={styles.firstRow}>
          <View style={styles.col1}>
            <View style={styles.titleCol}>
              <Text style={styles.numCol}>{parametros.All}</Text>
              {!resting && <Icon
                name='people'
                size={34}
                color={Color.light}
              />}
              {resting &&
                <ActivityIndicator animating={resting} style={styles.indicator} size="small" color={Color.light} />
              }
            </View>
            <Text style={styles.decripCol}>Cantidad de entrevistados</Text>
          </View>
          <View style={styles.col2}>
            <View style={styles.titleCol}>
              <Text style={styles.numCol}>{parametros.ByMe}</Text>
              {!resting && <Icon
                name='grading'
                size={34}
                color={Color.light}
              />}
              {resting &&
                <ActivityIndicator animating={resting} style={styles.indicator} size="small" color={Color.light} />
              }
            </View>
            <Text style={styles.decripCol}>Cantidad de entrevistados por mi</Text>
          </View>
        </View>
        <View style={styles.secondRow}>
        <View style={styles.titleCol}>
              <Text style={styles.numCol}>{local}</Text>
              {!inSincro&&<Icon
                name='cached'
                size={34}
                color={Color.light}
                onPress={sincro}
              />}
              {inSincro &&
                <ActivityIndicator animating={resting} style={styles.indicator} size="small" color={Color.light} />
              }
            </View>
            <Text style={styles.decripCol}>Cantidad no sincronizada</Text>
        </View>
      </View>
      <View style={styles.viewBtns}>
      <TouchableOpacity
        style={styles.btns}
        onPress={() => props.navigation.navigate('HomeStackScreen', { screen: 'DataInit', params: { token:props.route.params.token } })}
      >
        <Text style={styles.btnText}>Nueva encuesta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btns}
        onPress={logout}
      >
        <Text style={styles.btnText}>Cerrar sesión</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  dashboard: {
    // backgroundColor:Color.danger,
    width: deviceWidth,
    height: deviceHeight / 2,
    paddingHorizontal: 5
  },
  btns: {
    padding: 10,
    marginTop: 10,
    backgroundColor: Color.primary,
    borderRadius: 10,
    width: 210,
    marginHorizontal:10,
    justifyContent:'center'
  },
  btnText: {
    color: Color.light,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight:'bold',
    fontSize:18
  },
  viewUserName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  col1: {
    backgroundColor: Color.success,
    width: deviceWidth / 2.3,
    borderRadius: 8,
    height: deviceHeight / 5,
    overflow: 'hidden'
  },
  col2: {
    backgroundColor: Color.warning_light,
    width: deviceWidth / 2.3,
    borderRadius: 10,
    height: deviceHeight / 5,
    overflow: 'hidden'
  },
  titleCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  numCol: {
    color: Color.light,
    fontSize: 60
  },
  decripCol: {
    color: Color.light,
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  userName: {
    color: Color.dark,
    fontSize: 30,
    marginTop: 10,
    marginLeft: 10
  },
  secondRow:{
    backgroundColor:Color.third,
    width:deviceWidth/1.08,
    height:deviceHeight/5,
    borderRadius:10,
    marginTop:19,
    overflow:'hidden',
    alignSelf:'center'
  },
  viewBtns:{
    alignItems:'center',
    marginTop:20,
    paddingTop:90,
    width:Platform.OS=='android'?deviceHeight/1.8:deviceHeight/2,
    height:Platform.OS=="android"?deviceHeight/1.8:deviceHeight/2,
    borderRadius:500,
    backgroundColor:Color.secondary,
    position: 'absolute',
    bottom:Platform.OS=='android'?(-deviceHeight)/4.2:(-deviceHeight)/5
  },
  sincro: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  sincroText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
  indicator:{
    marginTop:5,
    marginRight:10
  },
})
export default HomeScreen;