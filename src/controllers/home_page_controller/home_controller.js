import Authentication from "../../api/auth/authentication";
import PostApi from "../../api/post_api/post_api";
import UserApi from "../../api/user_api/user_api_impl";

const authentication = Authentication.getInstance();
const postApi = PostApi.getInstance();
const userApi = UserApi.getInstance();

export class HomeController {
    logoutAction(): void {
        authentication.logOut();
    }

    async getAllPost(): Promise<any> {
        return postApi.getAll();
    }

    async addPost(imagePath: string, imageName: string, description: string): Promise<any> {
        return postApi.add(imagePath, imageName, description);
    }

    async followUser(uid: string): Promise<void> {
        await userApi.followUser(uid);
    }

    async checkIfFollower(uid: string, list: []): Promise<boolean> {
        return list.includes(uid);
    }

    async getFollowers(): Promise<[]> {
        return await userApi.getFollowers();
    }

    async createChatThread(uid: string, name: string): Promise<void> {
        return await userApi.createChatThread(uid,name);
    }
}