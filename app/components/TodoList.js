"use client";

import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import styles from '../styles/TodoList.module.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            const task = {
                id: Date.now(),
                text: newTask,
                completed: false,
                subtasks: []
            };
            setTasks([task, ...tasks]);
            setNewTask('');
        }
    };

    const filteredTasks = tasks.filter(task => {
        return filterStatus === 'all' ||
            (filterStatus === 'completed' ? task.completed : !task.completed);
    });

    return (
        <div className={styles.container}>
            <div className={styles.inputGroup}>

                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className={styles.taskInput}
                    placeholder="Добавить задачу"
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <button
                    onClick={addTask}
                    className={styles.addButton}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>
            </div>

            <div className={styles.filterGroup}>
                <button
                    onClick={() => setFilterStatus('all')}
                    className={`${styles.filterButton} ${filterStatus === 'all' ? styles.active : ''}`}
                >
                    Все
                </button>
                <button
                    onClick={() => setFilterStatus('completed')}
                    className={`${styles.filterButton} ${filterStatus === 'completed' ? styles.active : ''}`}
                >
                    Выполнено
                </button>
                <button
                    onClick={() => setFilterStatus('active')}
                    className={`${styles.filterButton} ${filterStatus === 'active' ? styles.active : ''}`}
                >
                    Активные
                </button>
            </div>

            <div className={styles.taskList}>
                {filteredTasks.map(task => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        setTasks={setTasks}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;