import Header from "./Header/Header";
import Page from "./Page/Page";

export default function MainPage(props) {
    return (
        <div className={'mainPage'}>
            <Header/>
            <Page/>
        </div>
    )
}