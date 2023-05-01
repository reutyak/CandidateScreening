import { IUserModel, UserModel } from "../4-models/user-model";

function getAllUsers():Promise<IUserModel[]> {
    return UserModel.find().exec();
}

export default{
    getAllUsers
}