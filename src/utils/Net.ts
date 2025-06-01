import { resolve } from "dns";

const bc = new BroadcastChannel('net-channel');


const listeners:any = {};

const Net = {


	/**
	 * Получить какие-то данные по ссылке 
	 * @parm url - ссылка
	 * @parm def - значение которое вернется если оно никогда не устанавливалось
	 */
	get: (url:string, def:string):string => {
		const item = localStorage.getItem(url);
		if(item == undefined) return def;
		return item;
	},

	/**
	 * Установить какое-то значение по ссылке 
	 * @parm url - ссылка
	 */
	set: (url:string, value:string) => {
		localStorage.setItem(url, value);
	},


	getJson: (url:string):Promise<any> => new Promise(resolve => {
		if(url === '/api/items') {
			const ph = [{
				id: 0,
				done: 'undone',
				score: 10,
				title: "Помыть посуду",
				desc: ""
			},{
				id: 1,
				done: 'undone',
				score: 5,
				title: "Убрать вещи",
				desc: ""
			},{
				id: 2,
				done: 'undone',
				score: 30,
				title: "Прибраться в комнате",
				desc: "не забудь протереть подоконник"
			},{
				id: 3,
				done: 'undone',
				score: 50,
				title: "Выгулять собаку",
				desc: ""
			}];

			const placeholder = ph; // JSON.parse(Net.get('checklist-item-placeholder', JSON.stringify(ph)));
 			Net.sendJson('checklist-item-all', {
 				items: placeholder
 			});
			resolve(placeholder);
			return;
		}
		if(url === '/api/marks') {
			const ph = [
				"Яблочный сок",
				"Шоколадка",
				"Поход в кино",
				"Прогулка всей семъей"
			];
			const placeholder = ph;//JSON.parse(Net.get('checklist-item-placeholder', JSON.stringify(ph)));
 			Net.sendJson('checklist-item-all', {
 				items: placeholder
 			});
			resolve(placeholder);
			return;
		}

		resolve(undefined);
	}),

	setJson: (url:string, json:any):Promise<any> => new Promise(resolve => {
		const message = JSON.stringify(json);
		Net.set(url, message);
		bc.postMessage(message);
	}),

	onJson: (type:string, listener:Function) => {
		listeners[type] = listener;
	},

	sendJson: (url:string, json:any) => {
		if(listeners[url]) {
			if(json.length == undefined) listeners[url]({...json});
			else listeners[url]([...json]);
		}
		const message = {
			type: url,
			data: JSON.stringify(json),
		};
		bc.postMessage(message);
	},
};



bc.onmessage = (e) => {
	for(let key of Object.keys(listeners)) {
		if(key != e.data.type) continue; 
		listeners[key](JSON.parse(e.data.data));
	}
};

export default Net;