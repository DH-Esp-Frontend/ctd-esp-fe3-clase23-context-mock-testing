import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreditCardForm from 'dh/components/forms/CreditCardForm'
import { OrderProvider, OrderState } from 'dh/components/OrderContext';
import useOrder from 'dh/components/useOrder';
import { StepperNavigationProps } from "dh/components/StepperNavigation";
import { RegisterFormData } from 'dh/components/forms';

const mockStepperNavigationProps = jest.fn();
jest.mock('dh/components/StepperNavigation', () => jest.fn((props: StepperNavigationProps) => {
    // Invocamos nuestra funcion mock de jest, para validar los parametros
    mockStepperNavigationProps(props);

    // Renderizamos un mock (lo mas simple que se pueda)
    return <div>
        StepperNavigation: {props.activeStep}
        <div>
            <button onClick={props.onPrevClick}>Previous</button>
            <button onClick={props.onNextClick}>Next</button>
        </div>
    </div>
}));

jest.mock("dh/components/useOrder")
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
    state: {order: {
                customer: {firstname: "111"},
            }} as OrderState,
    dispatch: mockDispatch
})

describe('CreditCardForm', () => {
    describe('when rendering default form', () => {
        it('should render the heading', () => {
        })
    })
    describe('when rendering submitting form', () => {
        it('should hit the dispatch', async () => {
            const mockHandleNext = jest.fn();
            render(
                <OrderProvider>
                    <CreditCardForm activeStep={0} handleNext={mockHandleNext} />
                </OrderProvider>
            )

            userEvent.type(screen.getByRole('textbox', {name: 'Numero de tarjeta'}), "111")
            userEvent.type(screen.getByRole('textbox', {name: 'Fecha de Expiracion'}), "11/23")

            // expect(await screen.findByText('Card number ingresado: 111'))

            userEvent.click(screen.getByRole('button', {name: 'Next'}));

            

            await waitFor(() => {
                expect(mockHandleNext).toBeCalled();
            })
            expect(mockDispatch).toBeCalledWith({
                payload: {
                    cardNumber: "111",
                    cardExpDate: '11/23'
                },
                type: "SET_CARD"
            })

        })
    })
})