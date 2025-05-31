import Icons from '../../static/Icons';
import './Checklist.css'

export default function Checklist() {
    return <div>
        
        <ChecklistItem checked={true} header={"Вынест мусор"} content={"себя пока ненадо"} />
        <ChecklistItem checked={true} header={"Собрать робота пылесоса"} />
        <ChecklistItem checked={true} header={"Сходить в магазин"} content={"Помидоры\nОгурцы\nХлеб\nМолоко"} />

    </div>;
}

type ChecklistItemProps = {
    checked: boolean,
    header: string, // Заголовок
    content?: string, // Описание
}

function ChecklistItem({checked, header, content}:ChecklistItemProps) {
    return (
        <div className='checklist-item-box'>
            <div className='checklist-item-icon-box'>
                <div className='checklist-item-icon-background'>
                    {Icons.check}
                </div>
            </div>
            <div className='checklist-item-content'>
                <h1>{header}</h1>
                <div>{content}</div>
            </div>
            <div className='checklist-item-award'>
                <div className='checklist-item-icon-background'>
                    +10 {Icons.score}
                </div>
            </div>
        </div>
    );
}
