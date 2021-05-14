import React from 'react';

import './index.scss';

const Space = () => {
    return (
        <div className="space">
            <div className="scene">
                <div className="floor" />
                <div className="cube" >
                    <div className="front" />
                    <div className="back" />
                    <div className="left" />
                    <div className="right" />
                    <div className="top" />
                    <div className="bottom" />
                </div>
                <div className="ball" />
            </div>
        </div>
    )
}

export default Space;