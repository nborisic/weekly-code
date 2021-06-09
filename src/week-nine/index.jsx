import React, {useEffect, useRef, useState} from 'react';

import './index.scss';

const Depth = () => {
  const lensRef = useRef(null);
  const [sectionActive, setSectionActive] = useState('first');

  useEffect(() => {
    let rotate,
      start,
      stop,
      active = false,
      angle = 0,
      rotation = 0,
      startAngle = 0,
      center = {
        x: 0,
        y: 0,
      },
      R2D = 180 / Math.PI,
      rot = lensRef.current;

    start = (e) => {
      e.preventDefault();
      var bb = rot.getBoundingClientRect(),
        t = bb.top,
        l = bb.left,
        h = bb.height,
        w = bb.width,
        x,
        y;
      center = {
        x: l + w / 2,
        y: t + h / 2,
      };
      x = e.clientX - center.x;
      y = e.clientY - center.y;
      startAngle = R2D * Math.atan2(y, x);
      return (active = true);
    };

    rotate = (e) => {
      e.preventDefault();
      let x = e.clientX - center.x,
        y = e.clientY - center.y,
        d = R2D * Math.atan2(y, x);
      rotation = d - startAngle;
      let section = angle + rotation > 0 ? Math.floor((360 - (angle + rotation) % 360) / 72) : Math.floor(Math.abs(angle + rotation) % 360 / 72);
      switch (section) {
        case 0:
            setSectionActive('first')
          break;
        case 1:
            setSectionActive('second')
            break;
        case 2:
            setSectionActive('third')
          break;
        case 3:
            setSectionActive('forth')
          break;
          case 4:
            setSectionActive('fifth')
          break;
        default:
      }
      return (rot.style.webkitTransform =
        'rotate(' + (angle + rotation) + 'deg)');
    };

    stop = () => {
      angle += rotation;
      return (active = false);
    };

    rot.addEventListener('mousedown', start, false);
    document.addEventListener('mousemove', function (event) {
      if (active === true) {
        event.preventDefault();
        rotate(event);
      }
    });
    document.addEventListener('mouseup', function (event) {
      event.preventDefault();
      stop(event);
    });
  }, []);

  useEffect(() => {
    let selectedNods = document.querySelectorAll(`.${sectionActive}-row`);
    let allNods = document.querySelectorAll(`.face div`);
    allNods.forEach(node => {
        node.classList.remove('clear')
    })
    selectedNods.forEach(node => {
        node.classList.add('clear')
    })

  }, [sectionActive])

  return (
    <div className="frame">
      <div ref={lensRef} className="lens" />
      <div className="mask">
        <figure>
          <div className="face top">
            <div className="first-row"></div>
            <div className="first-row"></div>
            <div className="first-row"></div>
            <div className="first-row"></div>
            <div className="second-row"></div>
            <div className="second-row"></div>
            <div className="second-row"></div>
            <div className="second-row"></div>
            <div className="third-row"></div>
            <div className="third-row"></div>
            <div className="third-row"></div>
            <div className="third-row"></div>
            <div className="forth-row"></div>
            <div className="forth-row"></div>
            <div className="forth-row"></div>
            <div className="forth-row"></div>
          </div>

          <div className="face right">
            <div className="first-row"></div>
            <div className="first-row"></div>
            <div className="first-row"></div>
            <div className="first-row"></div>
            <div className="second-row"></div>
            <div className="second-row"></div>
            <div className="second-row"></div>
            <div className="second-row"></div>
            <div className="third-row"></div>
            <div className="third-row"></div>
            <div className="third-row"></div>
            <div className="third-row"></div>
            <div className="forth-row"></div>
            <div className="forth-row"></div>
            <div className="forth-row"></div>
            <div className="forth-row"></div>
          </div>

          <div className="face left">
            <div className="first-row"></div>
            <div className="first-row"></div>
            <div className="first-row"></div>
            <div className="first-row"></div>
            <div className="second-row"></div>
            <div className="second-row"></div>
            <div className="second-row"></div>
            <div className="second-row"></div>
            <div className="third-row"></div>
            <div className="third-row"></div>
            <div className="third-row"></div>
            <div className="third-row"></div>
            <div className="forth-row"></div>
            <div className="forth-row"></div>
            <div className="forth-row"></div>
            <div className="forth-row"></div>
          </div>

          <div className="face bottom">
            <div className="first-row"></div>
            <div className="first-row"></div>
            <div className="first-row"></div>
            <div className="first-row"></div>
            <div className="second-row"></div>
            <div className="second-row"></div>
            <div className="second-row"></div>
            <div className="second-row"></div>
            <div className="third-row"></div>
            <div className="third-row"></div>
            <div className="third-row"></div>
            <div className="third-row"></div>
            <div className="forth-row"></div>
            <div className="forth-row"></div>
            <div className="forth-row"></div>
            <div className="forth-row"></div>
          </div>

          <div className="face back">
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
            <div className='fifth-row'></div>
          </div>
        </figure>
      </div>
    </div>
  );
};

export default Depth;
