# Task Management Application

A Kanban-style task management app built with Next.js, Zustand, and Tailwind CSS.

---

## 🚀 Setup Instructions (How to run the app locally)

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd task-management-application
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🧩 Explanation of the Chosen Approach

### State Management
- Uses [Zustand](https://github.com/pmndrs/zustand) for simple, scalable, and performant global state management.
- All task operations (add, edit, delete, move) are handled in `src/store/taskStore.ts`.

### Storage Solution
- Tasks are persisted in the browser's `localStorage` using utility functions in `src/utils/localStorage.ts`.
- On every change, tasks are saved, and on app load, tasks are restored from local storage.

### UI Components
- Built with React and Tailwind CSS for a modern, responsive UI.
- Drag-and-drop is powered by `@hello-pangea/dnd` for smooth Kanban board interactions.
- Main components:
  - `TaskBoard`: The main board, manages columns and drag events.
  - `TaskColumn`: Represents each status column (To Do, In Progress, Done).
  - `TaskCard`: Displays individual tasks, with dropdown actions and edit/detail modals.
  - `CreateTaskForm` & `EditTaskForm`: For adding and editing tasks.
  - `TaskDetailModal`: Shows full task details in a modal.
  - `PriorityBadge`: Consistent priority icon and color display.

### Folder Structure
- `src/components/`: All UI components.
- `src/store/`: Zustand store for tasks.
- `src/types/`: TypeScript types for tasks.
- `src/utils/`: Utility functions (e.g., localStorage helpers).
- `public/`: Static assets.

### Data Handling
- All task data is managed in the Zustand store and synced to localStorage.
- Each task has fields: `id`, `title`, `description`, `priority`, `progress`, `dueDate`, `createdAt`.
- IDs are auto-incremented for easy reference.

---

## ⚠️ Known Issues
- No backend: All data is stored in localStorage, so tasks are lost if you clear browser storage.
- No authentication or multi-user support.
- No advanced filtering, search, or notifications.
- Drag-and-drop is not touch-optimized for mobile.
- Minimal validation on forms (e.g., no duplicate title check).

---

## 💡 Improvements (if given more time)
- Add user authentication and cloud sync (e.g., Firebase, Supabase).
- Implement advanced filtering, search, and sorting.
- Add task labels, attachments, and comments.
- Improve accessibility and mobile/touch support.
- Add due date reminders/notifications.
- Add tests (unit, integration, e2e).
- Polish UI/UX with animations and dark mode.

---

## 📁 Credits
- Built with [Next.js](https://nextjs.org/), [Zustand](https://github.com/pmndrs/zustand), [Tailwind CSS](https://tailwindcss.com/), and [@hello-pangea/dnd](https://github.com/hello-pangea/dnd).

---
