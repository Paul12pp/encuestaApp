import React, { useRef, useState } from "react"
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Wizard from "react-native-wizard";
import Color from "../../../constants/Colors";
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../RouteStack";
import FirstStepScreen from "./DataInit/FirstStep";
import SecondStepScreen from './DataInit/SecondStep';
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
  token:string;
};

const DataInitScreen = (props: Props) => {
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState(true)
  const [isLastStep, setIsLastStep] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const stepList = [
    {
      content: <FirstStepScreen>
        <TouchableOpacity
          style={styles.btns}
          onPress={() => wizard.current.next()}
        >
          <Text style={styles.btnText}>Siguiente</Text>
        </TouchableOpacity>
      </FirstStepScreen>
    },
    {
      content: <SecondStepScreen>
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
            style={styles.btns}
            onPress={() => props.navigation.navigate('Ask',{token:props.token})}
          >
            <Text style={styles.btnText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </SecondStepScreen>
    }
  ]
  return (
    <View>
      {/* <SafeAreaView>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "#FFF",
            borderBottomColor: "#dedede",
            borderBottomWidth: 1,
          }}>
          <Button disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()} />
          <Text>{currentStep + 1}. Step</Text>
          <Button disabled={isLastStep} title="Next" onPress={() => wizard.current.next()} />
        </View>
      </SafeAreaView> */}
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
        {/* <Button
          onPress={() => props.navigation.navigate('Home')}
          title="Go to home"
        /> */}
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