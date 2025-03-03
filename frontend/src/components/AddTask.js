import { useState } from 'react';

function AddTask() {
    const [title, setTitle] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage(result.message); // Display success message
                setTitle(''); // Clear input field
                setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
            } else {
                throw new Error(result.error || 'Failed to save task');
            }
        } catch (err) {
            console.error('Error submitting task:', err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded">
                <h1 className="text-2xl font-bold text-center mb-4">Add Task</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task"
                        className="border p-2 rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                        Submit
                    </button>
                </form>
                {successMessage && (
                    <p className="mt-4 text-green-500 text-center">{successMessage}</p>
                )}
            </div>
        </div>
    );
}

export default AddTask;
