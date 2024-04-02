import chartImg from '../../../../img/mainPage/Page/chart.png'
export default function Chart(props){
    return(
        <div className={'page-chart'}>
            <div className="page-chart__title">График успеваемости</div>
            <div className="page-chart-main">
                <img src={chartImg} alt="" className="page-chart-main__chart"/>
            </div>
        </div>
    )
}