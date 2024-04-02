import {Navigate, Route, Routes} from "react-router-dom";
import Page from "./component/Page";
import Login from "./component/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import instance from "./utils/axios";
import {useEffect} from "react";
import {authMe} from "./redux/slices/authSlice";
import Registration from "./component/Registration/Registration";
import Settings from "./component/Settings/Settings";

function App() {
    const dispatch = useDispatch()
    const status = useSelector(state => state.auth.status)
    useEffect(() => {
        dispatch(authMe())
    }, [])
    if (status === 'loading') {
        return <div>Загружаю....</div>
    }
    return (
        <div className="app">
            <Routes>
                <Route path={'/'} element={<Page/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/settings'} element={<Settings/>}/>
            </Routes>
        </div>
    );
}

export default App;
