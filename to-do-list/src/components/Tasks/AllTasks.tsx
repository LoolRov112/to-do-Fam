import { FunctionComponent } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../../Models/Task";

interface TasksListProps {
  onUpdate?: (updatedTask: Task) => void;
  tasks: Task[];
  id: number;
}
const AllTasks: FunctionComponent<TasksListProps> = ({
  tasks,
  id,
  onUpdate,
}) => {
  const userTasks = tasks.filter((task) => Number(task.user_id) === id);
  console.log("All tasks received in component:", tasks);
  return (
    <>
      {userTasks.length > 0 ? (
        userTasks.map((task) => (
          <TaskCard key={task.id} task={task} onUpdate={onUpdate} />
        ))
      ) : (
        <p>No tasks assigned to you.</p>
      )}
    </>
  );
};

export default AllTasks;
