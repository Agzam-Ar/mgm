import React from 'react';
import useChecklist from '../../hooks/useChecklist';
import Icons from '../../static/Icons';
import Vars from '../../static/Vars';
import Net from '../../utils/Net';
import './Checklist.css'

export default function Checklist({edit=false}:{edit?:boolean}) {
	let items = useChecklist();
	return <div>
		{items.map((e,i) => <ChecklistItem key={i} id={i} checked={e.done} score={e.score} title={e.title} desc={e.desc} edit={edit}/>)}
		{!edit ? undefined : <ChecklistItem id={items.length} checked={'undone'} score={10} title={"Название задачи"} desc={"Описание"} edit={edit}/>}
	</div>;
}
type ChecklistItemStatus = "done" | "await" | "undone";

type ChecklistItemProps = {
	id: number,
	checked: ChecklistItemStatus,
	title: string, // Заголовок
	score: number, 
	desc?: string, // Описание
	edit?: boolean,
}

function ChecklistItem({id, checked, score, title, desc, edit=false}:ChecklistItemProps) {
	// const [titleValue, setTitleValue] = React.useState(header);
	// const [descValue, setDescValue] = React.useState(content);
	// const [scoreValue, setScoreValue] = React.useState<number>(score);
	return (
		<div className={`checklist-item-box ${checked}`}>
			<div className={`checklist-item-icon-box ${checked}`}>
				<div className={`checklist-item-icon-box-check`}>
					<div className={`checklist-item-icon-background ${checked} ${edit ? 'edit' : 'unedit'}`} onClick={e => {
							if(edit) {
								let value:ChecklistItemStatus = checked;
								if(value === 'await') value = 'done';
								else if(value === 'done') value = 'undone';
								else if(value === 'undone') value = 'done';
								Net.sendJson("checklist-item-done", {
									id: id,
									value: value
								});
								if(checked != 'done' && value == 'done') {
									Net.sendJson("set-score", {
										score: Vars.score + score,
									});
								}
								if(checked == 'done' && value != 'done') {
									Net.sendJson("set-score", {
										score: Vars.score - score,
									});
								}
								return;
							}
							let value:ChecklistItemStatus = checked === 'done' ? 'done' : checked === 'undone' ? 'await' : 'undone';
							Net.sendJson("checklist-item-done", {
								id: id,
								value: value
							});
						}}>
						{Icons.check}
					</div>
				</div>
					{!edit ? undefined : <div className={`checklist-item-icon-box-remove`}>
						<div className={`checklist-item-icon-background ${checked} ${edit ? 'edit' : 'unedit'}`} onClick={e => {
							Net.sendJson('checklist-item-remove', {
								id: id,
							});
						}}>
							{Icons.remove}
						</div>
					</div>}
			</div>
			<div className={`checklist-item-content ${checked} ${edit ? 'edit' : 'unedit'}`}>
				<div className='h1'>
					{edit ? <input value={title} onChange={e => {
						// setTitleValue(e.target.value);
						Net.sendJson('checklist-item-title', {
							id: id,
							value: e.target.value
						});
					}}/> : title}
					<div className={`checklist-award-icon-box ${checked}`}>
						+{edit ? <input min={1} type={'number'} value={score} onChange={e => {
							let value = parseInt(e.target.value);
							// setScoreValue(value);
							Net.sendJson('checklist-item-score', {
								id: id,
								value: value
							});
						}}/> : score} {Icons.score}
					</div>
				</div>
				{edit ? <textarea className='p' value={desc} onChange={e => {
					// setDescValue(e.target.value);
					Net.sendJson('checklist-item-desc', {
						id: id,
						value: e.target.value
					});
				}}/> : <div className='p'>{desc}</div>}
			</div>
		</div>
	);
}
