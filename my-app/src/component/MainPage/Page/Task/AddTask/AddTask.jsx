import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import LogoSvgCategories from "../../../../NavBar/Categories/LogoSvgCategories";
import {addActiveTask, changeVisibleAddTask} from "../../../../../redux/slices/taskSlice";
import instance from "../../../../../utils/axios";
import getNextMonday from "../../../../../utils/getNextMonday";
import {updateStatistics} from "../../../../../redux/slices/statisticsSlice";



export default function AddTask(props) {
    const activeCategories = useSelector(state => state.categories.activeCategories)
    const isVisible = useSelector(state => state.task.isVisible)
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    async function sendTask() {
        const {data} = await instance.post('categories/task', {
            name: text,
            categoriesId: activeCategories._id,
            weekData: getNextMonday(),
            weekDay: new Date().getDay()
        })
        if(data){
            dispatch(addActiveTask(data.taskData))
            dispatch(updateStatistics(data.statistics))
            dispatch(changeVisibleAddTask())
            setText('')
        }
    }

    return (
        <div className={`addTask ${isVisible ? 'addTask_active' : ''}`}>
            <div className="addTask-wrapper">
                <div className="addTask__title">Добавить новую задачу</div>
                <div className="addTask-categories">
                    <LogoSvgCategories name={activeCategories.iconName} className={'addTask-categories__icon'}/>
                    <div className="addTask-categories__name">{activeCategories.name}</div>
                </div>
            </div>
            <input onChange={e => setText(e.target.value)} value={text} type="text" className="addTask__task"
                placeholder={'Что нужно сделать?'}/>
            <div className="addTask-buttons">
                <button onClick={() => {
                    dispatch(changeVisibleAddTask())
                    setTimeout(() => setText(''), 500)
                }} className="addTask-buttons__close btn">Отмена</button>
                <button onClick={sendTask} className="addTask-buttons__add btn">Сохранить</button>
            </div>
        </div>

    )

}