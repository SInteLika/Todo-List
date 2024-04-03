import {useState} from "react";
import LogoSvgCategories from "../LogoSvgCategories";
import ChoiceIcon from "./ChoiceIcon";
import instance from "../../../../utils/axios";
import {useDispatch, useSelector} from "react-redux";
import {
    addCategories,
    changeActiveCategories,
    changeVisible,
    getCategories
} from "../../../../redux/slices/categoriesSlice";
import {getTask} from "../../../../redux/slices/taskSlice";

export default function AddCategories(props) {
    const [icon, setIcon] = useState('Home')
    const [text, setText] = useState('')
    const isVisible = useSelector(state => state.categories.isVisible)
    const dispatch = useDispatch()
    async function sendCategories() {
        const {data} = await instance.post('categories', {
            name: text,
            iconName: icon
        })
        if(data){
            dispatch(addCategories(data))
            setText('')
            dispatch(getCategories())
        }
    }

    return (
        <div className={`addCategories ${isVisible? 'addCategories_active' : ''}`}>
            <div className="addCategories-wrapper">
                <div className="addCategories-left">
                    <div className="addCategories__title">Добавить новую категорию
                    </div>
                    <input className="addCategories__name" type="text"
                           placeholder={'Имя категории'} value={text}
                           onChange={ e => setText(e.target.value)}
                    />
                </div>

                <div className="addCategories-icon">
                    <div className="addCategories-icon__title">Выберете иконку</div>
                    <ChoiceIcon setIcon={setIcon}/>

                </div>
            </div>
            <div className="addCategories-buttons">
                <button onClick={() => {
                    dispatch(changeVisible())
                    setTimeout(() => setText(''), 500)

                }} className="addCategories-buttons__close btn">Отмена</button>
                <button className="addCategories-buttons__add btn" onClick={sendCategories}>Добавить</button>
            </div>

        </div>
    )

}