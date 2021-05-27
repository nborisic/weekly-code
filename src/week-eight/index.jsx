import React, {useRef, useEffect, useState} from 'react';
import {distance, randomColor, randomIntFromRange, getAngle, canvasArrow} from './utils';
import { resolveCollision } from './collision';

const Physics = () => {
    const canvasRef = useRef(null);
    const [particlesCount, setParticlesCount] = useState(50);
    const [particleSpeed, setParticleSpeed] = useState(1)
    const colors = ['#2185C5', '#7ECEFD', '#FF7F66'];

    function Particle(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
          x: dx,
          y: dy,
        };
        this.mass = 1;
        this.opacity = 0.9;
        this.clicked = false;
      }

    const draw = (context, particle) => {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
        context.save();
        context.globalAlpha = particle.opacity;
        context.fillStyle = particle.mass > 1 ? 'black' : particle.color;
        context.fill();
        context.restore();
        context.strokeStyle = particle.mass > 1 ? 'black' : particle.color;
        context.stroke();
      
        context.closePath();
      };

     const update = (particle, particles, mouse, context) => {
        draw(context, particle);
      
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        if(particle.x + particle.radius >= canvasRef.current.width || particle.x - particle.radius <= 0) {
          particle.velocity.x = -particle.velocity.x;
        }
      
        if(particle.y + particle.radius >= canvasRef.current.height || particle.y - particle.radius <= 0) {
          particle.velocity.y = -particle.velocity.y;
        }
      
        for (let i  = 0; i < particles.length; i++) {
          if(particle === particles[i] ) {
            continue
          }
          if(distance(particle.x, particle.y, particles[i].x, particles[i].y) < particle.radius + particles[i].radius) {
            resolveCollision(particle, particles[i]);
          }

          if(particle.clicked || distance(mouse?.x, mouse?.y, particle.x, particle.y) < 10) {
            if(particle.clicked && mouse.releaseAngle) {
              const x = Math.cos(mouse.releaseAngle);
              const y = Math.sin(mouse.releaseAngle);
              particle.velocity.x = -x * mouse.distance / 50 * particleSpeed;
              particle.velocity.y = -y * mouse.distance / 50 * particleSpeed;
              particle.clicked = false;
              mouse.releaseAngle = null;
            } else {
              particle.clicked = true;
              particle.velocity.x = 0
              particle.velocity.y = 0
              particle.mass = 2;
              if(mouse.moveX || mouse.moveY) {
                context.beginPath();
                canvasArrow(context, mouse.x, mouse.y, mouse.moveX, mouse.moveY);
                context.stroke();
              }
              
            }
          } 
      
        }
      }

    let particles
    function init() {
      particles = [];

      for (let i = 0; i < particlesCount; i++) {
        const radius = 10;
        let x = randomIntFromRange(radius, canvasRef.current.width - radius);
        let y = randomIntFromRange(radius, canvasRef.current.height - radius);
        const color = randomColor(colors);
        const velocity = {
          x: (Math.random() - 0.5) * 5 * particleSpeed,
          y: (Math.random() - 0.5) * 5 * particleSpeed,
        }

        if(i !== 0) {
          for(let j = 0; j < particles.length; j++) {
            if(distance(x, y, particles[j].x, particles[j].y) < radius + particles[j].radius) {
              x = randomIntFromRange(radius, canvasRef.current.width - radius);
              y = randomIntFromRange(radius, canvasRef.current.height - radius);

              j = -1;
            }
          }
        }
        particles.push(new Particle(x, y, radius, color, velocity.x, velocity.y));
      }
    }

    const animate = (context, innerWidth, innerHeight, mouseParticle) => {
      context.clearRect(0, 0, innerWidth, innerHeight);
      particles.forEach(particle => {
        update(particle, particles, mouseParticle, context);
      });
      requestAnimationFrame(() => animate(context, innerWidth, innerHeight, mouseParticle));
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        canvas.width = innerWidth;
        canvas.height = innerHeight;

        let mouseParticle = {
          velocity: {
            x: 0,
            y: 0,
          },
          x: null,
          y: null
        }
          
        init();
        animate(context, innerWidth, innerHeight, mouseParticle);

        const onClick = (e) => {
          mouseParticle.clicked = true;
          mouseParticle.x = e.pageX;
          mouseParticle.y = e.pageY;
        }

        const releaseBall = (e) => {
          mouseParticle.releaseAngle = getAngle(mouseParticle.x, mouseParticle.y, e.pageX, e.pageY);
          mouseParticle.x = null;
          mouseParticle.y = null; 
          mouseParticle.moveX = null;
          mouseParticle.moveY = null;
          mouseParticle.clicked = false;
        }

        const moveMouse = (e) => {
          if(mouseParticle.clicked) {
            mouseParticle.distance = distance(mouseParticle.x, mouseParticle.y, e.pageX, e.pageY);
            const dx = mouseParticle.x - e.pageX;
            const dy = mouseParticle.y - e.pageY;
            mouseParticle.moveX = mouseParticle.x + dx;
            mouseParticle.moveY = mouseParticle.y + dy;
          }
        }

        canvas.addEventListener("mousedown", onClick)
        canvas.addEventListener("mouseup", releaseBall)
        canvas.addEventListener("mousemove", moveMouse)

        return () => {
          canvas.removeEventListener("mousedown", onClick)
          canvas.removeEventListener("mouseup", releaseBall)
          canvas.removeEventListener("mousemove", moveMouse)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [particlesCount, particleSpeed])
    


    return (
      <>
        <div style={{position: "absolute"}}>
          <div>
            <label htmlFor="particles"># of particles</label>
            <select id="particles" onChange={(e) => setParticlesCount(parseInt(e.target.value, 10))} value={particlesCount}>
              <option>50</option>
              <option>100</option>
              <option>200</option>
              <option>500</option>
            </select>
            <div>
            <label htmlFor="speed">Particle speed (1-5):</label>
            <input type="number" id="speed"
              min="1" max="5" value={particleSpeed} onChange={(e) => setParticleSpeed(e.target.value)} />
            </div>
          </div>
        </div>
        <canvas ref={canvasRef} />
      </>
    )
}

export default Physics
