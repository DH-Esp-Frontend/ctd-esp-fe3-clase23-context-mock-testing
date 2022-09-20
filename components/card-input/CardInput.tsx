import { Stack, TextField } from "@mui/material";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { CardType } from "../forms/CreditCardForm.types";

type CardInputProps = {
    value: CardType,
    onChange: (card: CardType) => void
}

const CardInput:FC<CardInputProps> = (
    {value, onChange}: CardInputProps
) => {

    const {cardNumber, expDate} = value;

    return <>
        <Stack>
            <TextField 
                    onChange={(event) => {
                        onChange({
                            ...value,
                            cardNumber: event.target.value
                        })
                    }}
                    value={cardNumber}
                    label={"Numero de tarjeta"} 
                    fullWidth 
            />
            <TextField 
                onChange={(event) => {
                    onChange({
                        ...value,
                        expDate: event.target.value
                    })
                }}
                value={expDate}
                label={"Fecha de Expiracion"} 
                fullWidth 
            />
        </Stack>
    </>
}

export default CardInput;