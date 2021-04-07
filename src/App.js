import './App.scss';
import React, { useState, useEffect } from 'react';
import Plx from 'react-plx';

function App() {
  // const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);

  // const listenToScroll = () => {
  //   setScrollPosition(window.pageYOffset)
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', listenToScroll)
  // }, [])


  const viewBoxPlxData = [
    {
      start: 0,
      end: 2000,
      properties: [
      ],
    },
    {
      start: 2000,
      end: 2050,
      properties: [
        {
          startValue: 0,
          endValue: 20,
          property: 'translateX',
        },
        {
          startValue: 0,
          endValue: 20,
          property: 'translateY',
        },
      ],
    },
    {
      start: 2050,
      end: 2100,
      properties: [
        {
          startValue: 20,
          endValue: -30,
          property: 'translateX',
        },
        {
          startValue: 20,
          endValue: -40,
          property: 'translateY',
        },
      ],
    },
    {
      start: 2100,
      end: 2150,
      properties: [
        {
          startValue: -30,
          endValue: 10,
          property: 'translateX',
        },
        {
          startValue: -40,
          endValue: 30,
          property: 'translateY',
        },
      ],
    },
    {
      start: 2150,
      end: 2200,
      properties: [
        {
          startValue: 10,
          endValue: 40,
          property: 'translateX',
        },
        {
          startValue: 30,
          endValue: 0,
          property: 'translateY',
        },
      ],
    },
    {
      start: 2200,
      end: 2250,
      properties: [
        {
          startValue: 10,
          endValue: 0,
          property: 'translateX',
        },
        {
          startValue: 0,
          endValue: 30,
          property: 'translateY',
        },
      ],
    },
    {
      start: 2250,
      end: 2300,
      properties: [
        {
          startValue: 0,
          endValue: -20,
          property: 'translateX',
        },
        {
          startValue: 30,
          endValue: -10,
          property: 'translateY',
        },
      ],
    },
    {
      start: 2300,
      end: 2350,
      properties: [
        {
          startValue: -20,
          endValue: 20,
          property: 'translateX',
        },
        {
          startValue: -10,
          endValue: -30,
          property: 'translateY',
        },
      ],
    },
    {
      start: 2350,
      end: 2375,
      properties: [
        {
          startValue: 20,
          endValue: 50,
          property: 'translateX',
        },
        {
          startValue: -30,
          endValue: 30,
          property: 'translateY',
        },
      ],
    },
    {
      start: 2375,
      end: 2400,
      properties: [
        {
          startValue: 50,
          endValue: -40,
          property: 'translateX',
        },
        {
          startValue: 30,
          endValue: 0,
          property: 'translateY',
        },
      ],
    },
    {
      start: 2400,
      end: 2425,
      properties: [
        {
          startValue: -40,
          endValue: 10,
          property: 'translateX',
        },
        {
          startValue: 0,
          endValue: 50,
          property: 'translateY',
        },
      ],
    },
    {
      start: 2425,
      end: 2450,
      properties: [
        {
          startValue: 10,
          endValue: 50,
          property: 'translateX',
        },
        {
          startValue: 50,
          endValue: -10,
          property: 'translateY',
        },
      ],
    },
    {
      start: 2450,
      end: 2475,
      properties: [
        {
          startValue: 50,
          endValue: 20,
          property: 'translateX',
        },
        {
          startValue: -10,
          endValue: 30,
          property: 'translateY',
        },
      ],
    },
    {
      start: 2475,
      end: 2600,
      properties: [
        {
          startValue: 20,
          endValue: 0,
          property: 'translateX',
        },
        {
          startValue: 30,
          endValue: 0,
          property: 'translateY',
        },
      ],
    },

  ]
  


  const cogPlxData = [
    {
      start: 0,
      end: 200,
      properties: [
        {
          startValue: 0.1,
          endValue: 0.7,
          property: 'scale',
        },
        {
          startValue: 0,
          endValue: 330,
          property: 'rotate',
        },
      ],
    },
    {
      start: 200,
      end: 400,
      properties: [
        {
          startValue: 0.7,
          endValue: 5.5,
          property: 'scale',
        },
        {
          startValue: 330,
          endValue: 380,
          property: 'rotate',
        },
        {
          startValue: 0,
          endValue: 2400,
          property: 'translateX',
        },
      ],
    },
    {
      start: 400,
      end: 600,
      properties: [
        {
          startValue: 5.5,
          endValue: 10,
          property: 'scale',
        },
        {
          startValue: 2400,
          endValue: 5000,
          property: 'translateX',
        },
      ],
    },
  ];

  const crossPlxData = [
    {
      start: 200,
      end: 220,
      properties: [
        {
          startValue: 400,
          endValue: 300,
          property: 'translateX',
        },
        {
          startValue: 0.01,
          endValue: 0.1,
          property: 'scale',
        },
        {
          startValue: 0,
          endValue: 1,
          property: 'opacity',
        },
        {
          startValue: 0,
          endValue: 30,
          property: 'rotate',
        },
      ]
    },
    {
      start: 220,
      end: 600,
      properties: [
        {
          startValue: 300,
          endValue: 0,
          property: 'translateX',
        },
        {
          startValue: 0.1,
          endValue: 0.7,
          property: 'scale',
        },
        {
          startValue: 30,
          endValue: 330,
          property: 'rotate',
        },
      ]
    },
    {
      start: 600,
      end: 800,
      properties: [
        {
          startValue: 0,
          endValue: 500,
          property: 'translateX',
        },
        {
          startValue: 0,
          endValue: 200,
          property: 'translateY',
        },
        {
          startValue: 0.7,
          endValue: 3,
          property: 'scale',
        },
        {
          startValue: 330,
          endValue: 430,
          property: 'rotate',
        },
      ]
    },
    {
      start: 800,
      end: 1000,
      properties: [
        {
          startValue: 500,
          endValue: 2000,
          property: 'translateX',
        },
        {
          startValue: 200,
          endValue: 400,
          property: 'translateY',
        },
        {
          startValue: 3,
          endValue: 5,
          property: 'scale',
        },
        {
          startValue: 430,
          endValue: 460,
          property: 'rotate',
        },
      ]
    },
  ]

  const circleInCirclePlxData = [
    {
      start: 800,
      end: 1000,
      properties: [
        {
          startValue: 0,
          endValue: 1,
          property: 'opacity',
        },
        {
          startValue: 0.01,
          endValue: 0.04,
          property: 'scale',
        },
        {
          startValue: -400,
          endValue: -100,
          property: 'translateX',
        },
        {
          startValue: -300,
          endValue: -50,
          property: 'translateY',
        },
        {
          startValue: 0,
          endValue: 130,
          property: 'rotate',
        },
      ]
    },
    {
      start: 1000,
      end: 1200,
      properties: [
        {
          startValue: -100,
          endValue: 0,
          property: 'translateX',
        },
        {
          startValue: -50,
          endValue: 0,
          property: 'translateY',
        },
        {
          startValue: 0.04,
          endValue: 0.7,
          property: 'scale',
        },
        {
          startValue: 130,
          endValue: 360,
          property: 'rotate',
        },
      ]
    },
    {
      start: 1200,
      end: 1500,
      properties: [
        {
          startValue: 0.7,
          endValue: 3,
          property: 'scale',
        },
        {
          startValue: 360,
          endValue: 440,
          property: 'rotate',
        },
        {
          startValue: 0,
          endValue: -200,
          property: 'translateX',
        },
        {
          startValue: 0,
          endValue: -300,
          property: 'translateY',
        },
      ]
    },
    {
      start: 1500,
      end: 1700,
      properties: [
        {
          startValue: 3,
          endValue: 6,
          property: 'scale',
        },
        {
          startValue: 440,
          endValue: 480,
          property: 'rotate',
        },
        {
          startValue: -200,
          endValue: -600,
          property: 'translateX',
        },
      ]
    },
  ]

const blackHolePlxData = [
  {
    start: 1700,
    end: 2200,
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: 'opacity',
      },
      {
        startValue: 0.01,
        endValue: 1,
        property: 'scale',
      }
    ]
  },
  {
    start: 2200,
    end: 2600,
    properties: [
      {
        startValue: 1,
        endValue: 2,
        property: 'scale',
      }
    ]
  },
]

  return (
    <div className='scrollPath'>
    <div className='container'>
     <svg width="0" height="0" viewBox="0 0 46 46">
      <defs>
        <clipPath id="cog" 
          transform="scale(0.021739, 0.021739)"
          clipPathUnits="objectBoundingBox"
        >
          <path d='M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756c0.473-0.473,0.733-1.104,0.733-1.774 c0-0.669-0.262-1.301-0.733-1.773l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815 C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607 c-1.766,0.431-3.38,1.104-4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,8.205 C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501 C1.117,18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763 c-0.474,0.473-0.734,1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,0.733,1.772,0.733 s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128 c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869-1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735 c0.67,0,1.301-0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77 c0.92-1.514,1.627-3.179,2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,44.837,18.443,43.454,18.443z M22.976,30.85c-4.378,0-7.928-3.517-7.928-7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85 C30.906,27.334,27.355,30.85,22.976,30.85z'/>
        </clipPath>
        <clipPath id="circleInCircle"
        transform="scale(0.021739, 0.021739)"
        clipPathUnits="objectBoundingBox"
        >
          <path d='M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765 S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53 c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z '/>
        </clipPath>
      </defs>
    </svg> 
      {/* <div className='counter'>{scrollPosition}</div> */}
      <Plx
        className='paralaxContainer'
        parallaxData={ viewBoxPlxData }
      >
        <div className='viewPoint'>
          <Plx
            className='paralaxContainer'
            parallaxData={ cogPlxData }
          >
            <div className='cog'></div>
          </Plx>
          <Plx
            className='paralaxContainer'
            parallaxData={ crossPlxData }
          >
            <div className='cross'></div>
          </Plx>
          <Plx
            className='paralaxContainer'
            parallaxData={ circleInCirclePlxData }
          >
            <div className='circleInCircle'></div>
          </Plx>
          <Plx
            className='paralaxContainer'
            parallaxData={ blackHolePlxData }
          >
            <div className='blackHole'></div>
          </Plx>
        </div>
        </Plx>
    </div>
    </div>
  );
}

export default App;



