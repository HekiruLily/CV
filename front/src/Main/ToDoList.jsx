import ToDoItem from "../Main/ToDoItem";
import React, { useState, useEffect } from "react";
import './ToDoList.css'
import Header from "../Header/Header";
import axios from "axios";
import { io } from "socket.io-client";

const ToDoList = () => {
    const [tasks, setTasks] = useState ([
        // { title: "Gửi email bài tập về nhà", date: "Hôm nay", isDone: false, category: "Công việc" },
        // { title: "Học từ vựng tiếng anh mỗi ngày", date: "Ngày mai", isDone: false, category: "Học tập" },
        // { title: "Đi chơi với bạn bè", date: "Hôm nay", isDone: false, category: "Cá nhân" },
    ]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.isDone).length;

    

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDate, setNewTaskDate] = useState("");
    const [newTaskCategory, setNewTaskCategory] = useState("");
    const [editingIndex, setEditingIndex] = useState(-1);

    const categories = ["Công việc", "Cá nhân", "Học tập"];
    const [selectedCategory, setSelectedCategory] = useState("");

    const filteredTasks = selectedCategory 
        ? tasks.filter(task => task.category === selectedCategory) 
        : tasks;

       // Hàm để lấy danh sách nhiệm vụ từ backend
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/todos");
            console.log("Dữ liệu nhận được từ backend:", response.data); // Log dữ liệu
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Gọi fetchTasks khi component được mount
    useEffect(() => {
        fetchTasks();

        const socket = io("http://localhost:3001");
        socket.on("newTodo", (newTask) => {
            setTasks((prevTasks) => [...prevTasks, newTask]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);


    const formatDate = (dateString) => {
        if (!dateString) return "";
        if (dateString.includes('T')) {
            const [date, time] = dateString.split('T');
            return `${date} ${time}`;
        }
        return dateString;
    };

    const addTask = () => {
        if (newTaskTitle && newTaskDate && newTaskCategory) {
            if (editingIndex !== -1) {
                const updatedTasks = [...tasks];
                updatedTasks[editingIndex] = {
                    ...updatedTasks[editingIndex],
                    title: newTaskTitle,
                    date: formatDate(newTaskDate),
                    category: newTaskCategory
                };
                setTasks(updatedTasks);
                setEditingIndex(-1);
            } else {
                setTasks([...tasks, {
                    title: newTaskTitle,
                    date: formatDate(newTaskDate),
                    isDone: false,
                    category: newTaskCategory
                }]);
            }
            setNewTaskTitle("");
            setNewTaskDate("");
            setNewTaskCategory("");
        } 
    };

    const isTaskOverdue = (dueDate) => {
        const today = new Date();
        const taskDate = new Date(dueDate);
        return taskDate < today;
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
            <div className="task-classification">
                <p>Phân loại nhiệm vụ:</p>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div>
                {tasks.length === 0 ? (
                    <p className="zero-tasks">Bạn hiện không có nhiệm vụ nào, hãy thêm nhiệm vụ đầu tiên</p>
                ) : (
                    filteredTasks.map((task, index) => (
                        <ToDoItem 
                            key={index}
                            index={index}
                            title={task.title || "Không có tiêu đề"}
                            date={formatDate(task.due_date ||task.date)}
                            isDone={task.isDone}
                            category={task.category || "Không có danh mục"}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onToggle={toggleTaskStatus}
                            isTaskOverdue={isTaskOverdue}
                        />
                    ))
                )}
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
                <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
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