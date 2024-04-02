import complete from "../../../../../img/mainPage/Page/completeIcon.svg";
import square from '../../../../../img/mainPage/Page/square.svg'
import instance from "../../../../../utils/axios";
import getNextMonday from "../../../../../utils/getNextMonday";
import {updateStatistics} from "../../../../../redux/slices/statisticsSlice";
import {useDispatch} from "react-redux";
import {delTask, fulfilledTask} from "../../../../../redux/slices/taskSlice";

export default function FulfilledTaskIcon(props) {
    const dispatch = useDispatch()
    async function fetchFinishTask() {


        const {data} = await instance.patch('categories/taskFulfilled', {
            id: props.id,
            weekData: getNextMonday(),
            weekDay: new Date().getDay(),
        })
        if(data){
            props.elem.classList.add('page-task-list-item_remove')
            setTimeout(() => {
                dispatch(delTask(props.id))
                dispatch(updateStatistics(data.statistics))
                dispatch(fulfilledTask(data.taskData))
            }, 500)
        }
    }

    return (
        <>
            <img src={props.isActiveTask ? square : complete} alt=""
                 className={`page-task-list-item-text__icon page-task-list-item_inActive 
                            ${props.isActive ? 'page-task-list-item_active' : ''}`}
                 onClick={fetchFinishTask}
            />
        </>
    )
}