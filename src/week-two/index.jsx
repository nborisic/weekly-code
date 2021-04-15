import React, { useEffect, useRef } from 'react';
import { useCanvas } from './canvasHook';

import './index.scss';

function Gesture() {
    const cursorRef = useRef(null);
    const wrapperRef = useRef(null);

    const [ canvasRef, resetImage ] = useCanvas();

    useEffect(() => {
        wrapperRef.current.addEventListener('mousedown', (e) => {
            cursorRef.current.style.opacity = 1;
            document.body.style.cursor = 'none';
        })

        wrapperRef.current.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            cursorRef.current.style.left = x + 'px';
            cursorRef.current.style.top = y + 'px';
        })

        wrapperRef.current.addEventListener('mouseup', (e) => {
            cursorRef.current.style.opacity = 0;
            document.body.style.cursor = 'auto';
        })
    }, [])

    return (
        <div ref={wrapperRef} className='week-two'>
            <div ref={cursorRef} className="cursor">
                <div className='wrapper'>
                    <div className="red flame"></div>
                    <div className="orange flame"></div>
                    <div className="yellow flame"></div>
                    <div className="white flame"></div>
                    <div className="blue circle"></div>
                    <div className="black circle"></div>
                </div>
            </div>

            <div className='text-container'>
                <h1>Swipe to burn 🔥</h1>
                <button type='button' onClick={resetImage} className='button'>Reset</button>    
            </div>
            

            <canvas 
                className="canvas"
                ref={canvasRef}
            />
        </div>
    )
}


export default Gesture;

