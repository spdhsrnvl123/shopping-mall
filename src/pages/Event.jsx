import { Outlet } from "react-router-dom"

export default function Event(){
    return(
        <>
            <div>오늘의 이벤트</div>
            <Outlet></Outlet>
        </>
    )
}