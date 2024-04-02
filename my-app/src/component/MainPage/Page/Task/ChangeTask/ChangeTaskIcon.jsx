import edit from "../../../../../img/mainPage/Page/edit.svg";
import {useDispatch} from "react-redux";
import {changeSelectTask, changeVisibleChangeTask} from "../../../../../redux/slices/taskSlice";

export default function ChangeTaskIcon(props) {
    const dispatch = useDispatch()
    return (
        <>
            <img src={edit} alt="" className="page-task-list-item-tools__edit"
                 onClick={() => {
                     dispatch(changeVisibleChangeTask())
                     dispatch(changeSelectTask({
                         id: props.id,
                         name: props.name
                     }))
                 }}
            />
        </>
    )
}