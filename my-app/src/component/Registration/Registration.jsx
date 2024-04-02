import mainLogo from "../../img/main-logo.svg";
import AddPhoto from "../UtilsComponent/AddPhoto";
import {useForm} from "react-hook-form";
import {useState} from "react";
import instance from "../../utils/axios";
import getNextMonday from "../../utils/getNextMonday";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registration} from "../../redux/slices/authSlice";


export default function Registration() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth.data)
    const [image, setImage] = useState('manSmile.png')
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm({
        mode: 'onBlur'
    })

    if (auth) {
        return <Navigate to={'/'}/>
    }

    async function submit(user) {
        let avatarUrl;
        if (typeof (image) === 'string') {
            avatarUrl = image
        } else {
            const formData = new FormData()
            formData.append('image', image, user.email + '.png')
            const {data} = await instance.post('upload', formData)
            avatarUrl = data.url
        }

        const {data} = await instance.post('auth/register', {
            email: user.email,
            fullName: user.userName,
            password: user.password,
            theme: 'dark',
            avatarUrl,
            weekData: getNextMonday()
        })
        window.localStorage.setItem('token', data.token)
        instance.defaults.headers.common = {
            'Authorization': `Bearer ${data.token}`
        }
        dispatch(registration(data))
    }



    return (
        <div className={'registration'}>
            <div className={'login-logo'}>
                <img className={'login-logo__mainLogo'} src={mainLogo} alt=""/>
                <div className={'login-logo__title'}>Tasks Book</div>
            </div>

            <div className="registration-page">
                <div className="registration__title">Регистрация</div>

                <form onSubmit={handleSubmit(submit)} className={'registration-form'}>
                    <input {...register('email',
                        {
                            required: 'Введите почту'
                        })}
                           type="text"
                           className={
                               errors.email
                                   ? 'registration-form__input registration-form__input_error'
                                   : 'registration-form__input'
                           }
                           placeholder={'Введите почту'}/>

                    <div className={
                        errors.email
                            ? 'registration-form-error registration-form-error_visible'
                            : 'registration-form-error'
                    }>
                        <span>{errors?.email?.message}</span>
                    </div>

                    <input
                        {...register('userName', {
                            required: 'Введите имя'
                        })}
                        type="text"
                        className={
                            errors.userName
                                ? 'registration-form__input registration-form__input_error'
                                : 'registration-form__input'
                        }
                        placeholder={'Введите имя'}/>
                    <div className={
                        errors.userName
                            ? 'registration-form-error registration-form-error_visible'
                            : 'registration-form-error'
                    }>
                        <p>{errors?.userName?.message}</p>
                    </div>


                    <input
                        {...register('password', {
                            required: 'Введите пароль',
                            minLength: {
                                value: 4,
                                message: 'Пароль должен быть не менее 4-х символов'
                            }
                        })}
                        type="password"
                        className={
                            errors.password
                                ? 'registration-form__input registration-form__input_error'
                                : 'registration-form__input'
                        }
                        placeholder={'Введите пароль, не менее 4-х символов'}/>
                    <div className={
                        errors.password
                            ? 'registration-form-error registration-form-error_visible'
                            : 'registration-form-error'
                    }>
                        <p>{errors?.password?.message}</p>
                    </div>


                    <AddPhoto className={'registration-form-file'}
                              setImage={setImage}
                    />

                    <button type={'submit'} className={'registration-form__btn btn'}>Отправить</button>

                </form>
            </div>


        </div>
    )
}