import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu/><br/>
            <h1>Smart software for scanning resumes</h1>
        </div>
    );
}

export default Header;
