import { useState, useEffect } from 'react'
import './style.scss'

type Props = {
    icon?: string;
    type?: "success" | "danger" | "default" | "info" | "warning";
    title?: string;
    text?: string;
    collapse?: boolean;
    id?: string;
}

interface LooseObject {
    [key: string]: any
}

const Alert = ({ icon, type, title, text, collapse, id }: Props) => {
    var dismissedAlerts = localStorage.getItem("alerts");
    if (dismissedAlerts === undefined && id !== undefined) {
        var alerts: LooseObject = {};
        alerts[`${id}`] = false;
        localStorage.setItem("alerts", JSON.stringify(alerts));
    }
    const [dismissed, setDismissed] = useState(localStorage.getItem("alerts"));
    const [classes, setClasses] = useState(`alert alert-${type} alert-dismiss show`)
    const dismiss = () => {
        setClasses(classes.replace('show', 'hide'));
        var dismissedAlerts = localStorage.getItem("alerts");
        if (dismissedAlerts !== undefined && id !== undefined) {
            var data = JSON.parse(dismissedAlerts ? dismissedAlerts : "{}");
            data[id] = true;
            localStorage.setItem("alerts", JSON.stringify(data));
            setDismissed(localStorage.getItem("alerts"))
        }
    }

    useEffect(() => {
        if (dismissed !== null && id !== undefined) {
            var a = JSON.parse(dismissed);
            if (a[id]) {
                setClasses(classes.replace('show', 'uk-invisible'));
            }
        }
    }, [dismissed])

    return (
        <>
            <div className = {classes}>
                <span className ="alert-close"><a href = "#" onClick = {dismiss} >✖</a></span>
                <span className ="alert-body">
                    <span className ="alert-title">{ title }</span>
                    <span className ="slert-text">{ text }</span>
                </span>
            </div>
        </>
    )
}

export default Alert;
