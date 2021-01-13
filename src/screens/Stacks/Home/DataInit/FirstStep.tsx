import React, { useState } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from "react-native-gesture-handler";

import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    // route: ProfileScreenRouteProp;
    // navigation: ProfileScreenNavigationProp;

};
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const FirstStepScreen: React.FC<Props> = (props: any) => {
    const [recibido, setRecibido] = useState('');
    const [parentesco, setParentesco] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [items, setItems] = useState([{ label: 'item1', value: 1 }, { label: 'item2', value: 2 }]);
    return (
        <SafeAreaView style={styles.content}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text>Datos de vivienda</Text>
                <TextInput
                    mode="outlined"
                    style={styles.inputs}
                    label="Recibido por"
                    value={recibido}
                    onChangeText={text => setRecibido(text)}
                    left={
                        <TextInput.Icon
                            name={() => <Icon
                                name='user'
                                size={24}
                                color='black'
                            />} // where <Icon /> is any component from vector-icons or anything else
                            onPress={() => { }}
                        />
                    }
                />
                <DropDownPicker
                    containerStyle={styles.dropdownStyle}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    labelStyle={{
                        fontSize: 14,
                        textAlign: 'left',
                        color: 'black'
                    }}
                    activeLabelStyle={{color:'red'}}
                    style={{ borderColor: 'black', backgroundColor: 'white' }}
                    items={items}
                    defaultValue={null}
                    onChangeItem={item => setParentesco((item.value))}
                    placeholder="Parentesco"
                    placeholderStyle={{ color: 'gray' }}
                    searchable={true}
                    searchablePlaceholder="Buscar"
                    searchablePlaceholderTextColor="gray"
                />
                <TextInput
                    mode="outlined"
                    style={styles.inputs}
                    label="Dirección"
                    value={direccion}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={text => setDireccion(text)}
                    left={
                        <TextInput.Icon
                            name={() => <Icon
                                name='map-marker'
                                size={24}
                                color='black'
                            />} // where <Icon /> is any component from vector-icons or anything else
                            onPress={() => { }}
                        />
                    }
                />
                <TextInput
                    mode="outlined"
                    style={styles.inputs}
                    label="Teléfono"
                    value={telefono}
                    // selectionColor='red'
                    onChangeText={text => setTelefono(text)}
                    left={
                        <TextInput.Icon
                            name={() => <Icon
                                name='phone'
                                size={24}
                                color='black'
                            />} // where <Icon /> is any component from vector-icons or anything else
                            onPress={() => { }}
                        />
                    }
                />
                {props.children}
                <Text>{parentesco}</Text>
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
        marginTop:5
    },
    dropdownStyle: {
        width: deviceWidth / 1.2,
        height: 50,
        marginTop: 10,
        alignSelf:'center'
    },
    scrollView: {
        // alignSelf:'center',
        // alignSelf:'center',
        // flex:1,
        height:deviceHeight,
        width:deviceWidth,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor: 'pink',
        // marginHorizontal: 20,
        // marginTop:20

    },
});
export default FirstStepScreen;