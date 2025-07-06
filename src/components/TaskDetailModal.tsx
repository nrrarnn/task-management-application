import React from "react";
import { X, Calendar, AlertCircle, Hash, FileText, Flag, Gauge, Activity, Flame, Minus } from "lucide-react";
import { Task } from "@/types/task";
import { formatDate, formatDueDate } from "@/utils/formatDate";

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return <Flame size={18} className="text-red-700" />;
      case "medium":
        return <Activity size={18} className="text-yellow-700" />;
      case "low":
        return <Gauge size={18} className="text-green-700" />;
      default:
        return <Minus size={18} className="text-gray-600" />;
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Task Details</h2>
              <p className="text-sm text-gray-500">Complete task information</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Hash className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Task ID</p>
              <p className="text-lg font-mono text-gray-900">{task.id}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Title
            </label>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description
            </label>
            <div className="p-4 bg-gray-50 rounded-xl min-h-[100px]">
              <p className="text-gray-900 leading-relaxed">{task.description || "No description provided for this task."}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Flag className="w-4 h-4" />
                Priority
              </label>
              <div className={`p-4 rounded-xl flex items-center gap-2 ${getPriorityStyle(task.priority)}`}>
                {getPriorityIcon(task.priority)}
                <span className="font-semibold capitalize">{task.priority}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Deadline
              </label>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{task.dueDate ? formatDueDate(task.dueDate) : "No Deadline"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Status
            </label>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                {task.progress === "todo" && (
                  <>
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="font-semibold text-gray-600">To Do</span>
                  </>
                )}
                {task.progress === "in-progress" && (
                  <>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-blue-600">In Progress</span>
                  </>
                )}
                {task.progress === "done" && (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-semibold text-green-600">Done</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Created on {formatDate(task.createdAt)}</p>
            <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
