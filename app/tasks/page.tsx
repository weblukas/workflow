'use client';

import React from 'react';
import { useTaskStore } from '@/store/taskStore';

const priorityColors: Record<
  string,
  { bg: string; text: string; badge: string }
> = {
  low: {
    bg: 'bg-green-50',
    text: 'text-green-800',
    badge: 'bg-green-100 text-green-800',
  },
  medium: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-800',
    badge: 'bg-yellow-100 text-yellow-800',
  },
  high: {
    bg: 'bg-red-50',
    text: 'text-red-800',
    badge: 'bg-red-100 text-red-800',
  },
};

const statusColors: Record<string, string> = {
  todo: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  done: 'bg-green-100 text-green-800',
};

export default function TasksPage() {
  const tasks = useTaskStore((s) => s.tasks);
  const updateTask = useTaskStore((s) => s.updateTask);

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Tasks</h1>
        <p className='mt-1 text-gray-600'>
          Manage and track your team tasks ({tasks.length} total)
        </p>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {tasks.length === 0 ? (
          <div className='rounded-lg border border-gray-200 bg-white p-6 col-span-full'>
            <div className='text-center'>
              <p className='text-gray-500'>No tasks yet</p>
              <p className='mt-2 text-sm text-gray-400'>
                Create your first task using the New button
              </p>
            </div>
          </div>
        ) : (
          tasks.map((task) => {
            const created = new Date(task.createdAt);
            const timeString = created.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });
            const dateString = created.toLocaleDateString();
            const progress =
              task.status === 'todo'
                ? 0
                : task.status === 'in-progress'
                ? 50
                : 100;

            return (
              <div
                key={task.id}
                className={`rounded-lg border border-gray-200 p-4 bg-white ${
                  priorityColors[task.priority]?.bg ?? ''
                }`}
              >
                <div className='mb-2'>
                  <h3
                    className={`text-xl font-bold ${
                      priorityColors[task.priority]?.text ?? ''
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className='text-sm text-gray-600 mt-1'>
                      {task.description}
                    </p>
                  )}
                </div>

                <div className='flex items-center justify-between gap-4'>
                  <div className='flex-1'>
                    <div className='flex flex-col gap-2'>
                      <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2'>
                          <span className='text-xs text-gray-500'>Status:</span>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              statusColors[task.status]
                            }`}
                          >
                            {task.status === 'in-progress'
                              ? 'In Progress'
                              : task.status === 'done'
                              ? 'Done'
                              : 'To Do'}
                          </span>
                        </div>

                        <div className='flex items-center gap-2'>
                          <span className='text-xs text-gray-500'>
                            Priority:
                          </span>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              priorityColors[task.priority]?.badge ?? ''
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>

                      <div className='w-full max-w-sm'>
                        <div className='h-2 w-full rounded-full bg-gray-100'>
                          <div
                            className='h-2 rounded-full bg-indigo-500'
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateTask(task.id, { status: e.target.value as 'todo' | 'in-progress' | 'done' })
                      }
                      className='rounded-md border border-gray-300 px-2 py-1 text-sm'
                    >
                      <option value='todo'>To Do</option>
                      <option value='in-progress'>In Progress</option>
                      <option value='done'>Done</option>
                    </select>
                    <div className='text-xs text-gray-400 mt-2'>
                      {dateString} • {timeString}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
