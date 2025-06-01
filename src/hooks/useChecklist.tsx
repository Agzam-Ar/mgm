import React from "react";
import { Task } from "../static/Types";
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

export default function useChecklist():Task[] {
	const [items, setItems] = React.useState<Task[]>([]);
 	React.useEffect(() => {
 		Net.getJson('/api/items').then(json => setItems(json));
 		Net.onJson('checklist-item-title', (e:any) => {
			setItems(items => {
				const is = [...items];
				validate(is, e.id);
				is[e.id].title = e.value;
				updatePlaceholder(is);
				return is;
			});
 		}); 
 		Net.onJson('checklist-item-desc', (e:any) => {
			setItems(items => {
				const is = [...items];
				validate(is, e.id);
				is[e.id].desc = e.value;
				updatePlaceholder(is);
				return is;
			});
 		});
 		Net.onJson('checklist-item-score', (e:any) => {
			setItems(items => {
				const is = [...items];
				validate(is, e.id);
				is[e.id].score = e.value;
				updatePlaceholder(is);
				return is;
			});
 		});
 		Net.onJson('checklist-item-done', (e:any) => {
			setItems(items => {
				const is = [...items];
				validate(is, e.id);
				is[e.id].done = e.value;
				updatePlaceholder(is);
				return is;
			});
 		});
 		Net.onJson('checklist-item-remove', (e:any) => {
			setItems(items => {
				const is = [];
				for (var i = 0; i < items.length; i++) {
					if(i == e.id) continue;
					is.push(items[i]);
				}
				updatePlaceholder(is);
				return is;
			});
 		});
 		Net.onJson('checklist-item-all', (e:any) => {
			updatePlaceholder(e.items);
			setItems(e.items);
 		});
 	}, []);
	return items;
}