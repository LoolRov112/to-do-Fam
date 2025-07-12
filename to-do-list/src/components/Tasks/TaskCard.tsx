import { FunctionComponent, useState } from "react";
import { Task } from "../../Models/Task";
import EditTaskModal from "./EditTaskModal";

interface TaskCardProps {
  task: Task;
  onDelete?: () => void;
  onUpdate?: (updatedTask: Task) => void; // פונקציה לעדכון משימה
}

const TaskCard: FunctionComponent<TaskCardProps> = ({
  task,
  onDelete,
  onUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]); // ניהול רשימת המשימות

  return (
    <>
      <div className="bg-white rounded-lg shadow-md border border-slate-200 w-80 p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between min-h-[230px]">
        <div className="border-b pb-2 mb-3">
          <span className="text-sm text-slate-600 font-medium">
            Due:
            {task.due_date
              ? new Date(task.due_date).toLocaleDateString()
              : "No due date"}
          </span>
        </div>

        <div className="flex-1">
          <h5 className="text-xl font-semibold text-slate-800 mb-1 line-clamp-2">
            {task.name}
          </h5>
          <p className="text-slate-600 text-sm line-clamp-3">
            {task.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-[#5B85AA] font-medium hover:underline flex items-center"
              title="Edit Task"
            >
              <img src="/imgs/edit.png" alt="edit" className="w-7 h-7 mr-1" />
              Edit
            </button>

            <button
              onClick={onDelete}
              className="text-red-500 font-medium hover:underline flex items-center"
              title="Delete Task"
            >
              <img
                src="/imgs/delete.png"
                alt="delete"
                className="w-7 h-7 mr-1"
              />
              Delete
            </button>
          </div>

          <p
            className={`text-sm font-semibold ${
              task.done ? "text-green-600" : "text-red-500"
            }`}
          >
            {task.done ? "Completed" : "Pending"}
          </p>
        </div>
      </div>

      <EditTaskModal
        task={task}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={(updatedTask) => {
          if (onUpdate) onUpdate(updatedTask);
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default TaskCard;
