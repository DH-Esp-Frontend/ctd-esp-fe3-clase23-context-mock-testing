import LayoutBlue from "dh/components/layouts/LayoutBlue";
import { OrderProvider } from "dh/components/OrderContext";
import StepperForm from "dh/components/StepperForm";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import styles from '../styles/Home.module.css'

export type DetailStaticPropsResult = {
    firstName: string[]
}

export const getStaticProps:GetStaticProps = 
        ():GetStaticPropsResult<DetailStaticPropsResult> => {
    const firstName = ["TestUser", "TestB"]
    return {
        props: {
            firstName: firstName
        }
    }
}

const DetailPage: NextPage = () => {

    // const {selectedProduct} = useCart() // context - tu propio hook, state, localStorage 
    // const router = useRouter();

    // useEffect(() => {
    //     if (!selectedProduct){
    //         router.push("/")
    //     }
    // }, [selectedProduct])

    // if (!selectedProduct){
    //     return <></>
    // }

    return (<div>
        <main className={styles.main}>
            <div>
                {/* Datos del producto: {selectedProduct.title} */}
            </div>
            <OrderProvider>
                <StepperForm />
            </OrderProvider>
        </main>
    </div>)
}

// (DetailPage as any).Layout = LayoutBlue;

export default DetailPage;