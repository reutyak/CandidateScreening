import axios from "axios";
import { UserModel } from "../Models/user-Model";
import appConfig from "../Utils/AppConfig";
import { store } from "../redux/store";
import { AuthActionType } from "../redux/AuthState";
import CredentialsModel from "../Models/credential-model";


class AuthService {

    // Register:
    public async register(user: UserModel): Promise<void> {

        // Send user to backend:
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Get the returned token:
        const token = response.data;

        console.log(token);

        // Send token to global state:
        localStorage.setItem("token", token);
        store.dispatch({ type: AuthActionType.Register, payload: token });
    }

    // Login:
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send credentials to backend:
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Get the returned token:
        const token = response.data;
        console.log(token);

        // Send token to global state:
        localStorage.setItem("token", token);
        store.dispatch({ type: AuthActionType.Login, payload: token });
    }

    // Logout:
    public logout(): void {
        store.dispatch({ type: AuthActionType.Logout });
    }

    // Is user logged in:
    public isLoggedIn(): boolean {
        return store.getState().AuthState.token !== null;
    }

}

const authService = new AuthService();

export default authService;


