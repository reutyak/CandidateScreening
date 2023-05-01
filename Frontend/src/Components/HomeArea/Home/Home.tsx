import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./Home.css";
import CVService from "../../../Services/cv-Service";
import ScanService from "../../../Services/scan-Service";
import { Button, ButtonGroup } from "@mui/material";
import notify from "../../../Utils/Notify";
const uuid = require("uuid");

function Home(): JSX.Element {
  const [date, setDate] = useState<string>();
  const [cv, setCV] = useState<string>();

  function upDate(arg: SyntheticEvent): void {
    setDate((arg.target as HTMLFormElement).value);
    console.log(date);
    console.log(typeof date);
  }
  function deleteOld() {
    try {
      CVService.deleteOldCV(date).then(() => notify.success(`Files uploaded before the ${date} were successfully removed from the database`));
    } catch (err) {
      notify.error(err)
    }
  }

  async function show() {
    try {
      const myMax = await ScanService.getMax();
      setCV(myMax);
    } catch (err) {
      console.log(err)
      notify.error(err)
    }
  }

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(cv)
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
      <main>
        <div className="title">
          Presenting the most suitable candidate in the system
        </div>
        <br />
        <div>{cv}</div>
        <br></br>

        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button onClick={show}>Show the next</Button>
          <Button onClick={downloadTxtFile}>Download CV File</Button>
        </ButtonGroup>
      </main>
      <aside>
        <div className="title">Delete old files</div>
        <div>
          Select a date when previously received documents will be deleted
        </div>
        <input required type="date" onChange={upDate} />
        <br />
        <input
          className="btn btn-primary"
          type="button"
          value="Delete"
          onClick={deleteOld}
        />
      </aside>
    </div>
  );
}

export default Home;
