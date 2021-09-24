import {Component} from "react";
import {SafeAreaView} from "react-native";
import React from 'react';
import {HomeController} from "../../controllers/home_page_controller/home_controller";
import {Button} from "react-native-paper";

export default class ProfileView extends Component {

    render() {
        let ctrl = new HomeController();
        return <SafeAreaView style={{backgroundColor: 'white'}}>
            <Button mode="contained"
                    onPress={() => ctrl.logoutAction()}>
                Logout
            </Button>
        </SafeAreaView>;
    }
}