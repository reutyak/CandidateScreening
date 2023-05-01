import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";
import { mySkills } from "../4-models/skills-model";
import cvService from "../5-services/cv-service";
import scanService from "../5-services/scan -service";

const cvFilesFolder = "./src/1-assets/files/cv/";
enum Skills {
  java = "java",
  python = "python",
  c = "c",
  node = "node",
  react = "react",
  angular = "angular",
  net = "net",
  frontend = "frontend",
  deep_learning = "deep_learning",
  algorithm = "algorithm",
  science = "science",
  analyst = "analyst",
  QA = "QA",
  css = "css",
  typeScript = "typeScript",
  HTML = "HTML",
  devops = "devops",
  Bsc = "Bsc",
}

// Save new image:
async function saveFile(file: UploadedFile): Promise<string> {
  // Create unique image name:
  const uniqueFileName = createFileName(file.name);

  // Create absolute page:
  const absolutePath = cvFilesFolder + uniqueFileName;

  // Save to disk:
  await file.mv(absolutePath);

  // Return new name:
  return uniqueFileName;
}

// Update existing file:
async function updateFile(
  file: UploadedFile,
  existingFileName: string
): Promise<string> {
  // Delete existing file:
  await deleteFile(existingFileName);

  // Save new image to disk:
  const uniqueFileName = await saveFile(file);

  // Return unique name:
  return uniqueFileName;
}

// Delete existing file:
async function deleteFile(existingFileName: string): Promise<void> {
  try {
    // If no file sent:
    if (!existingFileName) return;

    // Delete file from disk:
    await fsPromises.unlink(cvFilesFolder + existingFileName);
  } catch (err: any) {
    console.error(err.message);
  }
}

function createFileName(originalFileName: string): string {
  // Take original extension:
  const extension = originalFileName.substring(
    originalFileName.lastIndexOf(".")
  );

  // Create unique name including original extension (v4 = 36 chars uuid):
  const uniqueFileName = uuid() + extension;

  // Return unique name:
  return uniqueFileName;
}

async function readFile(_id: string, uniqueFileName: string): Promise<void> {
  //Save the contents of the file as string
  const content = await fsPromises.readFile(
    cvFilesFolder + uniqueFileName,
    "utf-8"
  );
  console.log(mySkills);
  //Initialization variable to 0 to score the file
  let count = 0;
  //checks for each value if exists in the file,
  //If exists, add to the count according to the importance level of the value.
  //and update score in the DB
  Object.values(Skills).map((item) => {
    const option = [item, item.toLocaleLowerCase(), item.toLocaleUpperCase(), (item[0].toLocaleUpperCase()+item.slice(1,item.length-1).toLocaleLowerCase())];
    // if (content.includes(item || item.toLocaleLowerCase() || item.toLocaleUpperCase() || (item[0].toLocaleUpperCase()+item.slice(1,item.length-1).toLocaleLowerCase()))) count += +mySkills[item];
    if (option.some(i => content.includes(i))) count += +mySkills[item];
    console.log(count);
    // await cvService.updateCV(_id, count);
  });
  await cvService.updateCV(_id, count);
}

export default {
  saveFile,
  updateFile,
  deleteFile,
  readFile,
};
