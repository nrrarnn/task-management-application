"use client";

import React, { useState } from "react";
import { Task, TaskPriority } from "../types/task";
import { Check, ChevronDown, X } from "lucide-react";

interface EditTaskFormProps {
  task: Task;
  onCancel: () => void;
  onSave: (updatedTask: Task) => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || "",
    priority: task.priority,
    dueDate: task.dueDate || "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const priorities = [
    { value: "Low", label: "Low Priority" },
    { value: "Medium", label: "Medium Priority" },
    { value: "High", label: "High Priority" },
  ];

  const selectedPriority = priorities.find((p) => p.value === formData.priority);

  const handleSelect = (value: TaskPriority) => {
    setFormData({ ...formData, priority: value });
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave({
      ...task,
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate || undefined,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900">Edit Task</h3>
        <button onClick={onCancel} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input type="text" placeholder="Task title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input-text" autoFocus />
        </div>

        <div>
          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-text" rows={2} />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="relative">
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="input-text flex justify-between items-center">
              <span className="text-xs text-slate-700">{selectedPriority ? selectedPriority.label : "Select priority"}</span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
                {priorities.map((priority) => (
                  <button key={priority.value} onClick={() => handleSelect(priority.value as TaskPriority)} className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <span className="text-xs">{priority.label}</span>
                    {formData.priority === priority.value && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} className="input-text" />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
