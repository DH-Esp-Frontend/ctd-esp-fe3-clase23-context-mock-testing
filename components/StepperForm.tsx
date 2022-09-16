import {Box, Step, StepLabel, Stepper} from "@mui/material";
import {FC, useState} from "react";
import {RegisterFormData} from "dh/components/forms";
import RegisterForm from "dh/components/forms/RegisterForm";

export type FormData = {
    username: string,
    password: string
}

const StepperForm: FC = (props) => {
    const [activeStep, setActiveStep] = useState<number>(0);

    const [order, setOrder] = useState({});

    const handleSubmitRegisterForm = (data: RegisterFormData) => {
        setOrder({
            ...order,
            customer: data
        })
        setActiveStep(1);
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
                <div>Finalizado</div>
            }


        </Box>
    </>
}

export default StepperForm;