import {Box, Step, StepLabel, Stepper} from "@mui/material";
import {FC, useState} from "react";
import {RegisterFormData} from "dh/components/forms";
import RegisterForm from "dh/components/forms/RegisterForm";
import CardInput from "./card-input/CardInput";
import CreditCardForm from "./forms/CreditCardForm";
import { CreditCardFormData } from "./forms/CreditCardForm.types";

export type FormData = {
    username: string,
    password: string
}

const StepperForm: FC = (props) => {
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleSubmitRegisterForm = () => {
        setActiveStep(1);
    }

    const handleSubmitCreditCardForm = () => {
        setActiveStep(2);
    }

    return <>
        <Box sx={{width: '600px'}}>
            <h3>Login</h3>

            <Stepper
                sx={{width: '100%', marginBottom: 2}}
                activeStep={activeStep}>
                <Step>
                    <StepLabel>Registro</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Datos Personales</StepLabel>
                </Step>
            </Stepper>

            {activeStep === 0 &&
                <RegisterForm activeStep={activeStep} handleNext={handleSubmitRegisterForm}/>
            }
            {activeStep === 1 &&
                <CreditCardForm activeStep={activeStep} handleNext={handleSubmitCreditCardForm}/>
            }
             {activeStep === 2 &&
                <div>Finalizado</div>
             }

        </Box>
    </>
}

export default StepperForm;