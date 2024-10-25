import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { UserType } from "../types/Types";
import { setCurrentUser } from "../redux/appSlice";

function HomePage() {

    const dispatch = useDispatch();

    useEffect(() => {
        const result = localStorage.getItem("currentUser")
        if (result) {
            const currentUser: UserType = JSON.parse(result) as UserType;
            dispatch(setCurrentUser(currentUser))
        }
    }, []);

    return (
        <>
        </>
    )
}

export default HomePage