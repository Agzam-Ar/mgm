import React from "react";
import Vars from "../static/Vars";
import Net from "../utils/Net";




export default function useScore(name:string):[number, Function] {
    const [score, setScore] = React.useState<number>(parseInt(Net.get('score', "" + Vars.score)));

    React.useEffect(() => {
    	Vars.addScoreListener(name, (e:any) => {
            Vars.score = e.score;
            setScore(e.score);
    	});
    }, []);

    const _setScore = (score:number) => {
		Net.sendJson("set-score", { score: score });
    };
    return [score, _setScore];
}