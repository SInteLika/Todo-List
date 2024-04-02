import menuIcon from '../../../../img/mainPage/Page/weekMenuIcon.svg'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getStatistics} from "../../../../redux/slices/statisticsSlice";
export default function Week(props){
    const dispatch = useDispatch()
    const statistics = useSelector(state => state.statistics.data)
    const status = useSelector(state => state.statistics.status)
    useEffect(() => {
        dispatch(getStatistics())
    }, [])
    return(
        <div className={'week'}>
            <div className="week-header">
                <div className="week-header__title">Успехи за неделю</div>
                <img src={menuIcon} alt="" className="week-header__menu"/>
            </div>
            <div className="week-statistic">
                <div className="week-statistic-item">
                    <div className="week-statistic-item__title">Создано</div>
                    <div className="week-statistic-item-circle">
                        <div className="week-statistic-item-circle__num">
                            {
                                status === 'loading'
                                ? "..."
                                : statistics.lastWeekCreated
                            }
                        </div>
                        <div className="week-statistic-item-circle__task">задач</div>
                    </div>
                </div>
                <div className="week-statistic-item">
                    <div className="week-statistic-item__title">Завершено</div>
                    <div className="week-statistic-item-circle">
                        <div className="week-statistic-item-circle__num">
                            {
                                status === 'loading'
                                    ? "..."
                                    : statistics.lastWeekFulfilled
                            }
                        </div>
                        <div className="week-statistic-item-circle__task">задач</div>
                    </div>
                </div>
                <div className="week-statistic-item">
                    <div className="week-statistic-item__title">Удалено</div>
                    <div className="week-statistic-item-circle">
                        <div className="week-statistic-item-circle__num">
                            {
                                status === 'loading'
                                    ? "..."
                                    : statistics.lastWeekDeleted
                            }
                        </div>
                        <div className="week-statistic-item-circle__task">задач</div>
                    </div>
                </div>
            </div>

        </div>
    )
}