import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
    getItem: async function (key:any) {
        const item:any = await AsyncStorage.getItem(key);        
        //You'd want to error check for failed JSON parsing...
        return await JSON.parse(item);
    },
    setItem: async function (key:any, value:any) {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: async function (key:any) {
        return await AsyncStorage.removeItem(key);
    }
};
export default Storage;