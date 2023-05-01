import { ICvModel } from './../4-models/cv-model';
import fileHandler from '../2-utils/file-handler';
import { myKnowledge } from '../4-models/knowledge-model';
import { MaxHeep } from './MaxHeep-services';
import cvService from './cv-service';
import fsPromises from "fs/promises";
import { ValidationError } from '../4-models/client-errors';

const cvFilesFolder = "./src/1-assets/files/cv/";
let cvUsed = [];

async function setScoreCV():Promise<void>{
    //get all CV
    const myCV =await cvService.getAllCV();
    //update the score of the cv files according to the new knowledge list
    myCV.map( item => fileHandler.readFile(item._id, item.fileName));
}

//get new knowledge list
async function getNewScan(listKnowledge:typeof myKnowledge){
    myKnowledge.Bsc = listKnowledge.Bsc;
    myKnowledge.HTML = listKnowledge.HTML;
    myKnowledge.QA = listKnowledge.QA;
    myKnowledge.algorithm = listKnowledge.algorithm;
    myKnowledge.analyst = listKnowledge.analyst;
    myKnowledge.angular = listKnowledge.angular;
    myKnowledge.c = listKnowledge.c;
    myKnowledge.css = listKnowledge.css;
    myKnowledge.deep_learning = listKnowledge.deep_learning;
    myKnowledge.devops = listKnowledge.devops;
    myKnowledge.frontend = listKnowledge.frontend;
    myKnowledge.java = listKnowledge.java;
    myKnowledge.net = listKnowledge.net;
    myKnowledge.node = listKnowledge.node;
    myKnowledge.python = listKnowledge.python;
    myKnowledge.react = listKnowledge.react;
    myKnowledge.science = listKnowledge.science;
    myKnowledge.typeScript = listKnowledge.typeScript;
    //update score 
    await setScoreCV();
    cvUsed = [];
    //build max heap after the setScore finish - I have to do it better not with setimeout
    setTimeout(()=>buildHeap(),4000);
}

async function buildHeap(){
    const myUpdateCV = (await cvService.getAllCV()).filter(cv => !cvUsed.includes(cv._id));
    global.currentMaxHeap = new MaxHeep(myUpdateCV);
    return global.currentMaxHeap
}

async function getMax(){
    if(!global.currentMaxHeap){
        throw new ValidationError("Required skills must be set in the scan tab")
    }
    if(global.currentMaxHeap.length<1){
        throw new ValidationError("empty heap")
    }
    //get the maxHeap[0]
    const theMax = await global.currentMaxHeap.heapExtractMax()
    console.log(theMax);
    cvUsed.push(theMax._id);
    console.log(cvUsed);
    //get the content of the file
    const content = await fsPromises.readFile(cvFilesFolder+theMax.fileName,"utf-8")
    return content
    }

//add new cv to the maxHeap
async function addCVToThisScan(newCV:ICvModel){
    global.currentMaxHeap && await global.currentMaxHeap.maxHeapInsert(newCV);
}

export default{
    getNewScan,
    getMax,
    buildHeap,
    addCVToThisScan
}