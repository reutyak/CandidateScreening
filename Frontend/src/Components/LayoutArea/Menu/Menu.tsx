import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/scan">Define required skills</NavLink>
            <NavLink to="/add">Add</NavLink><br></br>


        </div>
    );
}

export default Menu;
