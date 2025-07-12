// AddTaskModal.tsx
import { FunctionComponent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Task } from "../../Models/Task";
import { createTask } from "../../services/taskService";
import { successMsg } from "../../services/feedbacks";
import { getAllMembersByFamily } from "../../services/membersService";
import { Member } from "../../Models/Member";

interface AddTaskModalProps {
  family_id: number;
  user_id: number;
  onTaskCreated: (task: Task) => void;
}

const AddTaskModal: FunctionComponent<AddTaskModalProps> = ({
  family_id,
  user_id,
  onTaskCreated,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    setIsCreator(sessionStorage.getItem("isCreator") === "true");
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      due_date: "",
      performerUserName: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Task name is required"),
      description: yup.string().required("Description is required"),
      due_date: yup.string().required("Due date is required"),
      performerUserName: isCreator
        ? yup.string().required("Please enter a performer")
        : yup.string().notRequired(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        let targetUserId = user_id;

        if (isCreator) {
          const members = await getAllMembersByFamily(
            sessionStorage.getItem("familyNickname") || ""
          );

          const performer = members.find(
            (member: Member) =>
              member.username.trim().toLowerCase() ===
              values.performerUserName.trim().toLowerCase()
          );

          if (!performer) {
            throw new Error("Performer not found in family members");
          }

          targetUserId = performer.id;
        }

        const newTask = await createTask({
          family_id: family_id,
          user_id: targetUserId,
          name: values.name,
          description: values.description,
          due_date: values.due_date,
          done: false,
        });

        onTaskCreated(newTask);
        resetForm();
        successMsg("Task created successfully!");
        setIsOpen(false);
      } catch (err) {
        console.error("Error creating task:", err);
      }
    },
  });

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center rounded-md bg-[#5B85AA] px-4 py-2 text-white hover:bg-[#4a6d8a] 
                  transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
      >
        Add Task
        <img
          src="\imgs\addTask.png"
          alt="sdvsv"
          className="w-5 h-5 inline ml-2 align-middle"
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#F4F7F5] rounded-lg shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold text-[#372248] mb-4">
              New Task
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#2F2504]">Task Name</label>
                <input
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="w-full border border-[#2F2504] rounded px-3 py-2 bg-white text-[#372248]"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-[#2F2504]">Description</label>
                <textarea
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  className="w-full border border-[#2F2504] rounded px-3 py-2 bg-white text-[#372248]"
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#2F2504]">Due Date</label>
                <input
                  type="date"
                  name="due_date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.due_date}
                  className="w-full border border-[#2F2504] rounded px-3 py-2 bg-white text-[#372248]"
                />
                {formik.touched.due_date && formik.errors.due_date && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.due_date}
                  </p>
                )}
              </div>
              {isCreator && (
                <div>
                  <label className="block text-[#2F2504]">
                    Task Performer (User Name)
                  </label>
                  <input
                    name="performerUserName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.performerUserName}
                    className="w-full border border-[#2F2504] rounded px-3 py-2 bg-white text-[#372248]"
                  />
                  {formik.touched.performerUserName &&
                    formik.errors.performerUserName && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.performerUserName}
                      </p>
                    )}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded bg-white border border-[#5B85AA] text-[#5B85AA] px-4 py-2 hover:bg-[#f0f0f0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-[#5B85AA] text-white px-4 py-2 hover:bg-[#4a6d8a]"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskModal;
