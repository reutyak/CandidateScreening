import "./PageNotFound.css";
import img from "./../../../Assets/Images/error404.jpg";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<img src={img}/>
        </div>
    );
}

export default PageNotFound;
