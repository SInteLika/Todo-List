import {useState} from "react";
import {useForm} from "react-hook-form";
import instance from "../../../utils/axios";
import {useSelector} from "react-redux";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup";


const schema = yup.object({
    oldPass: yup
        .string()
        .required('Введите пароль')
        .min(4, 'Пароль должен быть минимум 4 символа'),
    newPass: yup
        .string()
        .required('Введите пароль')
        .min(4, 'Пароль должен быть минимум 4 символа'),
    newPassAgain: yup
        .string()
        .required('Введите пароль')
        .min(4, 'Пароль должен быть минимум 4 символа')
        .oneOf([yup.ref('newPass')], 'Пароли не совпадают'),

})

export default function ChangePassword(props) {
    const [isVisible, setIsVisible] = useState(false)
    const email = useSelector(state => state.auth.data.email)

    const {
        register,
        resetField,
        setError,
        formState: {
            errors,
        },
        handleSubmit,
        clearErrors
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })

    async function fetchChangePassword({oldPass, newPass}) {
        try {
            const {data} = await instance.patch('user/pass', {
                email,
                password: oldPass,
                newPass,
            })
            console.log(123)
            if (data) {
                console.log(data)
                setTimeout(() => setIsVisible(false), 200)
            }
        } catch (err) {
            setError('root.serverError', {
                type: err.response.status,
                message: err.response.data.message
            })
        }

    }

    return (
        <div className="settings-pass">
            <div className="settings-header__title">
                Сменить пароль:
                <span className="settings-header__nick">{props.email}</span>
                <span className="settings-header__change"
                      onClick={() => setIsVisible(!isVisible)}>изменить</span>
            </div>
            <form onSubmit={handleSubmit(fetchChangePassword)}
                  className={`settings-form ${isVisible ? 'settings-form_visible' : ''}`}>
                <input
                    {...register('oldPass')}
                    type="password"
                    className="settings-form__input"
                    placeholder={'Текущий пароль'}/>
                {errors.oldPass &&  <span className={'settings__error'}>{errors.oldPass.message}</span>}
                {errors.root && <span className={'settings__error'}>{errors.root.serverError.message}</span>}

                <input
                    {...register('newPass')}
                    type="password"
                    className="settings-form__input"
                    placeholder={'Новый пароль'}/>
                {errors.newPass && <span className={'settings__error'}>{errors.newPass.message}</span>}

                <input
                    {...register('newPassAgain')}
                    type="password"
                    className="settings-form__input"
                    placeholder={'Повторите новый пароль'}/>
                {errors.newPassAgain && <span className={'settings__error'}>{errors.newPassAgain.message}</span>}

                <div className="settings-form-buttons">
                    <button type={'reset'} className="settings-form-buttons__close btn"
                            onClick={() => {
                                setIsVisible(!isVisible)
                                clearErrors()
                                resetField('oldPass')
                                resetField('newPass')
                                resetField('newPassAgain')
                            }}>Отмена</button>
                    <button type={'submit'} className="settings-form-buttons__add btn">Сохранить</button>
                </div>
            </form>

        </div>
    )
}