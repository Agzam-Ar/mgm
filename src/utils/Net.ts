import { resolve } from "dns";


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
		resolve([{
			done: true,
			score: 10,
			title: "Выбросить мусор",
			desc: "себя пока что ненадо"
		},{
			done: false,
			score: 20,
			title: "Сходить в магазин",
			desc: "Помидоры\nОгурцы\nХлеб\nМолоко"
		}]);
	})
};

export default Net;