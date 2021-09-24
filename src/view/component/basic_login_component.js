import React, { useState } from 'react';
import { Image, Text, TextInput, View, TouchableHighlight, Button, TouchableOpacity } from "react-native";
import loginStyle, { MEASUREMENT } from "../../styles/style";
import GoogleButton from "./GoogleButtton";

export function LoginButton(props) {
    return <View style={[{ width: MEASUREMENT.widthTextField, paddingTop: 20 }]}>
        <Button
            onPress={() => {
                if (props.isLogin) {
                    props.onPress(props.username, props.password);
                    console.log(props.username);
                } else {
                    props.onPress(props.email, props.password, props.username, props.fullName);
                }
            }}
            style={loginStyle.submit}
            title={props.name}
        />
    </View>;
}


export function AuthUIPage(props) {
    const [userName, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return <View style={loginStyle.loginForm}>
        <Image style={loginStyle.imageLogo} source={require('../../../assets/Instagram-Logo.png')} />
        <TextFieldMod placeholder="Email or user name" isValid={false}
            onChangeText={text => setEmail(text)}
            value={userName}
        />
        <TextFieldMod placeholder="Password" isValid={true}
            onChangeText={text => setPassword(text)}
            value={password}
        />
        <LoginButton name="Login"
            onPress={props.onPress} username={userName} password={password}
            isLogin={true}
        />
        <TouchableOpacity>
            <Text style={loginStyle.textForgotUserLogin}
            >Forgot your login details? Get help sign in.</Text>
        </TouchableOpacity>
        <Text style={loginStyle.textOR}>OR</Text>
        {/* <TouchableOpacity onPress={props.facebookAuth}>
            <View style={loginStyle.loginFacebookView}>
                <Image style={loginStyle.facebookLogo} source={require('../../../assets/fb.png')} />
                <Text style={loginStyle.textLoginWithFacebook}>Log in with Facebook</Text>
            </View>
        </TouchableOpacity> */}
        <GoogleButton>
            <Text>
                Sign in with Google
            </Text>
        </GoogleButton>
    </View>
}

export function AuthUISingUpPage(props) {
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    return <View style={loginStyle.loginForm}>
        <Image style={loginStyle.imageLogo} source={require('../../../assets/Instagram-Logo.png')} />
        <TextFieldMod placeholder="Email" isValid={false}
            onChangeText={text => setEmail(text)}
            value={email} />
        <TextFieldMod placeholder="Full name" isValid={false}
            onChangeText={text => setFullName(text)}
            value={fullName} />
        <TextFieldMod placeholder="User name" isValid={false}
            onChangeText={text => setUsername(text)}
            value={userName} />
        <TextFieldMod placeholder="Password" isValid={true}
            onChangeText={text => setPassword(text)}
            value={password} />
        <LoginButton name="Sign up" onPress={props.onPress} username={userName}
            password={password} fullName={fullName} email={email} isLogin={false} />
        <Text style={loginStyle.textOR}>OR</Text>
        {/* <TouchableOpacity onPress={props.facebookAuth}>
            <View style={loginStyle.loginFacebookView}>
                <Image style={loginStyle.facebookLogo} source={require('../../../assets/fb.png')} />
                <Text style={loginStyle.textLoginWithFacebook}>Signup with Facebook</Text>
            </View>
        </TouchableOpacity> */}
    </View>
}

export function BottomView(props) {
    return <View style={loginStyle.bottomBarView}>
        <TouchableOpacity onPress={() => {
            if (props.isLogin) {
                props.navigation.push("SignUp");
            } else {
                props.navigation.push("Login");
            }
        }}>
            <Text style={loginStyle.textForgotUserLogin}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
    </View>;
}

export function TextFieldMod(props) {
    return <TextInput
        style={loginStyle.usernameStyle}
        placeholder={props.placeholder}
        secureTextEntry={props.isValid}
        keyboardType="default"
        value={props.value}
        onChangeText={props.onChangeText}
    />;
}