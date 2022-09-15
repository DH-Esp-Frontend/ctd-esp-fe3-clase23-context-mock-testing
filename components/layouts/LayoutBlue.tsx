import { FC, PropsWithChildren } from "react";

const LayoutBlue:FC<PropsWithChildren> = ({children}: PropsWithChildren) => {
    return <>
        <div style={{backgroundColor: 'blue'}}>
            {children}
        </div>
    </>
}

export default LayoutBlue;