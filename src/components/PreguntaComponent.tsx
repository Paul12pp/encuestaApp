import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import Color from '../constants/Colors';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome";


const deviceWidth = Dimensions.get('window').width;

interface Pregunta {
    Description: string;
    Id: number;
    EncuestaId: number;
    opciones: Opcion[];
}
interface Opcion {
    Description: string;
    Id: number;
    PreguntaId: number;
}

type Props = {
    data: Pregunta;
}
class PreguntaComponent extends PureComponent<Props> {
    items: any = [];
    constructor(props: any) {
        super(props)
        this.items = this.props.data.opciones.map(({ Id, Description }) => {
            return { label: Description, value: Id };
        })
        console.log('pregunta', props.data);
    }
    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.pregunta}>{this.props.data.Description}</Text>
                <RNPickerSelect
                    // pickerProps={{ac}}
                    placeholder={{label:'Opción', value:''}}
                    style={{
                        ...customPickerStyles,iconContainer:{
                            position:'absolute',
                            alignSelf:'flex-start',
                            top:10,
                            right:40
                        }
                    }}
                    onValueChange={(value) => console.log(value)}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                        return <Icon
                            name='sort-down'
                            size={24}
                            color={Color.dark}
                        />;
                    }}
                    items={this.items}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: 5,
        marginHorizontal: 2,
        flexDirection: 'column',

    },
    title: {
        fontWeight: 'bold',
        paddingHorizontal: 10,
        color:Color.dark
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
        height: 50,
        marginTop: 10,
        marginBottom: 5,
        alignSelf: 'center',
        borderColor: Color.danger,
        borderWidth: 5
    },
    pregunta: {
        alignSelf: 'center',
        marginTop: 5,
        marginHorizontal:15,
        marginBottom:5
    }
})
const customPickerStyles = StyleSheet.create({
    inputIOS: {
        width:deviceWidth/1.2,
        alignSelf:'center',
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

export default PreguntaComponent;