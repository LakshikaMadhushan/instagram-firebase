import auth from '@react-native-firebase/auth';
import {MassageType} from "../../view/constants/constants_auth";
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import firestore from "@react-native-firebase/firestore";

export default class Authentication {

    static getInstance() {
        if (!Authentication._instance) {
            Authentication._instance = new Authentication();
        }
        return Authentication._instance;
    }

    signUp(email, password, username, firstname): Promise<string> {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log(MassageType.massages.signupMsg);
                const usersCollection = firestore().collection('users');
                const uid = auth().currentUser.uid;
                console.log(uid);
                usersCollection
                    .add({
                        username: username,
                        firstname: firstname,
                        uid: uid
                    })
                    .then(() => {
                        console.log('User added!');
                    });
                return MassageType.massages.signupMsg;
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log(MassageType.massages.emailAlreadyInUse);
                    return MassageType.massages.emailAlreadyInUse;
                }
                if (error.code === 'auth/invalid-email') {
                    console.log(MassageType.massages.invalidEmail);
                    return MassageType.massages.invalidEmail;
                }
                console.error(error);
            });
    }

    logOut(): void {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    login(email, password): Promise<string> {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log(MassageType.massages.loginMsg);
                return MassageType.massages.loginMsg;
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    console.log(MassageType.massages.invalidEmail);
                    return MassageType.massages.invalidEmail;
                }
                console.error(error);
            });
    }

    async facebookLogin(): Promise<void> {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        console.log(auth.name);
        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }
}

