import React from "react"
import { Button, Text, View } from "react-native"
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../RouteStack";

type Props = {
    route: ProfileScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
  };

const AskScreen = (props:Props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Ask</Text>
        <Button
          onPress={() => props.navigation.navigate('Home')}
          title="Go to home"
        />
      </View>
    )
}

export default AskScreen;