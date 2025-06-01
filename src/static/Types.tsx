
export type TaskStatus = "done" | "await" | "undone";

export type Task = {
	id: number,
	done: TaskStatus,
	title: string,
	score: number, 
	desc?: string
}