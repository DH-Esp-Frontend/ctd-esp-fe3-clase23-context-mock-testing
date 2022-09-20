import * as yup from "yup";

// export const registerFormSchema = yup.object({
//     firstname: yup.string().required("Firstname is required"),
//     lastname: yup.string().required("Lastname is required"),
//     email: yup.string().required("Email is required").email("Email is not valid"),
// }).required();

export type CardType = {
    cardNumber: string,
    expDate: string,
}

export type CreditCardFormData = {
    card: CardType,
}