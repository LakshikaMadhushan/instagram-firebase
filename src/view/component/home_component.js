import {Appbar, Divider} from "react-native-paper";
import React, {useEffect, useState} from 'react';
import {homeStyle} from "../../styles/home_style";
import {
    FlatList,
    Image,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import loginStyle from "../../styles/style";
import {DividerMod} from "./basic_component";
import {HomeController} from "../../controllers/home_page_controller/home_controller";
import auth from "@react-native-firebase/auth";

export function AppBarNative() {
    return <Appbar style={homeStyle.appbar}>
        <View style={homeStyle.imageView}>
            <Image style={loginStyle.imageLogo} source={require('../../../assets/Instagram-Logo.png')}/>
        </View>
        <View style={homeStyle.rightView}>
            <Image resizeMode="contain"
                   style={homeStyle.appbarIcon} source={require('../../../assets/like.png')}/>
            <Image resizeMode="contain"
                   style={homeStyle.appbarIcon} source={require('../../../assets/share.png')}/>
        </View>
    </Appbar>;
}

export function StoryList(props) {
    const renderItem = ({item}) => (
        <Item title={item.name} image={item.image}/>
    );

    return <View>
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={props.data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
        <Divider style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.19,
            marginTop: 10,
            marginHorizontal: 10,
        }}/>
    </View>;
}

const Item = ({title, image}) => (
    <View style={styles.item}>
        <View style={homeStyle.story}>
            <Image style={homeStyle.storyImage} source={{uri: image}}/>
        </View>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        paddingStart: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "column",
        marginVertical: 2,
        marginHorizontal: 6,
    },
    title: {
        fontSize: 12,
    },
});

export function PostList(props) {
    const [postList, setPostList] = useState([]);
    const [followersList, setFollowersList] = useState([]);
    const ctrl = new HomeController();
    const uid = auth().currentUser.uid;
    const renderItem = ({item}) => (
        <Post title={item.name} profile={item.profile} mainImage={item.image} des={item.description}
              isSameUser={item.uid === uid} onPressFollow={props.onPressFollow} uid={item.uid}
              followersList={followersList === undefined ? [] : followersList} navigator={props.navigator}/>
    );
    useEffect(async () => {
        const data = await ctrl.getAllPost();
        const list = await ctrl.getFollowers();
        setFollowersList(list);
        setPostList(data);
    }, []);

    return <View>
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={postList}
            renderItem={renderItem}
        />
        <DividerMod/>
    </View>;
}


function Post({title, profile, mainImage, des, isSameUser, uid, onPressFollow, followersList, navigator}) {
    const [loader, setLoader] = useState(false);
    if (loader === true) {
        return <ActivityIndicator/>
    } else {
        return <View style={homeStyle.postMainView}>
            <View style={homeStyle.postMainTopView}>
                <View style={homeStyle.postTopView}>
                    <TouchableOpacity onPress={async () => {
                        setLoader(true);
                        const ctrl = new HomeController();
                        await ctrl.createChatThread(uid,title).then(() => {
                            setLoader(false);
                        });
                        navigator.navigate('ChatRoom');
                    }}>
                        <Image style={homeStyle.postImage} source={{uri: profile}}/>
                    </TouchableOpacity>
                    <Text style={homeStyle.postTitle}>{title}</Text>
                    {isSameUser || followersList.includes(uid) ? <Text/> : <Text> > </Text>}
                    {isSameUser || followersList.includes(uid) ? <Text/> :
                        <TouchableHighlight onPress={() => {
                            onPressFollow(uid);
                        }
                        }>
                            <Text style={homeStyle.followTextStyle}> Follow </Text>
                        </TouchableHighlight>}
                </View>
                <Image resizeMode="contain" style={homeStyle.postMoreIcon}
                       source={require('../../../assets/more.png')}/>
            </View>
            <View>
                <Image style={homeStyle.postMainImage} source={{uri: mainImage}}/>
            </View>
            <View style={homeStyle.postMainBottomView}>
                <View style={homeStyle.postBottomLeftSide}>
                    <Image resizeMode="contain"
                           style={homeStyle.postBottomIcon} source={require('../../../assets/like.png')}/>
                    <Image resizeMode="contain"
                           style={homeStyle.postBottomIcon} source={require('../../../assets/comment.png')}/>
                    <Image resizeMode="contain"
                           style={homeStyle.postBottomIcon} source={require('../../../assets/share.png')}/>
                </View>
                <Image resizeMode="contain"
                       style={homeStyle.postBottomIcon} source={require('../../../assets/save.png')}/>
            </View>
            <Text style={homeStyle.postDescriptionStyle}>
                {des}
            </Text>
            <DividerMod/>
        </View>
    }
}
