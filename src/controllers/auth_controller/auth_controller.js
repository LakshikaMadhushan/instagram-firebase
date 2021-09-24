import Authentication from "../../api/auth/authentication";

const authentication = Authentication.getInstance();

export class AuthController {

    async login(email: string, password: string): Promise<string> {
        console.log(email);
        return await authentication.login(email, password);
    }

    async signup(email: string, password: string,username:string, firstname:string): Promise<string> {
        console.log(email);
        return await authentication.signUp(email, password,username,firstname);
    }

    async FaceBookLogin(): Promise<any> {
        await authentication.facebookLogin();
    }

    logout() {
        authentication.logOut();
    }
}