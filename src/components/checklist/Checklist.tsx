import Icons from '../../static/Icons';
import './Checklist.css'

export default function Checklist() {
    return <div>
        
        <ChecklistItem checked={true} score={10} header={"Вынест мусор"} content={"себя пока ненадо"} />
        <ChecklistItem checked={true} score={37} header={"Собрать робота пылесоса"} />
        <ChecklistItem checked={true} score={75} header={"Сходить в магазин"} content={"Помидоры\nОгурцы\nХлеб\nМолоко"} />

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
