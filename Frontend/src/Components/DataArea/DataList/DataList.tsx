import { useForm } from "react-hook-form";
import {  SkillsModel } from "../../../Models/skills-Model";
import "./DataList.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ScanService from "../../../Services/scan-Service";
import axios from "axios";
import { store } from "../../../redux/store";
import notify from "../../../Utils/Notify";
axios.defaults.headers.common['Authorization'] = `Bearer ${store.getState().AuthState.token}`;

function DataList(): JSX.Element {

    const {register, handleSubmit} = useForm<SkillsModel>();
    const navigate = useNavigate();

    
    enum Level {
        Must = "Must",
        Important = "Important",
        NiceToHave = "Nice To Have",
        NotNecessary = "Not Necessary",
      }
    enum Skills {
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

    async function send(knowledge:SkillsModel) {
        try{
            await ScanService.newScan(knowledge)
            notify.success("Skills list successfully defined")
            navigate("/home")
        }catch(err:any){
            notify.error(err.message)
        }}
    return (
        <div className="DataList">
<form className="knowledge" onSubmit={handleSubmit(send)}>
            {Object.values(Skills).map((item)=>{
          console.log(Object.keys(Skills))
          return <><div className="select"><div>{item}</div><select {...register(item)} >
            <option key={item+Level.Must} value={100000}>{Level.Must}</option>
            <option key={item+Level.Important} value={500}>{Level.Important}</option>
            <option key={item+Level.NiceToHave} value={10}>{Level.NiceToHave}</option>
            <option selected key={item+Level.NotNecessary} value={1}>{Level.NotNecessary}</option>
          </select></div></>
        })}
            
            
          <br />
          <input
            className="btn btn-primary"
            type="submit"
            value="Define"
          /></form>        </div>
    );
}

export default DataList;
