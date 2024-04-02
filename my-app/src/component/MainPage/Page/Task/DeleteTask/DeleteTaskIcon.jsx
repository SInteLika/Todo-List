import trash from "../../../../../img/mainPage/Page/trash.svg";
import {useDispatch, useSelector} from "react-redux";
import {changeSelectTask, changeVisibleDelTask} from "../../../../../redux/slices/taskSlice";


export default function DeleteTaskIcon(props) {
    const dispatch = useDispatch()

    return (<>
            <img src={trash} alt="" className="page-task-list-item-tools__delete"
                 onClick={() => {
                         dispatch(changeVisibleDelTask())
                         dispatch(changeSelectTask({
                             id: props.id,
                             name: props.name
                         }))
                 }}
            />
        </>)
}