import './Navbar.css'

import Icons from '../static/Icons';
import Net from '../utils/Net';
import React from 'react';
import Vars from '../static/Vars';
import useScore from '../hooks/useScore';

export default function Navbar() {
    const [score, setScore] = useScore('navbar');//React.useState<number>(parseInt(Net.get('score', "" + Vars.score)));

    // React.useEffect(() => {
    //     Net.onJson('set-score', (e:any) => {
    //         Vars.score = e.score;
    //         Net.set('score', Vars.score+"");
    //         setScore(e.score);
    //     });
    // }, []);

    return (
        <div className='navbar-box'>
            <div className='navbar-size'>
                <div className='score-box'>{score+""}{Icons.score}</div>
            </div>
        </div>
    );
}




