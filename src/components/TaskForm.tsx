"use client";

import React, { useState } from "react";
import { useTaskStore } from "../store/taskStore";
import { TaskPriority } from "../types/task";
import { v4 as uuidv4 } from "uuid";

export default function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newTask = {
      id: uuidv4(),
      title,
      description,
      dueDate: "", 
      priority,
      progress: "todo" as const, 
    };

    addTask(newTask);
    setTitle("");
    setDescription("");
    setPriority("Medium");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Add New Task</h2>

      <div className="mb-2">
        <input type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
      </div>

      <div className="mb-2">
        <textarea placeholder="Task description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-2">
        <label className="block mb-1">Due Date</label>
        <input type="date" className="w-full p-2 border rounded" />
      </div>

      <div className="mb-2">
        <label className="block mb-1">Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)} className="w-full p-2 border rounded">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Task
      </button>
    </form>
  );
}
