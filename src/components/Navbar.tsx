import './Navbar.css'

import Icons from '../static/Icons';
import Net from '../utils/Net';

export default function Navbar() {
    const score = Net.get('score', "100");

    return (
        <div className='navbar-box'>
            <div className='navbar-size'>
                <div className='score-box'>{score}{Icons.score}</div>
            </div>
        </div>
    );
}




