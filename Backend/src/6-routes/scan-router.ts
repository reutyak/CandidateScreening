import scanService from '../5-services/scan -service';
import {myKnowledge } from './../4-models/knowledge-model';
import express, { Request, Response, NextFunction } from "express";

const routerScan = express.Router(); 

routerScan.post("", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const newListKnowledge = request.body;
        const newScan =await scanService.getNewScan(newListKnowledge);
        console.log(myKnowledge);
        response.json(newScan);
    }
    catch (err: any) {
        next(err);
    }
});

// routerScan.get("/max", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const _id = request.params._id;
//         const CV =await cvService.getOneCV(_id);
//         response.json(CV);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

export default routerScan;
