import React, {useEffect, useState} from 'react';
import image from '../assets/companion-cube.png';

import './index.scss';

const dToR = function(degrees) {
    return degrees * (Math.PI / 180);
};

const Exit = () => {
    const [pointerInfo, setPointerInfo] = useState('The pointer is unlocked. Click to lock it')

useEffect(() => {
    const dotCanvas = document.getElementById('dot');
    const dotCtx = dotCanvas.getContext('2d');

    
    const canvas = document.getElementById('portal');
    const ctx = canvas.getContext('2d');
    const cw = canvas.width = dotCanvas.width = window.innerWidth;
	const ch = canvas.height = dotCanvas.height = window.innerHeight;

    let x = cw / 2;
    let y = ch * .75;


    const portal1 = {
        x: (cw / 4),
        y: (ch / 2),
        radius:  (cw / 15),
        speed: 5,
        rotation: 0,
        angleStart: 270,
        angleEnd: 90,
        hue: 231,
        thickness: 10,
        blur: 25
    };

    const portal2 = {
        x: (3 * cw / 4),
        y: (ch / 2),
        radius:  (cw / 15),
        speed: 5,
        rotation: 0,
        angleStart: 180,
        angleEnd: 0,
        hue: 57,
        thickness: 10,
        blur: 25
    };

   


    const renderCircle = function(portal, gradient, offset, rotation) {
        ctx.save();
        ctx.translate(portal.x, portal.y);
        ctx.transform(0,1,0.3,1,0,0); 
        ctx.rotate(dToR(portal.rotation + rotation));
        ctx.beginPath();
        ctx.arc(0, 0, portal.radius + offset, dToR(portal.angleStart), dToR(portal.angleEnd), true);
        ctx.lineWidth = portal.thickness;    
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.restore();
    };
    
    const renderCircleBorder = function(portal, gradient, offset, rotation, lineWidth) {
        ctx.save();
        ctx.translate(portal.x, portal.y);
        ctx.transform(0,1,.3,1,0,0);
        ctx.rotate(dToR(portal.rotation + rotation));
        ctx.beginPath();
        ctx.arc(0, 0, portal.radius + offset + (portal.thickness/5), dToR(portal.angleStart), dToR(portal.angleEnd), true);
        ctx.lineWidth = lineWidth;  
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.restore();
    };

    const renderCircleFull = function(portal, fill, stroke, rotation) {
        ctx.save();
        ctx.translate(portal.x, portal.y);
        ctx.transform(0,1,.3,1,0,0);
        ctx.rotate(dToR(1 + rotation));
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(0, 0, 80, dToR(0), dToR(360), true);
        ctx.closePath();
        ctx.lineWidth = 5;  
        ctx.strokeStyle = stroke;
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    const getGradientColor = (portal) => {
        const gradient = ctx.createLinearGradient(0, -portal.radius, 0, portal.radius);
        gradient.addColorStop(0, 'hsla('+ portal.hue +', 60%, 50%, 1)');
        gradient.addColorStop(1, 'hsla('+ portal.hue +', 60%, 50%, 0)');

        return gradient;
    }

    const getGradientGlow = (portal) => {
        const gradient = ctx.createLinearGradient(0, -portal.radius, 0, portal.radius);
        gradient.addColorStop(0, 'hsla('+ portal.hue +', 100%, 50%, 0)');
        gradient.addColorStop(0.1, 'hsla('+ portal.hue +', 100%, 75%, .7)');
        gradient.addColorStop(1, 'hsla('+ portal.hue +', 100%, 50%, 0)');

        return gradient;
    }

    const renderWalls = () => {
        ctx.fillStyle = "#809aab";
        ctx.strokeStyle = "#809aab";

        ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.clientWidth * 0.4, canvas.clientHeight * 0.35);
        ctx.lineTo(canvas.clientWidth * 0.4, canvas.clientHeight * 0.65);
        ctx.lineTo(canvas.clientWidth * 0.1, canvas.clientHeight);
        ctx.lineTo(0, canvas.clientHeight);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(canvas.clientWidth, 0);
        ctx.lineTo(canvas.clientWidth * 0.6, canvas.clientHeight * 0.35);
        ctx.lineTo(canvas.clientWidth * 0.6, canvas.clientHeight * 0.65);
        ctx.lineTo(canvas.clientWidth * 0.9, canvas.clientHeight);
        ctx.lineTo(canvas.clientWidth, canvas.clientHeight);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.fillStyle = "#979797";
        ctx.strokeStyle = "#809aab";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.clientWidth * 0.4, canvas.clientHeight * 0.35);
        ctx.lineTo(canvas.clientWidth * 0.6, canvas.clientHeight * 0.35);
        ctx.lineTo(canvas.clientWidth, 0);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.fillStyle = "#6c8891";
        ctx.strokeStyle = "#809aab";
        ctx.beginPath();
        ctx.moveTo(canvas.clientWidth * .1, canvas.clientHeight);
        ctx.lineTo(canvas.clientWidth * 0.4, canvas.clientHeight * 0.65);
        ctx.lineTo(canvas.clientWidth * 0.6, canvas.clientHeight * 0.65);
        ctx.lineTo(canvas.clientWidth * 0.9, canvas.clientHeight);
        ctx.lineTo(canvas.clientWidth, canvas.clientHeight);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(canvas.clientWidth * 0.4, canvas.clientHeight * 0.35);
        ctx.lineTo(canvas.clientWidth * 0.4, canvas.clientHeight * 0.65);
        ctx.lineTo(canvas.clientWidth * 0.6, canvas.clientHeight * 0.65);
        ctx.lineTo(canvas.clientWidth * 0.6, canvas.clientHeight * 0.35);
        ctx.closePath();
        ctx.fillStyle = "#738a99";
        ctx.strokeStyle = '#738a99';
        ctx.stroke();
        ctx.fill();
    }


    const gradient1 = getGradientColor(portal1);
    const gradient2 = getGradientGlow(portal1);

    const gradient3 = getGradientColor(portal2);
    const gradient4 = getGradientGlow(portal2);

    const drawDot = () => {
        if (x < (dotCanvas.clientWidth / 4) && y > (dotCanvas.clientHeight * .375) && y < (dotCanvas.clientHeight * .625)) {
            x = 3 * (dotCanvas.clientWidth / 4)
        }
        if (x > (3 * dotCanvas.clientWidth / 4) && y > (dotCanvas.clientHeight * .375) && y < (dotCanvas.clientHeight * .625)) {
            x = (dotCanvas.clientWidth / 4)
        }
        if (x > (3 * dotCanvas.clientWidth / 4)) {
            x = (3 * dotCanvas.clientWidth / 4);
        }
        if (x < (dotCanvas.clientWidth / 4)) {
            x = (dotCanvas.clientWidth / 4);
        }
        if (y > dotCanvas.clientHeight * 0.83) {
            y = dotCanvas.clientHeight * 0.83;
        }
        if (y < dotCanvas.clientHeight * 0.23) {
            y = dotCanvas.clientHeight * 0.23;
        }

        const img = new Image();
        img.src = image;
        img.width = 20;
        img.height = 20;


        img.onload = () => {
            dotCtx.clearRect(0,0,cw,ch);
            dotCtx.imageSmoothingEnabled = false;
            dotCtx.drawImage(img, x - 25, y - 25, 50, 50);
        };
    }

  
    const drawCircle = (circleRotation) => {
        portal1.rotation = circleRotation;
        portal2.rotation = circleRotation;

        ctx.shadowBlur = portal1.blur;
        ctx.lineCap = 'round'

        renderWalls();
        renderCircle(portal1, gradient1, 0, 0);
        renderCircle(portal1, gradient1, +15, 100);
        renderCircle(portal1, gradient1, -15, 200);
        renderCircleBorder(portal1, gradient2, 0, 0, 15);
        renderCircleBorder(portal1, gradient2, +15, 100, 15);
        renderCircleBorder(portal1, gradient2, -15, 200, 15);
        
        renderCircle(portal2, gradient3, 0, 0);
        renderCircle(portal2, gradient3, +15, 100);
        renderCircle(portal2, gradient3, -15, 200);
        renderCircleBorder(portal2, gradient4, 0, 0, 15);
        renderCircleBorder(portal2, gradient4, +15, 100, 15);
        renderCircleBorder(portal2, gradient4, -15, 200, 15);

        renderCircleFull(portal1, gradient1, gradient2, circleRotation);
        renderCircleFull(portal2, gradient3, gradient4, circleRotation);

        requestAnimationFrame(() => {
            if (circleRotation < 360) {
                circleRotation += portal2.speed;
            } else {
                circleRotation = 0; 
            }
            drawDot()
                drawCircle(circleRotation);
            }
        )
    }

    drawCircle();

    dotCanvas.onclick = function() {
        dotCanvas.requestPointerLock();
    }

    document.addEventListener('pointerlockchange', lockChangeLog, false);

    function lockChangeLog() {
        if (document.pointerLockElement === dotCanvas) {
            setPointerInfo("The pointer is locked. Press Esc to unlock.");
            document.addEventListener("mousemove", mousemoveCallback, false);
        } else {
            setPointerInfo("The pointer is unlocked.");
            document.removeEventListener("mousemove", mousemoveCallback, false);
        }
    }

    function mousemoveCallback(event) {
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;
        x += movementX;
        y += movementY;
    }
}, [])




    return (
        <div className="canvas-wrapper">
            <canvas id="portal">
            Your browser does not support HTML5 canvas
            </canvas>
            <canvas id="dot">
            Your browser does not support HTML5 canvas
            </canvas>

            <div className="pointer-info">
                {pointerInfo}
            </div>
        </div>
    )
}

export default Exit;




