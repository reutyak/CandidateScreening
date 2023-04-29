import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../4-models/user-model";
import authServices from "../5-services/auth-services";
import CredentialsModel from "../4-models/credential-model";

const router = express.Router(); 


router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token =await authServices.register(user);
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cred = new CredentialsModel(request.body);
        const token =await authServices.login(cred);
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;