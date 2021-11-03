import { useState, useEffect } from 'react'
import './style.scss'

const Fall = () => {
	const pickRandomLeaf = () => {
		return Math.floor(Math.random() * 3) + 1;
	}

	const pickRandomX = () => {
		return Math.floor(Math.random() * window.innerWidth);
	}

	const [leaves, setLeaves] = useState<{x: number, leaf: number}[]>([])

	const makeLeaf = () => {
		var l = leaves
		var x = pickRandomX();
		var leaf = pickRandomLeaf();
		l.push({x, leaf});
		setLeaves(l);
		console.log(leaves)
		setTimeout(makeLeaf, 10000)
	}

	useEffect(() => {
		makeLeaf();
	}, [])

	return (
		<div id = "leaves">
			{leaves.map((leaf, i) => (
				<span key = {i} className = "fall-leaf">
					<img src = {`https://i.gabirmotors.com/assets/other/fall/leaf${leaf.leaf}.png`} style = {{ left: `${leaf.x}px` }}/>
				</span>
			))}
		</div>
	)
}

export default Fall;
