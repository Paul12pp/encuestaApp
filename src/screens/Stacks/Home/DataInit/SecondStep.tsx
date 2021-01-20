import React, { useState } from "react"
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataTable, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

// import { Props } from "react-native-paper/lib/typescript/components/RadioButton/RadioButtonItem";
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../../../RouteStack";

type Props = {
    // route: ProfileScreenRouteProp;
    // navigation: ProfileScreenNavigationProp;
};
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const itemsPerPage = 3;
// const itemStudents = [{ nombre: 'Paul', edad: 15, curso: '6to' }, { nombre: 'Juan', edad: 14, curso: '5to' }];
const SecondStepScreen: React.FC<Props> = (props: any) => {
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [curso, setCurso] = useState('');
    const [centro, setCentro] = useState('');
    const [items, setItems] = useState([{ label: 'item1', value: 1 }, { label: 'item2', value: 2 }]);
    const [estudiantes, setEstudiantes] = useState([{ nombre: 'Paul', edad: 15, curso: '6to' }, { nombre: 'Juan', edad: 14, curso: '5to' }]);
    const [page, setPage] = React.useState(0);
    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;

    const addStudent = () => {
        setEstudiantes(estudiantes.concat({nombre,edad:Number(edad),curso}));
    }
    return (
        <SafeAreaView style={styles.content}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text>Estudiantes</Text>
                <TextInput
                    mode="outlined"
                    style={styles.inputs}
                    label="Nombre"
                    value={nombre}
                    onChangeText={text => setNombre(text)}
                    left={
                        <TextInput.Icon
                            name={() => <Icon
                                name='user'
                                size={24}
                                color='black'
                            />} 
                            onPress={() => { }}
                        />
                    }
                />
                <TextInput
                    mode="outlined"
                    style={styles.inputs}
                    label="Edad"
                    value={edad}
                    onChangeText={text => setEdad(text)}
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
                <TextInput
                    mode="outlined"
                    style={styles.inputs}
                    label="Curso"
                    value={curso}
                    onChangeText={text => setCurso(text)}
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
                    activeLabelStyle={{ color: 'red' }}
                    style={{ borderColor: 'black', backgroundColor: 'white' }}
                    items={items}
                    defaultValue={null}
                    onChangeItem={item => setCentro((item.value))}
                    placeholder="Centro Educativo"
                    placeholderStyle={{ color: 'gray' }}
                    searchable={true}
                    searchablePlaceholder="Buscar"
                    searchablePlaceholderTextColor="gray"
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
                                            name='pencil'
                                            size={24}
                                            color='black'
                                            onPress={() => console.log('icon')}
                                        />
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                        })
                    }
                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.floor(estudiantes.length / itemsPerPage)}
                        onPageChange={(page)=>console.log("changepage")}
                        label={`${from + 1}-${to} of ${items.length}`}
                    />
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
    btns: {
        padding: 10,
        marginTop: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 200
    },
    btnText: {
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center'
    },
    dataTable: {
        marginTop: 8,
        width: deviceWidth / 1.2,
        borderWidth: 1,
        borderColor: 'gray'
    }
});

export default SecondStepScreen;