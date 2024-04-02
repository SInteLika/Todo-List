import LogoSvgCategories from "../LogoSvgCategories";


export default function IconRow(props){
    function toggleActiveClass(e) {
        document.querySelector('.addCategories-icon-list-row_active')
            ?.classList.remove('addCategories-icon-list-row_active')
        e.currentTarget.classList.add('addCategories-icon-list-row_active')
    }
    return (
        <div className="addCategories-icon-list-row">
            {
                props.row.map((e, index) => {
                    return <div key={index} className={'addCategories-icon-list-row__item'} onClick={event => {
                        toggleActiveClass(event)
                        props.setIcon(e)
                    }}>
                        <LogoSvgCategories  name={e} />
                    </div>
                })
            }
        </div>
    )
}