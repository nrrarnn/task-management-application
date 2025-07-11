"use client";

import React, { useState, useEffect, useRef } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types/task";
import { Calendar, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useTaskStore } from "../store/taskStore";
import PriorityBadge from "./PriorityBadge";
import EditTaskForm from "./EditTaskForm";

interface TaskCardProps {
  task: Task;
  index: number;
  onDetail: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { deleteTask, editTask } = useTaskStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
    setIsConfirmOpen(false);
  };

  const handleEdit = () => {
    setEditingTask(task);
    setIsOpen(false);
  };

  const handleDetail = () => {
    onDetail(task);
    setIsOpen(false);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) =>
          editingTask ? (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`bg-white rounded-lg shadow-md shadow-gray-200 border border-gray-200 p-4 mb-3 transition-all duration-200 group`}>
              <EditTaskForm
                task={editingTask}
                onCancel={() => setEditingTask(null)}
                onSave={(updatedTask) => {
                  editTask(updatedTask);
                  setEditingTask(null);
                }}
              />
            </div>
          ) : (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`
              bg-white rounded-lg shadow-md shadow-gray-200 border border-gray-200 p-4 mb-3 
              transition-all duration-200 hover:shadow-md group cursor-grab
              ${snapshot.isDragging ? "shadow-lg rotate-3 scale-105" : ""}
            `}
            >
              <div className="flex  items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2 relative">
                    <div className="flex items-center gap-2 px-2">
                      <div className="flex items-center justify-center">
                        <input type="checkbox" />
                      </div>
                      <p className="text-[10px] text-gray-600 rounded-full bg-gray-100 px-2 py-1 tracking-wide">{task.id}</p>
                    </div>
                    <div className="relative" ref={dropdownRef}>
                      <button className="p-1 text-gray-400 hover:text-slate-500 transition-colors" onClick={() => setIsOpen(!isOpen)}>
                        <MoreHorizontal size={14} />
                      </button>
                      {isOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                          <button onClick={handleDetail} className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                            <Eye size={14} />
                            Detail
                          </button>
                          <button onClick={handleEdit} className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                            <Edit size={14} />
                            Edit
                          </button>
                          <hr className="border-gray-100" />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsConfirmOpen(true);
                            }}
                            className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="font-normal text-sm text-gray-900 flex-1 px-2 pb-4">{task.title}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600 px-2 flex items-center gap-1">
                      <Calendar size={14} />
                      {task.dueDate}
                    </p>
                    <PriorityBadge priority={task.priority} />
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </Draggable>
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Delete Task?</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsConfirmOpen(false)} className="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
