import { useEffect, useState, FunctionComponent } from "react";
import { getFamilyByNickName } from "../../services/familyService";
import { getMemberByUserName } from "../../services/membersService";
import Home from "./Home";

import { useParams } from "react-router-dom";

const OtherMemberTasks: FunctionComponent = () => {
  const { memberUsername } = useParams<{ memberUsername: string }>();
  const [userId, setUserId] = useState<number | null>(null);
  const [familyId, setFamilyId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const familyNickname = sessionStorage.getItem("familyNickname");
      if (!familyNickname || !memberUsername) return;

      try {
        const family = await getFamilyByNickName(familyNickname);
        const member = await getMemberByUserName(
          familyNickname,
          memberUsername
        );
        setFamilyId(family.id);
        setUserId(member.id);
      } catch (err) {
        console.error("Error loading other member's profile:", err);
      }
    };

    fetchData();
  }, [memberUsername]);

  if (!userId || !familyId) return <p>Loading...</p>;

  return <Home overrideFamilyId={familyId} overrideUserId={userId} />;
};

export default OtherMemberTasks;
