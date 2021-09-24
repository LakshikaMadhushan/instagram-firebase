import React from 'react';
import loginStyle from "../../styles/style";
import {SafeAreaView, Text} from "react-native";
import {AuthUISingUpPage, BottomView} from "../component/basic_login_component";
import {AuthController} from "../../controllers/auth_controller/auth_controller";

const SignUp = ({navigation}) => {
    let ctrl = new AuthController();
    return (
        <SafeAreaView style={loginStyle.mainStyle}>
            <Text style={loginStyle.languageStyle}>English (United status)</Text>
            <AuthUISingUpPage onPress={ctrl.signup} isLogin={false} facebookAuth={ctrl.FaceBookLogin}/>
            <BottomView navigation={navigation} isLogin={false}/>
        </SafeAreaView>
    );
}

export default SignUp;