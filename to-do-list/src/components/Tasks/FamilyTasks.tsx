import { FunctionComponent, useEffect, useState } from "react";
import { Task } from "../../Models/Task";
import { getFamilyByNickName } from "../../services/familyService";
import {
  getAllMembersByFamily,
  getMemberByUserName,
} from "../../services/membersService";
import { getTasksByFamilyId } from "../../services/taskService";
import TaskCard from "./TaskCard";
import { Member } from "../../Models/Member";

interface FamilyTasksProps {}

const FamilyTasks: FunctionComponent<FamilyTasksProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [membersMap, setMembersMap] = useState<{ [id: number]: string }>({});
  useEffect(() => {
    const fetchData = async () => {
      const familyNickname = sessionStorage.getItem("familyNickname");

      if (!familyNickname) {
        console.error("Missing family nickname  in sessionStorage");
        return;
      }

      try {
        const family = await getFamilyByNickName(
          sessionStorage.getItem("familyNickname") || ""
        );
        let members = await getAllMembersByFamily(
          sessionStorage.getItem("familyNickname") || ""
        );
        let memberMap: { [id: number]: string } = {};
        members.forEach((member: Member) => {
          if (typeof member.id === "number") {
            memberMap[member.id] = member.username;
            console.log("memberMap:", memberMap[member.id]);
          }
        });
        console.log("membersMap keys:", Object.keys(membersMap));
        const fetchedTasks = await getTasksByFamilyId(family.id);
        setTasks(fetchedTasks);
      } catch (err) {
        console.error("Error fetching member or tasks:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="p-2 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-2 mb-6 items-center justify-center">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="w-full max-w-md">
                <div className="text-sm text-[#5B85AA] mb-1 font-bold text-start">
                  Assigned to: {membersMap[task.user_id] || "Unknown"}
                </div>
                <TaskCard task={task} />
              </div>
            ))
          ) : (
            <p>No tasks assigned to your group.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FamilyTasks;
