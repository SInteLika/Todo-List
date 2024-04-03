import NavBar from "./NavBar/NavBar";
import MainPage from "./MainPage/MainPage";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import AddCategories from "./NavBar/Categories/AddCategories/AddCategories";
import BlackOutPage from "./UtilsComponent/BlackOutPage";
import AddTask from "./MainPage/Page/Task/AddTask/AddTask";
import DeleteTask from "./MainPage/Page/Task/DeleteTask/DeleteTask";
import ChangeTask from "./MainPage/Page/Task/ChangeTask/ChangeTask";
import RemoveCategoriesAlert from "./NavBar/Categories/RemoveCategories/RemoveCategoriesAlert/RemoveCategoriesAlert";


export default function Page() {
    const status = useSelector(state => state.auth.status)
    const token = window.localStorage.getItem('token')
    document.documentElement.dataset.theme = useSelector(state => state.auth?.data?.theme) || 'dark'
    if (!token || status === 'err') {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <NavBar/>
            <MainPage/>
            <AddCategories/>
            <AddTask/>
            <RemoveCategoriesAlert/>
            <BlackOutPage />
            <DeleteTask />
            <ChangeTask />

        </>
    )
}