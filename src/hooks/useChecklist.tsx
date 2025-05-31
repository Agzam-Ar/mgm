import React from "react";
import Net from "../utils/Net";

export default function useChecklist():any[] {
	const [items, setItems] = React.useState([]);
 	React.useEffect(() => {
 		Net.getJson('/api/items').then(json => setItems(json));
    	// fetch('/api/users').then((res) => res.json()).then((data) => setItems(data));
 	}, []);
	return items;
}