import { FunctionComponent } from "react";
import { deleteTask } from "../../services/taskService";

interface DeleteTaskModalProps {
  taskId: number;
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess: () => void;
}

const DeleteTaskModal: FunctionComponent<DeleteTaskModalProps> = ({
  taskId,
  isOpen,
  onClose,
  onDeleteSuccess,
}) => {
  const handleDelete = async () => {
    try {
      await deleteTask(taskId);
      onDeleteSuccess();
      onClose();
    } catch (error: any) {
      alert(error.message || "Failed to delete task");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-2xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Delete Task
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="text-gray-600 hover:underline">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
