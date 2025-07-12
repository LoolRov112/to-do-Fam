import { FunctionComponent } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../../Models/Task";

interface CompletedTasksProps {
  tasks: Task[];
  id: number;
}

const CompletedTasks: FunctionComponent<CompletedTasksProps> = ({
  tasks,
  id,
}) => {
  const completedTasks = tasks.filter(
    (task) => task.done && Number(task.user_id) === id
  );
  return (
    <>
      {completedTasks.length ? (
        completedTasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p>No completed tasks.</p>
      )}
    </>
  );
};

export default CompletedTasks;
