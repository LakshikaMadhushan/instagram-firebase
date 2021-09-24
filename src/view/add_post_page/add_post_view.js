import {useEffect, useState} from "react";
import {Image, SafeAreaView, View} from "react-native";
import React from 'react';
import {Appbar, TextInput} from 'react-native-paper';
import {homeStyle} from "../../styles/home_style";
import ImagePicker from 'react-native-image-crop-picker';
import {HomeController} from "../../controllers/home_page_controller/home_controller";
import {addStyle} from "../../styles/add_post_style";

const AddPostView = ({navigation}) => {
    let ctrl = new HomeController();
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    let imagePath = '../../../assets/Instagram-Logo.png';
    let imageName = '';
    if(image===''){
        getImage();
        function getImage() {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(images => {
                imagePath = images.path;
                setImage(images.path);
            });
        }
    }
    return <SafeAreaView style={addStyle.mainView}>
        <Appbar.Header style={homeStyle.appbar}>
            <Appbar.BackAction onPress={navigation.pop}/>
            <Appbar.Content title="New Post" subtitle=""/>
            <Appbar.Action icon="check" onPress={async () => {
                await ctrl.addPost(image, imageName, description).then(r => console.log("Pushed"))
            }}/>
        </Appbar.Header>
        <View style={addStyle.topView}>
            <TextInput
                style={addStyle.captionStyle}
                label="Write a caption"
                onChangeText={text => setDescription(text)}
            />
        </View>
    </SafeAreaView>;

}
export default AddPostView;
