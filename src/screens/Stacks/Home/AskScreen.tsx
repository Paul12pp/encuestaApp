import React, { useEffect,useState } from "react"
import { Button, Text, View } from "react-native"
import Storage from "../../../constants/Storage";
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../RouteStack";

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const AskScreen = (props: Props) => {
  const [listado, setListado] = useState([]);
  useEffect(() => {
    Storage.getItem('preguntas').then((result) => {
      //console.log('listado',result);  
      setListado(result);
    })
    console.log(listado);
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Ask</Text>
      <Button
        onPress={() => props.navigation.navigate('Home')}
        // onPress={() => console.log(listado[0].opciones)}
        title="Go to home"
      />
    </View>
  )
}

export default AskScreen;