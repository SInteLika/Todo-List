import LogoSvgCategories from "../LogoSvgCategories";
import IconRow from "./IconRow";


export default function ChoiceIcon(props) {
    const row1 = ['Home', 'Family', 'Work', 'Sport']
    const row2 = ['Home', 'Family', 'Work', 'Sport']
    const row3 = ['Home', 'Family', 'Work', 'Sport']
    return (
        <div className="addCategories-icon-list">
            <IconRow {...props} row={row1}/>
            <IconRow {...props} row={row2}/>
            <IconRow {...props} row={row3}/>
        </div>
    )
}