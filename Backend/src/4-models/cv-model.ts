import { UploadedFile } from "express-fileupload";
import mongoose, { Document, Schema, model } from "mongoose";

export interface ICvModel extends Document {
    fileName: string;
    fileContent: UploadedFile;
    score: number;
    receiveDate: Date;

}

export const CvSchema = new Schema<ICvModel>({
    fileName: {
        type: String,
        minlength: [2, "File name must be minimum 2 chars"],
        trim: true,
        unique: true
    },
    fileContent:{
        type: Object,
        required: [true, "missing file"]
    },
    score: {
        type: Number,
        // min:[0,"minimum score is 0"]
    },
    receiveDate: {
        type: Date,
        required: [true, "missing receive date"],
        default: Date.now
    }
},{
    versionKey: false
});

export const CvModel = model<ICvModel>("CvModel", CvSchema, "listFileCV");