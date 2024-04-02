import {useState} from "react";
import {useForm} from "react-hook-form";
import instance from "../../../utils/axios";
import {updateEmail,} from "../../../redux/slices/authSlice";
import {useDispatch} from "react-redux";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup";


const schema = yup.object({
    email: yup
        .string()
        .email('Почта должна быть валидной')
        .required('Введите email')

})

export default function ChangeEmail(props) {
    const dispatch = useDispatch()
    const [isUpdate, setIsUpdate] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const {
        register,
        resetField,
        formState: {
            errors,
        },
        handleSubmit,
        clearErrors,
        setError
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })

    async function fetchChangeName(email) {
        try {
            const {data} = await instance.patch('user/email', {
                email: email.email
            })
            if (data) {
                setIsUpdate(true)
                dispatch(updateEmail(email.email))
                resetField('email')
                setTimeout(() => setIsVisible(false), 200)
                setTimeout(() => setIsUpdate(false), 1000)
            }
        } catch (err) {
            setError('root.serverError', {
                type: err.response.status,
                message: err.response.data.message
            })
        }
    }

    return (
        <div className="settings-email">
            <div className="settings-header__title">
                Ваш email:
                <span className={`settings-header__nick ${isUpdate ? 'settings-header__nick_anim' : ''}`}>
                    {props.email}
                </span>
                <span className="settings-header__change"
                      onClick={() => setIsVisible(!isVisible)}>изменить</span>
            </div>

            <form onSubmit={handleSubmit(fetchChangeName)}
                  className={`settings-form ${isVisible ? 'settings-form_visible' : ''}`}
                  noValidate={true}>
                <input
                    {...register('email')}
                    type="email" className="settings-form__input" placeholder={'Email'}/>
                {errors.email && <p className={'settings__error'}>{errors.email.message}</p>}
                {errors.root && <p className={'settings__error'}>{errors.root.serverError.message}</p>}


                <div className="settings-form-buttons">
                    <button type={'reset'} className="settings-form-buttons__close btn"
                            onClick={() => {
                                setIsVisible(!isVisible)
                                clearErrors()
                                resetField('email')
                            }}>Отмена
                    </button>
                    <button type={'submit'} className="settings-form-buttons__add btn">Сохранить</button>
                </div>
            </form>
        </div>
    )

}