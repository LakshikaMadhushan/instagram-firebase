import {StyleSheet} from "react-native";

export const COLORS = {
    backgroundColor: "#f5f5f5",
    borderColor: '#d9d9d9',
    textColor: '#949494',
    blue: '#3081d9',
}

export const MEASUREMENT = {
    widthTextField: 365,
    borderRadius: 10,
    bottomBarIconSize: 25
}

export const IconNames = {
    ActiveHome: "home",
    InActiveHome: "home-outline",
    ActiveSearch: "search",
    InActiveSearch: "search",
    ActiveFavourite: "favorite",
    InActiveFavourite: "favorite-outline",
    ActiveAddPost: "add-circle",
    InActiveAddPost: "add-circle-outline",
    ActivePerson: "person",
    InActivePerson: "person-outline",
}


const height = '100%';

const loginStyle = StyleSheet.create({
    mainStyle: {
        flexDirection: "column",
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        height: height
    },
    languageStyle: {
        marginTop: 8,
        fontSize: 15,
        color: "gray",
    },
    loginForm: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imageLogo: {
        flex: 0.62,
        width: 150,
        resizeMode: 'contain'
    },
    usernameStyle: {
        height: 50,
        margin: 10,
        width: MEASUREMENT.widthTextField,
        borderWidth: 0.8,
        padding: 15,
        backgroundColor: COLORS.backgroundColor,
        borderColor: COLORS.borderColor,
        color: COLORS.textColor,
        borderRadius: MEASUREMENT.borderRadius,
    },
    submit: {
        borderRadius: MEASUREMENT.borderRadius,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderColor: '#96dcff',
        width: MEASUREMENT.widthTextField
    },
    submitText: {
        color: '#96dcff',
        fontSize: 17,
        textAlign: 'center',
    },
    textForgotUserLogin: {
        marginTop: 25,
        color: COLORS.textColor
    },
    textOR: {
        marginTop: 15,
        color: COLORS.textColor
    },
    loginFacebookView: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLoginWithFacebook: {
        color: COLORS.blue,
        fontWeight: 'bold',
        fontSize: 16,
    },
    facebookLogo: {
        width: 26,
        marginRight: 6,
        resizeMode: 'contain'
    },
    bottomBarView: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
});

export default loginStyle;