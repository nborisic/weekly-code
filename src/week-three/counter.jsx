import React, { useState, useEffect } from 'react';

function Countdown({countdownEnd, className}) {
    const [counter, setCounter] = useState(60);
  
    useEffect(() => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      !counter && countdownEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter]);
  
    return (
      <div className={className}>
        <div>{counter}</div>
      </div>
    );
}

export default Countdown;