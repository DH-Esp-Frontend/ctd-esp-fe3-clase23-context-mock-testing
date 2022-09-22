import { Stack } from "@mui/material";
import { FC, useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import StepperNavigation from "dh/components/StepperNavigation";
import { CreditCardFormData } from "./CreditCardForm.types";
import ControlledCardInput from "../card-input/ControlledCardInput";
import useOrder from "dh/components/useOrder";



export type CreditCardFormProps = {
    activeStep: number,
    handleNext: () => void;
}

const CreditCardForm:FC<CreditCardFormProps> = ({activeStep, handleNext}: CreditCardFormProps) => {

    const {dispatch} = useOrder();
    // const context = useContext(OrderContext);
    // if (!context) return <></>
    // const {dispatch} = context

    const methods = useForm<CreditCardFormData>({
        // resolver: yupResolver(registerFormSchema),
        defaultValues: {
            card: {cardNumber: '', expDate: ''},
        }
    });  
    const {setFocus, handleSubmit, watch} = methods;
    const card = watch("card")

    const onSubmit = (data: CreditCardFormData) => {
        dispatch({
            type: "SET_CARD",
            payload: data.card
        })
        handleNext();
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