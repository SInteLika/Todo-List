import {useDispatch, useSelector} from "react-redux";
import add from '../../../img/categories/icons/plus.svg'
import LogoSvgCategories from "./LogoSvgCategories";
import {changeActiveCategories, changeVisible, getCategories} from "../../../redux/slices/categoriesSlice";
import {useEffect} from "react";
import {getTask} from "../../../redux/slices/taskSlice";

export default function Categories(props) {
    const dispatch = useDispatch()
    const categoriesList = useSelector((state) => state.categories.list)
    const status = useSelector((state) => state.categories.status)
    function toggleActiveClass(e){
        document.querySelector('.categories-list-item_active')
            .classList.remove('categories-list-item_active')
        e.target.classList.add('categories-list-item_active')
    }

    useEffect(() => {
        dispatch(getCategories())

    }, [])
    return (
        <div className={'categories'}>
            <div className={'categories__title'}>Категории</div>
            {status === 'loading' ?
                <div className={'categories-list-item'}>Загружаю...</div> :
                <div className={'categories-list'}>
                    {
                        categoriesList.length === 0
                            ? <div className={'categories-list-item'}>
                                Вы пока что ещё не создали ни одной категории, самое время это сделать
                            </div>
                            : categoriesList.map((e, index) => {
                                return <div
                                    onClick={ (event) => {
                                        toggleActiveClass(event)
                                        dispatch(changeActiveCategories(e))
                                        dispatch(getTask(e._id))
                                    }}
                                    key={e._id}
                                    className={
                                        e.active
                                            ? 'categories-list-item categories-list-item_active'
                                            : 'categories-list-item'
                                    }>
                                    <LogoSvgCategories name={e.iconName}
                                                       className={'categories-list-item__icon svgColor'}/>
                                    <span>{e.name} </span>
                                </div>
                            })
                    }
                </div>
            }
            <div onClick={() => dispatch(changeVisible())} className={'categories-add'}>
                <img className={'categories-add__icon'} src={add} alt=""/>
                <div>Добавить</div>
            </div>
        </div>
    )
}