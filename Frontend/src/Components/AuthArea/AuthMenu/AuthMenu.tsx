import { useEffect, useState } from "react";
import "./AuthMenu.css";
import { UserModel } from "../../../Models/user-Model";
import { store } from "../../../redux/store";
import authService from "../../../Services/AuthService";
import { NavLink } from "react-router-dom";

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        setUser(store.getState().AuthState.user);

        // Listen to AuthState changes:
        store.subscribe(() => {
            setUser(store.getState().AuthState.user);
        });

        store.subscribe(()=>localStorage.setItem("token",store.getState().AuthState.token))

    }, []);

    function logout(): void {
        authService.logout();
    }
    return (
        <div className="AuthMenu">
			{!user && <>

<span>Hello Guest | </span>

<NavLink to="/login">Login</NavLink>

<span> | </span>

<NavLink to="/register">Register</NavLink>

</>}

{user && <>

<span>Hello {user.firstName} {user.lastName} | </span>

<NavLink to="/home" onClick={logout}>Logout</NavLink>

</>}
        </div>
    );
}

export default AuthMenu;
