import {motion, AnimatePresence} from 'framer-motion'
import useOutsideAlerter from "../../../customHook/useOutsideAlerter";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../../redux/slices/authSlice";
import {NavLink, useNavigate} from "react-router-dom";
import {serverPhotoURL} from "../../../utils/link";
import LogoSvgCategories from "../../NavBar/Categories/LogoSvgCategories";


export default function Account(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let theme = useSelector(state => state.auth.data.theme)
    const {refEl, refToggleElement, isShow, setIsShow} = useOutsideAlerter(false)
    const {fullName, avatarUrl} = useSelector( state => state.auth.data)

    function exit(){
        if(window.confirm('Вы уверенны, что хотите выйти?')){
            window.localStorage.removeItem('token')
            dispatch(logOut())
            navigate('/login')
        }
    }

    return (
        <div className="header-account">
            <div className="header-account__text">{'Хорошего дня, ' + fullName}</div>
            <img src={serverPhotoURL + avatarUrl} alt="" className="header-account__avatar"/>

            <div className="header-account-menu">
                <div ref={refToggleElement} onClick={() => setIsShow(!isShow)}>
                    <LogoSvgCategories name={'Arrow'} className="header-account-menu__iconMenu"/>
                </div>


                <AnimatePresence>
                    {
                        isShow && (
                            <motion.div className="header-account-menu-list"
                                ref={refEl}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                                <div onClick={props.changeTheme} className="header-account-menu-list-item">
                                    <LogoSvgCategories name={theme === 'dark' ? 'Sun' : 'Moon'}
                                                       className="header-account-menu-list-item__icon"/>
                                    <div className="header-account-menu-list-item__text">Темный режим</div>
                                </div>
                                <NavLink to={'/settings'} className="header-account-menu-list-item">
                                    <LogoSvgCategories name={'Settings'} className="header-account-menu-list-item__icon"/>
                                    <div className="header-account-menu-list-item__text">Настройки</div>
                                </NavLink>
                                <div className="header-account-menu-list-item"
                                    onClick={exit}>
                                    <LogoSvgCategories name={'LogOut'} className="header-account-menu-list-item__icon"/>
                                    <div className="header-account-menu-list-item__text">Выйти</div>
                                </div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>


            </div>
        </div>
    )
}