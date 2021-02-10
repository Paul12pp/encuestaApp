import Snackbar from "react-native-snackbar";

export const ShowSnack = {
    show:function(text:string, color:string){
        Snackbar.show({
            text: text,
            duration: Snackbar.LENGTH_LONG,
            action: {
              text: 'UNDO',
              textColor: color,
              onPress: () => { /* Do something. */ },
            },
          });
    }
}