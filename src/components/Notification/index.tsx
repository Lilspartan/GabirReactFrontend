import { useState } from 'react'
import './style.scss'

type Props = {
    type?: "success" | "danger" | "light" | "info" | "warning";
    children?: any;
    icon?: string;
    link?: string;
}

export const Notification = ({ type, children, icon, link }: Props) => {
    const [classes, setClasses] = useState(`notification notification-${type} show`)
    const dismiss = () => {
        setClasses(classes.replace('show', 'hide'));
    }

    return (
        <a href = {( link ? link : "#")} target = {( link ? "_new" : "")}>
            <div className={classes}>
                <span className="notification-close"><a href="#" onClick={dismiss}>✖</a></span>

                <span className="notification-body">
                    <span className="notification-text"> {icon !== undefined ? ( <span className = "notification-icon" uk-icon = {`icon:${icon}`}></span> ) : ""} { children } </span>
                </span>
            </div>
        </a>
    )
}

export const Area = (props: any) => {
    return (
        <div id="notifications">
            { props?.children}
        </div>
    )
}