import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../4-models/client-errors";
import cyber from "../2-utils/cyber";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction):Promise<void>{

    try{
        await cyber.verifyToken(request);

        next();

    }
    catch(err){
        next(err)
    }


}

export default verifyLoggedIn;