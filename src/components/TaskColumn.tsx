"use client";

import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { ClipboardList, Loader, CheckCircle, Plus } from "lucide-react";
import { Task, TaskProgress } from "../types/task";
import CreateTaskForm from "./CreateTaskForm";
import TaskCard from "./TaskCard";
import type { LucideIcon } from "lucide-react";
import classNames from "classnames";

interface TaskColumnProps {
  progress: TaskProgress;
  title: string;
  tasks: Task[];
  color: string;
  onDetail: (task: Task) => void;
}

interface StatusStyle {
  bg: string;
  text: string;
  icon: LucideIcon;
  iconColor: string;
}

const statusStyles: Record<TaskProgress, StatusStyle> = {
  todo: {
    bg: "bg-gray-200",
    text: "text-gray-700",
    icon: ClipboardList,
    iconColor: "text-gray-800",
  },
  "in-progress": {
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: Loader,
    iconColor: "text-blue-800",
  },
  done: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    icon: CheckCircle,
    iconColor: "text-emerald-800",
  },
};

const TaskColumn: React.FC<TaskColumnProps> = ({ progress, title, tasks, onDetail }) => {
  const [isCreating, setIsCreating] = useState(false);
  const { bg, text, icon: Icon, iconColor } = statusStyles[progress];

  return (
    <div className={`flex flex-col w-80 rounded-xl bg-gray-100 transition-all duration-200`}>
      <div className="p-4  border-opacity-20">
        <div className="flex items-center justify-between border-1 border-gray-200 shadow-lg shadow-gray-300/40 rounded-lg px-2 py-1 bg-white bg-opacity-60">
          <div className="flex items-center space-x-2">
            <h2 className={classNames("text-xs font-poppins font-semibold flex items-center px-2 py-1 rounded-lg", bg, text)}>
              <Icon className={classNames("mr-1", iconColor)} size={16} />
              {title}
            </h2>
            <span className="bg-gray-100 px-2 py-1 rounded-full  text-sm font-medium text-gray-600">{tasks.length}</span>
          </div>
          <button onClick={() => setIsCreating(true)} className="px-2">
            <Plus size={16} className="text-slate-800" />
          </button>
        </div>
      </div>

      <Droppable droppableId={progress}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 p-4 transition-all duration-200 min-h-[400px]
              ${snapshot.isDraggingOver ? "bg-opacity-80" : ""}
            `}
          >
            {isCreating && <CreateTaskForm progress={progress} onClose={() => setIsCreating(false)} />}

            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} onDetail={onDetail} />
            ))}

            {provided.placeholder}

            {tasks.length === 0 && !isCreating && (
              <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <Plus size={20} />
                </div>
                <p className="text-sm">No tasks yet</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
