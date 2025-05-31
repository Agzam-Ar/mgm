import React from "react";
import Net from "../utils/Net";

export default function useChecklist():any[] {
	const [items, setItems] = React.useState<any[]>([]);
 	React.useEffect(() => {
 		Net.getJson('/api/items').then(json => setItems(json));
 		Net.onJson('checklist-item-title', (e:any) => {
			setItems(items => {
				const is = [...items];
				is[e.id].title = e.value;
				return is;
			});
 		});
 		Net.onJson('checklist-item-desc', (e:any) => {
			setItems(items => {
				const is = [...items];
				is[e.id].desc = e.value;
				return is;
			});
 		});
 		Net.onJson('checklist-item-score', (e:any) => {
			setItems(items => {
				const is = [...items];
				is[e.id].score = e.value;
				return is;
			});
 		});
 		Net.onJson('checklist-item-done', (e:any) => {
			setItems(items => {
				const is = [...items];
				is[e.id].done = e.value;
				return is;
			});
 		});
 	}, []);
	return items;
}