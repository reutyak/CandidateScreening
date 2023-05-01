import dal from "../2-utils/dal";
import fileHandler from "../2-utils/file-handler";
import { ResourceNotFoundError, ValidationError } from "../4-models/client-errors";
import { CvModel, ICvModel } from "../4-models/cv-model";
import scanService from "./scan -service";

function getAllCV():Promise<ICvModel[]> {
    return CvModel.find().exec();
}

//use??
async function getOneCV(_id:string):Promise<ICvModel> {
    //find specific CV
    const CV = CvModel.findById(_id).exec();
    //If CV not exists, return error
    if(!CV) throw new ResourceNotFoundError(_id);
    //If exists return CV
    return CV;
}

// Add new cv:
async function addCV(cv: ICvModel): Promise<ICvModel> {
    
    // Validate: 
    const errors = cv.validateSync();
    if (errors) throw new ValidationError(errors.message);

    //Save the file to disk and get a unique name for the file
    cv.fileName = await fileHandler.saveFile(cv.fileContent);

    //save to the DB
    await cv.save();

    // read and grade a file :
    await fileHandler.readFile(cv._id, cv.fileName)

    //get the update cv
    const updatedCV = await getOneCV(cv._id);    

    //add CV to the heap
    scanService.addCVToThisScan(updatedCV);
    
    return updatedCV;
}

// Update cv score:
async function updateCV(_id:string, score:number): Promise<ICvModel> {

    // Validate:
    if(score<0){
        throw new ValidationError("minimum score is 0");
    } 

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
    //if the _id not exists -> error
    if (!deletedCV) throw new ResourceNotFoundError(_id);
}

//Delete a file based on the date it was received
async function findDelete(date:string):Promise<void>{

    await CvModel.find({"receiveDate":{$lte:date}}).deleteMany().exec();
}

export default {
    getAllCV,
    getOneCV,
    addCV,
    updateCV,
    deleteCV,
    findDelete    
};
