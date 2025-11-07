import './ToDoItem.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ToDoItem = ({ title, date, isDone, category, onEdit, onDelete, onToggle, index, isTaskOverdue }) => {
    return (
        <div className={`ToDoItem ${isDone ? 'done' : ''}`}>
            <input 
                type="checkbox" 
                checked={isDone}
                onChange={() => onToggle(index)}
            />
            <div>
                <p className="title">
                    {title} <span className="category">({category})</span>
                    {isTaskOverdue(date) && <span style={{ color: 'red' }}> (Quá hạn!)</span>}
                </p>
                <p className="date">{date}</p>
            </div>
            <div className="action">
                <button onClick={() => onEdit(index)} className="edit-btn"><FaEdit />Sửa</button>
                <button onClick={() => onDelete(index)} className="delete-btn"><FaTrash />Xóa</button>
            </div>
        </div>
    );
}
export default ToDoItem