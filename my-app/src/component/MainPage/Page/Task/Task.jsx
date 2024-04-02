import square from '../../../../img/mainPage/Page/square.svg'
import menu from '../../../../img/mainPage/Page/weekMenuIcon.svg'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {changeVisibleIcon, getTask} from "../../../../redux/slices/taskSlice";
import DeleteTaskIcon from "./DeleteTask/DeleteTaskIcon";
import ChangeTaskIcon from "./ChangeTask/ChangeTaskIcon";
import FulfilledTaskIcon from "./FulfilledTaskIcon/FulfilledTaskIcon";

export default function Task() {
    const dispatch = useDispatch()
    const taskActive = useSelector(state => state.task.taskActive)
    const taskFulfilled = useSelector(state => state.task.taskFulfilled)
    const categories = useSelector(state => state.categories.list)
    const elemRef = useRef({})

    useEffect(() => {
        if (categories.length > 0) {
            dispatch(getTask(categories[0]._id))
        }
    }, [categories])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    function handleClickOutside(e) {
        if (elemRef.current?.elem && !elemRef.current.elem.contains(e.target)) {
            dispatch(changeVisibleIcon({
                task: elemRef.current.task,
                _id: elemRef.current.id
            }))
            elemRef.current.elem = null
            elemRef.current.id = null
            elemRef.current.task = null
        }
    }


//ref={refEl._id}
    return (
        <div className={'page-task'}>
            <div className="page-task-active">
                <div className="page-task-header">
                    <div className="page-task-header__title">Активные задачи</div>
                    <img src={menu} alt="" className="page-task-header__icon"/>
                </div>
                <div className="page-task-list">

                    {
                        taskActive.length === 0
                            ? <div className="page-task-list-item-text__text">
                                Вы ещё не добавили задачи, самое время это сделать!
                            </div>
                            : taskActive.map((e, index) => {
                                return (
                                    <div key={e._id} className="page-task-list-item"
                                         onClick={(event) => {
                                             dispatch(changeVisibleIcon({
                                                 task: 'taskActive',
                                                 _id: e._id
                                             }))
                                             if (elemRef.current.id !== e._id) {
                                                 elemRef.current.elem = event.currentTarget
                                                 elemRef.current.id = e._id
                                                 elemRef.current.task = 'taskActive'
                                             } else {
                                                 elemRef.current.elem = null
                                                 elemRef.current.id = null
                                                 elemRef.current.task = null
                                             }
                                         }
                                         }>
                                        <div className="page-task-list-item-text">
                                            <FulfilledTaskIcon id={e._id} isActiveTask={true} isActive={e.isActive}
                                                               elem={elemRef.current.elem}
                                            />
                                            <div className={`page-task-list-item-text__text
                                            ${e.isActive ? 'page-task-list-item-text__text_active' : ''}
                                            `}>{e.name}</div>
                                        </div>
                                        <div className={`page-task-list-item-tools page-task-list-item_inActive
                                        ${e.isActive ? 'page-task-list-item_active' : ''}`}>
                                            <ChangeTaskIcon id={e._id} name={e.name}/>
                                            <DeleteTaskIcon id={e._id} name={e.name} elem={elemRef.current.elem}/>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>

            <div className="page-task-complete">
                <div className="page-task-header">
                    <div className="page-task-header__title">Завершенные задачи</div>
                </div>
                <div className="page-task-list">
                    {
                        taskFulfilled.length === 0
                            ? <div className="page-task-list-item-text__text">
                                Вы ещё не выполнили ни одной задачи, самое время это сделать!
                            </div>
                            : taskFulfilled.map((e, index) => {
                                return (
                                    <div key={e._id} className="page-task-list-item"
                                         onClick={(event) => {
                                             dispatch(changeVisibleIcon({
                                                 task: 'taskFulfilled',
                                                 _id: e._id
                                             }))
                                             if (elemRef.current.id !== e._id) {
                                                 elemRef.current.elem = event.currentTarget
                                                 elemRef.current.id = e._id
                                                 elemRef.current.task = 'taskFulfilled'
                                             } else {
                                                 elemRef.current.elem = null
                                                 elemRef.current.id = null
                                                 elemRef.current.task = null
                                             }
                                         }
                                         }>
                                        <div className="page-task-list-item-text">
                                            <FulfilledTaskIcon id={e._id} isActiveTask={false} isActive={e.isActive}/>
                                            <div className={`
                                            page-task-list-item-text__text
                                            page-task-list-item-text_crossed
                                            ${e.isActive ? 'page-task-list-item-text__text_active' : ''}
                                            `}>
                                                {e.name}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>

        </div>
    )
}