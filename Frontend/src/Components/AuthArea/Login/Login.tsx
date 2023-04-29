import { useForm } from "react-hook-form";
import "./Login.css";
import CredentialsModel from "../../../Models/credential-model";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";

function Login(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notify.success("Welcome back!");
            navigate("/home");
        }
        catch (err: any) {
            notify.error(err);
        }
    }
    return (
        <div className="Login">
			<h2>Login</h2>

<form onSubmit={handleSubmit(send)}>

    <label>Username: </label>
    <input required type="text" {...register("username")} />
    <span className="Err">{formState.errors.username?.message}</span>

    <label>Password: </label>
    <input required type="password" {...register("password")} />
    <span className="Err">{formState.errors.password?.message}</span>

    <button>Login</button>

</form>
        </div>
    );
}

export default Login;
