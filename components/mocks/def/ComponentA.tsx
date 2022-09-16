import { Stack } from "@mui/system";
import { FC, useState } from "react";
import SubComponentA from "dh/components/mocks/def/SubComponentA";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const ComponentA: FC = () => {

    const [counter, setCounter] = useState<number>(0);
    const router = useRouter();

    const onClick = () => {
        setCounter((counter) => counter + 1);
    }

    const navigate = () => {
        router.push("/products")
    }

    return <>
        <h3>Componente A</h3>
        <SubComponentA counter={counter} onClick={() => onClick()}/>
        <Stack>
            <p>Counter: {counter}</p>
        </Stack>
        <Button onClick={() => navigate()}>Navigate</Button>
    </>
}

export default ComponentA;