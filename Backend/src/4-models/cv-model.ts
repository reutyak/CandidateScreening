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
        required: [true, "missing file name"],
        minlength: [2, "File name must be minimum 2 chars"],
        // maxlength: [10, "File name must be maximum 10 chars"],
        trim: true,
        unique: true
    },
    fileContent:{
        type: Object,
        required: [true, "missing file content"],
        // minlength: [10, "File content must be minimum 10 chars"],
        // maxlength: [15000, "File content must be maximum 15000 chars"],
        // trim: true
    },
    score: {
        type: Number
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