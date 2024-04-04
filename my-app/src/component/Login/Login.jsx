import mainLogo from '../../img/main-logo.svg'
import {Navigate, NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin} from "../../redux/slices/authSlice";
import instance from "../../utils/axios";

export default function Login() {
    const dispatch = useDispatch()
    const data = useSelector(state => state.auth.data)
    const error = useSelector(state => state.auth.error)
    const {register, handleSubmit, formState: {errors}} = useForm()
    function submit(data){
        dispatch(fetchLogin({
            email: data.email,
            password: data.password
        }))
    }

    if(data){
        window.localStorage.setItem('token', data.token)
        instance.defaults.headers.common = {
            'Authorization': `Bearer ${data.token}`
        }
        return <Navigate to={'/'}/>
    }

    return (
        <div className={'login'}>
            <NavLink to={'/'} className={'login-logo'}>
                <img className={'login-logo__mainLogo'} src={mainLogo} alt=""/>
                <div className={'login-logo__title'}>Tasks Book</div>
            </NavLink>

            <div className={"login-page"}>
                <div className="login__title">Вход в аккаунт</div>
                <form onSubmit={handleSubmit(submit)} className={'login-form'}>
                    <input {...register('email')} type="text"
                           className={"login-form__input"} placeholder={'Email'}/>
                    <input {...register('password')} type="password"
                           className={"login-form__input"} placeholder={'Пароль'}/>
                    {error && <div className="login-form__error">Не верный логин или пароль</div>}
                    <button type={'submit'} className={'login-form__btn'}>Отправить</button>
                </form>

                <div className={"login__newAccount"}>
                    Еще нет аккаунта?
                    <NavLink to={'/registration'} className={'login__newAccount_registration'}> Регистрация</NavLink>
                </div>

            </div>
        </div>
    )
}