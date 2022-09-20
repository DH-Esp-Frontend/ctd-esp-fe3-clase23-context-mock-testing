import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import { CardType } from "../forms/CreditCardForm.types";
import CardInput from "./CardInput";

const ControlledCardInput: FC= () => {

    const {control, setValue} = useFormContext();
    const {
        field: {onChange, value, ref},
        formState: {errors}
    } = useController<Record<string, CardType>>({
        name: 'card',
        control, 
        defaultValue: {cardNumber: '', expDate: ''},
    }); 

    return <CardInput 
    value={value}
    // value={{
        // cardNumber: value.cardNumber,
        // expDate: value.expDate
    // }} 
    onChange={(card: CardType) => {
        setValue('card', card);
    }} />
}

export default ControlledCardInput;