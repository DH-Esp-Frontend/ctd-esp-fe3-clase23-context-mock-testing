import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm:FC = (props) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const {register, setFocus, handleSubmit, formState: {errors}} = useForm();

    useEffect(() => {
        setFocus("username");
    },[])

    const onSubmit = (data:any):void => {
        console.log(JSON.stringify(data));
        setLoggedIn(true);
    }

    if (loggedIn) return <>Logged In!</>

    return <>
        <h3>Login</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" {...register("username", {required: true, minLength: 3})}/>
                {errors.username?.type === 'required' && <p>Username is required</p> }
                {errors.username?.type === 'minLength' && <p>Username should have at least 3 chars</p> }
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" role="textbox" {...register("password", {required: true})}/>
                {errors.password?.type === 'required' && <p>Password is required</p> }
            </div>
            <button type="submit" >Login</button>
        </form>
    </>
}

export default LoginForm;