/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import cx from 'classnames';
import {generateStyle} from './util';

import './letter.scss';

function Letter({letter, active, correctAnswer, wrongAnswer, event, difficulty}) {
    const [correctLetter, setCorrectLetter] = useState(false);
    const [incorrectGuess, setIncorrectGuess] = useState(false);
    const [style, setStyle] = useState({});

    useLayoutEffect(() => {
        if(difficulty === 'hardcore') {
            setStyle(generateStyle())
        }
    }, [])

    useEffect(() => {
        const letterPressed = event.key;
        if(active && letterPressed && letterPressed !== 'Shift') {
            const isRightKey = letterPressed === letter;
            if(isRightKey) {
                setCorrectLetter(true)
                setIncorrectGuess(false);
                correctAnswer()
            } else {
                wrongAnswer();
                setIncorrectGuess(true);
            }
        }
    }, [event])

    const letterClasses = cx('letter',{
        'letterCorrect': correctLetter,
        'letterActive': active,
        'letterIncorrectGuess': incorrectGuess
    })

    return (
        <span 
            className={letterClasses}
            style={ style}
        >
            {`${letter}`}
        </span>
    )
}

export default Letter;