import React from 'react';
import { between } from './util';
import './gameEnd.scss';

const commentMap = {
    'normal': {
        'slow': 'Come on, you can do better 🐢',
        'average': 'This is... acceptable. Carry on',
        'fast': 'Ok... thats fast... trying too much? 🐇'    
    },
    'hard': {
        'slow': 'Think you should try normal mode',
        'average': `Nice... have not ashamed your family`,
        'fast': 'Just.... Stop... We get it, you are fast? 🐇'    
    },
    'hardcore': {
        'slow': 'You are a badass for even playing this mode 💪',
        'average': 'You are a badass for even playing this mode 💪',
        'fast': 'You are a badass for even playing this mode 💪',
    },
}

function EndGame({activeIndex, correctCharacters, incorrectCharacters, resetGame, difficulty}) {
    const getWPM = () => {
        const indexArray = activeIndex.split('-');
        return indexArray[0]
    }

    const getAccuracy = () => {
        return `${Math.floor(correctCharacters/(correctCharacters+incorrectCharacters)*100)}%`
    }

    const getComment = () => {
        let speed;

        if( between(getWPM(), 0, 30)) {
            speed = 'slow'
        } else if (between(getWPM(), 31, 60)) {
            speed = 'average'
        } else {
            speed = 'fast'
        }

        return commentMap[difficulty][speed]
    }

    return (
        <div className='gameEnd'>
            <div>Game mode: <b>{difficulty}</b></div>
            <div>Words per minute: <b>{getWPM()}</b></div>
            <div>Characters per minute: <b>{correctCharacters}</b></div>
            <div>Accuracy: <b>{getAccuracy()}</b></div>
            <div className='comment'><span>Barry says: </span><i>{getComment()}</i></div>
            <button onClick={resetGame} className="startGameButton">Play again?</button>
        </div>
    )
}

export default EndGame;