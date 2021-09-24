import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Login from "./src/view/auth_view/login_page";
import SignUp from "./src/view/auth_view/sign_up_page";
import auth from '@react-native-firebase/auth';
import {ActivityIndicator, Platform, StatusBar, View} from "react-native";
import HomePage from "./src/view/home_page/home_page";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {homeStyle} from "./src/styles/home_style";
import ProfileView from "./src/view/profile_view/profile_view";
import FavouriteView from "./src/view/favourite_view/favourite_view";
import {IconNames, MEASUREMENT} from "./src/styles/style";
import {Icon} from "react-native-elements";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import AddPostView from "./src/view/add_post_page/add_post_view";
import SearchStackScreen from "./src/view/search_page/search_page";
import HomeStackScreen from "./src/view/home_page/home_page";

const Stack = createNativeStackNavigator();

const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const Tab = createMaterialBottomTabNavigator();

export default function App() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
    }, []);

    if (initializing) return <ActivityIndicator size="large" color="#00ff00"/>;

    if (!user) {
        console.log("User not available")
        return (
            <NavigationContainer>
                <StatusBarCompo/>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="SignUp" component={SignUp}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        console.log("User available")
        return (
            <NavigationContainer>
                <StatusBarCompo/>
                <Tab.Navigator
                    barStyle={
                        homeStyle.bottomNaviBarStyle
                    }
                    labeled={false}
                >
                    <Tab.Screen
                        name="HomeStack"
                        component={HomeStackScreen}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <MaterialCommunityIcon name={focused === true ?
                                    IconNames.ActiveHome : IconNames.InActiveHome}
                                                       color={'black'} size={MEASUREMENT.bottomBarIconSize}/>
                            ),
                        }}
                    />
                    <Tab.Screen name="SearchStack" component={SearchStackScreen}
                                options={{
                                    tabBarIcon: ({focused}) => (
                                        <Icon
                                            name={focused === true ?
                                                IconNames.ActiveSearch : IconNames.InActiveSearch}
                                            size={MEASUREMENT.bottomBarIconSize}/>
                                    ),
                                }}/>
                    <Tab.Screen name="AddPost" component={AddPostView}
                                options={{
                                    tabBarIcon: ({focused}) => (
                                        <Icon
                                            name={focused === true ? IconNames.ActiveAddPost : IconNames.InActiveAddPost}
                                            size={MEASUREMENT.bottomBarIconSize}/>
                                    ),
                                }}/>
                    <Tab.Screen name="Favourite" component={FavouriteView}
                                options={{
                                    tabBarIcon: ({focused}) => (
                                        <Icon name={focused === true ?
                                            IconNames.ActiveFavourite : IconNames.InActiveFavourite}
                                              size={MEASUREMENT.bottomBarIconSize}/>
                                    ),
                                }}/>
                    <Tab.Screen name="Profile" component={ProfileView}
                                options={{
                                    tabBarIcon: ({focused}) => (
                                        <Icon name={focused === true ?
                                            IconNames.ActivePerson : IconNames.InActivePerson}
                                              size={MEASUREMENT.bottomBarIconSize}/>
                                    ),
                                }}/>
                </Tab.Navigator>

            </NavigationContainer>
        );
    }
}


function homePage() {
    return <View>
        <HomePage/>
    </View>;
}

function StatusBarCompo() {
    return <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: "#5E8D48"}}>
        <StatusBar
            animated={true}
            backgroundColor="white"
            barStyle={'dark-content'}
            translucent={true}
        />
    </View>;
}

