import { useEffect, useState } from 'react';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/tasks');
                const data = await response.json();
                setTasks(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Task List</h1>
            <ul className="list-disc ml-5">
                {tasks.map((task) => (
                    <li key={task._id} className="mb-2">
                        {task.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
