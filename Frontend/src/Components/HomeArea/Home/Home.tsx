import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./Home.css";
import CVService from "../../../Services/cv-Service";
import ScanService from "../../../Services/scan-Service";
const uuid = require('uuid');

function Home(): JSX.Element {
    const [date, setDate]=useState<string>();
    const [cv, setCV] = useState<string>();

    function upDate(arg: SyntheticEvent):void{
        setDate((arg.target as HTMLFormElement).value)
        console.log(date)
        console.log(typeof(date))
    }
    function deleteOld(){
        CVService.deleteOldCV(date)
    }

    async function show(){
        const myMax = await ScanService.getMax();
        setCV(myMax);
    }

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," +
            encodeURIComponent(cv)
        );
    
        element.style.display = "none";
        document.body.appendChild(element);
        // const file = new Blob([JSON.stringify(myText)],
        //             {type: 'text/html;charset=utf-8'});
        // element.href = URL.createObjectURL(file);
        element.download = `${uuid.v4()}.txt`;
        document.body.appendChild(element);
        element.click();
      };
    return (
        <div className="Home">
        <div>Delete old files</div>
        <div>Select a date when previously received documents will be deleted</div>
        <input required type="date" onChange={upDate}/>
        <br />
        <input className="btn btn-primary" type="button" value="Delete" onClick={deleteOld}/><hr></hr>
        <div>Presenting the most suitable candidate in the system</div>
        <br />
        <input className="btn btn-primary1" type="button" value="Show the next most suitable candidate" onClick={show} />
        <button onClick={downloadTxtFile}>Download CV File</button>

        <div>{cv}</div>
        </div>
    );
}

export default Home;
