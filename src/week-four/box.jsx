import React, {useRef} from 'react';
import './box.scss';

const Box = ({direction, boxValues, value, row, col}) => {
    const arrayValues = useRef([])

    const handleRightMovement = () => {

    }


    if (direction === 'right') {
        arrayValues.current = boxValues[row];
        handleRightMovement()
    }

    return (
        <div className='box'>
            {value ? value : ''}
        </div>
    )
}

export default Box;