import { Link } from 'react-router-dom';

const listInfo = [
    {
        name: 'week-one',
        link: '/scroll-animation'
    },
    {
        name: 'week-two',
        link: '/gesture'
    },
    {
        name: 'week-three',
        link: '/letters'
    },   
    {
        name: 'week-four',
        link: '/numbers'
    },
    {
        name: 'week-five',
        link: '/exit'
    },
    {
        name: 'week-six',
        link: '/space'
    },
    {
        name: 'week-eight',
        link: '/physics'
    },
    {
        name: 'week-nine',
        link: '/depth'
    }  
]

export default function List() {
    return (
        listInfo.map((item, index) => {
            return (
                <div>
                    <Link key={index} to={item.link}>
                        {item.name}
                    </Link>
                </div>
            )
        })
    )
}