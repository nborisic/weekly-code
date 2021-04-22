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