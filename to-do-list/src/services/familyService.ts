import axios from "axios";
import { Family } from "../Models/Family";

const API_URL = "http://localhost:3001/families";
export const getFamilyByNickName = async (nickName: string) => {
  const response = await axios.get(`${API_URL}/${nickName}`);
  return response.data;
};

export const createFamily = async (family: Family & { username: string }) => {
  try {
    const response = await axios.post(API_URL, family);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Failed to create family");
  }
};
