import {createContext, FC, Reducer, useReducer, useMemo, Dispatch, useContext} from "react"
import { PropsWithChildren } from "react"
import { RegisterFormData } from "./forms"
import { CardType } from "./forms/CreditCardForm.types"

export type Order = {
    customer: RegisterFormData,
    card: CardType
}

export interface OrderState {
    order: Order
}

export interface OrderContextState {
    state: {order: Order},
    dispatch: Dispatch<OrderActionType>
}

export const OrderContext = createContext<OrderContextState| undefined>(
    undefined
);

type OrderSetCustomerType = {
    type: "SET_CUSTOMER",
    payload: RegisterFormData
}

type OrderSetCardType = {
    type: "SET_CARD",
    payload: CardType
}

type OrderSetStringType = {
    type: "SET_CUSTOMER_AND_ADVANCE",
    payload: {
        activeStep: number,
        customer: {}
    }
}


type OrderActionType = OrderSetCustomerType | OrderSetCardType;

const reducer = (state: OrderState, action: OrderActionType) => {
    switch (action.type){
        case "SET_CUSTOMER":
            return {...state, 
                    order: {
                        ...state.order,
                        customer: action.payload
                    }
                }
        case "SET_CARD":
            return {...state, 
                order: {
                    ...state.order,
                    card: action.payload
                }
            }
    }
}

const initialState: OrderState = {order: {
    customer: {} as RegisterFormData,
    card: {} as CardType
}}

export const OrderProvider: FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => ({
        state, 
        dispatch
    }), [state, dispatch])

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}