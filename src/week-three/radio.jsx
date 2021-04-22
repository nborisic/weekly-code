import React from "react";
import './radio.scss';

const radioButtons = [
    {value: 'normal', label:'Normal'},
    {value: 'hard', label: 'Hard'},
    {value: 'hardcore', label: '(╥‸╥★)۶'}
]

function RadioGroup({difficulty, setDifficulty}) {
      const renderRadio = ({value, label}) => {
          return (
              <div className='radioButton' key={value}>
                <input
                    id={value}
                    type="radio"
                    value={value}
                    checked={difficulty === value}
                    onChange={() => setDifficulty(value)}
                />
                <label htmlFor={value}>
                    {label}
                </label>
            </div>
          )
      }
    

    return (
        <div className='radioGroup'>
            {radioButtons.map(button => {
                return renderRadio(button)
            })}
      </div>
    );
}

export default RadioGroup;