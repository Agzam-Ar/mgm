import React from 'react';
import useChecklist from '../../hooks/useChecklist';
import Icons from '../../static/Icons';
import './Checklist.css'

export default function Checklist({edit=false}:{edit?:boolean}) {

    let items = useChecklist();

    return <div>

        {items.map((e,i) => <ChecklistItem key={i} checked={e.done} score={e.score} header={e.title} content={e.desc} edit={edit}/>)}
        
    </div>;
}

type ChecklistItemProps = {
    checked: boolean,
    header: string, // Заголовок
    score: number, 
    content?: string, // Описание
    edit?: boolean,
}

function ChecklistItem({checked, score, header, content, edit=false}:ChecklistItemProps) {


    const [titleValue, setTitleValue] = React.useState(header);
    const [descValue, setDescValue] = React.useState(content);

    const Tag = edit ? 'input' : 'div';

    return (
        <div className='checklist-item-box'>
            <div className='checklist-item-icon-box'>
                <div className='checklist-item-icon-background'>
                    {Icons.check}
                </div>
            </div>
            <div className='checklist-item-content'>
                {/*<h1>asd</h1>*/}
                <div className='h1'>
                    {edit ? <input value={titleValue} onChange={e => setTitleValue(e.target.value)}/> : header}
                    <div className='checklist-award-icon-box'>
                        +{score} {Icons.score}
                    </div>
                </div>
                {edit ? <textarea className='p' value={descValue} onChange={e => setDescValue(e.target.value)}/> : <div className='p'>{content}</div>}
            </div>
        </div>
    );
}
