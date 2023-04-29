import { useForm } from "react-hook-form";
import { cvModel } from "../../../Models/cv-Model";
import "./Add.css";
import { Form, useNavigate } from "react-router-dom";
import CVService from "../../../Services/cv-Service";
import { ChangeEvent, SyntheticEvent, useState } from "react";

function Add(): JSX.Element {
  const { register, handleSubmit } = useForm<cvModel>();
  const navigate = useNavigate();
  
  async function send(cv: cvModel) {
    try {
      cv.fileContent = (cv.fileContent as unknown as FileList)[0];
      console.log(cv);
      await CVService.addCV(cv);
      navigate("/add");
    } catch (err: any) {
      alert(err.message);
    }
  }
  return (
    <div className="Add">
      <form className="add" onSubmit={handleSubmit(send)}>
        <div>Choose CV File</div>
        <input type="file" accept={".txt"}  {...register("fileContent")} />
        <br />
        <input className="btn btn-primary" type="submit" value="Add CV" />
      </form>
    </div>
  );
}

export default Add;
