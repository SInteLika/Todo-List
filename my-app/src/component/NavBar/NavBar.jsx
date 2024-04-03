import Categories from "./Categories/Categories";

import {ReactComponent as MainLogo} from '../../img/main-logo.svg'
import {ReactComponent as StatisticsLogo} from '../../img/data/statistics.svg'
import {ReactComponent as ArrowLogo} from '../../img/data/arrow.svg'
import {ReactComponent as LogOut} from '../../img/log-out.svg'
import {logOut} from "../../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";



export default function NavBar(props){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function exit(){
        if(window.confirm('Вы уверенны, что хотите выйти?')){
            window.localStorage.removeItem('token')
            dispatch(logOut())
            navigate('/login')
        }
    }
    return(
        <div className={'navbar'}>
            <div className={'navbar-tasksBook'}>
                <MainLogo className={'navbar-tasksBook__mainLogo'} />
                <div className={'navbar-tasksBook__title'}>Tasks Book</div>
            </div>

            <Categories/>



            <div onClick={exit} className={'navbar-logOut'}>
                <LogOut className={'navbar-logOut__logo svgColor'} />
                <div className={'navbar-logOut__text'}>Выйти</div>
            </div>

        </div>
    )
}