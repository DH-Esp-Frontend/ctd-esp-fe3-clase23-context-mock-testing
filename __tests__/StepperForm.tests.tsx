import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {RegisterFormData} from 'dh/components/forms';
import { CreditCardFormProps } from 'dh/components/forms/CreditCardForm';
import { CreditCardFormData } from 'dh/components/forms/CreditCardForm.types';
import {RegisterFormProps} from 'dh/components/forms/RegisterForm';
import StepperForm from 'dh/components/StepperForm'

const submittedData: RegisterFormData = {
    email: 'test@a.com',
    lastname: 'test',
    firstname: 'test',
}
const mockRegisterFormProps = jest.fn();
jest.mock('dh/components/forms/RegisterForm', () => jest.fn((props: RegisterFormProps) => {
    // Invocamos nuestra funcion mock de jest, para validar los parametros
    mockRegisterFormProps(props);

    // Renderizamos un mock (lo mas simple que se pueda)
    return <div onClick={() => props.handleNext()}>
        RegisterForm
    </div>
}))
;

const creditCardSubmittedData: CreditCardFormData = {
    card: {
        cardNumber: '111',
        expDate: '11/23'
    }
}
const mockCreditCardFormProps = jest.fn();
jest.mock('dh/components/forms/CreditCardForm', () => jest.fn((props: CreditCardFormProps) => {
    // Invocamos nuestra funcion mock de jest, para validar los parametros
    mockCreditCardFormProps(props);

    // Renderizamos un mock (lo mas simple que se pueda)
    return <div onClick={() => props.handleNext()}>
        CreditCardForm
    </div>
}))
;


// jest.mock("dh/components/forms", () => ({
//     RegisterForm: jest.fn((props: RegisterFormProps) => {
//             // Invocamos nuestra funcion mock de jest, para validar los parametros
//             mockRegisterFormProps(props);
//
//             // Renderizamos un mock (lo mas simple que se pueda)
//             return <div onClick={() => props.handleNext(submittedData)}>
//                 RegisterForm
//             </div>
//         },
//         // SegundoForm: jest.fn(() => {
//         //
//         // })
//     )
// }))


describe('StepperForm', () => {
    describe('when rendering default form', () => {
        it('should render the heading', () => {
            render(<StepperForm/>)
            const heading = screen.getByRole('heading', {
                name: /login/i,
            })
            expect(heading).toBeInTheDocument()
        })
        it('should render the step 0 with RegisterForm', () => {
            render(<StepperForm/>)
            const form = screen.getByText('RegisterForm')
            expect(form).toBeInTheDocument()

            expect(mockRegisterFormProps).toBeCalledWith(
                expect.objectContaining({activeStep: 0})
            )
        })
    })
    describe('when submitting register form', () => {
        it('should not render RegisterForm', async () => {
            render(<StepperForm/>)
            const form = screen.getByText('RegisterForm')
            await userEvent.click(form);
            expect(screen.queryByText('RegisterForm')).not.toBeInTheDocument();
        })
        it('should render Finished message', async () => {
            render(<StepperForm/>)
            const form = screen.getByText('RegisterForm')
            await userEvent.click(form);
            expect(await screen.findByText('CreditCardForm')).toBeInTheDocument();
        })
        describe('when submitting credit card form', () => {
            it('should not render RegisterForm neither CreditCardForm', async () => {
                render(<StepperForm/>)
                const form = screen.getByText('RegisterForm')
                await userEvent.click(form);

                const creditCardForm = screen.getByText('CreditCardForm')
                await userEvent.click(creditCardForm);

                expect(screen.queryByText('RegisterForm')).not.toBeInTheDocument();
                expect(screen.queryByText('CreditCardForm')).not.toBeInTheDocument();
            })
            it('should render Finished message', async () => {
                render(<StepperForm/>)
                
                const form = screen.getByText('RegisterForm')
                await userEvent.click(form);

                const creditCardForm = screen.getByText('CreditCardForm')
                await userEvent.click(creditCardForm);

                expect(await screen.findByText('Finalizado')).toBeInTheDocument();
            })
        })
    })
})