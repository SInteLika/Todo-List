import AddPhoto from "../../UtilsComponent/AddPhoto";
import {useState} from "react";
import instance from "../../../utils/axios";
import {updatePhoto} from "../../../redux/slices/authSlice";
import {useDispatch} from "react-redux";
import {serverPhotoURL} from "../../../utils/link";


export default function ChangePhoto(props) {
    const [image, setImage] = useState('manSmile.png')
    const dispatch = useDispatch()
    async function submit(user) {
        let avatarUrl;
        if (typeof (image) === 'string') {
            avatarUrl = image
        } else {
            const formData = new FormData()
            formData.append('image', image, Date.now().toString() + props.id + '.png')
            const {data} = await instance.post('upload', formData)
            avatarUrl = data.url
        }
        const {data} = await instance.patch('/user/photo', {
            avatarUrl
        })
        dispatch(updatePhoto(avatarUrl))
        props.setPhoto(serverPhotoURL + avatarUrl)

        props.setIsAnim(false)
        setTimeout(() => props.setIsVisible(false), 800)
    }


    return (
        <>
            {props.isVisible && <div className={`settings-addPhoto ${props.isAnim && 'settings-addPhoto_visible'}`}>
                <AddPhoto className={'registration-form-file'} setImage={setImage}/>
                <div className="settings-form-buttons_addPhoto">
                    <button type={'reset'} className="settings-form-buttons__close btn"
                            onClick={() => {
                                props.setIsAnim(false)
                                setTimeout(() => props.setIsVisible(false), 800)
                            }}>Отмена/
                    </button>
                    <button onClick={submit} type={'submit'} className="settings-form-buttons__add btn">Сохранить</button>
                </div>
            </div>}
        </>
    )
}