import {useDispatch, useSelector} from "react-redux";
import {changeVisibleDelTask, delTask} from "../../../../../redux/slices/taskSlice";
import instance from "../../../../../utils/axios";
import getNextMonday from "../../../../../utils/getNextMonday";
import {updateStatistics} from "../../../../../redux/slices/statisticsSlice";

export default function DeleteTask(props) {
    const dispatch = useDispatch()
    const isVisibleDelTask = useSelector(state => state.task.isVisibleDelTask)
    const selectTask = useSelector(state => state.task.selectTask)
    async function fetchDelTask() {
        const {data} = await instance.delete(`categories/task/${selectTask.id}/${getNextMonday()}`)
        if(data){
            dispatch(delTask(selectTask.id))
            dispatch(updateStatistics(data.statistics))
            dispatch(changeVisibleDelTask())
        }
    }

    return (
        <div className={`delTask alert ${isVisibleDelTask ? 'alert_active' : ''}`}>
            <div className="delTask-description">
                <div className="delTask-description__title">Вы уверенны, что хотите удалить задачу:</div>
                <div className="delTask-description__task">{selectTask.name}</div>
            </div>

            <div className="delTask-buttons">
                <button onClick={() => dispatch(changeVisibleDelTask())
                } className="delTask-buttons__close btn">Отмена</button>
                <button onClick={fetchDelTask} className="delTask-buttons__add btn">Удалить</button>
            </div>
        </div>
    )

}