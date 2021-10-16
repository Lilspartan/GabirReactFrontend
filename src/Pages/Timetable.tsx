/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Loading from "../components/LoadingIcon/Loading";

const Timetable = () => {
    const [loading, setLoading] = useState(true);
	const [time, setTime] = useState(new Date());

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500)

        setInterval(() => {
            setTime(new Date());
        }, 700)
    }, [])

    useEffect(() => {
        dayOfWeek = time.getDay();
        minutes = time.getMinutes();
        hour = time.getHours();
    }, [time])

    var dayOfWeek = time.getDay();
    var minutes = time.getMinutes();
    var hour = time.getHours();

    const twelveHourTime = (i: number) => {
        var time:"AM" | "PM" = "AM"
        if (i > 11) {
            i -= 12;
            time = "PM"
        }

        if (i === 11 && time === "AM") {
            time = "PM"
        } else if (i === 11 && time === "PM") {
            time = "AM"
        }

        return `${i + 1}:00 ${time}`
    }

    return (
        <>
            <Header title = "Gabir Motors | League Timetable" />
            {loading && <Loading />}
            {
                !loading && (
                    <>
                        <div className="uk-light uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', height: 'auto' }}> 
                            <table className = "uk-table uk-visible@m" id = "timetable">
                                <div id = "timebar" style = {{ height: `${(53 + 56 * (minutes/60)) + 56 * (hour-1)}px` }}></div>
                                <tr>
                                    <th>Times</th>
                                    <th>Sunday</th>
                                    <th>Monday</th>
                                    <th>Tuesday</th>
                                    <th>Wednesday</th>
                                    <th>Thursday</th>
                                    <th>Friday</th>
                                    <th>Saturday</th>
                                </tr>

                                {Array(24).fill("").map((h, i) => (
                                    <>
                                        <tr>
                                            <td>{ twelveHourTime(i) }</td>
                                            {Array(7).fill("").map((h, i) => (
                                                <>
                                                    <td className = {dayOfWeek === i ? "current" : "none"}></td>
                                                </>
                                            ))}
                                        </tr>
                                    </>
                                ))}

                            </table>
                        </div>
                    </>
                )
            }   
        </>
    )
}

export default Timetable;