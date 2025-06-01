import React from 'react';
import useChecklist from '../../hooks/useChecklist';
import Icons from '../../static/Icons';
import Net from '../../utils/Net';
import './Checklist.css'

export default function Checklist({edit=false}:{edit?:boolean}) {

    let items = useChecklist();

    return <div>
        {items.map((e,i) => <ChecklistItem key={i} id={i} checked={e.done} score={e.score} header={e.title} content={e.desc} edit={edit}/>)}
    </div>;
}
type ChecklistItemStatus = "done" | "await" | "undone";

type ChecklistItemProps = {
    id: number,
    checked: ChecklistItemStatus,
    header: string, // Заголовок
    score: number, 
    content?: string, // Описание
    edit?: boolean,
}

function ChecklistItem({id, checked, score, header, content, edit=false}:ChecklistItemProps) {
    const [titleValue, setTitleValue] = React.useState(header);
    const [descValue, setDescValue] = React.useState(content);
    const [scoreValue, setScoreValue] = React.useState<number>(score);
    const [checkedValue, setCheckedValue] = React.useState<ChecklistItemStatus>(checked);
    return (
        <div className={`checklist-item-box ${checkedValue}`}>
            <div className={`checklist-item-icon-box ${checkedValue}`}>
                <div className={`checklist-item-icon-background ${checkedValue}`} onClick={e => {
                        if(edit) {
                            let value:ChecklistItemStatus = checkedValue;
                            if(value === 'await') value = 'done';
                            else if(value === 'done') value = 'undone';
                            else if(value === 'undone') value = 'done';

                            Net.sendJson("checklist-item-done", {
                                id: id,
                                value: value
                            });
                            setCheckedValue(value);
                            return;
                        }

                        let value:ChecklistItemStatus = checkedValue === 'undone' ? 'await' : 'undone';

                        Net.sendJson("checklist-item-done", {
                            id: id,
                            value: value
                        });
                        setCheckedValue(value);
                    }}>
                    {Icons.check}
                </div>
            </div>
            <div className={`checklist-item-content ${checkedValue}`}>
                <div className='h1'>
                    {edit ? <input value={titleValue} onChange={e => {
                        setTitleValue(e.target.value);
                        Net.sendJson('checklist-item-title', {
                            id: id,
                            value: e.target.value
                        });
                    }}/> : header}
                    <div className='checklist-award-icon-box'>
                        +{edit ? <input min={1} type={'number'} value={scoreValue} onChange={e => {
                            let value = parseInt(e.target.value);
                            setScoreValue(value);
                            Net.sendJson('checklist-item-score', {
                                id: id,
                                value: value
                            });
                        }}/> : score} {Icons.score}
                    </div>
                </div>
                {edit ? <textarea className='p' value={descValue} onChange={e => {
                    setDescValue(e.target.value);
                    Net.sendJson('checklist-item-desc', {
                        id: id,
                        value: e.target.value
                    });
                }}/> : <div className='p'>{content}</div>}
            </div>
        </div>
    );
}
