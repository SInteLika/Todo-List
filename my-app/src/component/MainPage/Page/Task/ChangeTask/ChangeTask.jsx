import {useDispatch, useSelector} from "react-redux";
import {changeVisibleChangeTask, updateTask} from "../../../../../redux/slices/taskSlice";
import {useEffect, useState} from "react";
import instance from "../../../../../utils/axios";

export default function ChangeTask(props){
    const dispatch = useDispatch()
    const isVisibleChangeTask = useSelector(state => state.task.isVisibleChangeTask)
    const selectTask = useSelector(state => state.task.selectTask)
    const [text, setText] = useState('')
    useEffect(() => {
        setText(selectTask.name || '')
    }, [selectTask])
    async function fetchChangeTask(){
        const {data} = await instance.patch('categories/task', {
            id: selectTask.id,
            name: text
        })
        if (data) {
            dispatch(updateTask(text))
            dispatch(changeVisibleChangeTask())
        }

    }
    return (
        <div className={`changeTask alert ${isVisibleChangeTask ? 'alert_active' : ''}`}>
            <div className="changeTask-description">
                <div className="changeTask-description__title">Обновить текст задачи:</div>
                <input onChange={(e) => setText(e.target.value)} value={text} type="text"
                       className={'changeTask-description__input'}/>
            </div>

            <div className="changeTask-buttons">
                <button onClick={() => dispatch(changeVisibleChangeTask())}
                        className="changeTask-buttons__close btn">Отмена</button>
                <button onClick={fetchChangeTask} className="changeTask-buttons__add btn">Сохранить</button>
            </div>
        </div>
    )

}