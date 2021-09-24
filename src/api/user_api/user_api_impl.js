import UserInterface from "../interfaces/user_api";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default class UserApi extends UserInterface {

    static getInstance() {
        if (!UserApi._instance) {
            UserApi._instance = new UserApi();
        }
        return UserApi._instance;
    }

    async followUser(uid: string): Promise<void> {
        const uidMy = auth().currentUser.uid;
        let refID;
        let followers = [""];
        const usersCollection = firestore().collection('users');
        await usersCollection.where('uid', '==', uidMy)
            .limit(1).get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    refID = documentSnapshot.ref.id;
                    followers = documentSnapshot.data().followers;
                });
            });
        if (followers === undefined) {
            followers = [];
        }
        let isExits = followers.includes(uid);
        if (isExits === false) {
            followers.push(uid);
            usersCollection.doc(refID).update(
                {
                    followers: followers
                }
            ).then(() => {
                console.log("Added the new follower...")
            });
        } else {
            console.log("User already available...")
        }
    }


    async getFollowers(): Promise<[]> {
        const uidMy = auth().currentUser.uid;
        let followers = [];
        const usersCollection = firestore().collection('users');
        await usersCollection.where('uid', '==', uidMy)
            .limit(1).get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    followers = documentSnapshot.data().followers;
                });
            });
        return followers;
    }


    async createChatThread(uid: string, name: string): Promise<void> {
        if (auth().currentUser.uid !== uid) {
            firestore()
                .collection('MESSAGE_THREADS')
                .where('uid', '==', uid).where('myUid', '==',
                auth().currentUser.uid).get().then(result => {
                console.log(result);
                // create new thread using firebase & firestore
                firestore()
                    .collection('MESSAGE_THREADS')
                    .add({
                        name: name,
                        uid: uid,
                        myUid: auth().currentUser.uid,
                        latestMessage: {
                            text: `${name} created. Welcome!`,
                            createdAt: new Date().getTime()
                        }
                    })
                    .then(docRef => {
                        docRef.collection('MESSAGES').add({
                            text: `Chat with ${name}!`,
                            createdAt: new Date().getTime(),
                            system: true
                        }).then(() => {
                            console.log("New chat is created...")
                        })
                    })

            })

        }

    }
}