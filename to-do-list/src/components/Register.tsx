import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { errorMsg, successMsg } from "../services/feedbacks";
import { createFamily } from "../services/familyService";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      nickname: "",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: "",
      username: "", // חדש
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .required("Full Name is required")
        .min(4, "Full Name must be at least 4 characters long"),
      email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),
      phone: yup
        .string()
        .min(10, "Phone number must be at least 10 digits long"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      nickname: yup
        .string()
        .required("Nickname is required")
        .min(4, "Nickname must be at least 3 characters long"),
    }),
    onSubmit: async (values) => {
      try {
        const fam = await createFamily({
          family_nickname: values.nickname,
          creator_name: values.fullName,
          creator_email: values.email,
          phone: values.phone,
          password: values.password,
          username: values.username,
        });
        successMsg("Family created successfully!");
        navigate("/");
      } catch (err) {
        errorMsg((err as Error).message);
      }
    },
  });
  return (
    <div className="h-auto bg-[#F4F7F5] flex items-center justify-center px-4 py-1 my-1">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-md border border-[#2F2504] overflow-hidden">
        <div className="w-full md:w-1/2 p-6 sm:p-8 space-y-5">
          <h2 className="text-2xl font-bold text-center text-[#372248]">
            Create a Family Account
          </h2>

          <form className="space-y-4" action="#" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm text-[#372248]"
              >
                Family Nickname (Unique)
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nickname}
                placeholder="e.g. rov_family"
                className="mt-1 w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA]"
              />
            </div>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm text-[#372248]"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                required
                className="mt-1 w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA]"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-[#372248]"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                required
                className="mt-1 w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-[#372248]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
                className="mt-1 w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm text-[#372248]">
                phone
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                autoComplete="phone"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="mt-1 w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA]"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-[#372248]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="mt-1 w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA]"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 flex justify-center rounded-md bg-[#5B85AA] px-4 py-2 text-white font-semibold hover:bg-[#4a6d8a] transition duration-150"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-[#372248]">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-semibold text-[#5B85AA] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* תמונה בצד שמאל */}
        <div className="hidden md:block md:w-1/2 bg-[#F4F7F5]">
          <img
            src="/imgs/icon.jpg"
            alt="Your Family"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
