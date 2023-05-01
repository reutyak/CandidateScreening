import axios from "axios";
import { UserModel } from "../Models/user-Model";
import appConfig from "../Utils/AppConfig";

class userService {
    public async getUsers():Promise<UserModel[]>{
        const response =await axios.get(appConfig.userUrl);
        const users = response.data;
        return users;
        
    }

}

const usersService = new userService();

export default usersService;