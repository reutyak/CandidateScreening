import mongoose, { Document, Schema, model } from "mongoose";

export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    username: string;
    password: string;

}

export const UserSchema = new Schema<IUserModel>({
    firstName: {
        type: String,
        required: [true, "missing first name"],
        minlength: [2, "First name must be minimum 2 chars"],
        maxlength: [10, "First name must be maximum 10 chars"],
        trim: true,
    },
    lastName:{
        type: String,
        required: [true, "missing last name"],
        minlength: [2, "Last name must be minimum 2 chars"],
        maxlength: [10, "Last name must be maximum 10 chars"],
        trim: true,
    },
    username: {
        type: String,
        required: [true, "missing last name"],
        minlength: [6, "Username must be minimum 6 chars"],
        maxlength: [12, "Username must be maximum 12 chars"],
        unique:true
    },
    password: {
        type: String,
        required: [true, "missing password"],
        minlength: [8, "Password must be 8 chars"],
        maxlength: [8, "Password must be 8 chars"],
    }
},{
    versionKey: false
});

export const UserModel = model<IUserModel>("UserModel", UserSchema, "users");