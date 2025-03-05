import { useState } from 'react';
import Subtask from './Subtask';
import styles from '../styles/TodoItem.module.css';

const TodoItem = ({ task, setTasks }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const [newSubtask, setNewSubtask] = useState('');

    const updateTask = (updatedFields) => {
        setTasks(prev => prev.map(t =>
            t.id === task.id ? { ...t, ...updatedFields } : t
        ));
    };

    const deleteTask = () => {
        setTasks(prev => prev.filter(t => t.id !== task.id));
    };

    const addSubtask = () => {
        if (newSubtask.trim()) {
            const subtask = {
                id: Date.now(),
                text: newSubtask,
                completed: false
            };
            updateTask({ subtasks: [...task.subtasks, subtask] });
            setNewSubtask('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addSubtask();
        }
    };

    const progress = task.subtasks.length > 0
        ? (task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100
        : 0;

    return (
        <div className={styles.taskCard}>
            {isEditing ? (
                <div className={styles.editMode}>
                    <input
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className={styles.editInput}
                    />
                    <div className={styles.editActions}>
                        <button
                            onClick={() => {
                                updateTask({ text: editedText });
                                setIsEditing(false);
                            }}
                            className={styles.saveButton}
                        >
                            Сохранить
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className={styles.cancelButton}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.taskHeader}>
                        <div className={styles.taskInfo}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={(e) => updateTask({ completed: e.target.checked })}
                                className={styles.checkbox}
                            />
                            <span className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}>
                                {task.text}
                            </span>
                        </div>
                        <div className={styles.actions}>
                            <button
                                onClick={() => setIsEditing(true)}
                                className={styles.editButton}
                            >
                                Редактировать
                            </button>
                            <button
                                onClick={deleteTask}
                                className={styles.deleteButton}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>

                    {task.subtasks.length > 0 && (
                        <div className={styles.subtaskContainer}>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            {task.subtasks.map(subtask => (
                                <Subtask
                                    key={subtask.id}
                                    subtask={subtask}
                                    updateSubtask={(updated) => {
                                        const subtasks = task.subtasks.map(st =>
                                            st.id === subtask.id ? updated : st
                                        );
                                        updateTask({ subtasks });
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <div className={styles.subtaskInputGroup}>
                        <input
                            type="text"
                            value={newSubtask}
                            onChange={(e) => setNewSubtask(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className={styles.subtaskInput}
                            placeholder="Добавить подзадачу"
                        />
                        <button
                            onClick={addSubtask}
                            className={styles.addSubtaskButton}
                        >
                            +
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TodoItem;