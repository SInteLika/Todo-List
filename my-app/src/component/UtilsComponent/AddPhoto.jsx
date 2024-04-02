import photo1 from '../../img/avatarPreset/pngwing.com.png'
import photo2 from '../../img/avatarPreset/girl.png'
import photo3 from '../../img/avatarPreset/test.png'
import photo4 from '../../img/avatarPreset/4.png'
import photo5 from '../../img/avatarPreset/5.png'
import photo6 from '../../img/avatarPreset/6.png'
import {useRef, useState} from "react";

export default function AddPhoto(props) {
    const [imageURL, setImageURL] = useState()
    const input = useRef()
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
        setImageURL(fileReader.result)
    }
    function uploadFile(e) {
        e.preventDefault()
        const file = e.target.files[0]
        props.setImage(file)
        fileReader.readAsDataURL(file)
    }

    function handlePhoto(e, name) {
        input.current.value = ''
        props.setImage(name)
        setImageURL(e.target.src)
    }



    return (
        <div className={props.className + ' ' + 'addPhoto'}>
            <div className="addPhoto-fileLoader">
                <label className={'addPhoto-fileLoader__btn btn'} htmlFor={'file-loader-btn'}> Загрузить фото</label>
                <input ref={input} id={'file-loader-btn'} type="file" hidden={true} accept={'image/*'}
                onChange={uploadFile}/>

                <img src={imageURL ? imageURL : photo1} alt="" className="addPhoto-fileLoader-default"/>
            </div>


            <div className="addPhoto-default">
                <div className="addPhoto-default__title">
                    Или выберете один из вариантов
                </div>
                <div className="addPhoto-default-list">
                    <img onClick={(e) => handlePhoto(e, 'manSmile.png')}
                         src={photo1} alt="" className="addPhoto-default-list__item"/>
                    <img onClick={(e) => handlePhoto(e, 'girl.png')}
                         src={photo2} alt="" className="addPhoto-default-list__item"/>
                    <img onClick={(e) => handlePhoto(e, 'avatar.png')}
                         src={photo3} alt="" className="addPhoto-default-list__item"/>
                </div>
                <div className="addPhoto-default-list">
                    <img onClick={(e) => handlePhoto(e, 'man.png')}
                         src={photo4} alt="" className="addPhoto-default-list__item"/>
                    <img onClick={(e) => handlePhoto(e, 'manGlasses.png')}
                         src={photo5} alt="" className="addPhoto-default-list__item"/>
                    <img onClick={(e) => handlePhoto(e, 'girlOrange.png')}
                         src={photo6} alt="" className="addPhoto-default-list__item"/>
                </div>
            </div>
        </div>
    )

}