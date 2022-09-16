import { FC } from "react";

export type SubComponentAProps = {
    counter: number,
    onClick: () => void
}

const SubComponentA: FC<SubComponentAProps> = ({counter, onClick}: SubComponentAProps) => {
    return <>
        <h3>Sub Componente A</h3>
    </>
}

export default SubComponentA;