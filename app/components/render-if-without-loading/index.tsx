import { ReactNode } from "react"
import { Text } from "../text"

type Props = {
    condition: boolean
    children: ReactNode,
    id?:string
}

export const RenderIfWithoutLoading = ({condition, children}:Props)=>{
    return (
        <>
            {condition === true ? children: null}
        </>
    )
}