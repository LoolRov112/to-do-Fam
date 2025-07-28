import { useEffect, useState, FunctionComponent, use } from "react";
import { getTasksByUserAndFamily } from "../../services/taskService";
import { Task } from "../../Models/Task";
import AllTasks from "./AllTasks";
import CompletedTasks from "./CompletedTasks";
import { getMemberByUserName } from "../../services/membersService";
import { getFamilyByNickName } from "../../services/familyService";
import AddTaskModal from "./AddTaskModal";

interface HomeProps {
  overrideFamilyId?: number;
  overrideUserId?: number;
}

const Home: FunctionComponent<HomeProps> = ({
  overrideFamilyId,
  overrideUserId,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [family_id, setFamilyId] = useState<number>(overrideFamilyId ?? -1);
  const [user_id, setUserId] = useState<number>(overrideUserId ?? -1);
  const [view, setView] = useState<"all" | "completed">("all");

  useEffect(() => {
    const fetchData = async () => {
      let famId = overrideFamilyId;
      let usrId = overrideUserId;

      if (!famId || !usrId) {
        const familyNickname = sessionStorage.getItem("familyNickname");
        const userName = sessionStorage.getItem("userName");

        if (!familyNickname || !userName) {
          console.error("Missing session info");
          return;
        }

        const family = await getFamilyByNickName(familyNickname);
        const member = await getMemberByUserName(familyNickname, userName);

        famId = family.id;
        usrId = member.id;
      }

      setFamilyId(famId ?? -1);
      setUserId(usrId ?? -1);

      try {
        const fetchedTasks = await getTasksByUserAndFamily(
          famId ?? -1,
          usrId ?? -1
        );
        setTasks(fetchedTasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchData();
  }, [overrideFamilyId, overrideUserId]);

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
          Pending Tasks
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
