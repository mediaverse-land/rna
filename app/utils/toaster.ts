import {ToastAndroid} from 'react-native'

export class Toaster {
    show(text: string){
        ToastAndroid.show(text, ToastAndroid.SHORT)
    }
}