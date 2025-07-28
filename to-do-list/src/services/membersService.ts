import axios from "axios";
import { Member } from "../Models/Member";
import { getFamilyByNickName } from "./familyService";
import exp from "constants";

const API_URL = "http://localhost:3001/members";

export const getMemberByFamilyAndUserName = async (
  familyNickName: string,
  userName: string,
  password: string
) => {
  try {
    const family = await getFamilyByNickName(familyNickName);
    const familyId = family.id;
    const response = await axios.get(
      `${API_URL}/${familyId}/user/${userName}/${encodeURIComponent(password)}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Member not found");
    }
    throw new Error("Failed to fetch member");
  }
};
export const getMemberByUserName = async (
  familyNickName: string,
  userName: string
) => {
  try {
    const family = await getFamilyByNickName(familyNickName);
    const familyId = family.id;
    const response = await axios.get(`${API_URL}/${familyId}/${userName}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Member not found");
    }
    throw new Error("Failed to fetch member");
  }
};

export const createMember = async (member: Member) => {
  try {
    const response = await axios.post(API_URL, member);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Failed to create member");
  }
};

export const getAllMembersByFamily = async (familyNickName: string) => {
  const family = await getFamilyByNickName(familyNickName);
  const familyId = family.id;
  try {
    const response = await axios.get(`${API_URL}/${familyId}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("No members found for this family");
    }
    throw new Error("Failed to fetch members");
  }
};

export let getMemberByNameAndIdFam = async (id: number, name: string) => {
  try {
    let response = await axios.get(`${API_URL}/${id}/${name}`);
    return response.data;
  } catch (error) {
    const err = error as any;
    if (err.response?.status === 404) {
      throw new Error("Member not found");
    }
    throw new Error("Failed to fetch member by name and id");
  }
};

export let updateMemberRole = async (
  nickname: string,
  memberId: number,
  isCreator: boolean
) => {
  return await axios.put(`${API_URL}/${nickname}/${memberId}/role`, {
    is_creator: isCreator,
  });
};
