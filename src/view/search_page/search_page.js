import {Button, SafeAreaView} from "react-native";
import React from 'react';
import firestore from "@react-native-firebase/firestore";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChatRoom from "./ChatRoom";
import Messages from "./Messages";

const HomeStack = createNativeStackNavigator();

export default function SearchStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{
            headerShown: true
        }}>
            <HomeStack.Screen name="Search" component={SearchPage}/>
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

export function SearchPage({navigation}) {
    return <SafeAreaView>
        <Button title={"Create room"} onPress={() => {
            handleButtonPress(navigation)
        }
        }/>
    </SafeAreaView>;
}

function handleButtonPress(navigation) {
    let roomName = "Chat_" + new Date().getTime() + "";
    if (roomName.length > 0) {
        // create new thread using firebase & firestore
        firestore()
            .collection('MESSAGE_THREADS')
            .add({
                name: roomName,
                latestMessage: {
                    text: `${roomName} created. Welcome!`,
                    createdAt: new Date().getTime()
                }
            })
            .then(docRef => {
                docRef.collection('MESSAGES').add({
                    text: `${roomName} created. Welcome!`,
                    createdAt: new Date().getTime(),
                    system: true
                }).then(r => {
                })
                navigation.navigate('ChatRoom')
            })
    }
}