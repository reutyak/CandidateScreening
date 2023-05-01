import verifyLoggedIn from '../3-middleware/verify-logged-in';
import scanService from '../5-services/scan -service';
import {mySkills } from '../4-models/skills-model';
import express, { Request, Response, NextFunction } from "express";

const routerScan = express.Router(); 

routerScan.post("", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const newListSkills = request.body;
        const newScan = scanService.getNewScan(newListSkills);
        console.log(mySkills);
        response.json(newScan);
    }
    catch (err: any) {
        next(err);
    }
});

routerScan.get("/max", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const max = await scanService.getMax();
        console.log(max);
        response.json(max);
    }
    catch (err: any) {
        next(err);
    }
});

export default routerScan;
