import Week from "./Week/Week";
import Task from "./Task/Task";
import Data from "./Data/Data";
import FactDay from "./FactDay/FactDay";
import Chart from "./Chart/Chart";
import Observer from "./Observer/Observer";


export default function Page(props) {
    return (
        <div className={'page'}>
            <div className={'page-left'}>
                <Week/>
                <Task/>
            </div>
            <div className={'page-right'}>
                <Data/>
                <Observer/>
                <FactDay/>
                <Chart/>
            </div>
        </div>
    )
}