import React, { useEffect, useState } from "react"
import { BackHandler, DeviceEventEmitter, Text, StyleSheet, View, TouchableOpacity, Alert, Dimensions, Platform, ToastAndroid, ActivityIndicator } from "react-native"
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../RouteStack";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions } from "@react-navigation/native";
import { check, PERMISSIONS, request } from "react-native-permissions";
import Color from '../../../constants/Colors';
import Storage from "../../../constants/Storage";
import EncuestaServices from "../../../services/EncuestaServices";
import { ShowSnack } from "../../../constants/Snackbar";
import Queue from "../../../constants/Queue";
import axios from "axios";
type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const HomeScreen = (props: Props) => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(0);
  const [local, setLocal] = useState(0);
  const [localv, setLocalv] = useState(0);
  const [locale, setLocale] = useState(0);
  const [inSincro, setInSincro] = useState(false);
  const [visiting, setVisiting]=useState(false);
  const[resting,setResting]=useState(false);
  const [source, setSource] = useState(axios.CancelToken.source());
  const [time, setTime] = useState(0);
  const restPreguntas = () => {
    EncuestaServices.getPreguntas(props.route.params.token)
      .then(result => {
        console.log(result.data)
        Storage.setItem('preguntas', result.data);
      })
      .catch(error => {
        console.log('error home', error)
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
        if (error = "[Error: Network Error]") {
          ShowSnack.show('Fallo de conexión cargando data esencial.', Color.danger)
        }
      });
  }
  const restProvincias = () => {
    EncuestaServices.getParametros(props.route.params.token)
      .then(result => {
        console.log(result.data)
        Storage.setItem('provincias', result.data);
      })
      .catch(error => {
        console.log('error home', error)
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
        if (error = "[Error: Network Error]") {
          ShowSnack.show('Fallo de conexión cargando data esencial.', Color.danger)
        }
      });
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
          ShowSnack.show('Fallo de conexión cargando data esencial.', Color.danger)
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
          ShowSnack.show('Fallo de conexión cargando data esencial.', Color.danger)
        }
      })
  }
  const verify = () => {
    console.log('verify')
    Storage.getItem('all')
      .then(result => {
        if (result) {
          setLocal(0);
          setLocale(0);
          setLocalv(0);
          console.log(result)
          setLocal(result.visita.length +result.solovisita.length)
          setLocale(result.visita.length)
          setLocalv(result.solovisita.length)
        } else {
          setLocal(0)
          setLocale(0)
          setLocalv(0)
        }
      })
    Storage.getItem('usuario')
      .then(result => {
        if (result) {
          setUserName(result.name);
          setUserId(result.id)
        }
      })
  }
  const sincro = () => {
    setInSincro(true);
    timeOut();
    Storage.getItem('all')
      .then(result => {
        console.log(JSON.stringify('visit', result));
        if (result) {
          console.log('para enviar');
          
          console.log(JSON.stringify(result));
          
          EncuestaServices.postAll(props.route.params.token, result)
            .then(result => {
              setInSincro(false);
              timeOut(true);
              Storage.removeItem('all')
              verify();
              Platform.OS == 'ios' ? Alert.alert('Sincronización exitosa.', 'Se han enviado satisfactoriamente las visitas.') : ToastAndroid.show("Sincronizado satisfactoriamente.", ToastAndroid.LONG);
            })
            .catch(error => {
              setInSincro(false);
              timeOut(true);
              console.log(error);
              Alert.alert('Error', 'Ha ocurrido un error, intente en otro momento.');
              if (error.response) {
                console.log(error.response)
              }
              if (error === "[Error: Network Error]") {
                Alert.alert('Sin conexión', 'Conectate a un red para sincronizar');
              }
            })
        } else {
          setInSincro(false);
          timeOut(true);
          ShowSnack.show('No hay visitas para sincronizar.', Color.success)
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Ha ocurrido un error con las visitas, intente en otro momento.');
        setInSincro(false);
        timeOut(true);
      })
  }
  const logout = () => {
    Storage.removeItem('usuario');
    props.navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [
        { name: 'Login' },
      ],
    }))
    // props.navigation.navigate('Login')

  }
  const location = () => {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(result => {
        if (result == 'denied' || result == 'unavailable' || result == 'limited' || result == 'blocked') {
          request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            .then(result => {
              console.log('request ios', result);
            })
            .catch(error => {
              console.log('error ios', error);
            });
        }
        console.log('ios permission', result);
      })
    check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
      .then(result => {
        if (result == 'denied' || result == 'unavailable' || result == 'limited' || result == 'blocked') {
          request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
            .then(result => {
              console.log('result android', result);
            })
            .catch(error => {
              console.log('error android', error);
            })
        }
        console.log('android permissions', result);
      })

  }
  const nonChild = () => {
    setVisiting(true);
    const date = new Date().toISOString();
    console.log({ userId: userId, fecha: date })
    let cola = new Queue();
    cola.addVisita({ userId: userId, fecha: date });
    Alert.alert('Visita guardada', 'Se ha guadado satisfactoriamente la visita.',
    [
      {
        text: 'Ok',
        onPress: ()=>{
          verify();
          setVisiting(false);
        }
      }
    ]);
    // verify();
  }
  const fontSizer = (n: number) => {
    let size = 60;
    if (n > 999) {
      size = 50
    }
    if (n > 9999) {
      size = 40
    }
    if (n > 99999) {
      size = 30
    }
    return size;
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


  useEffect(() => {
    

    console.log('token in home',props.route.params.token)
    verify();
    restProvincias();
    restPreguntas();
    restParentesco();
    restCursos();
    location();
    DeviceEventEmitter.removeAllListeners('hardwareBackPress')
    DeviceEventEmitter.addListener('hardwareBackPress', () => {
      let invokeDefault = true
      BackHandler.exitApp()

    })
    return () => {
      DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    };

  }, [])
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
              <Text style={[styles.numCol,{fontSize:fontSizer(locale)}]}>{locale}</Text>
              {!resting && <Icon
                name='how-to-reg'
                size={34}
                color={Color.light}
              />}
              {resting &&
                <ActivityIndicator animating={resting} style={styles.indicator} size="small" color={Color.light} />
              }
            </View>
            <Text style={styles.decripCol}> Visitas Efectivas</Text>
            
          </View>
          <View style={styles.col2}>
            <View style={styles.titleCol}>
              <Text style={[styles.numCol,{fontSize:fontSizer(localv)}]}>{localv}</Text>
              {!resting && <Icon
                name='person-remove'
                size={34}
                color={Color.light}
              />}
              {resting &&
                <ActivityIndicator animating={resting} style={styles.indicator} size="small" color={Color.light} />
              }
            </View>
            <Text style={styles.decripCol}>Visitas No Efectivas</Text>
          </View>
        </View>
        <View style={styles.secondRow}>
          <View style={styles.titleCol}>
            <Text style={[styles.numCol, { fontSize: fontSizer(local) }]}>{local}</Text>
            {!inSincro && <Icon
              name='cached'
              size={34}
              color={Color.light}
              onPress={sincro}
            />}
            {inSincro &&
              <ActivityIndicator animating={inSincro} style={styles.indicator} size="small" color={Color.light} />
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
        <Text style={styles.btnText}>Nueva visita</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btns}
        disabled={visiting}
        onPress={nonChild}
      >
        <Text style={styles.btnText}>Visita sin niño</Text>
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
    marginHorizontal: 10,
    justifyContent: 'center'
  },
  btnText: {
    color: Color.light,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
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
  secondRow: {
    backgroundColor: Color.third,
    width: deviceWidth / 1.08,
    height: deviceHeight / 5,
    borderRadius: 10,
    marginTop: 19,
    overflow: 'hidden',
    alignSelf: 'center'
  },
  viewBtns: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 60,
    width: Platform.OS == 'android' ? deviceHeight / 1.8 : deviceHeight / 2,
    height: Platform.OS == "android" ? deviceHeight / 1.8 : deviceHeight / 2,
    borderRadius: 500,
    backgroundColor: Color.secondary,
    position: 'absolute',
    bottom: Platform.OS == 'android' ? (-deviceHeight) / 4.2 : (-deviceHeight) / 5
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
  indicator: {
    marginTop: 5,
    marginRight: 10
  },
})
export default HomeScreen;