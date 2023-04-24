import dal from "../2-utils/dal";
import fileHandler from "../2-utils/file-handler";
import { ResourceNotFoundError, ValidationError } from "../4-models/client-errors";
import { CvModel, ICvModel } from "../4-models/cv-model";

function getAllCV():Promise<ICvModel[]> {
    return CvModel.find().exec();
}

async function getOneCV(_id:string):Promise<ICvModel> {
    const CV = CvModel.findById(_id).exec();
    if(!CV) throw new ResourceNotFoundError(_id);
    return CV;
}

// Add new cv:
async function addCV(cv: ICvModel): Promise<ICvModel> {
    cv.fileName = await fileHandler.saveFile(cv.fileContent);
    // Validate: 
    const errors = cv.validateSync();
    if (errors) throw new ValidationError(errors.message);
    // Save:
    fileHandler.readFile(cv._id, cv.fileName)
    return cv.save();
}

// Update existing product:
async function updateCV(_id:string, score:number): Promise<ICvModel> {

    // Validate: 
    // const errors = cv.validateSync();
    // if (errors) throw new ValidationError(errors.message);

    // Update: 
    const filter = {_id : _id};
    const update = {score: score};
    const updatedCV = await CvModel.findOneAndUpdate(filter, update, { returnOriginal: false }).exec();
    // returnOriginal: false will return database object and not argument object.

    // If not found: 
    if (!updatedCV) throw new ResourceNotFoundError(_id);

    // Return updated CV:
    return updatedCV;
}

// Delete existing CV:
async function deleteCV(_id: string): Promise<void> {
    const deletedCV = await CvModel.findByIdAndDelete(_id).exec();
    if (!deletedCV) throw new ResourceNotFoundError(_id);
}

async function findDelete(date:string):Promise<void>{
    const oldCV =await CvModel.find({"receiveDate":{$lte:date}}).deleteMany().exec();
}

export default {
    getAllCV,
    getOneCV,
    addCV,
    updateCV,
    deleteCV,
    findDelete    
};
