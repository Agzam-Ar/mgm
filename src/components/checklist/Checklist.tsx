import useChecklist from '../../hooks/useChecklist';
import Icons from '../../static/Icons';
import './Checklist.css'

export default function Checklist() {

    let items = useChecklist();

    return <div>

        {items.map((e,i) => <ChecklistItem key={i} checked={e.done} score={e.score} header={e.title} content={e.desc} />)}
        

    </div>;
}

type ChecklistItemProps = {
    checked: boolean,
    header: string, // Заголовок
    score: number, 
    content?: string, // Описание
}

function ChecklistItem({checked, score, header, content}:ChecklistItemProps) {
    return (
        <div className='checklist-item-box'>
            <div className='checklist-item-icon-box'>
                <div className='checklist-item-icon-background'>
                    {Icons.check}
                </div>
            </div>
            <div className='checklist-item-content'>
                <h1>{header} 
                    <div className='checklist-award-icon-box'>
                        +{score} {Icons.score}
                    </div>
                </h1>
                <div>{content}</div>
            </div>
        </div>
    );
}
