import { Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTextInput from "../ControlledTextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StepperNavigation from "../StepperNavigation";
import { RegisterFormData, registerFormSchema } from "./RegisterForm.types";



export type RegisterFormProps = {
    activeStep: number,
    handleNext: (data: RegisterFormData) => void;
}

const RegisterForm:FC<RegisterFormProps> = ({activeStep, handleNext}: RegisterFormProps) => {

    const methods = useForm<RegisterFormData>({
        resolver: yupResolver(registerFormSchema),
        defaultValues: {
            firstname: "Test",
            lastname: "User",
            email: "test@user.com",
        }
    });  
    const {setFocus, handleSubmit} = methods;

    const onSubmit = (data: RegisterFormData) => {
        console.log(JSON.stringify(data));
        handleNext();
    }
    
    useEffect(() => {
        setFocus("email")
    },[]);

    return  <Stack>
    <h4>Paso 1</h4>
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
            <ControlledTextInput name="email" label="Email" />
            <ControlledTextInput name="firstname" label="First Name" />
            <ControlledTextInput name="lastname" label="Last Name" />
        </FormProvider>
    </form>
    <StepperNavigation activeStep={activeStep} 
                onPrevClick={() => console.log('do nothing')} 
                onNextClick={handleSubmit(onSubmit)} 
                /> 
</Stack>
}

export default RegisterForm;