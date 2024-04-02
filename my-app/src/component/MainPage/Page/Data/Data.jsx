import {ReactComponent as ClockIcon} from '../../../../img/mainPage/Page/dataClockIcon.svg'
import {ReactComponent as CalendarIcon} from '../../../../img/mainPage/Page/calendarIcon.svg'
import {useEffect, useState} from "react";
export default function Data(props) {
    const month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа',
                    'Сентября','Октября','Ноября','Декабря']
    const [data, setDate] = useState(new Date())
    let time = normalizeDateTime(data)
    useEffect(() => {
        setTimeout(() => setDate(new Date()), 1000)
    }, [data])

    function normalizeDateTime(data){
        function fixTime(num) {
            if(num.toString().length < 2){
                return '0' + num
            }
            return num
        }
        let hours = fixTime(data.getHours())
        let minute = fixTime(data.getMinutes())
        let second = fixTime(data.getSeconds())
        return `${hours}:${minute}:${second}`
    }
    return (
        <div className={'page-right-data'}>
            <div className="page-right-data__title">Такс такс такс</div>
            <div className="page-right-data-blocks">
                <div className="page-right-data-blocks-time">
                    <div className="page-right-data-blocks-time__title">На часах у нас</div>
                    <div className="page-right-data-blocks-time-clock">
                        <ClockIcon className={'page-right-data-blocks-time-clock__icon svgColor'} />
                        <div className="page-right-data-blocks-time-clock__text">{time}</div>
                    </div>
                </div>
                <div className="page-right-data-blocks-calendar">
                    <div className="page-right-data-blocks-calendar__title">А сегодня у нас</div>
                    <div className="page-right-data-blocks-calendar-text">
                        <CalendarIcon className="page-right-data-blocks-calendar-text__icon svgColor" />
                        <div className="page-right-data-blocks-calendar-text__data">
                            {`${data.getDate()} ${month[data.getMonth()]} ${data.getFullYear()}`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}