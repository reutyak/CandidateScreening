import axios from "axios";
import appConfig from "../Utils/AppConfig";
import { SkillsModel } from "../Models/skills-Model";
import { cvModel } from "../Models/cv-Model";
import { store } from "../redux/store";
// axios.defaults.headers.common['Authorization'] = `Bearer ${store.getState().AuthState.token}`;

class scanService {
    public async newScan(knowledge:SkillsModel):Promise<void>{
        await axios.post<SkillsModel>(appConfig.scanUrl, knowledge).then((response)=>{
        const currentToken = response.headers["authorization"];
        localStorage.setItem("myToken", currentToken || "")});
        // const updateSkills = response.data;
        
    }
    // const currentloginid = async () => {
    //     const response = await fetch('http://localhost/gaq/api/api.php?action=userid')
      
    //     const data = await response.json()
        
    //     //console.log(JSON.parse(data))
      
    //     return JSON.parse(data)
    //   }
    public async getMax(){
        const response =await axios.get<string>(appConfig.scanUrl+"/max");
        const max = response.data;
        return max
        
    }
}

const ScanService = new scanService();

export default ScanService;