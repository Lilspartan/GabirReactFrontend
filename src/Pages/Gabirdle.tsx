import Blank from '../Templates/Blank/index';
import { useState, useEffect } from 'react';
import allWords from '../utils/allwords';
import words from '../utils/gabirdleWords';
import useKeypress from '../utils/useKeypress';

interface GameState {
	guessRow: "0" | "1" | "2" | "3" | "4" | "5";
	rows: {
		"0": string[];
		"1": string[];
		"2": string[];
		"3": string[];
		"4": string[];
		"5": string[];
	};
	inSpot: string[];
	inWord: string[];
	notInWord: string[];
}

const Gabirdle = () => {
	const [gameState, setGameState] = useState<GameState>({
		guessRow: "0",
		rows: {
			"0": ["", "", "", "", ""],
			"1": ["", "", "", "", ""],
			"2": ["", "", "", "", ""],
			"3": ["", "", "", "", ""],
			"4": ["", "", "", "", ""],
			"5": ["", "", "", "", ""]
		},
		inSpot: [],
		inWord: [],
		notInWord: []
	})

	/*
		c - Correct / in spot
		i - in word
		n - not in word
	*/
	const [evaluations,setEvaluations] = useState<string[][]>([
		[],
		[],
		[],
		[],
		[],
		[]
	]);
	
	const [keysRow1, setKeysRow1] = useState(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"])
	const [keysRow2, setKeysRow2] = useState(["A", "S", "D", "F", "G", "H", "J", "K", "L"])
	const [keysRow3, setKeysRow3] = useState(["Z", "X", "C", "V", "B", "N", "M"])
	const [state, setState] = useState("PLAYING");
    const [message, setMessage] = useState<string | null>(null);
    const [shareMessage, setShareMessage] = useState("");
    const [shareButton, setShareButton] = useState("SHARE");
    const [nextTime, setNextTime] = useState(0);

	useKeypress(['Enter', 'Backspace', ...keysRow1, ...keysRow2, ...keysRow3], (event: { key: string }) => {
		if (event.key === "Backspace") pressButton("del");
		else if (event.key === "Enter") pressButton("enter");
		else if (keysRow1.includes(event.key.toUpperCase()) || keysRow2.includes(event.key.toUpperCase()) || keysRow3.includes(event.key.toUpperCase())) {
			pressButton(event.key.toUpperCase())
		}
	});

	// const [wordToGuess, setWordToGuess] = useState(words[Math.floor(Math.random() * words.length)])
	const [wordToGuess, setWordToGuess] = useState(words[0])

	const endMessages = [
		[
			"Genius!",
			"Suspiciously Good!",
			"That's Amazing!",
			"Rivaling the Speeds of Mike Racecar"
		],
		[
			"I Can't Believe you Did That...",
			"That's Impressive!"
		],
		[
			"A Very Good Game",
			"Wow!",
			"Nice!"
		],
		[
			"A Very Respectable Score",
			"Great Job!"
		],
		[
			"That was cutting it close!",
			"Good Save!"
		],
		[
			"I was starting to get worried!"
		]
	]

    function timeConverter(UNIX_timestamp:number){
        var a = new Date(UNIX_timestamp * 1000);;
        var year = a.getFullYear();
        var month = a.getMonth() + 1 < 10 ? "0" + String(a.getMonth() + 1) : String(a.getMonth() + 1);
        var date = "0" + a.getDate();
        var hour = "0" + a.getHours();
        var min = "0" + a.getMinutes();
        var sec = "0" + a.getSeconds();
        let _tz = new Date()!.toString()!.match(/([-\+][0-9]+)\s/)![1]
        var s = `${year}-${month}-${date.substr(-2)}T${hour.substr(-2)}:${min.substr(-2)}:${sec.substr(-2)}${_tz}`
        return s
    }

	const pressButton = (btn: string) => {
		if (state !== "PLAYING") return;
        setMessage(null);

		if (btn !== "enter" && btn !== "del") {
			if (gameState.rows[gameState.guessRow].length < 6) {
				let _temp = gameState.rows[gameState.guessRow]
				let foundEmptySpace = null;
				for (var i = 0; i < gameState.rows[gameState.guessRow].length; i++) {
					if (gameState.rows[gameState.guessRow][i] === "" && foundEmptySpace === null) {
						foundEmptySpace = i;
						break
					}
				}

				if (foundEmptySpace === null) { return }

				_temp[foundEmptySpace] = btn;
				setGameState({ ...gameState, rows: { ...gameState.rows, [gameState.guessRow]: _temp } })
			}
		} else if (btn === "del") {
			if (gameState.rows[gameState.guessRow].length > 0) {
				let _temp = gameState.rows[gameState.guessRow]
				let foundEmptySpace = 5;
				for (var i = 0; i < gameState.rows[gameState.guessRow].length; i++) {
					if (gameState.rows[gameState.guessRow][i] === "" && foundEmptySpace === 5) {
						foundEmptySpace = i;
						break;
					}
				}

				_temp[foundEmptySpace - 1] = "";
				setGameState({ ...gameState, rows: { ...gameState.rows, [gameState.guessRow]: _temp } })
			}
		} else if (btn === "enter") {
			// Enter Guess
			let userGuess = gameState.rows[gameState.guessRow].join("").toLowerCase();
			if (userGuess.length !== 5) return setMessage("Guess Must be 5 Letters");
			if (!(allWords.includes(userGuess) || words.includes(userGuess))) {
				return setMessage("That is Not a Valid Word")
			} else {
				console.log("Guessing: " + userGuess);

				let _split = gameState.rows[gameState.guessRow];
				for (var letter in _split) {
					let _l = _split[letter];
					if (_l.toLowerCase() === wordToGuess.toLowerCase()[letter]) {
						//In Spot
						let _temp = gameState.inSpot;
						if (!_temp.includes(_l)) {
							_temp.push(_l)
							setGameState({ ...gameState, inSpot: _temp })
						}
					} else if (wordToGuess.toLowerCase().split("").includes(_l.toLowerCase())) {
						// In Word
						let _temp = gameState.inWord;
						if (!_temp.includes(_l)) {
							_temp.push(_l)
							setGameState({ ...gameState, inWord: _temp })
						}
					} else if (_l) {
						// None
						let _temp = gameState.notInWord;
						if (!_temp.includes(_l)) {
							_temp.push(_l)
							setGameState({ ...gameState, notInWord: _temp })
						}
					}
				}

				let _t = evaluations
				let _toAdd = ["n", "n", "n", "n", "n"];
				let _splitWord = wordToGuess.toUpperCase().split("");
				let _userGuess = [...gameState.rows[gameState.guessRow]];

				// Check for letter in the correct spot
				console.log("Looking for letters in the right spot")
				for (var i = 0; i < _splitWord.length; i ++) {
					if (_splitWord[i] === _userGuess[i]) {
						_splitWord[i] = "_";
                        _userGuess[i] = "-";
						_toAdd[i] = "c"
					}
				}
					
				// Check for letters in the word	
				console.log("Looking for letters in the word")
				for (var i = 0; i < _userGuess.length; i ++) {
					if (_splitWord.includes(_userGuess[i])) {
						_splitWord[_splitWord.indexOf(_userGuess[i])] = "_";
                        _userGuess[i] = "-";
						_toAdd[i] = "i"
					}
				}
				
				_t[Number(gameState.guessRow)] = _toAdd;
				setEvaluations(_t)
                let _lw = true

                if (userGuess === wordToGuess) {
					setState("WIN")
					setMessage(endMessages[Number(gameState.guessRow)][Math.floor(Math.random() * endMessages[Number(gameState.guessRow)].length)])
				} else {
                    switch (gameState.guessRow) {
                        case "0": setGameState({ ...gameState, guessRow: "1" }); break;
                        case "1": setGameState({ ...gameState, guessRow: "2" }); break;
                        case "2": setGameState({ ...gameState, guessRow: "3" }); break;
                        case "3": setGameState({ ...gameState, guessRow: "4" }); break;
                        case "4": setGameState({ ...gameState, guessRow: "5" }); break;
                        case "5":
                            if (userGuess !== wordToGuess) {
                                setMessage("The word was: " + wordToGuess.toUpperCase())
                                setState("LOSE")
                                _lw = false;
                                break;
                            }
                    }
                }

                if (userGuess === wordToGuess || gameState.guessRow === "5") {
					console.log("Making Share Message...")
                    var _tempMessage = `Gabirdle ${!_lw ? "X" : Number(gameState.guessRow) + 1}/6`;
                    Object.values(gameState.rows).map((row, j) => {
                        if (row) _tempMessage += '\n';
                        row.map((letter, i) => {
                            if (j < Number(gameState.guessRow) + 1) {
                                if (letter.toLowerCase() === wordToGuess.toLowerCase()[i]) {
                                    return _tempMessage += '🟩';
                                } else if (wordToGuess.toLowerCase().split("").includes(letter.toLowerCase())) {
                                    return _tempMessage += '🟨';
                                } else {
                                    return _tempMessage += '⬛';
                                }
                            }
                        })
                    })
                    setShareMessage(_tempMessage);

                    let menuButton = document.getElementById("menuButton") as HTMLButtonElement;
                    menuButton.click();

					console.log("Setting Local Storage...")
					localStorage.setItem("lastGame", JSON.stringify({
						gameState,
						evaluations,
						state: (userGuess === wordToGuess ? "WIN" : "LOSE"),
						wordToGuess,
						shareMessage: _tempMessage
					}))
                }

			}
		}
	}

    const wordTimes = [
		1645759800, 1645760700,
		1645761600, 1645762500,
		1645763400, 1645764300,
		1645765200, 1645766100,
		1645767000, 1645767900,
		1645768800, 1645769700,
		1645770600, 1645771500,
		1645772400
	  ]

    // const wordTimes = [
	// 	1645147920, 1645147980, 1645148040, 1645148100,
	// 	1645148160, 1645148220, 1645148280, 1645148340,
	// 	1645148400, 1645148460, 1645148520, 1645148580,
	// 	1645148640, 1645148700, 1645148760, 1645148820,
	// 	1645148880, 1645148940, 1645149000, 1645149060,
	// 	1645149120, 1645149180, 1645149240, 1645149300,
	// 	1645149360, 1645149420, 1645149480, 1645149540,
	// 	1645149600, 1645149660, 1645149720, 1645149780,
	// 	1645149840, 1645149900, 1645149960, 1645150020,
	// 	1645150080, 1645150140, 1645150200, 1645150260,
	// 	1645150320, 1645150380, 1645150440, 1645150500,
	// 	1645150560, 1645150620, 1645150680, 1645150740,
	// 	1645150800, 1645150860
	//   ]

    useEffect(() => {
        
        var done = false;
		
		console.log("Finding when then next word is")

        for (var i = 0; i < wordTimes.length; i ++) {
            if (wordTimes[i] * 1000 > Date.now() && !done) {
                done = true;
                setNextTime(i);
				setWordToGuess(words[i])
            }
        }
    }, [])

	useEffect(() => {
		console.log("Looking for gamedata in local storage")
		var _dataFromLocalStorage = localStorage.getItem("lastGame");
		if (_dataFromLocalStorage !== null) { 
			let _d = JSON.parse(_dataFromLocalStorage)
			console.log("found gamedata in local storage")
			if (_d.wordToGuess === wordToGuess) {
				setGameState(_d!.gameState);
				setEvaluations(_d!.evaluations);
				setState(_d!.state);
				setShareMessage(_d!.shareMessage);
			} else {
				setGameState({
					guessRow: "0",
					rows: {
						"0": ["", "", "", "", ""],
						"1": ["", "", "", "", ""],
						"2": ["", "", "", "", ""],
						"3": ["", "", "", "", ""],
						"4": ["", "", "", "", ""],
						"5": ["", "", "", "", ""]
					},
					inSpot: [],
					inWord: [],
					notInWord: []
				});
				setEvaluations([[],[],[],[],[],[]]);
				setState("PLAYING");
				setShareMessage("");
			}
		}	
	}, [wordToGuess])

	useEffect(() => {
		console.log("State: " + state)
	}, [state])

	return (
		<>
			<Blank title="Gabirdle" loading={false}>
				<div id="shareMenu" uk-offcanvas="flip: true; overlay: true">
					<div className="uk-offcanvas-bar">

						<button className="uk-offcanvas-close" type="button" uk-close="true"></button>
                        
                        <div className="uk-child-width-1-4 uk-text-center" uk-grid = "true" uk-scrollspy="cls: uk-animation-slide-top-medium; target: .fade-cd; delay: 100; repeat: false" uk-countdown={`date: ` + timeConverter(wordTimes[nextTime])} uk-parallax="blur: 15;">
                            <div className = "uk-width-1-1">
                                <h1 className = "fade-cd uk-text-center uk-display-block">NEXT WORD IN</h1>
                            </div>
                            <div className = "fade-cd">
                                <span className="acumin uk-countdown-number uk-countdown-days"></span>
                                <div className="acumin uk-countdown-label">Days</div>
                            </div>
                            <div className = "fade-cd">
                                <span className="acumin uk-countdown-number uk-countdown-hours"></span>
                                <div className="acumin uk-countdown-label">Hours</div>
                            </div>
                            <div className = "fade-cd">
                                <span className="acumin uk-countdown-number uk-countdown-minutes"></span>
                                <div className="acumin uk-countdown-label">Minutes</div>
                            </div>
                            <div className = "fade-cd">
                                <span className="acumin uk-countdown-number uk-countdown-seconds"></span>
                                <div className="acumin uk-countdown-label">Seconds</div>
                            </div>
                        </div>

						{state === "PLAYING" ? <h2>Finish Your Game to Share</h2> : (
							<>
								<h3>Gabirdle, {state === "LOSE" ? "X" : Number(gameState.guessRow) + 1}/6</h3>
								{
									Object.values(gameState.rows).map((row, j) => {
										return (
											<>
												<span>

													{row.map((letter, i) => {
														if (j < Number(gameState.guessRow) + 1) {
															if (letter.toLowerCase() === wordToGuess.toLowerCase()[i]) {
																return '🟩'
															} else if (wordToGuess.toLowerCase().split("").includes(letter.toLowerCase())) {
																return '🟨'
															} else {
																return '⬛'
															}
														}
													})}

												</span><br />
											</>
										)
									})
								}
							</>
						)}
                        {state !== "PLAYING" ? <a id = "share" onClick = {() => {
                            navigator.clipboard.writeText(shareMessage);
                            setShareButton("COPIED");
                        }} uk-tooltip = "Share" className = "uk-button uk-button-default" href = "#share">{ shareButton }</a> : ""}
					</div>
				</div>

				<div id="game">
                    { message !== null ? (
                        <span id = "message">{ message }</span>
                    ) : ""}
					<div id="guesses">
						{/* <button className="uk-button uk-button-default" uk-toggle="target: #shareMenu">Menu</button> */}
                        <div id = "header">
                            <img id = "logo" src="https://i.gabirmotors.com/assets/other/gabirdle_logo.png" alt="Gabirdle Logo"/>
                            <button className="menuButton" id = "menuButton" uk-toggle="target: #shareMenu"><span uk-icon="icon: cog; ratio: 2.5"></span></button>
                        </div>
						{Object.values(gameState.rows).map((row, j) => {

							return (
								<div id={`row${j + 1}`} className="row" uk-scrollspy={`cls: ${((Number(gameState.guessRow) > j || (state === "WIN" && Number(gameState.guessRow) + 1 > j)) ? " uk-animation-scale-up" : "uk-animation-slide-top-small")}; target: .square,.in-spot,.in-word; delay: ${(Number(gameState.guessRow) > j ? "100" : "50")};; repeat: true`}>									
									{row.map((letter, i) => {
										let _classes = "square "

										if (evaluations[j] !== null) {
										 	if (evaluations[j][i] === "c") {
												_classes += " in-spot"
											} else if (evaluations[j][i] === "i") {
												_classes += " in-word"
											} else if (evaluations[j][i] === "n") {
												_classes += " not-in-word"
											}
										}

										return (
											<div id={`square${i + 1}`} className={_classes}>
												{letter}
											</div>
										)

									})}
								</div>
							)

						})}
					</div>

					<div id="keyboard" className="">
						<div id="row1" className="row">
							{keysRow1.map((key, i) => {
								let _classes = "";
								if (gameState.inSpot.includes(key)) _classes += "in-spot";
								else if (gameState.inWord.includes(key)) _classes += "in-word";
								else if (gameState.notInWord.includes(key)) _classes += "not-in-word";
								return <button onClick={() => { pressButton(key) }} className={_classes}>{key}</button>
							})}
						</div>

						<div id="row2" className="row">
							{keysRow2.map((key, i) => {
								let _classes = "";
								if (gameState.inSpot.includes(key)) _classes += "in-spot";
								else if (gameState.inWord.includes(key)) _classes += "in-word";
								else if (gameState.notInWord.includes(key)) _classes += "not-in-word";
								return <button onClick={() => { pressButton(key) }} className={_classes}>{key}</button>
							})}
						</div>

						<div id="row3" className="row">
							<button className="big" onClick={() => { pressButton("enter") }}><span uk-icon="icon: check; ratio: 2"></span></button>
							{keysRow3.map((key, i) => {
								let _classes = "";
								if (gameState.inSpot.includes(key)) _classes += "in-spot";
								else if (gameState.inWord.includes(key)) _classes += "in-word";
								else if (gameState.notInWord.includes(key)) _classes += "not-in-word";
								return <button onClick={() => { pressButton(key) }} className={_classes}>{key}</button>
							})}
							<button className="big" onClick={() => { pressButton("del") }}><span uk-icon="icon: arrow-left; ratio: 2"></span></button>
						</div>
					</div>
				</div>
			</Blank>
		</>
	)
}

export default Gabirdle;