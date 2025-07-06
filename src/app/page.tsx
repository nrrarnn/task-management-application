"use client";

import { useTaskStore } from "@/store/taskStore";
import TaskBoard from "../components/TaskBoard";
import { useEffect } from "react";
import { loadFromStorage, saveToStorage } from "@/utils/localStorage";

export default function Home() {
  const { tasks, setTasks } = useTaskStore();

  useEffect(() => {
    const stored = loadFromStorage();
    if (stored.length > 0) {
      setTasks(stored);
    }
  }, [setTasks]);

  useEffect(() => {
    saveToStorage(tasks);
  }, [tasks]);
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-poppins">
      <TaskBoard />
    </main>
  );
}
