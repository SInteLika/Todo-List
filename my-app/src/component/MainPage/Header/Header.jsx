import plus from '../../../img/mainPage/Header/plus.svg'
import Account from "./Account";
import {useDispatch, useSelector} from "react-redux";
import {changeVisibleAddTask} from "../../../redux/slices/taskSlice";
import instance from "../../../utils/axios";
import {updateTheme} from "../../../redux/slices/authSlice";
import LogoSvgCategories from "../../NavBar/Categories/LogoSvgCategories";
import {changeVisible} from "../../../redux/slices/categoriesSlice";


export default function Header(props) {
    const dispatch = useDispatch()
    let theme = useSelector(state => state.auth.data.theme)
    let activeCategories = useSelector(state => state.categories.activeCategories)

    async function changeTheme() {
        theme = theme === 'dark' ? 'light' : 'dark'
        const {data} = await instance.patch('user/theme', {
            theme
        })
        if (data) {
            dispatch(updateTheme(theme))
        }
    }

    return (
        <div className={'header'}>
            <div onClick={() => {
                activeCategories._id ? dispatch(changeVisibleAddTask()) :dispatch(changeVisible())

            }} className="header-btn">
                <img src={plus} alt="" className="header-btn__icon"/>
                <div className="header-btn__text">Новая задача</div>
            </div>
            <div onClick={changeTheme}>
                <LogoSvgCategories className="header__sun svgColor" name={theme === 'dark' ? 'Sun' : 'Moon'}/>
            </div>


            <Account changeTheme={changeTheme}/>
        </div>
    )
}