import { ICvModel } from './../4-models/cv-model';
import fileHandler from '../2-utils/file-handler';
import { myKnowledge } from '../4-models/knowledge-model';
import { MaxHeep } from './MaxHeep-services';
import cvService from './cv-service';
import fsPromises from "fs/promises";

const cvFilesFolder = "./src/1-assets/files/cv/";

async function setScoreCV(){
    //get all CV
    const myCV =await cvService.getAllCV();
    //update the score of the cv files according to the new knowledge list
    myCV.map(item=>fileHandler.readFile(item._id, item.fileName));
    // const myUpdateCV =await cvService.getAllCV();
    // global.currentMaxHeap = new MaxHeep(myUpdateCV);
    // global.currentMaxHeap.buildMaxHeap();
}

//get new knowledge list
function getNewScan(listKnowledge:typeof myKnowledge){
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
    //update score and build max heap
    setScoreCV().then(()=>{buildHeap(buildMax)});
    return myKnowledge
}

async function buildHeap(callBack:any){
    // const myUpdateCV = await cvService.getAllCV();
    // console.log(myUpdateCV);
    const currentHeap = new MaxHeep(await cvService.getAllCV());
    callBack(currentHeap);
    // await global.currentMaxHeap.buildMaxHeap();
}

// function buildMax(){
//     buildHeap((heap)=>heap.buildMaxHeap())
// }

function buildMax(heap:MaxHeep){
    const maxHeap = heap.buildMaxHeap();
    return maxHeap
}


async function getMax(){
    // const currentMax = await global.currentMaxHeap;
    const theMax = await global.currentMaxHeap.heapExtractMax()
    console.log(theMax);
    const content = await fsPromises.readFile(cvFilesFolder+theMax.fileName,"utf-8")
    console.log(content)
    return content
}

export default{
    getNewScan,
    getMax
}