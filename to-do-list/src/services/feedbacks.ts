import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function successMsg(message: string) {
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
  });
}
export function routineMsg(message: string) {
  toast.info(message, {
    position: "top-center",
    autoClose: 2000,
  });
}
export function errorMsg(message: string) {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
  });
}
