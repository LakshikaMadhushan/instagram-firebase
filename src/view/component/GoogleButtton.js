import React, { Component } from 'react';
import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Button

} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';


class App extends Component {
  componentDidMount () {
    //   GoogleSignin.signOut();
      console.log("1");
    GoogleSignin.configure({
      webClientId:'680611292273-ogeag6qalt154hvueikmrnrdjh1d6bu6.apps.googleusercontent.com',

    });
  }

  async  onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  signIn = async () => {
    console.log("2");
    try {
        console.log("3");
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const currentUser = await GoogleSignin.getCurrentUser();
      const token = await GoogleSignin.getTokens();
    //   console.log(currentUser)

    //   const data = {
    //     "first_name": currentUser.user.givenName,
    //     "last_name": currentUser.user.familyName,
    //     "email": currentUser.user.email,
    //     "user_social_id": currentUser.user.id,
    //     "auth_type": "GOOGLE",
    //     "social_media_token": token.idToken,
    //     "is_email_verified": true
    //   }

    //   this.props.googleHandler(data);

    } catch (error) {
        console.log("4");
      ToastAndroid.show(error, ToastAndroid.LONG);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.show(error, ToastAndroid.LONG);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.show(error, ToastAndroid.LONG);
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.show(error, ToastAndroid.LONG);
        // play services not available or outdated
      } else {
        ToastAndroid.show(error, ToastAndroid.LONG);
        // some other error happened
      }
    }
  };

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken,user} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential (idToken);

    // Sign-in the user with the credential
    return auth ().signInWithCredential (googleCredential);
    

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  


  render() {
    return (
        <View>
      <TouchableOpacity style={styles.maincontainer} activeOpacity={0.8} title="Google Sign-In"
      onPress={() => this.onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
        <View style={styles.button}>
          <View style={styles.buttonContainer}>
            <Icon
              name='google'
              color='white'
              size={14}
              style={styles.icon}

            />
            <Text style={styles.buttonText}>{this.props.children}</Text>
          </View>
        </View>
      </TouchableOpacity>
        {/* <GoogleSigninButton
        style={{width: 192, height: 48}}
        // size={GoogleSigninButton.Size.Wide}
        // color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn}
      /> */}
       {/* <Button
      title="Google Sign-In"
      onPress={() => this.onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    /> */}
    </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: '10%'

  },
  button: {

    backgroundColor:'#EC4949',
    padding: 15,
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center'
  },

  buttonContainer: {
    flexDirection: 'row',

  },

  icon: {
    paddingTop: 2,
    paddingRight: 5

  },

  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Gilroy-SemiBold',
  }

});

export default App;