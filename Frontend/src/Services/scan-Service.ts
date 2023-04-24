import axios from "axios";
import appConfig from "../Utils/AppConfig";
import { KnowledgeModel } from "../Models/knowledge-model";

class scanService {
    public async newScan(knowledge:KnowledgeModel):Promise<void>{
        const response =await axios.post<KnowledgeModel>(appConfig.scanUrl, knowledge);
        const updateKnowledge = response.data;
        
    }
}

const ScanService = new scanService();

export default ScanService;