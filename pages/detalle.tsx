import LayoutBlue from "dh/components/layouts/LayoutBlue";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
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
    return (<div>
        <main className={styles.main}>
            Detalle
        </main>
    </div>)
}

(DetailPage as any).Layout = LayoutBlue;

export default DetailPage;