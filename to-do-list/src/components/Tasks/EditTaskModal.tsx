import { FunctionComponent } from "react";
import { Task } from "../../Models/Task";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateTask } from "../../services/taskService";

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
  isOpen: boolean;
}

const EditTaskModal: FunctionComponent<EditTaskModalProps> = ({
  task,
  onClose,
  onUpdate,
  isOpen,
}) => {
  const formik = useFormik({
    initialValues: {
      name: task.name,
      description: task.description,
      due_date: task.due_date?.substring(0, 10) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Task name is required"),
      description: Yup.string().required("Description is required"),
      due_date: Yup.string().required("Due date is required"),
    }),
    onSubmit: async (values) => {
      const updatedTask = { ...task, ...values };
      onUpdate(updatedTask);
      await updateTask(updatedTask);
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-2xl w-[90%] max-w-lg shadow-2xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Task</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <input
              name="name"
              className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Task name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <textarea
              name="description"
              className="border border-gray-300 w-full p-2 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Description"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div>
            <input
              name="due_date"
              type="date"
              className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formik.values.due_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.due_date && formik.errors.due_date && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.due_date}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
