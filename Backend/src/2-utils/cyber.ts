import { Request } from "express";
import { IUserModel } from "../4-models/user-model";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { AuthenticationError } from "../4-models/client-errors";

const secretKey = "ReutYakMath"

function createNewToken(user:IUserModel):string{
    const container = {user};
    const options = {expiresIn: "20m"};
    const token = jwt.sign(container, secretKey, options);
    return token;
};

function verifyToken(request:Request):Promise<boolean>{
    return new Promise<boolean>((resolve, reject)=>{
        try{
            const header = request.header("authorization");
            if(!header){
                reject(new AuthenticationError("Invalid token"))
                return
            };

            //Extract token
            const token = header.substring(7);

            if(!token){
                reject(new AuthenticationError("Invalid token"))
                return
            }

            //verify
            jwt.verify(token, secretKey, (err:JsonWebTokenError)=>{
                if(err){
                    reject(new AuthenticationError("Invalid token"))
                    return
                };

                resolve(true);

            });

        }
        catch(err:any){
            reject(err.message)
        }
    });

};

export default{
    createNewToken,
    verifyToken
};