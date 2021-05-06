import React, {useEffect} from 'react';
import image from '../assets/companion-cube.png';

import './index.scss';

const dToR = function(degrees) {
    return degrees * (Math.PI / 180);
};

const Exit = () => {
useEffect(() => {
    const divObj = document.getElementById("logdiv");
    
    const canvas = document.getElementById('portal');
    const ctx = canvas.getContext('2d');
    const cw = canvas.width = window.innerWidth;
	const ch = canvas.height = window.innerHeight;

    let x = cw / 2;
    let y = ch / 2;


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


    const gradient1 = getGradientColor(portal1);
    const gradient2 = getGradientGlow(portal1);

    const gradient3 = getGradientColor(portal2);
    const gradient4 = getGradientGlow(portal2);

    const drawDot = () => {
        if (x < (canvas.clientWidth / 4) && y > (canvas.clientHeight * .375) && y < (canvas.clientHeight * .625)) {
            x = 3 * (canvas.clientWidth / 4)
        }
        if (x > (3 * canvas.clientWidth / 4) && y > (canvas.clientHeight * .375) && y < (canvas.clientHeight * .625)) {
            x = (canvas.clientWidth / 4)
        }
        if (x > canvas.clientWidth) {
            x = 0;
        }
        if (x < -10) {
            x = canvas.clientWidth;
        }
        if (y > canvas.clientHeight) {
            y = canvas.clientHeight;
        }
        if (y < 0) {
            y = 0;
        }

        // const img = new Image();
        // img.src = image;
        // img.width = 200
        // img.height = 200

        // img.onload = () => {
        //     ctx.imageSmoothingEnabled = false;
        //     ctx.drawImage(img, x, y, 200, 200);
        // };

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
       
        ctx.fillStyle = "blue";
        ctx.fillStyle = "aquamarine";

        ctx.beginPath();
        ctx.arc(x, y, 10, 0, dToR(360), true);
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fill();
    }

  
    const drawCircle = (circleRotation) => {
        portal1.rotation = circleRotation;
        portal2.rotation = circleRotation;

        ctx.shadowBlur = portal1.blur;
        ctx.lineCap = 'round'

        drawDot()
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
                drawCircle(circleRotation);
            }
        )
    }

    drawCircle();

    canvas.onclick = function() {
        canvas.requestPointerLock();
    }

    document.addEventListener('pointerlockchange', lockChangeLog, false);

    function lockChangeLog() {
        if (document.pointerLockElement === canvas) {
            divObj.innerHTML = "The pointer is locked. Press Esc to unlock.";
            document.addEventListener("mousemove", mousemoveCallback, false);
        } else {
            divObj.innerHTML = "The pointer is unlocked.";
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
        <>
            <div className="canvas-wrapper">
                <canvas width="590" height="100" id="portal">
                Your browser does not support HTML5 canvas
                </canvas>
            </div>
            <div id="logdiv">
                The pointer in unlocked.
            </div>
        </>
    )
}

export default Exit;




