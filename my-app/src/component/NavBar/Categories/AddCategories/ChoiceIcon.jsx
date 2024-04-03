import LogoSvgCategories from "../LogoSvgCategories";
import IconRow from "./IconRow";


export default function ChoiceIcon(props) {
    const row1 = ['Home', 'Family', 'Work', 'Sport']

    return (
        <div className="addCategories-icon-list">
            <IconRow {...props} row={row1}/>

        </div>
    )
}