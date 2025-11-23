'use client';

import { useState } from 'react';
import { Trash2, Plus, Check, X } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        createdAt: new Date(),
      };
      setTasks([newTask, ...tasks]);
      setInputValue('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Gestionnaire de Tâches</h1>
            <p className="text-purple-100">
              {tasks.length === 0
                ? "Commencez par ajouter votre première tâche !"
                : `${completedCount} sur ${tasks.length} tâches terminées`}
            </p>
          </div>

          {/* Input Section */}
          <div className="p-6 bg-gray-50 border-b">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="Ajouter une nouvelle tâche..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
              />
              <button
                onClick={addTask}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-medium"
              >
                <Plus size={20} />
                Ajouter
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div className="p-6">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-500 text-lg">Aucune tâche pour le moment</p>
                <p className="text-gray-400 text-sm mt-2">Ajoutez votre première tâche ci-dessus</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`group flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                      task.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-purple-500'
                      }`}
                    >
                      {task.completed && <Check size={16} className="text-white" />}
                    </button>

                    <span
                      className={`flex-1 transition-all ${
                        task.completed
                          ? 'line-through text-gray-400'
                          : 'text-gray-800'
                      }`}
                    >
                      {task.text}
                    </span>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="flex-shrink-0 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Stats */}
          {tasks.length > 0 && (
            <div className="bg-gray-50 p-4 border-t">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{tasks.filter(t => !t.completed).length} en cours</span>
                <span>{completedCount} terminées</span>
                <span>{tasks.length} total</span>
              </div>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white/90 backdrop-blur rounded-lg p-4 text-center text-gray-700">
          <p className="text-sm">
            ✨ Application créée avec Next.js, React et Tailwind CSS
          </p>
        </div>
      </div>
    </main>
  );
}
