import React from 'react';
import PropTypes from 'prop-types';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const handleStatusChange = () => {
    onUpdate(task._id, {
      status: task.status === 'complete' ? 'incomplete' : 'complete'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={task.status === 'complete'}
              onChange={handleStatusChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <h3
              className={`text-lg font-medium ${
                task.status === 'complete' ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
          </div>
          <p className="mt-2 text-gray-600">{task.description}</p>
          <div className="mt-4 flex items-center space-x-4">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
            <span className="text-sm text-gray-500">
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onDelete(task._id)}
            className="text-gray-400 hover:text-red-500"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TaskItem; 