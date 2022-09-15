import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegisterFormData } from 'dh/components/forms';
import { RegisterFormProps } from 'dh/components/forms/RegisterForm';
import StepperForm from 'dh/components/StepperForm'

const submittedData: RegisterFormData = {
    email: 'test@a.com',
    lastname: 'test',
    firstname: 'test',
}

const mockRegisterFormProps = jest.fn();
jest.mock("dh/components/forms", () => ({
    RegisterForm: jest.fn((props: RegisterFormProps) => {
        // Invocamos nuestra funcion mock de jest, para validar los parametros
        console.log("Inside Render of RegisterForm")
        // mockRegisterFormProps(props);

        console.log("Props were called and initializing rendering")
        // Renderizamos un mock (lo mas simple que se pueda)
        return <div onClick={() => props.handleNext(submittedData)}>
            RegisterForm
            </div>
    },
    // SegundoForm: jest.fn(() => {
        // 
    // })
    )
}))


describe('StepperForm', () => {
    describe('when rendering default form', () => {
        xit('should render the heading', () => {
            render(<StepperForm />)
            const heading = screen.getByRole('heading', {
                name: /login/i,
            })
            expect(heading).toBeInTheDocument()
        })
        it('should render the step 0 with RegisterForm', () => {
            console.log("StepperForm Init")
            render(<StepperForm />)
            console.log("StepperForm Rendered")
            const form = screen.getByText('RegisterForm')
            expect(form).toBeInTheDocument()
            
            expect(mockRegisterFormProps).toBeCalledWith(
                expect.objectContaining({activeStep: 0})
            )
        })
    })
    describe('when submitting register form', () => {
        xit('should not render RegisterForm', async () => {
            render(<StepperForm />)
            const form = screen.getByText('RegisterForm')
            await userEvent.click(form);
            expect(screen.queryByText('RegisterForm')).not.toBeInTheDocument();
        })
        xit('should render Finished message', async () => {
            render(<StepperForm />)
            const form = screen.getByText('RegisterForm')
            await userEvent.click(form);
            expect(await screen.findByText('Finalizado')).toBeInTheDocument();
        })
    })
})