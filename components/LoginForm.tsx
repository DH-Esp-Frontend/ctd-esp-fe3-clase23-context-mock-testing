import { TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// const usernameRules = {
//     required: 'Username is required',
//     minLength: {value: 3, message: 'Username should have at least 3 chars'}
// }

export const loginSchema = yup.object({
    username: yup.string().required('Username is required').min(3, 'Username should have at least 3 chars'),
    password: yup.string().required('Password is required')
}).required();

export type FormData = {
    username: string,
    password: string
}

const LoginForm:FC = (props) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const {control, register, setFocus, handleSubmit} = useForm<FormData>({resolver: yupResolver(loginSchema)});

    useEffect(() => {
        setFocus("username");
    },[])

    const onSubmit = (data:FormData):void => {
        console.log(JSON.stringify(data));
        setLoggedIn(true);
    }

    if (loggedIn) return <>Logged In!</>

    return <>
        <h3>Login</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Controller 
                    name="username"
                    control={control}
                    defaultValue={""}
                    // rules={usernameRules}
                    render={({field: {onChange, value, ref}, formState: {errors}}) => (
                        <TextField 
                            onChange={onChange}
                            value={value}
                            label={"Username:"} 
                            inputRef={ref}
                            fullWidth 
                            error={!!errors.username}
                            helperText={`${errors.username?.message || ''}`}
                        />
                    )}
                />
            </div>
            <div>
                <Controller 
                    name="password"
                    control={control}
                    defaultValue={""}
                    // rules={{required: 'Password is required'}}
                    render={({field: {onChange, value, ref}, formState: {errors}}) => (
                        <TextField 
                            onChange={onChange}
                            value={value}
                            label={"Password:"} 
                            inputRef={ref}
                            fullWidth 
                            type={'password'}
                            error={!!errors.password}
                            helperText={`${errors.password?.message || ''}`}
                        />
                    )}
                />
            </div>
            <button type="submit" >Login</button>
        </form>
    </>
}

export default LoginForm;