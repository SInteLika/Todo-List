import {ReactComponent as Home} from "../../../img/categories/icons/home.svg";
import {ReactComponent as Family} from "../../../img/categories/icons/family.svg";
import {ReactComponent as Work} from "../../../img/categories/icons/work.svg";
import {ReactComponent as Sport} from "../../../img/categories/icons/sport.svg";
import {ReactComponent as Sun} from "../../../img/mainPage/Header/sun.svg";
import {ReactComponent as Moon} from "../../../img/mainPage/Header/menu/moon.svg";
import {ReactComponent as Settings} from "../../../img/mainPage/Header/menu/settings.svg";
import {ReactComponent as LogOut} from "../../../img/mainPage/Header/menu/log-out.svg";
import {ReactComponent as Arrow} from "../../../img/mainPage/Header/arrow.svg";

export default function LogoSvgCategories(props){
        switch(props.name){
            case 'Home':
                return (<Home className={props.className + ' svgColor'} />)
            case 'Family':
                return (<Family className={props.className + ' svgColor'} />)
            case 'Work':
                return (<Work className={props.className + ' svgColor'} />)
            case 'Sport':
                return (<Sport className={props.className + ' svgColor'} />)
            case 'Sun':
                 return (<Sun className={props.className + ' svgColor'} />)
            case 'Moon':
                return (<Moon className={props.className + ' svgColor'} />)
            case 'Settings':
                return (<Settings className={props.className + ' svgColor'} />)
            case 'LogOut':
                return (<LogOut className={props.className + ' svgColor'} />)
            case 'Arrow':
                return (<Arrow className={props.className + ' arrow'} />)
            case 'Default':
                return (<Sport className={props.className + ' svgColor'} />)
        }
}