import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native';
import Color from '../constants/Colors';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome";
import {  DataTable } from 'react-native-paper';
import { Pregunta } from '../constants/interfaces';

const deviceWidth = Dimensions.get('window').width;

type Props = {
    data: Pregunta;
    estudiantes: any[];
    value: any;
    enviaData: any;
}
const PreguntaComponent = (props: Props) => {
    const [items, setItems] = useState<any>([])
    const cambio=(text:any, id?:number)=>{
        console.log('change', text)
        id 
        ? props.enviaData({ index: props.value, data: { preguntaId: props.data.id, respuestaId: text, EstudianteId:id } })
        : props.enviaData({ index: props.value, data: { preguntaId: props.data.id, respuestaId: text } });
    }
    useEffect(()=>{
        // console.log('data',props.data)
        setItems(props.data.opciones.map(({ id, description }) => {
            return { label: description, value: id };
        }))
        // console.log(props.data.opciones)
    },[])

    return (
        <View style={styles.item}>
            <Text style={styles.pregunta}>{props.data.description}</Text>
            {!props.data.isTabla &&
                <RNPickerSelect
                    // pickerProps={{ac}}
                    placeholder={{ label: 'Opción', value: '' }}
                    style={{
                        ...customPickerStyles, iconContainer: {
                            position: 'absolute',
                            alignSelf: 'flex-start',
                            top: 10,
                            right: 40
                        }
                    }}
                    onValueChange={(text) => cambio(text)}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                        return <Icon
                            name='sort-down'
                            size={24}
                            color={Color.dark}
                        />;
                    }}
                    items={items}
                />
            }
            {props.data.isTabla &&
                <DataTable style={styles.dataTable}>
                    <DataTable.Header>
                        <DataTable.Title>Nombre</DataTable.Title>
                        <DataTable.Title>Opción</DataTable.Title>
                    </DataTable.Header>
                    {
                        props.estudiantes.map((est, index) => {
                            return (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell>{est.nombre}</DataTable.Cell>
                                    <DataTable.Cell>
                                        <RNPickerSelect
                                            // pickerProps={{ac}}
                                            placeholder={{ label: 'Opción', value: '' }}
                                            style={{
                                                ...customPickerStylesTabla, iconContainer: {
                                                    position: 'absolute',
                                                    alignSelf: 'flex-start',
                                                    top: Platform.OS == 'ios' ? 5 : 2,
                                                    right: Platform.OS == 'ios' ? 2 : 10
                                                }
                                            }}
                                            onValueChange={(value) => cambio(value, est.EstudianteId)}
                                            useNativeAndroidPickerStyle={false}
                                            Icon={() => {
                                                return <Icon
                                                    name='sort-down'
                                                    size={24}
                                                    color={Color.dark}
                                                />;
                                            }}
                                            items={items}
                                        />
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                        })
                    }
                </DataTable>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 5,
        marginHorizontal: 2,
        flexDirection: 'column',

    },
    title: {
        fontWeight: 'bold',
        paddingHorizontal: 10,
        color: Color.dark
    },
    description: {
        paddingTop: 2,
        paddingEnd: 50,
        paddingStart: 10,
        color: 'gray',
        textAlign: 'left'
    },
    dropdownStyle: {
        width: deviceWidth / 1.2,
        height: 40,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius:8,
    },
    pregunta: {
        alignSelf: 'center',
        marginTop: 5,
        marginHorizontal: 15,
        marginBottom: 5,
    },
    dataTable: {
        alignSelf: 'center',
        marginTop: 8,
        width: deviceWidth / 1.3,
        borderWidth: 1,
        borderColor: Color.dark
    }
})
const customPickerStyles = StyleSheet.create({
    inputIOS: {
        width: deviceWidth / 1.2,
        alignSelf: 'center',
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        width: deviceWidth / 1.2,
        alignSelf: 'center',
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    }

});

const customPickerStylesTabla = StyleSheet.create({
    inputIOS: {
        width: deviceWidth / 2.2,
        alignSelf: 'center',
        marginRight: 20,
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        width: 100,
        alignSelf: 'center',
        // marginRight:20,
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    }

});


export default React.memo(PreguntaComponent);