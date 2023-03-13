import { useState, useEffect } from 'react';
import Blank from '../Templates/Blank/index';

import { series } from '../utils/schedule';

export default function Schedule() {
    return (
		<Blank title="The Channel Chooser">
			<div className = {`min-h-screen h-auto text-white`}>
				<div className = "acumin flex flex-col justify-center">
					<h1 className = "text-5xl mt-4 text-center">PA League Schedule</h1>
					<h2 className = "text-center text-2xl italic mt-2">(All Times PST)</h2>
				</div>

				<div className = "grid grid-cols-4 p-8 gap-8">
					{ series.map((series) => {
						return (
							<div className = "bg-card rounded-lg p-4">
								<div className = "text-xl font-bold">{ series.name }</div>
								<div><span className="font-bold">When:</span> { series.time }</div>
								<div><span className = "font-bold">Organizer:</span> { series.organizer }</div>

								{ series.description !== null && (
									<p className = "mt-4 px-2 text-lg">
										{ series.description }
									</p>
								) }

								{/* { serie } */}
							</div>
						)
					}) }
				</div>
			</div>
		</Blank>
	)
}