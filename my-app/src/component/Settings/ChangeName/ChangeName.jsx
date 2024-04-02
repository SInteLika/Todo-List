import {useForm} from "react-hook-form";
import {useState} from "react";
import instance from "../../../utils/axios";
import {useDispatch} from "react-redux";
import {updateName} from "../../../redux/slices/authSlice";

export default function ChangeName(props) {
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
        clearErrors
    } = useForm({
        mode: 'onSubmit',
    })

    async function fetchChangeName(name) {
        const {data} = await instance.patch('user/name', {
            fullName: name.userName
        })
        if(data) {
            setIsUpdate(true)
            dispatch(updateName(name.userName))
            resetField('userName')
            setTimeout( () => setIsVisible(false), 200)
            setTimeout( () => setIsUpdate(false), 1000)
        }
    }

    return (
        <div className="settings-nick">
            <div className="settings-header__title">
                Ваш никнейм:
                <span className={`settings-header__nick ${isUpdate ? 'settings-header__nick_anim' : ''}`}>
                    {props.fullName}
                </span>
                <span className="settings-header__change"
                    onClick={() => setIsVisible(!isVisible)}>изменить</span>
            </div>
            <form onSubmit={handleSubmit(fetchChangeName)}
                  className={ `settings-form ${isVisible ? 'settings-form_visible' : ''}`}>
                <input
                    {...register('userName', {
                        required: 'Введите имя',
                        minLength: {
                            value: 2,
                            message: 'Имя должно быть не менее 2-х символов'
                        }
                    })}

                    type="text" className="settings-form__input" placeholder={'Имя'}/>

                { errors.userName && <p className={'settings__error'}>{errors.userName.message}</p>}

                <div className="settings-form-buttons">
                    <button type={'reset'} className="settings-form-buttons__close btn"
                            onClick={() => {
                                setIsVisible(!isVisible)
                                clearErrors()
                                resetField('userName')
                            }}

                    >Отмена</button>
                    <button type={'submit'} className="settings-form-buttons__add btn">Сохранить</button>
                </div>
            </form>
        </div>
    )
}