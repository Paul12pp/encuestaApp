import React, { useEffect, useState } from "react"
import { Alert, Dimensions, StyleSheet, Text } from "react-native"
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Color from "../../../../constants/Colors";
import EncuestaServices from "../../../../services/EncuestaServices";
import Storage from "../../../../constants/Storage";
import { Parentesco } from "../../../../constants/interfaces";

type Props = {
    // route: ProfileScreenRouteProp;
    // navigation: ProfileScreenNavigationProp;
    onIsEmptyChange: any;
    token: string;
};
interface Vivienda {
    nombre: string;
    parentescoId: string;
    direccion: string;
    telefono: string;
    coordenadas:string;
    UserId?:number;
}
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const FirstStepScreen = (props: Props) => {
    const navigation=useNavigation();
    const [items, setItems] = useState<Parentesco[]>([]);
    const [vivienda, setVivienda] = useState<Vivienda>({
        nombre: '',
        parentescoId: '',
        direccion: '',
        telefono: '',
        coordenadas:'0,-0',
        UserId:0
    });
    const isEmpty = (obj: any) => {
        for (var key in obj) {
            if (obj[key] == null || obj[key] == "")
                return true;
        }
        return false;
    }
    const rest = () => {
        NetInfo.fetch().then(state => {
            //if internet valid
            if (state.isConnected && state.isInternetReachable) {
                EncuestaServices.getParentesco(props.token)
                    .then(result => {
                        Storage.setItem('parentesco', result.data);
                        console.log('parentesco', result.data)
                        setItems(result.data.map(({ Id, Description }: Parentesco) => {
                            return { label: Description, value: Id };
                        }))
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                Storage.getItem('parentesco')
                    .then(result => {
                        setItems(result.map(({ Id, Description }: Parentesco) => {
                            return { label: Description, value: Id };
                        }))
                    })
                    .catch((err) => {
                        Alert.alert('Sin data', 'Inice sesión con Internet.',
                        [
                            {
                              text: 'Ok',
                              onPress: logout
                            }
                        ]);
                        // logout();
                    })
            }
        })
    }
    const user=()=>{
        Storage.getItem('usuario')
        .then(result=>{
            setVivienda({...vivienda,['UserId']:result.Id})
        })
    }
    const logout = () => {
        Storage.removeItem('usuario');
        navigation.navigate('Login')
    }
    useEffect(() => {
        console.log('cambio')
        console.log(vivienda)
        props.onIsEmptyChange({empty:isEmpty(vivienda),vivienda:vivienda});
    })
    useEffect(() => {
        rest();
        user();
        // user();
    }, [])

    return (
        <SafeAreaView style={styles.content}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>Datos de vivienda</Text>
                <TextInput
                    mode="outlined"
                    style={styles.inputs}
                    label="Recibido por"
                    value={vivienda.nombre}
                    onChangeText={text => setVivienda({ ...vivienda, ['nombre']: text })}
                    theme={{ colors: { primary: Color.primary } }}
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
                        color: Color.dark
                    }}
                    activeLabelStyle={{ color: Color.danger }}
                    style={{ borderColor: Color.dark, backgroundColor: Color.light }}
                    items={items}
                    defaultValue={null}
                    onChangeItem={item => setVivienda({ ...vivienda, ['parentescoId']: item.value })}
                    placeholder="Parentesco"
                    placeholderStyle={{ color: Color.dark }}
                    searchable={true}
                    searchablePlaceholder="Buscar"
                    searchablePlaceholderTextColor={Color.dark}
                />
                <TextInput
                    mode="outlined"
                    style={styles.inputs}
                    label="Dirección"
                    value={vivienda.direccion}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={text => setVivienda({ ...vivienda, ['direccion']: text })}
                    theme={{ colors: { primary: Color.primary } }}
                    left={
                        <TextInput.Icon
                            name={() => <Icon
                                name='map-marker'
                                size={24}
                                color={Color.dark}
                            />} // where <Icon /> is any component from vector-icons or anything else
                            onPress={() => { }}
                        />
                    }
                />
                <TextInput
                    mode="outlined"
                    style={styles.inputs}
                    label="Teléfono"
                    value={vivienda.telefono}
                    keyboardType="phone-pad"
                    theme={{ colors: { primary: Color.primary } }}
                    onChangeText={text => setVivienda({ ...vivienda, ['telefono']: text })}
                    left={
                        <TextInput.Icon
                            name={() => <Icon
                                name='phone'
                                size={24}
                                color={Color.dark}
                            />} // where <Icon /> is any component from vector-icons or anything else
                            onPress={() => { }}
                        />
                    }
                />
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
    title: {
        fontWeight: 'bold',
        fontSize: 18
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
export default FirstStepScreen;