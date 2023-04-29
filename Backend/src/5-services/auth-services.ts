import { IUserModel, UserModel } from "../4-models/user-model";
import cyber from "../2-utils/cyber"
import { AuthenticationError, ValidationError } from "../4-models/client-errors";
import CredentialsModel from "../4-models/credential-model";

async function register(user:IUserModel):Promise<string>{
    //Check for errors
    const errors = user.validateSync();
    if (errors) throw new ValidationError(errors.message);
    //If there are no errors saving a new user on the system
    await user.save();
    //create new token and return it
    const token = cyber.createNewToken(user);
    return token;
}

async function login(cred:CredentialsModel):Promise<string>{
    //check if user exists in the system
    const users = await UserModel.find({username:cred.username, password:cred.password});
    const user = users[0];
    //if user not exists -> error
    if(!user)throw new AuthenticationError("Incorrect username or password");
    //if user exists, create token and return it
    const token = cyber.createNewToken(user);
    return token;
};


export default {
    register,
    login
}