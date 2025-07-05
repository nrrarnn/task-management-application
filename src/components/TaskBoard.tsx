"use client";

import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useTaskStore } from "../store/taskStore";
import { Task, TaskProgress } from "../types/task";
import TaskColumn from "./TaskColumn";

const progressConfig: Array<{
  key: TaskProgress;
  title: string;
  color: string;
}> = [
  { key: "todo", title: "To Do", color: "slate" },
  { key: "in-progress", title: "In Progress", color: "blue" },
  { key: "done", title: "Done", color: "green" },
];

const TaskBoard: React.FC = () => {
  const { tasks, moveTask } = useTaskStore();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    moveTask(draggableId, destination.droppableId as TaskProgress);
  };

  const getTasksByProgress = (progress: TaskProgress): Task[] => {
    return tasks.filter((task) => task.progress === progress);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Task Management</h1>
          <p className="text-gray-600 text-center">Organize and track your tasks with drag-and-drop simplicity</p>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex justify-center gap-6 overflow-x-auto pb-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {progressConfig.map(({ key, title, color }) => (
              <TaskColumn key={key} progress={key} title={title} tasks={getTasksByProgress(key)} color={color} />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskBoard;
