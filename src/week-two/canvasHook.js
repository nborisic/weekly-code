import { useState, useEffect, useRef } from 'react';
import image from '../assets/beograd-sad.webp';

export function draw(ctx, location, canvasObj, frameCount = 0){
    let frame = frameCount;
    const animationFramesEnd = 60;
         
    frame++;
    ctx.beginPath();
    ctx.arc(location.x, location.y, frame * 2, 0, 2*Math.PI, true);
    ctx.globalCompositeOperation = "destination-out";
    ctx.shadowColor = 'red';
    ctx.shadowBlur = 40;
    ctx.fill();

    if(frame < animationFramesEnd) {
        requestAnimationFrame(() => draw(ctx, location, canvasObj, frame))
    }
};

export function useCanvas(){
    const canvasRef = useRef(null);
    let [ reset, setReset ] = useState(0);

    function getClickPos(xRef, yRef) {
        var canvasRect = canvasRef.current.getBoundingClientRect();
        return {
          x: Math.floor((xRef-canvasRect.left)/(canvasRect.right-canvasRect.left)*canvasRef.current.width),
          y: Math.floor((yRef-canvasRect.top)/(canvasRect.bottom-canvasRect.top)*canvasRef.current.height)
        };
    }

    function detectLeftButton(evt) {
        evt = evt || window.event;
        if ("buttons" in evt) {
            // eslint-disable-next-line
            return evt.buttons == 1;
        }
        var button = evt.which || evt.button;
        // eslint-disable-next-line
        return button == 1;
    }
    
    function resetImage() {
        setReset(++reset);
    }

    useEffect(() => {
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        
        const imageWidth = 1200;
        const imageHeight = 806;
        canvasObj.style.width = imageWidth + "px";
        canvasObj.style.height = imageHeight + "px";

        var scale = window.devicePixelRatio; 
        canvasObj.width = Math.floor(imageWidth * scale);
        canvasObj.height = Math.floor(imageHeight * scale);

        const img = new Image();
        img.src = image;
        img.width = canvasObj.clientWidth
        img.height = canvasObj.clientHeight

        img.onload = () => {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, canvasObj.width, canvasObj.height);
        };

       const handleMouseMove = (e) => {
            var brushPos = getClickPos(e.clientX, e.clientY);
            var leftBut = detectLeftButton(e);
            // eslint-disable-next-line
            if (leftBut == 1) {
                draw(ctx, brushPos, canvasObj);
            }
       }

       const handleTouchMove = (e) => {
            var touch = e.targetTouches[0];
            if (touch) {
                var brushPos = getClickPos(e.clientX, e.clientY);
                draw(ctx, brushPos, canvasObj);
            }
        }


        canvasObj.addEventListener("mousemove", handleMouseMove);
        canvasObj.addEventListener("touchmove", handleTouchMove);

        return () => {
            canvasObj.removeEventListener("touchmove",handleTouchMove);
            canvasObj.removeEventListener("mousemove", handleMouseMove);
        }

    }, [reset]);


    return [ canvasRef, resetImage ];
}