import axios, { AxiosHeaders } from "axios";
import authService from "../Services/AuthService";
import { store } from "../redux/store";

class Interceptors {

    public create(): void {

        // Add request interceptor:
        axios.interceptors.request.use(request => {

            // If user logged in: 
            if(authService.isLoggedIn()) {

            request.headers &&
      (request.headers as AxiosHeaders).set("Authorization", `Bearer ${store.getState().AuthState.token}`);                // Add authorization header containing the string: "Bearer the-token"
            }

            return request;

        });
    }

}

const interceptors = new Interceptors();

export default interceptors;