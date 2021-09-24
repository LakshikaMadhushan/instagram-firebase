import firestore from '@react-native-firebase/firestore';
import ApiInterface from "../interfaces/api_interface";
import storage from '@react-native-firebase/storage';
import auth from "@react-native-firebase/auth";

export default class PostApi extends ApiInterface {

    static getInstance() {
        if (!PostApi._instance) {
            PostApi._instance = new PostApi();
        }
        return PostApi._instance;
    }

    async getAll(): Promise<any> {
        const posts = [];
        const postsCollection = firestore().collection('post');
        await postsCollection
            .get()
            .then(querySnapshot => {
                console.log('Total post: ', querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                    posts.push(documentSnapshot.data());
                });
            });
        return posts;
    }

    get(): Promise<void> {
        return super.get();
    }

    async add(imagePath: string, imageName: string, description: string): Promise<void> {
        // create bucket storage reference to not yet existing image
        const reference = storage().ref(imagePath);
        // uploads file
        await reference.putFile(imagePath);
        const url = await reference.getDownloadURL();
        // Upload the post
        const uid = auth().currentUser.uid;
        const postsCollection = firestore().collection('post');
        const usersCollection = firestore().collection('users');
        let username = '';
        await usersCollection.where('uid', '==', uid)
            .limit(1).get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    username = documentSnapshot.data().username;
                });
            });
        await postsCollection
            .add({
                uid: uid,
                description: description,
                name: username,
                image: url,
                likes: 10,
                postID: 'post0002',
                profile: 'https://media.istockphoto.com/photos/vintage-view-of-london-picture-' +
                    'id157002030?k=20&m=157002030&s=612x612&w=0&h=0lxWhyx2e4VPotq36F8LoPnr09T4b' +
                    'PhVFzy0jwki_ok=',
            })
            .then(() => {
                console.log('Post added!');
            });
        return super.add();
    }
}