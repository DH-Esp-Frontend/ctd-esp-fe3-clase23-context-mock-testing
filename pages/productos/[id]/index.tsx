import LayoutRed from "dh/components/layouts/LayoutRed";
import { NextPage } from "next";
import styles from '../../../styles/Home.module.css'

const ProductPage: NextPage = () => {
    return (<div>
        <main className={styles.main}>
            Productos
        </main>
    </div>)
}

(ProductPage as any).Layout = LayoutRed;

export default ProductPage;