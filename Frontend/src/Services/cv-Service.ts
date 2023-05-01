import axios from "axios";
import { cvModel } from "../Models/cv-Model";
import appConfig from "../Utils/AppConfig";
import { store } from "../redux/store";

class cvService {
    public async addCV(cv:cvModel):Promise<void>{
        const headers = {"Content-Type":"multipart/form-data"};
        const response =await axios.post<cvModel>(appConfig.cvUrl, cv, {headers});
        const addedCV = response.data;
        
    }

    public async deleteOldCV(date:string):Promise<void>{
        const response = await axios.delete(appConfig.cvUrl+"/test/"+date)
    }
}

const CVService = new cvService();

export default CVService;
