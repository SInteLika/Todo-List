import {useSelector} from "react-redux";

export default function BlackOutPage(){
    const isVisibleAddCategories = useSelector(state => state.categories.isVisible)
    const isVisibleAddTask = useSelector(state => state.task.isVisible)
    const isVisibleDelTask = useSelector(state => state.task.isVisibleDelTask)
    const isVisibleChangeTask = useSelector(state => state.task.isVisibleChangeTask)
    return (
        <div className={`blackout ${isVisibleAddCategories || isVisibleAddTask || isVisibleDelTask 
            || isVisibleChangeTask ? 'blackout_active' : ''}`}></div>
    )
}