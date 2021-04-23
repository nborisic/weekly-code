import React, { useEffect, useState, useRef } from 'react';
import Letter from './letter';
import Countdown from './counter';
import './index.scss';
import { randomInt } from './util';
import Radio from './radio';
import EndGame from './gameEnd';
import { ReactComponent as Refresh }  from '../assets/refresh.svg';
var TEXT_DATA = require('./text.json');

function Letters() {
    const correctAnswers = useRef(0);
    const wrongAnswers = useRef(0);
    const [wordArray, setWordArray] = useState([]);
    const [showGame, setShowGame] = useState(false);
    const [letterPressed, setLetterPressed] = useState('');
    const [gameEnd, setGameEnd] = useState(false);
    const [activeIndex, setActiveIndex] = useState('0-0');
    const [difficulty, setDifficulty] = useState('normal');

    useEffect(() => {
        const wordArrayIndex = randomInt(0,5);
        const words = TEXT_DATA[difficulty][wordArrayIndex].split(" ");
        let wordArray = [];

        for (let index = 0; index < words.length; index++) {
            const wordLetters = [...words[index]];
            const isFirstWord = index === 0;
            if(!isFirstWord) wordLetters.unshift(" ");
            wordArray.push(wordLetters);
        }

        setWordArray(wordArray);
    }, [difficulty, showGame])

    useEffect(() => {
        const keyDownListener = (e) => {
            if(showGame) {
                setLetterPressed(e);
            }
        }

        const startGameOnSpace = (e) => {
            if(e.key === ' ') {
                setShowGame(true);
                document.removeEventListener('keydown', startGameOnSpace);
            }
        }
        
        document.addEventListener('keydown', keyDownListener);
        document.addEventListener('keydown', startGameOnSpace)
        
        return () => {
            document.removeEventListener('keydown', keyDownListener)
        } 
    }, [showGame]);

    const correctAnswer = () => {
        // move index
        correctAnswers.current++
        const indexes = activeIndex.split('-');
        let wordIndex = parseInt(indexes[0]);
        let letterIndex = parseInt(indexes[1]);

        if (++letterIndex > wordArray[wordIndex].length - 1) {
            wordIndex++
            letterIndex = 0;
        }

        setActiveIndex(`${wordIndex}-${letterIndex}`)
    }

    const wrongAnswer = () => {
        wrongAnswers.current++
    }

    const countdownEnd = () => {
        setGameEnd(true);
    }

    const startGame = () => [
        setShowGame(true)
    ]

    const resetGame = () => {
        setShowGame(false)
        setGameEnd(false)
        setActiveIndex('0-0')
        setLetterPressed('')
        correctAnswers.current = 0;
        wrongAnswers.current = 0;
    }


    const renderWord = (wordArray, wordIndex) => {
        return wordArray.map((letter, letterIndex) => {
            const isActive = `${wordIndex}-${letterIndex}` === activeIndex;
            return (
                <Letter 
                    key={`${wordIndex}-${letterIndex}`} 
                    className={`${wordIndex}-${letterIndex}`} 
                    letter={letter} 
                    active={isActive} 
                    correctAnswer={correctAnswer} 
                    wrongAnswer={wrongAnswer}
                    event={letterPressed}
                    difficulty={difficulty}
                />)
        })}

    return (
        <div className='letters'>
            {gameEnd ? 
                <EndGame 
                    activeIndex={activeIndex}
                    correctCharacters={correctAnswers.current}
                    incorrectCharacters={wrongAnswers.current} 
                    resetGame={resetGame}
                    difficulty={difficulty}
                /> :
                <div className='game'>
                    {showGame ?
                        <>
                            <button onClick={resetGame} className='refresh'>
                                <Refresh />
                            </button>
                            <Countdown countdownEnd={countdownEnd} className='countdownCounter' />
                            <div>
                                {wordArray.map((word, wordIndex) => {
                                    return (
                                        <div style={{display:'inline-block'}} key={wordIndex}>
                                            {renderWord(word, wordIndex)}                       
                                        </div>
                                    )
                                })}
                            </div>  
                        </> :
                        <div className='startGame'>
                            <h1 className='startGame-title'>Get your fingers ready</h1>
                            <button onClick={startGame} className="startGameButton">START</button>
                            <span>( use space for start, if you are a tryhard )</span>
                            <Radio setDifficulty={setDifficulty} difficulty={difficulty}/>
                        </div>
                    }
                </div>
        }
        </div>
    )
}

export default Letters;