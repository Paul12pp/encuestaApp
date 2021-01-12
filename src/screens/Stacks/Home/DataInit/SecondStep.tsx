import React from "react"
import { Button, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
// import { Props } from "react-native-paper/lib/typescript/components/RadioButton/RadioButtonItem";
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../../RouteStack";

type Props = {
    // route: ProfileScreenRouteProp;
    // navigation: ProfileScreenNavigationProp;
};
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const SecondStepScreen: React.FC<Props> = (props: any) => {
    return (
        <SafeAreaView style={styles.content}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text>Estudiantes</Text>
                {props.children}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // alignSelf:'center'
    },
    inputs: {
        width: deviceWidth / 1.2,
        marginHorizontal: 10,
        marginTop: 5
    },
    dropdownStyle: {
        width: deviceWidth / 1.2,
        height: 50,
        marginTop: 10,
        alignSelf: 'center'
    },
    scrollView: {
        // alignSelf:'center',
        // alignSelf:'center',
        // flex:1,
        height: deviceHeight,
        width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink',
        // marginHorizontal: 20,
        // marginTop:20

    },
});

export default SecondStepScreen;