import { Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTextInput from "../ControlledTextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StepperNavigation from "../StepperNavigation";
import { RegisterFormData, registerFormSchema } from "./RegisterForm.types";
import { CreditCardFormData } from "./CreditCardForm.types";
import CardInput from "../card-input/CardInput";
import ControlledCardInput from "../card-input/ControlledCardInput";



export type CreditCardFormProps = {
    activeStep: number,
    handleNext: (data: CreditCardFormData) => void;
}

const CreditCardForm:FC<CreditCardFormProps> = ({activeStep, handleNext}: CreditCardFormProps) => {

    const methods = useForm<CreditCardFormData>({
        // resolver: yupResolver(registerFormSchema),
        defaultValues: {
            card: {cardNumber: '', expDate: ''},
        }
    });  
    const {setFocus, handleSubmit, watch} = methods;
    const card = watch("card")

    const onSubmit = (data: CreditCardFormData) => {
        console.log(JSON.stringify(data));
        handleNext(data);
    }
    
    useEffect(() => {
        // setFocus("email")
    },[]);

    return  <Stack>
    <h4>Paso 1</h4>
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>

            

            <ControlledCardInput />


            <div>
                Card number ingresado: {card.cardNumber}
            </div>
            <div>
                Fecha exp ingresada: {card.expDate}
            </div>

        </FormProvider>
    </form>
    <StepperNavigation activeStep={activeStep} 
                onPrevClick={() => console.log('do nothing')} 
                onNextClick={handleSubmit(onSubmit)} 
                /> 
</Stack>
}

export default CreditCardForm;