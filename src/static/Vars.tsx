import Net from "../utils/Net";


const scoreListeners:any = {};

const Vars = {

	score: 0,

	addScoreListener: (key:string, listener:Function) => {
		scoreListeners[key] = listener;
	}
};


Net.onJson('set-score', (e:any) => {
    Vars.score = e.score;
	Net.set('score', Vars.score+"");
    for(let key of Object.keys(scoreListeners)) {
    	scoreListeners[key](e);
    }
});


export default Vars;