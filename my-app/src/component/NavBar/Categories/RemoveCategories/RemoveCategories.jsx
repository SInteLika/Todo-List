import {ReactComponent as Logo} from "../../../../img/mainPage/Page/trash.svg"
import {useDispatch} from "react-redux";
import {changeDelCategoriesVisible} from "../../../../redux/slices/categoriesSlice";

export default function RemoveCategories(props){
    const dispatch = useDispatch()

    return (
        <div className={'categories-remove'}
            onClick={() => dispatch(changeDelCategoriesVisible())}>
            <Logo className="categories-remove__icon"/>
            <div className="categories-remove__text">Удалить</div>
        </div>
    )

}