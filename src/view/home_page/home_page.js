import React from 'react';
import {SafeAreaView, ScrollView, View} from "react-native";
import {AppBarNative, PostList, StoryList} from "../component/home_component";
import {homeStyle} from "../../styles/home_style";
import {HomeController} from "../../controllers/home_page_controller/home_controller";
import ChatRoom from "../search_page/ChatRoom";
import Messages from "../search_page/Messages";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <HomeStack.Screen name="Home" component={HomePage}/>
            <HomeStack.Screen name="ChatRoom" component={ChatRoom}/>
            <HomeStack.Screen
                name='Messages'
                component={Messages}
                options={({route}) => ({
                    title: route.params.thread.name
                })}
            />
        </HomeStack.Navigator>
    );
}

const DATA = [
    {
        name: 'John Sena',
        id: "w1",
        image: 'https://www.vbtcafe.com/wp-content/uploads/2020/05/Remove-Background-from-Photo.jpg',
        post: 'https://cdn.pixabay.com/photo/2014/10/23/21/19/fence-500348_960_720.jpg',
        description: "ssssssssss"
    },
    {
        name: 'Michale john',
        id: "w2",
        image: 'https://www.autoretouch.com/wp-content/uploads/2021/06/Remove-Background.jpg',
        post: 'https://images.unsplash.com/photo-1525450101819-1517c5c00f45?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBvc3QlMjBvZmZpY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        description: "ssssssssss"
    },
    {
        name: 'Peter parker',
        id: "w3",
        image: 'https://pixmiller-s3.s3.amazonaws.com/static/img/1.jpg',
        post: 'https://images.unsplash.com/photo-1525450101819-1517c5c00f45?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBvc3QlMjBvZmZpY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        description: "ssssssssss"
    },
    {
        name: 'Rony cin',
        id: "w4",
        image: 'https://static.remove.bg/remove-bg-web/ad5bb40e8ada6fca658b7a6da9ae4eb718' +
            'ac2aba/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5' +
            'd4b5f39d2ec.png',
        post: 'https://images.unsplash.com/photo-1525450101819-1517c5c00f45?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBvc3QlMjBvZmZpY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        description: "ssssssssss"
    },
    {
        name: 'Dishna luwis',
        id: "w5",
        image: 'https://editphotosforfree.com/static/images/remove-background-from-image.webp',
        post: 'https://images.unsplash.com/photo-1525450101819-1517c5c00f45?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBvc3QlMjBvZmZpY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        description: "ssssssssss"
    },
    {
        name: 'Viraj singth',
        id: "w6",
        image: 'https://media.istockphoto.com/photos/headshot-of-a-teenage-boy-picture-id1158' +
            '014305?k=20&m=1158014305&s=612x612&w=0&h=RgcRlPfHFZA4OWSROC46FgBILIQVyiS6o_EmyZAM' +
            't4M=',
        post: 'https://images.unsplash.com/photo-1525450101819-1517c5c00f45?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBvc3QlMjBvZmZpY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        description: "ssssssssss"
    },
];

function followUser(uid: string) {
    const ctrl = new HomeController();
    ctrl.followUser(uid).then(() => {
        alert("Followers added to the system");
    });
}

export function HomePage({navigation}) {
    return (
        <SafeAreaView>
            <ScrollView style={homeStyle.mainStyle}>
                <View>
                    <AppBarNative/>
                </View>
                <StoryList data={DATA}/>
                <PostList onPressFollow={followUser} navigator={navigation}/>
            </ScrollView>
        </SafeAreaView>
    )

}
