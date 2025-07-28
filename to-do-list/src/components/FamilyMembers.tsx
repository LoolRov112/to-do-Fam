import { FunctionComponent, useEffect, useState } from "react";
import { Member } from "../Models/Member";
import {
  getAllMembersByFamily,
  updateMemberRole,
} from "../services/membersService";
import { getFamilyByNickName } from "../services/familyService";
import { getTasksByUserAndFamily } from "../services/taskService";
import { Link } from "react-router-dom";

interface FamilyMembersProps {}

const FamilyMembers: FunctionComponent<FamilyMembersProps> = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [taskCounts, setTaskCounts] = useState<{ [id: number]: number }>({});
  const [familyId, setFamilyId] = useState<number | null>(null);
  const isCreator = sessionStorage.getItem("isCreator") === "true";
  const nickname = sessionStorage.getItem("familyNickname") ?? "";

  useEffect(() => {
    const fetchData = async () => {
      if (!nickname) return;

      try {
        const family = await getFamilyByNickName(nickname);
        setFamilyId(family.id);

        const data = await getAllMembersByFamily(nickname);
        setMembers(data);

        const counts: { [id: number]: number } = {};
        for (const member of data) {
          const tasks = await getTasksByUserAndFamily(family.id, member.id);
          counts[member.id] = tasks.filter(
            (t: { done: any }) => !t.done
          ).length;
        }
        setTaskCounts(counts);
      } catch (err) {
        console.error("Error fetching members", err);
      }
    };

    fetchData();
  }, []);

  const handleRoleChange = async (
    memberId: number,
    isCreatorValue: boolean
  ) => {
    if (!nickname) return;
    try {
      await updateMemberRole(nickname, memberId, isCreatorValue);
      const updatedMembers = members.map((m) =>
        m.id === memberId ? { ...m, is_creator: isCreatorValue } : m
      );

      setMembers(updatedMembers);
    } catch (err) {
      console.error("Error updating member role", err);
    }
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full md:w-3/5">
        <h2 className="text-xl font-bold mb-4 text-[#372248]">
          Family Members
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed bg-white rounded-lg shadow-md overflow-hidden border border-slate-300">
            <thead className="bg-[#5B85AA] text-white">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold tracking-wide">
                  Full Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold tracking-wide">
                  Username
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold tracking-wide">
                  Open Tasks
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold tracking-wide">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b last:border-none hover:bg-slate-100"
                >
                  <td className="px-4 py-2 text-left text-sm whitespace-nowrap text-blue-600 font-medium">
                    {member.full_name}
                  </td>
                  <td className="px-4 py-2 text-left text-sm whitespace-nowrap text-blue-600 underline font-medium">
                    <Link to={`/profile/${member.username}`}>
                      {member.username}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-left text-sm whitespace-nowrap">
                    {typeof member.id === "number"
                      ? taskCounts[member.id] ?? "Loading..."
                      : "Loading..."}
                  </td>
                  <td className="px-4 py-2 text-left text-sm whitespace-nowrap">
                    {isCreator ? (
                      <select
                        value={member.is_creator ? "creator" : "member"}
                        onChange={(e) => {
                          if (typeof member.id === "number") {
                            handleRoleChange(
                              member.id,
                              e.target.value === "creator"
                            );
                          }
                          sessionStorage.setItem(
                            "isCreator",
                            e.target.value === "creator" ? "true" : "false"
                          );
                        }}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="member">Member</option>
                        <option value="creator">Creator</option>
                      </select>
                    ) : member.is_creator ? (
                      "Creator"
                    ) : (
                      "Member"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FamilyMembers;
