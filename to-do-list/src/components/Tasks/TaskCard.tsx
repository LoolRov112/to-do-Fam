import { FunctionComponent, useState, useEffect } from "react";
import { Task } from "../../Models/Task";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { getMemberByUserName } from "../../services/membersService";
import { completeTask } from "../../services/taskService";

interface TaskCardProps {
  task: Task;
  onDelete?: () => void;
  onUpdate?: (updatedTask: Task) => void;
}

const TaskCard: FunctionComponent<TaskCardProps> = ({
  task,
  onDelete,
  onUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const familyNickname = sessionStorage.getItem("familyNickname") || "";
  const userName = sessionStorage.getItem("userName") || "";
  const [user, setUser] = useState<any>(null);

  // Fetch user info on mount
  useEffect(() => {
    getMemberByUserName(familyNickname, userName).then(setUser);
  }, [familyNickname, userName]);

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

        <div className="mt-4 flex items-center justify-center">
          {(sessionStorage.getItem("isCreator") === "true" ||
            (user && task.user_id === user.id)) && (
            <div className="flex gap-3">
              {task.done === false ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-[#5B85AA] font-medium hover:underline flex items-center"
                  title="Edit Task"
                >
                  <img
                    src="/imgs/edit.png"
                    alt="edit"
                    className="w-7 h-7 mr-1"
                  />
                  Edit
                </button>
              ) : (
                <></>
              )}

              <button
                onClick={() => setIsDeleteModalOpen(true)}
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

              {task.done === false ? (
                <button
                  onClick={async () => {
                    await completeTask(
                      typeof task.id === "number" ? task.id : -1
                    );
                    if (onUpdate) onUpdate({ ...task, done: true });
                  }}
                  className="text-green-500 font-medium hover:underline flex items-center"
                  title="Complete Task"
                >
                  <img
                    src="/imgs/done2Green.png"
                    alt="complete"
                    className="w-7 h-7 mr-1"
                  />
                  Complete
                </button>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
        <p
          className={`text-sm font-semibold ${
            task.done ? "text-green-600" : "text-red-500"
          }`}
        >
          {task.done ? "Completed" : "Pending"}
        </p>
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
      <DeleteTaskModal
        taskId={typeof task.id === "number" ? task.id : -1}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteSuccess={() => {
          if (onDelete) onDelete();
          setIsDeleteModalOpen(false);
        }}
      ></DeleteTaskModal>
    </>
  );
};

export default TaskCard;
