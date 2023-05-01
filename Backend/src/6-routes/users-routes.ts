import express, { Request, Response, NextFunction } from "express";
import userServices from "./../5-services/user-services"
const routerUser = express.Router(); 

routerUser.get("", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const allUser =await userServices.getAllUsers();
        response.json(allUser);
    }
    catch (err: any) {
        next(err);
    }
});

export default routerUser;