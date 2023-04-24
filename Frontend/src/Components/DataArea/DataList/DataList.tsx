import { useForm } from "react-hook-form";
import {  KnowledgeModel } from "../../../Models/knowledge-model";
import "./DataList.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ScanService from "../../../Services/scan-Service";

function DataList(): JSX.Element {

    const {register, handleSubmit} = useForm<KnowledgeModel>();
    const navigate = useNavigate();
    enum Level {
        Must = "Must",
        Important = "Important",
        NiceToHave = "Nice To Have",
        NotNecessary = "Not Necessary",
      }
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

    async function send(knowledge:KnowledgeModel) {
        try{
            await ScanService.newScan(knowledge)
            navigate("/home")
        }catch(err:any){
            alert(err.message)
        }}
    return (
        <div className="DataList">
<form className="knowledge" onSubmit={handleSubmit(send)}>
            {Object.values(Knowledge).map((item)=>{
          console.log(Object.keys(Knowledge))
          return <><div>{item}</div><select {...register(item)} >
            <option key={item+Level.Must} value={100000}>{Level.Must}</option>
            <option key={item+Level.Important} value={500}>{Level.Important}</option>
            <option key={item+Level.NiceToHave} value={10}>{Level.NiceToHave}</option>
            <option selected key={item+Level.NotNecessary} value={1}>{Level.NotNecessary}</option>
          </select></>
        })}
            
            
          <br />
          <input
            className="btn btn-primary"
            type="submit"
            value="Scan"
          /></form>        </div>
    );
}

export default DataList;
