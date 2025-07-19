import { useEffect, useState, FunctionComponent, use } from "react";
import { getTasksByUserAndFamily } from "../../services/taskService";
import { Task } from "../../Models/Task";
import AllTasks from "./AllTasks";
import CompletedTasks from "./CompletedTasks";
import { getMemberByUserName } from "../../services/membersService";
import { getFamilyByNickName } from "../../services/familyService";
import AddTaskModal from "./AddTaskModal";

const Home: FunctionComponent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [family_id, setFamilyId] = useState<number>(-1);
  const [view, setView] = useState<"all" | "pending" | "completed">("all");
  const [user_id, setId] = useState<number>(-1);

  useEffect(() => {
    const fetchData = async () => {
      const familyNickname = sessionStorage.getItem("familyNickname");
      const userName = sessionStorage.getItem("userName");

      if (!familyNickname || !userName) {
        console.error("Missing family nickname or username in sessionStorage");
        return;
      }

      try {
        const family = await getFamilyByNickName(familyNickname);
        const member = await getMemberByUserName(familyNickname, userName);
        setFamilyId(family.id);
        setId(member.id);
        const fetchedTasks = await getTasksByUserAndFamily(
          family.id,
          member.id
        );
        setTasks(fetchedTasks);
      } catch (err) {
        console.error("Error fetching member or tasks:", err);
      }
    };

    fetchData();
  }, [tasks]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 mb-6 items-center justify-center">
        <AddTaskModal
          family_id={family_id}
          user_id={user_id}
          onTaskCreated={(newTask) => setTasks([...tasks, newTask])}
        />
        <button
          className={`px-4 py-2 rounded w-full sm:w-auto ${
            view === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("all")}
        >
          All Tasks
        </button>

        <button
          className={`px-4 py-2 rounded w-full sm:w-auto ${
            view === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("completed")}
        >
          Completed Tasks
        </button>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {view === "all" && (
          <AllTasks
            tasks={tasks}
            id={user_id}
            onUpdate={(updatedTask: Task) => {
              setTasks((prevTasks) =>
                prevTasks.map((t) =>
                  t.id === updatedTask.id ? updatedTask : t
                )
              );
            }}
          />
        )}
        {view === "completed" && <CompletedTasks tasks={tasks} id={user_id} />}
      </div>
    </div>
  );
};

export default Home;
