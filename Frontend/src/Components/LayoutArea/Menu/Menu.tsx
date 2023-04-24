import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			
            <NavLink to="/home">Home</NavLink>
            <span> | </span>
            <NavLink to="/scan">Scan</NavLink>
            <span> | </span>
            <NavLink to="/add">Add</NavLink>

        </div>
    );
}

export default Menu;
