import { useForm } from "react-hook-form";
import { cvModel } from "../../../Models/cv-Model";
import "./Add.css";
import { Form, useNavigate } from "react-router-dom";
import CVService from "../../../Services/cv-Service";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import notify from "../../../Utils/Notify";

function Add(): JSX.Element {
  const { register, handleSubmit } = useForm<cvModel>();
  const navigate = useNavigate();
  
  async function send(cv: cvModel) {
    try {
      cv.fileContent = (cv.fileContent as unknown as FileList)[0];
      console.log(cv);
      const newCV = await CVService.addCV(cv).then(()=>notify.success("File loads successfully")).then(()=>navigate("/add"));
    } catch (err: any) {
      notify.error(err.message);
    }
  }
  return (
    <div className="Add">
      <Card className="Card" sx={{ maxWidth: 900, minHight:500 }}>
      <form className="add" onSubmit={handleSubmit(send)}>
        <div><h3>Select a resume file to add to the database</h3></div>
        <input className="addFile" type="file" accept={".txt"}  {...register("fileContent")} />
        <br />
       <Button variant="outlined"  type="submit">upload</Button>
      </form></Card>
    </div>
  );
}

export default Add;
