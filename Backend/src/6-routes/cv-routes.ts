import express, { Request, Response, NextFunction } from "express";
import cvService from "../5-services/cv-service";
import { CvModel } from "../4-models/cv-model";

const router = express.Router(); 

router.get("/cv", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const allCV =await cvService.getAllCV();
        response.json(allCV);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/cv/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const CV =await cvService.getOneCV(_id);
        response.json(CV);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/cv", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.fileContent = request.files?.fileContent
        const newCV = new CvModel(request.body);
        const CV =await cvService.addCV(newCV);
        response.json(CV);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/cv/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // request.body.fileContent = request.files?.fileContent
        const _id = request.params._id
        request.body._id = request.params._id;
        const score = request.body.score;
        // const CV = new CvModel(request.body);
        const updatedCV = await cvService.updateCV(_id, score);
        response.json(updatedCV);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/cv/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await cvService.deleteCV(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/cv/test/:date", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const date = request.params.date;
        await cvService.findDelete(date);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
