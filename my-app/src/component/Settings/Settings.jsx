import mainLogo from "../../img/main-logo.svg";
import {useSelector} from "react-redux";
import {serverPhotoURL} from "../../utils/link";
import ChangeName from "./ChangeName/ChangeName";
import ChangeEmail from "./ChangeEmail/ChangeEmail";
import ChangePassword from "./ChangePassword/ChangePassword";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ChangePhoto from "./ChangePhoto/ChangePhoto";

export default function Settings() {
    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(false)
    const [isAnim, setIsAnim] = useState(false)
    const {email, fullName, avatarUrl, _id} = useSelector(state => state.auth.data)
    const [photo, setPhoto] = useState(serverPhotoURL + avatarUrl)

    return (
        <div className={'settings'}>
            <div onClick={() => navigate('/')} className={'login-logo'}>
                <img className={'login-logo__mainLogo'} src={mainLogo} alt=""/>
                <div className={'login-logo__title'}>Tasks Book</div>
            </div>
            <div className="settings-page">
                <div className="settings__title">Настройки</div>
                <div className="settings-wrapper">
                    <div className="settings-photo">
                        <img src={photo} alt="" className="settings-photo__img"/>
                        <div className="settings-photo__change"
                             onClick={() => {
                                 if (isVisible) {
                                     setIsAnim(false)
                                     setTimeout(() => setIsVisible(false), 800)
                                 } else {
                                     setIsVisible(true)
                                     setTimeout(() => setIsAnim(true), 0)
                                 }

                             }}>изменить фото
                        </div>
                    </div>
                    <div className="settings-right">
                        <ChangeName fullName={fullName}/>
                        <ChangeEmail email={email}/>
                        <ChangePassword/>
                        <ChangePhoto isVisible={isVisible} setIsVisible={setIsVisible}
                                     isAnim={isAnim} setIsAnim={setIsAnim} id={_id}
                                     setPhoto={setPhoto}

                        />

                    </div>
                </div>
            </div>
        </div>
    )
}