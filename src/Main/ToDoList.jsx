import ToDoItem from "../Main/ToDoItem";
import React, {useState} from "react";
import './ToDoList.css'
import Header from "../Header/Header";

const ToDoList = () => {
    const [tasks, setTasks] = useState ([
        { title : "Gửi email bài tập về nhà", date: "Hôm nay", isDone: false },
        { title : "Học từ vựng tiếng anh mỗi ngày", date: "Ngày mai", isDone: false },
        { title : "Viết tiểu luận môn triết học", date: "2 tuần tới", isDone: false }
    ]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.isDone).length;

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDate, setNewTaskDate] = useState("");
    const [editingIndex, setEditingIndex] = useState(-1);

    const formatDate = (dateString) => {
        if (dateString.includes('T')) {
            const [date, time] = dateString.split('T');
            return `${date} ${time}`;
        }
        return dateString;
    };

    const addTask = () => {
        if (newTaskTitle && newTaskDate) {
            if (editingIndex !== -1) {
                const updatedTasks = [...tasks];
                updatedTasks[editingIndex] = {
                    ...updatedTasks[editingIndex],
                    title: newTaskTitle,
                    date: formatDate(newTaskDate)
                };
                setTasks(updatedTasks);
                setEditingIndex(-1);
            } else {
                setTasks([...tasks, {
                    title: newTaskTitle,
                    date: formatDate(newTaskDate),
                    isDone: false
                }]);
            }
            setNewTaskTitle("");
            setNewTaskDate("");
        } 
    };

    const handleEdit = (index) => {
        const task = tasks[index];
        setNewTaskTitle(task.title);
        setNewTaskDate(task.date);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const toggleTaskStatus = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].isDone = !updatedTasks[index].isDone;
        setTasks(updatedTasks);
    };
    
    return (
        <div className="ToDoList">
            <Header totalTasks={totalTasks} completedTasks={completedTasks} />  
            <div>
                {tasks.map((task, index) => (
                    <ToDoItem 
                        key={index}
                        index={index}
                        title={task.title}
                        date={formatDate(task.date)}
                        isDone={task.isDone}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggle={toggleTaskStatus}
                    />
                ))}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Tên nhiệm vụ"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={newTaskDate}
                    onChange={(e) => setNewTaskDate(e.target.value)}
                />
            </div>
            
            <div>
                <button onClick={addTask}>
                    {editingIndex !== -1 ? 'CẬP NHẬT' : 'THÊM NHIỆM VỤ'}
                </button>
            </div>
        </div>
    )
}

export default ToDoList