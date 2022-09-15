import { FC, PropsWithChildren } from "react";

const LayoutRed:FC<PropsWithChildren> = ({children}: PropsWithChildren) => {
    return <>
        <div style={{backgroundColor: 'red'}}>
            {children}
        </div>
    </>
}

export default LayoutRed;