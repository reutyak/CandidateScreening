import fileHandler from '../2-utils/file-handler';
import { myKnowledge } from '../4-models/knowledge-model';
import cvService from './cv-service';

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
    setScoreCV()
    return myKnowledge
}

async function setScoreCV(){
    const myCV =await cvService.getAllCV();
    myCV.map(item=>fileHandler.readFile(item._id, item.fileName))
}

export default{
    getNewScan
}