import './Navbar.css'

import Icons from '../static/Icons';

export default function Navbar() {

    const score = 102;

    return (
        <div className='navbar-box'>
            <div className='score-box'>{score}{Icons.score}</div>
        </div>
    );
}




