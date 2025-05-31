

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
	}
};

export default Net;