import { Navigate, Route, Routes } from "react-router-dom";
import DataList from "../../DataArea/DataList/DataList";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Add from "../../DataArea/Add/Add";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path = "/login" element = {<Login/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/scan" element={<DataList />} />
            <Route path="/add" element={<Add />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
