import Blank from '../Templates/Blank/index';
import { useState, useEffect } from 'react';
import allWords from '../utils/allwords';
import Modal from 'react-modal';

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
            "0": [
                "",
                "",
                "",
                "",
                ""
            ],
            "1": [
                "",
                "",
                "",
                "",
                ""
            ],
            "2": [
                "",
                "",
                "",
                "",
                ""
            ],
            "3": [
                "",
                "",
                "",
                "",
                ""
            ],
            "4": [
                "",
                "",
                "",
                "",
                ""
            ],
            "5": [
                "",
                "",
                "",
                "",
                ""
            ]
        },
        inSpot: [],
        inWord: [],
        notInWord: []
    })
    
    const [keysRow1, setKeysRow1] = useState(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"])
    const [keysRow2, setKeysRow2] = useState(["A", "S", "D", "F", "G", "H", "J", "K", "L"])
    const [keysRow3, setKeysRow3] = useState(["Z", "X", "C", "V", "B", "N", "M"])
    const [state, setState] = useState("PLAYING"); 

    const words = [
        "gabir",
        "motor",
        "tires",
        "track",
        "apron",
        "wheel",
        "chief",
        "theme",
        "jabir",
        "speed",
        "stock",
        "first",
        "quick",
        "walls",
        "drive",
        "angus",
        "rapid",
        "races",
        "crash",
        "wreck",
        "draft",
        "drift",
        "shift",
        "steer",
        "start",
        "loser",
        "nyoom",
        "teams",
        "joker",
        "lucky",
        "champ",
        "press",
        "paint",
        "lanes",
        "glove"
    ]   

    const [wordToGuess, setWordToGuess] = useState(words[Math.floor(Math.random() * words.length)])
    // const [wordToGuess, setWordToGuess] = useState(words[0])

    const pressButton = (btn: string) => {
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
                setGameState({ ...gameState, rows: { ...gameState.rows, [gameState.guessRow]: _temp }})
            }
        } else if (btn === "del") {
            if (gameState.rows[gameState.guessRow].length > 0) {
                let _temp = gameState.rows[gameState.guessRow]
                let foundEmptySpace = 5;
                for (var i = 0; i < gameState.rows[gameState.guessRow].length; i++) {
                    if (gameState.rows[gameState.guessRow][i] === "" && foundEmptySpace === 5) {
                        foundEmptySpace = i;
                        break
                    }
                }

                _temp[foundEmptySpace - 1] = "";
                setGameState({ ...gameState, rows: { ...gameState.rows, [gameState.guessRow]: _temp }})
            }
        } else if (btn === "enter") {
            // Enter Guess
            if (state !== "PLAYING") return;
            let userGuess = gameState.rows[gameState.guessRow].join("").toLowerCase();
            if (userGuess.length !== 5) return;
            if (!(allWords.includes(userGuess) || words.includes(userGuess))) {
                return alert("That is not a valid word!")
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

                switch (gameState.guessRow) {
                    case "0": setGameState({ ...gameState, guessRow: "1" }); break;
                    case "1": setGameState({ ...gameState, guessRow: "2" }); break;
                    case "2": setGameState({ ...gameState, guessRow: "3" }); break;
                    case "3": setGameState({ ...gameState, guessRow: "4" }); break;
                    case "4": setGameState({ ...gameState, guessRow: "5" }); break;
                    case "5": 
                        alert(wordToGuess)
                        setState("LOSE")
                        break;
                }

                if (userGuess === wordToGuess) {
                    setState("WIN")
                    return alert("You Guessed it!")
                }
            }
        }
    }

    const handleKeyPress = (event:any) => {
        if (event.key === "Backspace") pressButton("del");
        else if (event.key === "Enter") pressButton("enter");
        else if (keysRow1.includes(event.key.toUpperCase()) || keysRow2.includes(event.key.toUpperCase()) || keysRow3.includes(event.key.toUpperCase())) {
            pressButton(event.key.toUpperCase())
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', handleKeyPress);
        // Remove event listeners on cleanup
        return () => {
          window.removeEventListener("keyup", handleKeyPress);
        };
    }, []);

	return (
		<>
			<Blank title="Gabirdle" loading={false}>
                <div id="shareMenu" uk-offcanvas="flip: true; overlay: true">
                    <div className="uk-offcanvas-bar">

                        <button className="uk-offcanvas-close" type="button" uk-close = "true"></button>

                        {state === "PLAYING" ? <h2>Finish Your Game to Share</h2> : (
                            <>
                                <h3>Gabirdle, {state === "LOSE" ? "X" : gameState.guessRow}/6</h3>
                                {
                                    Object.values(gameState.rows).map((row, j) => {
                                        return (
                                            <>
                                                <span>
        
                                                    {row.map((letter, i) => {
                                                        if (j < Number(gameState.guessRow)) {
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

                    </div>
                </div>

                <div id = "game">
                    <div id="guesses">
                        <button className = "uk-button uk-button-default" uk-toggle="target: #shareMenu">Menu</button>
                        {Object.values(gameState.rows).map((row, j) => {

                            return (
                                <div id = {`row${j + 1}`} className = "row" uk-scrollspy={`cls: ${(Number(gameState.guessRow) > j ? "uk-animation-scale-up" : "uk-animation-slide-top-small")}; target: .square,.in-spot,.in-word; delay: 50; repeat: true`}>
                                    {row.map((letter, i) => {
                                        let _classes = "square "

                                        if (!(String(j) === gameState.guessRow)) {
                                            if (letter.toLowerCase() === wordToGuess.toLowerCase()[i]) {
                                                _classes += " in-spot"
                                            } else if (wordToGuess.toLowerCase().split("").includes(letter.toLowerCase())) {
                                                _classes += " in-word"
                                            } else if (letter) {
                                                _classes += " not-in-word"
                                            }
                                        }

                                        return (
                                            <div id = {`square${i + 1}`} className = { _classes }>
                                                { letter }
                                            </div>
                                        )

                                    })}
                                </div>
                            )

                        })}
                    </div>

                    <div id="keyboard" className = "">
                        <div id = "row1" className = "row">
                            {keysRow1.map((key, i) => {
                                let _classes = "";
                                if (gameState.inSpot.includes(key)) _classes += "in-spot";
                                else if (gameState.inWord.includes(key)) _classes += "in-word";
                                else if (gameState.notInWord.includes(key)) _classes += "not-in-word";
                                return <button onClick = {() => { pressButton(key) }} className = { _classes }>{ key }</button> 
                            })}
                        </div>

                        <div id="row2" className = "row">
                            {keysRow2.map((key, i) => {
                                let _classes = "";
                                if (gameState.inSpot.includes(key)) _classes += "in-spot";
                                else if (gameState.inWord.includes(key)) _classes += "in-word";
                                else if (gameState.notInWord.includes(key)) _classes += "not-in-word";
                                return <button onClick = {() => { pressButton(key) }} className = { _classes }>{ key }</button> 
                            })} 
                        </div>

                        <div id="row3" className = "row">
                            <button className = "big" onClick = {() => { pressButton("enter") }}><span uk-icon="icon: check; ratio: 2"></span></button>
                            {keysRow3.map((key, i) => {
                                let _classes = "";
                                if (gameState.inSpot.includes(key)) _classes += "in-spot";
                                else if (gameState.inWord.includes(key)) _classes += "in-word";
                                else if (gameState.notInWord.includes(key)) _classes += "not-in-word";
                                return <button onClick = {() => { pressButton(key) }} className = { _classes }>{ key }</button> 
                            })}
                            <button className = "big" onClick = {() => { pressButton("del") }}><span uk-icon="icon: arrow-left; ratio: 2"></span></button> 
                        </div>
                    </div>
                </div>
			</Blank>
		</>
	)
}

export default Gabirdle;