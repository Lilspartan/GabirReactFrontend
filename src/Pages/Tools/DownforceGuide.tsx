/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import Blank from '../../Templates/Blank/index';

const DownforceGuide = (props: any) => {
    const [car, setCar] = useState("gt3");

    return (
		<>
			<Blank title="Downforce Guide">
				<div className={`uk-text-left uk-position-center`}>
					<div>
                        <h1>Gabir Motorsports Downforce Guide</h1>
                        <div className = "">
                            <h2 className = "uk-inline uk-margin-medium-right">I Am Driving {car === "gt3" ? "a" : "an"}</h2>
                            <div uk-form-custom="target: > * > h2:last-child">
                                <select value = {car} onChange = {(e) => {
                                    setCar(e.target.value)
                                }}>
                                    <option value="gt3">GT3</option>
                                    <option value="f3">F3</option>
                                    <option value="lmp2">LMP2</option>
                                </select>
                                <span>
                                    <h2 className = "">Lorem Ipsum</h2>
                                </span>
                            </div>
                        </div>
                    </div>
				</div>
			</Blank>
		</>
	)
}

export default DownforceGuide;