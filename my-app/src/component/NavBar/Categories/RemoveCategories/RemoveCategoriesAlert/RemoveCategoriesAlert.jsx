import {useDispatch, useSelector} from "react-redux";
import {changeVisibleDelTask, clearAllTask, delTask} from "../../../../../redux/slices/taskSlice";
import instance from "../../../../../utils/axios";
import getNextMonday from "../../../../../utils/getNextMonday";
import {updateStatistics} from "../../../../../redux/slices/statisticsSlice";
import {logOut} from "../../../../../redux/slices/authSlice";
import {
    addCategories,
    changeActiveCategories,
    changeDelCategoriesVisible,
    getCategories
} from "../../../../../redux/slices/categoriesSlice";

export default function RemoveCategoriesAlert(props) {
    const dispatch = useDispatch()
    const isVisibleDelCategories = useSelector(state => state.categories.isVisibleDelCategories)
    const activeCategories = useSelector(state => state.categories.activeCategories)

    async function delCat(){
        const {data} = await instance.delete(`categories/${activeCategories._id}`)
        if(data){
            dispatch(clearAllTask())
            dispatch(changeActiveCategories({}))
            dispatch(changeDelCategoriesVisible())
            dispatch(getCategories())
        }

    }

    return (
        <div className={`delTask alert ${isVisibleDelCategories ? 'alert_active' : ''}`}>
            <div className="delTask-description">
                <div className="delTask-description__title">Вы уверенны, что хотите удалить Категорию:</div>
                <div className="delTask-description__task">{activeCategories.name}</div>
            </div>

            <div className="delTask-buttons">
                <button onClick={() => dispatch(changeDelCategoriesVisible())
                } className="delTask-buttons__close btn">Отмена</button>
                <button onClick={delCat} className="delTask-buttons__add btn">Удалить</button>
            </div>
        </div>
    )

}