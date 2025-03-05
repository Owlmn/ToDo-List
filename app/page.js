import TodoList from './components/TodoList';
import styles from './styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ToDo List</h1>
            <TodoList />
        </div>
    );
}