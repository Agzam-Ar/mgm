

import React from "react";
import { Mark, Task } from "../static/Types";
import Net from "../utils/Net";

const validate = (is:Task[], index:number) => {
	for (var i = is.length; i <= index; i++) {
		is.push({
			id: i,
			done: 'undone',
			score: 10,
			title: "Название задачи",
			desc: "Описание",
		});
	}
};

const updatePlaceholder = (as:Task[]) => {
	Net.set('checklist-item-placeholder', JSON.stringify(as));
}

export default function useProgress():string[] {
	const [items, setItems] = React.useState<string[]>([]);
 	React.useEffect(() => {
 		Net.getJson('/api/marks').then(json => setItems(json));
 		Net.onJson('progressbar-marks', (e:any) => {
			setItems(e);
 		}); 
 	}, []);
	return items;
}