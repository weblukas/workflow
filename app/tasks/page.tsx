'use client';

import React from 'react';
import { useTaskStore } from '@/store/taskStore';

const priorityColors: Record<string, { bg: string; text: string; badge: string }> = {
  low: { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100' },
  medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', badge: 'bg-yellow-100' },
  high: { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-100' },
};

const statusColors: Record<string, string> = {
  todo: 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-indigo-100 text-indigo-700',
  done: 'bg-green-100 text-green-700',
};

export default function TasksPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const [filterPriority, setFilterPriority] = React.useState<string>('all');
  const [filterStatus, setFilterStatus] = React.useState<string>('all');

  const filteredTasks = tasks.filter((task) => {
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    return priorityMatch && statusMatch;
  });

  return (
    <div>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>Tasks</h1>
          <p className='mt-1 text-gray-600'>Manage and track your team tasks ({tasks.length} total)</p>
        </div>
      </div>

      <div className='mb-6 flex gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Filter by Priority</label>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className='mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm'
          >
            <option value='all'>All Priorities</option>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Filter by Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className='mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm'
          >
            <option value='all'>All Statuses</option>
            <option value='todo'>To Do</option>
            <option value='in-progress'>In Progress</option>
            <option value='done'>Done</option>
          </select>
        </div>
      </div>

      <div className='space-y-3'>
        {filteredTasks.length === 0 ? (
          <div className='rounded-lg border border-gray-200 bg-white p-6'>
            <div className='flex h-32 items-center justify-center'>
              <div className='text-center'>
                <p className='text-gray-500'>No tasks found</p>
                <p className='mt-2 text-sm text-gray-400'>
                  {tasks.length === 0 ? 'Create your first task using the "New" button' : 'Try adjusting your filters'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`rounded-lg border border-gray-200 p-4 ${priorityColors[task.priority].bg}`}
            >
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3'>
                    <h3 className={`text-lg font-semibold ${priorityColors[task.priority].text}`}>
                      {task.title}
                    </h3>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[task.priority].badge}`}>
                      {task.priority}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[task.status]}`}>
                      {task.status === 'in-progress' ? 'In Progress' : task.status === 'done' ? 'Done' : 'To Do'}
                    </span>
                  </div>
                  {task.description && (
                    <p className='mt-2 text-sm text-gray-700'>{task.description}</p>
                  )}
                  <div className='mt-3 flex gap-4 text-xs text-gray-600'>
                    {task.assignee && (
                      <div>
                        <span className='font-medium'>Assigned to:</span> {task.assignee}
                      </div>
                    )}
                    <div>
                      <span className='font-medium'>Created:</span> {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
