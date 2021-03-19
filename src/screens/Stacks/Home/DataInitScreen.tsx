import { CommonActions } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react"
import {  StyleSheet, Text, TouchableOpacity, View, BackHandler, Alert, DeviceEventEmitter} from "react-native"
import Wizard from "react-native-wizard";
import Color from "../../../constants/Colors";
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../RouteStack";

import FirstStepScreen from "./DataInit/FirstStep";
import SecondStepScreen from './DataInit/SecondStep';

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const DataInitScreen = (props: Props) => {
  let wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState(true)
  const [isLastStep, setIsLastStep] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [firstEmpty, setFirstEmpty]=useState(false);
  const [secondEmpty, setSecondEmpty]=useState(false);
  const [estudiantes,setEstudiantes]=useState([]);
  const [vivienda,setVivienda]=useState({});
  const firstIsEmpty=(value:any)=>{
    console.log('parent one recibo', value.empty);
    setFirstEmpty(value.empty);
    setVivienda(value.vivienda);
    // console.log(props.route.params)
  }
  const secondIsEmpty=(value:any)=>{
    //console.log('parent second recibo', value);
    setSecondEmpty(value.empty);
    setEstudiantes(value.estudiantes);
    //console.log('lo recibido',value.estudiantes)
    //console.log('in state',estudiantes);
  }

  const backPressed = () => {
    console.log('asas');
    
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      { cancelable: false });
      return true;
  }

  const goAsk=()=>{
    // initialState();
    // const resetAction = props.navigation.reset();
    // props.navigation.dispatch({});
    props.navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [
        { name: 'Ask',params:{token:props.route.params.token,estudiantes:estudiantes, vivienda:vivienda}},
      ],
    }))
    // props.navigation.navigate('HomeStackScreen',{screen:'Ask',params:{token:props.route.params.token,estudiantes:estudiantes, vivienda:vivienda}})
  }
  const stepList = [
    {
      content: <FirstStepScreen navigation={props.navigation} onIsEmptyChange={firstIsEmpty} token={props.route.params.token}>
        <View style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}>
          <TouchableOpacity
            style={styles.btns}
            onPress={() =>   props.navigation.dispatch(CommonActions.reset({
              index: 0,
              routes: [
                { name: 'Home',params:{token:props.route.params.token}}
              ]
            }))}
            >
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
        <TouchableOpacity
          disabled={firstEmpty}
          style={[styles.btns,{backgroundColor:firstEmpty?Color.secondary:Color.primary}]}
          onPress={() => wizard.current.next()}
        >
          <Text style={styles.btnText}>Siguiente</Text>
        </TouchableOpacity>
        </View>
      </FirstStepScreen>
    },
    {
      content: <SecondStepScreen onIsEmptyChange={secondIsEmpty} token={props.route.params.token}>
        <View style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}>
          <TouchableOpacity
            style={styles.btns}
            onPress={() => wizard.current.prev()}
          >
            <Text style={styles.btnText}>Atras</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={secondEmpty}
            style={[styles.btns,{backgroundColor:secondEmpty?Color.secondary:Color.primary}]}
            onPress={goAsk}
          >
            <Text style={styles.btnText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </SecondStepScreen>
    }
  ];
  useEffect(()=>{
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    console.log('dataInit')
    //console.log(props.route.params)
  })
  return (
    <View>
      <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Wizard
          ref={wizard}
          activeStep={0}
          steps={stepList}
          isFirstStep={(val: any) => setIsFirstStep(val)}
          isLastStep={(val: any) => setIsLastStep(val)}
          onNext={() => console.log("next step")}
          onPrev={() => console.log("previous step")}
          currentStep={({ currentStep
            , isLastStep, isFirstStep }) => {
            setCurrentStep(currentStep);
          }}
        />
      </View>
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
    marginHorizontal: 20,
    backgroundColor: Color.primary,
    borderRadius: 10,
    width: 100
  },
  btnText: {
    color: Color.light,
    alignSelf: 'center',
    textAlign: 'center'
  }
})

export default DataInitScreen;