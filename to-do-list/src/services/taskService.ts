import axios from "axios";
import { Task } from "../Models/Task";
const API_URL = "http://localhost:3001/tasks";

export const getTasksByFamilyId = async (familyId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${familyId}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Tasks not found for this family");
    }
    throw new Error("Failed to fetch tasks");
  }
};
export const getTasksByUserAndFamily = async (familyId: number, id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${familyId}/user/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error("Error fetching tasks:", error);
      throw new Error("Tasks not found for this user in this family");
    }
    throw new Error("Failed to fetch tasks");
  }
};

export const createTask = async (task: Task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Failed to create task");
  }
};

export const updateTask = async (task: Task) => {
  try {
    const response = await axios.put(`${API_URL}/${task.id}`, task);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Task not found");
    }
    throw new Error("Failed to update task");
  }
};
export const deleteTask = async (taskId: number) => {
  try {
    await axios.delete(`${API_URL}/${taskId}`);
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Task not found");
    }
    throw new Error("Failed to delete task");
  }
};

export const completeTask = async (taskId: number) => {
  try {
    const response = await axios.put(`${API_URL}/done/${taskId}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Task not found");
    }
    throw new Error("Failed to complete task");
  }
};
