import {useSelector} from "react-redux";


export default function Observer(props){
    const mostCreated = useSelector(state => state.statistics.data.mostCreated)
    const mostFulfilled = useSelector(state => state.statistics.data.mostFulfilled)

    const status = useSelector(state => state.statistics.status)
    const week = [' в Воскресенье', ' в Понедельник', ' во Вторник', ' в Среду', ' в Четверг', ' в Пятницу', ' в Субботу']
    return(
        <div className={'page-observer'}>
            <div className="page-observer__title">Наблюдение</div>
            <div className="page-observer-description">
                <div className="page-observer-description__create">
                    Больше всего задач вы создаете
                    {
                        status === 'loading'
                            ? "..."
                            : week[mostCreated.indexOf(Math.max(...mostCreated))]
                    }
                </div>
                <div className="page-observer-description__end">
                    Больше всего задач вы завершаете
                    {
                        status === 'loading'
                            ? "..."
                            : week[mostFulfilled.indexOf(Math.max(...mostFulfilled))]
                    }
                </div>
            </div>
        </div>
    )
}