import React, {useEffect, useState} from 'react';
import Box from './box';
import {cloneDeep} from 'lodash';

import './index.scss';

const blankBoxValues = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
]

const moveRight = (boxValues) => {
        // const boxValuesCopy =  cloneDeep(boxValues);
        // for(let i = 0; i < boxValuesCopy.length; i++) {
        //     // debugger
        //     let movedArray = moveArray(blankBoxValues[i], 'right');
        //     let sumedArray = sumArray(movedArray);
        //     let finalArray = moveArray(sumedArray, 'right');
        //     boxValuesCopy[i] = finalArray;
        // }
        console.table(boxValues);
        // setDirection('right');
        // setBoxValues(boxValuesCopy);
        // console.table([...boxValues]);
    }

    const arrowsMap = {
        'ArrowRight': moveRight
    }


const NumbersChallenge = () => {
    const [boxValues, setBoxValues] = useState(blankBoxValues);
    const [direction, setDirection] = useState(null);
   
    const moveArray = (array, dir) => {
        const arrayCopy = cloneDeep(array);
        const arrayValues = arrayCopy.filter(value => value);
        const arrayLen = arrayValues.length;
        const zeroArr = Array(array.length - arrayLen).fill(0);
        let movedArray;
        
        if(dir === 'right' || dir === 'up') {
            movedArray = zeroArr.concat(arrayValues);
        } else {
            movedArray = arrayValues.concat(zeroArr);
        }

        return movedArray;
    }

    const sumArray = (array) => {
        let arrayCopy = cloneDeep(array)
        for (let i = arrayCopy.length; i > 0; i--) {
            if(arrayCopy[i] === arrayCopy[i - 1]) {
                arrayCopy[i] = arrayCopy[i] * 2;
                arrayCopy[i - 1] = 0;
            }
        }
        return arrayCopy;
    }

    const moveRight = (boxValues) => {
    //     // const boxValuesCopy =  cloneDeep(boxValues);
    //     // for(let i = 0; i < boxValuesCopy.length; i++) {
    //     //     // debugger
    //     //     let movedArray = moveArray(blankBoxValues[i], 'right');
    //     //     let sumedArray = sumArray(movedArray);
    //     //     let finalArray = moveArray(sumedArray, 'right');
    //     //     boxValuesCopy[i] = finalArray;
    //     // }
        console.table(boxValues);
    //     // setDirection('right');
    //     // setBoxValues(boxValuesCopy);
    //     // console.table([...boxValues]);
    }

    const createNumber = (options, values) => {
        const optionIndex = Math.floor(Math.random() * options.length);
        const {row, column} = options[optionIndex];
        const randomNumberToAdd = Math.random() > 0.8 ? 4 : 2; 

        values[row][column] = randomNumberToAdd;
        options.splice(optionIndex, 1);
    }

    const generateRandomNumbers = () => {
        const options = [];
        console.table(boxValues)
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
        if(hasTwoOrMoreFreeSpace) {
            createNumber(options, boxValuesCopy);
            createNumber(options, boxValuesCopy);
            console.log(boxValuesCopy);
            setBoxValues(boxValuesCopy);
        } else {
            // createNumber(options, boxValuesCopy);
            // setBoxValues(boxValuesCopy);
        }
        
    }

    

    const keyHandler = (e) => {
        // arrowsMap[e.key](boxValues);
        switch (e.key) {
            case 'ArrowRight':
                moveRight(boxValues);
                break;
        //     case ' ':
        //         generateRandomNumbers() 
        //         break;
        //     // case 'ArrowLeft':
        //     //     moveRight();
        //     //     break;
        //     // case 'ArrowDone':
        //     //     moveDown();
        //     //     break;
        //     // case 'ArrowUp':
        //     //     moveUp();
        //     //     break;
            default:
                console.log('Use arrow keys');
        }
    }

    useEffect(() => {
        console.log('mount');
        document.addEventListener('keyup',keyHandler);
        generateRandomNumbers()

        return () => {
            console.log('unmount');
            document.removeEventListener('keyup',keyHandler)    
        }
    }, [])

    console.log(boxValues);
    return (
        <div className='box-container'>
            {boxValues.map((row, rowIndex) => row.map((value, colIndex) => <Box key={`${rowIndex}-${colIndex}`} direction={direction} boxValues={boxValues} value={value} row={rowIndex} col={colIndex} />))}
        </div>
    )
}

export default NumbersChallenge;