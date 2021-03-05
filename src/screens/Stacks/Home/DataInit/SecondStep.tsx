import React, { useEffect, useState } from "react"
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, Alert, View, Platform } from "react-native"
import DropDownPicker from "react-native-dropdown-picker";
// import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import { DataTable, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import Color from "../../../../constants/Colors";
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import EncuestaServices from "../../../../services/EncuestaServices";
import Storage from "../../../../constants/Storage";
import { Curso } from "../../../../constants/interfaces";

type Props = {
    // route: ProfileScreenRouteProp;
    // navigation: ProfileScreenNavigationProp;
    onIsEmptyChange:any;
    token:string;
};
interface Estudiantes{
    EstudianteId:number;
    nombre:string;
    Edad:string;
    cursoId:string;
    Escuela:string;
}
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
let controller;
const SecondStepScreen = (props: Props) => {
    const navigation = useNavigation();
    const [itemsC, setItemsC] = useState<Curso[]>([]);
    const [estudiantes, setEstudiantes] = useState<Estudiantes[]>([]);
    const [estudy, setEstudy] = useState<Estudiantes>({
        EstudianteId:1,
        nombre: '',
        Edad: '',
        cursoId: '',
        Escuela: '',
    });
    const addStudent = () => {
        if(isEmpty(estudy)){
            Platform.OS=='ios' ? Alert.alert('Datos incompletos','Complete los datos') : ToastAndroid.show("Datos incompletos.", ToastAndroid.LONG);
        }else{
            setEstudiantes(estudiantes.concat({EstudianteId:new Date().getMilliseconds(),nombre:estudy.nombre,Edad:estudy.Edad,cursoId:estudy.cursoId,Escuela:estudy.Escuela}));
            setEstudy({EstudianteId:1,
                nombre: '',
                Edad: '',
                cursoId: '',
                Escuela: '',})
        }
    }
    const deleteEstudiante=(n:number)=>{
        setEstudiantes(estudiantes.filter((val,index)=>index!=n))
    }
    const isEmpty=(obj:any)=> {
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
                EncuestaServices.getCursos(props.token)
                    .then(result => {
                        Storage.setItem('cursos', result.data);
                        console.log('cursos', result.data)
                        setItemsC(result.data.map(({ id, description }:Curso) => {
                            return { label: description, value: id };
                        }))
                    })
                    .catch(error => {
                        console.log(error)
                    })

            } else {
                    Storage.getItem('cursos')
                    .then(result => {
                        setItemsC(result.map(({ id, description }:Curso) => {
                            return { label: description, value: id };
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
                    });
            }
        })
    }
    const logout = () => {
        Storage.removeItem('usuario');
        navigation.navigate('Login')
    }
    useEffect(()=>{
        console.log(estudiantes)
        console.log(estudy)
        props.onIsEmptyChange({empty:estudiantes.length==0,estudiantes:estudiantes});
    })
    useEffect(() => {
        rest();
    }, [])
    return (
        <SafeAreaView style={styles.content}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>Estudiantes</Text>
                <TextInput
                    mode="outlined"
                    style={styles.inputs}
                    label="Nombre"
                    value={estudy.nombre}
                    onChangeText={text => setEstudy({...estudy,['nombre']:text})}
                    theme={{colors: {primary: Color.primary}}}
                    left={
                        <TextInput.Icon
                            name={() => <Icon
                                name='person'
                                size={24}
                                color={Color.dark}
                            />} 
                            onPress={() => { }}
                        />
                    }
                />
                <TextInput
                    mode="outlined"
                    style={styles.inputs}
                    label="Edad"
                    value={estudy.Edad}
                    keyboardType="number-pad"
                    onChangeText={text => setEstudy({...estudy,['Edad']:text.replace(/[^0-9]/g, '')})}
                    theme={{colors: {primary: Color.primary}}}
                    left={
                        <TextInput.Icon
                            name={() => <Icon
                                name='tag'
                                size={24}
                                color={Color.dark}
                            />} // where <Icon /> is any component from vector-icons or anything else
                            onPress={() => { }}
                        />
                    }
                />
                <RNPickerSelect
                    // pickerProps={{ac}}
                    placeholder={{ label: 'Curso', value: '' }}
                    style={{
                        ...customPickerStyles, iconContainer: {
                            position: 'absolute',
                            alignSelf: 'flex-start',
                            top: 20,
                            right: Platform.OS=='ios'?40:10
                        }
                    }}
                    value={estudy.cursoId}
                    onValueChange={(text) => setEstudy({...estudy,['cursoId']:text})}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                        return <Icon
                            name='keyboard-arrow-down'
                            size={24}
                            color={Color.dark}
                        />;
                    }}
                    items={itemsC}
                />
                {/* <DropDownPicker
                    controller={instance => controller = instance}
                    containerStyle={styles.dropdownStyle}
                    zIndex={5000}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    labelStyle={{
                        fontSize: 14,
                        textAlign: 'left',
                        color:Color.dark
                    }}
                    activeLabelStyle={{ color: 'red' }}
                    style={{ borderColor:Color.dark, backgroundColor: Color.light }}
                    items={itemsC}
                    defaultValue={null}
                    onChangeItem={item => setEstudy({...estudy,['cursoId']:item.value})}
                    placeholder="Curso"
                    placeholderStyle={{ color: 'gray' }}
                    searchable={true}
                    searchablePlaceholder="Buscar"
                    searchablePlaceholderTextColor={Color.dark}
                /> */}
                <TextInput
                    mode="outlined"
                    style={styles.inputs}
                    label="Centro Educativo"
                    value={estudy.Escuela}
                    onChangeText={text => setEstudy({...estudy,['Escuela']:text})}
                    theme={{colors: {primary: Color.primary}}}
                    left={
                        <TextInput.Icon
                            name={() => <Icon
                                name='school'
                                size={24}
                                color={Color.dark}
                            />} 
                            onPress={() => { }}
                        />
                    }
                />
                <TouchableOpacity style={styles.btns}
                    onPress={addStudent}>
                    <Text style={styles.btnText}>Agregar Estudiante</Text>
                </TouchableOpacity>
                <DataTable style={styles.dataTable}>
                    <DataTable.Header>
                        <DataTable.Title>Nombre</DataTable.Title>
                        <DataTable.Title>Acción</DataTable.Title>
                    </DataTable.Header>
                    {
                        estudiantes.map((est, index) => {
                            return (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell>{est.nombre}</DataTable.Cell>
                                    <DataTable.Cell>
                                        <Icon
                                            name='delete'
                                            size={24}
                                            color={Color.dark}
                                            onPress={() => deleteEstudiante(index)}
                                        />
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                        })
                    }
                    {/* <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.floor(estudiantes.length / itemsPerPage)}
                        onPageChange={(page)=>console.log(Math.floor(estudiantes.length / itemsPerPage))}
                        label={`${from + 1}-${to} of ${items.length}`}
                    /> */}
                </DataTable>
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
    title:{
        fontWeight:'bold',
        fontSize:18
    },
    inputs: {
        width: deviceWidth / 1.2,
        marginHorizontal: 10,
        marginTop: 5
    },
    dropdownStyle: {
        // zIndex:5000,
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
    btns: {
        padding: 10,
        marginTop: 10,
        backgroundColor: Color.primary,
        borderRadius: 10,
        width: 200
    },
    btnText: {
        color: Color.light,
        alignSelf: 'center',
        textAlign: 'center'
    },
    dataTable: {
        marginTop: 8,
        width: deviceWidth / 1.2,
        borderWidth: 1,
        borderColor: Color.dark
    },
    scrollViewTable:{
        height:50
    }
});
const customPickerStyles = StyleSheet.create({
    inputIOS: {
        marginTop:10,
        width:deviceWidth/1.2,
        alignSelf:'center',
        fontSize: 14,
        paddingVertical: 17,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        marginTop:10,
        width: deviceWidth / 1.2,
        alignSelf: 'center',
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    }

});

export default SecondStepScreen;