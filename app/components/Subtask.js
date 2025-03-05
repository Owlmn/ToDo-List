import styles from '../styles/TodoItem.module.css';

const Subtask = ({ subtask, updateSubtask }) => {
    return (
        <div className={styles.subtask}>
            <input
                type="checkbox"
                checked={subtask.completed}
                onChange={(e) => updateSubtask({ ...subtask, completed: e.target.checked })}
                className={styles.subtaskCheckbox}
            />
            <span className={`${styles.subtaskText} ${subtask.completed ? styles.completed : ''}`}>
                {subtask.text}
            </span>
        </div>
    );
};

export default Subtask;