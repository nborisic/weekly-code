/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import Box from './box';
import {cloneDeep} from 'lodash';

import './index.scss';

const blankBoxValues = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
]

const NumbersChallenge = () => {
    const [boxValues, setBoxValues] = useState(blankBoxValues);
    const score = useRef(0);
    const [gameEnd, setGameEnd] = useState(false);
    const direction = useRef(null);
   
    const moveArray = (array, dir) => {
        const arrayCopy = cloneDeep(array);
        const arrayValues = arrayCopy.filter(value => value);
        const arrayLen = arrayValues.length;
        const zeroArr = Array(array.length - arrayLen).fill(0);
        let movedArray;
        
        if(dir === 'down' || dir === 'right') {
            movedArray = zeroArr.concat(arrayValues);
        } else {
            movedArray = arrayValues.concat(zeroArr);
        }

        return movedArray;
    }
    
    const transValues = (values) => {
        return values[0].map((_, colIndex) => values.map(row => row[colIndex]));
    }

    const checkGameEnd = (values) => {
        for(let i = 0; i <values.length; i++) { 
            for (let j = values[i].length; j > 0; j--) {
                if(values[i][j] === values[i][j - 1]) {
                    return false
                }
            }
        }

        const transValuesToCheck = transValues([...values]);
        for(let i = 0; i <transValuesToCheck.length; i++) { 
            for (let j = transValuesToCheck[i].length; j > 0; j--) {
                if(transValuesToCheck[i][j] === transValuesToCheck[i][j - 1]) {
                    return false
                }
            }
        }

        return true;
    }

    const sumArray = (array, dir) => {
        let arrayCopy = [...array];
        const hasToFlip = dir === 'up' || dir === 'left';
        if (hasToFlip) {arrayCopy.reverse()}
        for (let i = arrayCopy.length; i > 0; i--) {
            if(arrayCopy[i] && arrayCopy[i - 1] && arrayCopy[i] === arrayCopy[i - 1]) {
                arrayCopy[i] = arrayCopy[i] * 2;
                arrayCopy[i - 1] = 0;
                console.log('score.current', score.current);
                console.log('arrayCopy[i]', i, arrayCopy[i]);
                score.current += arrayCopy[i];
                // debugger
            }
        }
        if (hasToFlip) {arrayCopy.reverse()}
        return arrayCopy;
    }

    const createNumber = (options, values) => {
        const optionIndex = Math.floor(Math.random() * options.length);
        const {row, column} = options[optionIndex];
        const randomNumberToAdd = Math.random() > 0.85 ? 4 : 2; 

        values[row][column] = randomNumberToAdd;
        options.splice(optionIndex, 1);
    }

    const generateRandomNumbers = (boxValues) => {
        const options = [];
        const boxValuesCopy = cloneDeep(boxValues);

        for (let i = 0; i < boxValues.length; i++) {
            for (let j = 0; j < boxValues[i].length; j++) {
                if(!boxValues[i][j]) {
                    options.push({
                        row: i,
                        column: j
                    })
                }
            }    
        }

        const hasTwoOrMoreFreeSpace = options.length >= 2;
        if(hasTwoOrMoreFreeSpace && Math.random() < 0.7) {
            createNumber(options, boxValuesCopy);
            createNumber(options, boxValuesCopy);
        } else if(options.length) {
            createNumber(options, boxValuesCopy);
        } else {
            // hasMovesLeft
        }

        return boxValuesCopy;
    }

    const checkForChange = (prevValues, nextValues) => {
        for (let i = 0; i < prevValues.length; i++) {
            for (let j = 0; j < prevValues[i].length; j++) {
                if(prevValues[i][j] !== nextValues[i][j]) {
                    return true
                }
            }
        }

        return false
    }

    const moveHorizontal = (dir) => {
        console.log('move');
        setBoxValues((prevState) => {
            const prevStateCopy = [...prevState];

            for(let i = 0; i < prevStateCopy.length; i++) {
                let movedArray = moveArray(prevStateCopy[i], dir);
                // debugger
                let summedArray = sumArray(movedArray, dir);
                let finalArray = moveArray(summedArray, dir);
                prevStateCopy[i] = finalArray;
            }
            const changeHappened = checkForChange(prevStateCopy, prevState);

            const newNumbers = generateRandomNumbers(prevStateCopy)
            if(changeHappened && checkGameEnd(newNumbers)) {
                setGameEnd(true)
            }

            return changeHappened ? newNumbers : prevState;
        })
    }

    const moveVertical = (dir) => {
        console.log('move2');
        setBoxValues((prevState) => {
            const prevStateCopy = [...prevState];
            const tansValues = transValues(prevStateCopy);

            for(let i = 0; i < tansValues.length; i++) {
                let movedArray = moveArray(tansValues[i], dir);
                let summedArray = sumArray(movedArray, dir);
                let finalArray = moveArray(summedArray, dir);
                tansValues[i] = finalArray;
            }
            const revertMatrix = transValues(tansValues);

            const newNumbers = generateRandomNumbers(revertMatrix)
            const changeHappened = checkForChange(revertMatrix, prevState);

            if(changeHappened && checkGameEnd(newNumbers)) {
                setGameEnd(true)
            }
            
            return changeHappened ? newNumbers : prevState;
        });
    }

    const keyHandler = (e) => {
        console.log('trigger');
        switch (e.key) {
            case 'ArrowRight':
                moveHorizontal('right');
                break;
            case 'ArrowLeft':
                moveHorizontal('left');
                break;
            case 'ArrowUp':
                moveVertical('up');
                break;
            case 'ArrowDown':
                moveVertical('down');
                break;
            default:
                console.log('Use arrow keys');
        }
    }

    useEffect(() => {
        document.addEventListener('keyup',keyHandler);

        // const startingNumbers = generateRandomNumbers(boxValues);
        // setBoxValues(startingNumbers);

        return () => {
            document.removeEventListener('keyup',keyHandler)    
        }
    }, [boxValues])


    useEffect(() => {
        // document.addEventListener('keyup',keyHandler);

        const startingNumbers = generateRandomNumbers(boxValues);
        setBoxValues(startingNumbers);

        // return () => {
        //     document.removeEventListener('keyup',keyHandler)    
        // }
    }, [])

    return (
        <div>
        {gameEnd && <div>GAME END</div>}
        <div>{score.current}</div>
        <div className='box-container'>
            {boxValues.map((row, rowIndex) => row.map((value, colIndex) => <Box key={`${rowIndex}-${colIndex}`} direction={direction.current} boxValues={boxValues} value={value} row={rowIndex} col={colIndex} />))}
        </div>
        </div>
    )
}

export default NumbersChallenge;