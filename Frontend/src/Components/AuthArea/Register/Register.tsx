import { useForm } from "react-hook-form";
import "./Register.css";
import { UserModel } from "../../../Models/user-Model";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import usersService from "../../../Services/user-Services";
import notify from "../../../Utils/Notify";

function Register(): JSX.Element {

    const {register, handleSubmit, formState}=useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user:UserModel) {
        const numUser = (await usersService.getUsers()).length;
        if (numUser < 1) {
        try{
            await authService.register(user);
            alert("Welcome " + user.firstName);
            navigate("/home");
        }catch(err:any){
            alert(err.message)
        }}else{notify.error("Full user quota")}
    }
    return (
        <div className="Register">
			<h2>Register</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>First name</label>
                <input required type = "text" {...register("firstName" , UserModel.nameValidation)}/>
                <span className="Err">{formState.errors.firstName?.message}</span>
                <label>Last name</label>
                <input required type = "text" {...register("lastName", UserModel.LastNameValidation)}/>
                <span className="Err">{formState.errors.lastName?.message}</span>
                <label>User name</label>
                <input required type = "text" {...register("username", UserModel.usernameValidation)}/>
                <span className="Err">{formState.errors.username?.message}</span>
                <label>Password</label>
                <input required type = "password" {...register("password", UserModel.passwordValidation)}/>
                <span className="Err">{formState.errors.password?.message}</span>
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;
