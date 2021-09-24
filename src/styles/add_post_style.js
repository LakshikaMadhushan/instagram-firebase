import {StyleSheet} from "react-native";

const WIDTH = '80%';
const HEIGHT = '100%';

export const addStyle = StyleSheet.create({
    mainView: {
        backgroundColor: 'white',
        height: HEIGHT
    },
    topView: {
        flexDirection: 'row',
        padding: 10,
    },
    topImage: {
        width: 55,
        height: 55,
        marginRight: 15,
        padding: 10,
        resizeMode: 'contain',
    },
    captionStyle: {
        width: WIDTH,
        marginHorizontal: 10,
    }
});