import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const { token } = useAuth();

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      setError('Error fetching tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleAddTask = async (taskData) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTasks([...tasks, response.data]);
    } catch (error) {
      setError('Error adding task');
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        updates,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (error) {
      setError('Error updating task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      setError('Error deleting task');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return task.status === 'incomplete';
    if (filter === 'completed') return task.status === 'complete';
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Task Manager</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <TaskForm onSubmit={handleAddTask} />
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded ${
              filter === 'active'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded ${
              filter === 'completed'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Completed
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList; 