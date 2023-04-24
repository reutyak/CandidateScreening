import { UploadedFile } from 'express-fileupload';
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";
import { myKnowledge } from '../4-models/knowledge-model';
import cvService from '../5-services/cv-service';

const cvFilesFolder = "./src/1-assets/files/cv/";
enum Knowledge {
    java ="java",
    python ="python",
    c ="c",
    node = "node",
    react ="react",
    angular ="angular",
    net ="net",
    frontend ="frontend",
    deep_learning ="deep_learning",
    algorithm ="algorithm",
    science ="science",
    analyst ="analyst",
    QA ="QA",
    css ="css",
    typeScript ="typeScript",
    HTML ="HTML",
    devops ="devops",
    Bsc ="Bsc"
  }

// Save new image: 
async function saveFile(file: UploadedFile): Promise<string> {
    
    // Create unique image name: 
    const uniqueFileName = createFileName(file.name);

    // Create absolute page: 
    const absolutePath = cvFilesFolder + uniqueFileName;

    // Save to disk: 
    await file.mv(absolutePath); // mv = move

    // Return new name: 
    return uniqueFileName;
}

// Update existing image:
async function updateFile(file: UploadedFile, existingFileName: string): Promise<string> {

    // Delete existing image: 
    await deleteFile(existingFileName);

    // Save new image to disk:
    const uniqueFileName = await saveFile(file);

    // Return unique name: 
    return uniqueFileName;
}

// Delete existing image:
async function deleteFile(existingFileName: string): Promise<void> {
    try {
        
        // If no image sent:
        if(!existingFileName) return;

        // Delete image from disk:
        await fsPromises.unlink(cvFilesFolder + existingFileName);
    }
    catch(err: any) {
        console.error(err.message);
    }
}

function createFileName(originalFileName: string): string {

    // Take original extension: 
    const extension = originalFileName.substring(originalFileName.lastIndexOf("."));

    // Create unique name including original extension (v4 = 36 chars uuid):
    const uniqueFileName = uuid() + extension;

    // Return unique name:
    return uniqueFileName;
}

async function readFile(_id:string, uniqueFileName:string){
    const content = await fsPromises.readFile(cvFilesFolder+uniqueFileName,"utf-8")
    // const arrContent = content.split("\n");
    let count = 0;
    Object.values(Knowledge).map((item)=>{
        if(content.includes(item)) count += (+myKnowledge[item]);console.log(count);cvService.updateCV(_id,count)})
    // console.log(arrContent)
    return null
} 

export default {
    saveFile,
    updateFile,
    deleteFile,
    readFile
};

