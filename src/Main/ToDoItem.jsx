import './ToDoItem.css';

const ToDoItem = (props) => {
    return (
        <div className={`ToDoItem ${props.isDone ? 'done' : ''}`}>
            <input 
                type="checkbox" 
                checked={props.isDone}
                onChange={() => props.onToggle(props.index)}
            />
            <div>
                <p className="title">{props.title}</p>
                <p className="date">{props.date}</p>
            </div>
            <div className="action">
                <button onClick={() => props.onEdit(props.index)} className="edit-btn">Sửa</button>
                <button onClick={() => props.onDelete(props.index)} className="delete-btn">Xóa</button>
            </div>
        </div>
    )
}
export default ToDoItem