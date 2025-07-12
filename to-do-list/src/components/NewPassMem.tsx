import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { successMsg } from "../services/feedbacks";

interface NewPasswordForMemberProps {}

const NewPasswordForMember: FunctionComponent<
  NewPasswordForMemberProps
> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      nickName: "",
      userName: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: yup.object({
      userName: yup
        .string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters long"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      repeatPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please repeat your password"),
    }),
    onSubmit: (values) => {
      successMsg("Registration successful!");
      navigate("/");
    },
  });
  return (
    <>
      <div className="h-auto bg-[#F4F7F5] flex items-center justify-center px-4 py-5 my-3">
        <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-md border border-[#2F2504] overflow-hidden">
          <div className="w-full md:w-1/2 p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-bold text-center text-[#372248]">
              Join Existing Account
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm text-[#372248]"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                  className="mt-1 w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA]"
                  placeholder="Enter username"
                />
                {formik.touched.userName && formik.errors.userName && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.userName}
                  </div>
                )}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="mt-1 w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA]"
                  placeholder="Enter password"
                  autoComplete="new-password"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="repeatPassword"
                  className="block text-sm text-[#372248]"
                >
                  Repeat Password
                </label>
                <input
                  type="password"
                  id="repeatPassword"
                  name="repeatPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.repeatPassword}
                  className="mt-1 w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA]"
                  placeholder="Repeat password"
                  autoComplete="new-password"
                />
                {formik.touched.repeatPassword &&
                  formik.errors.repeatPassword && (
                    <div className="text-red-600 text-sm">
                      {formik.errors.repeatPassword}
                    </div>
                  )}
              </div>
              <button
                type="submit"
                className="w-full mt-2 flex justify-center rounded-md bg-[#5B85AA] px-4 py-2 text-white font-semibold hover:bg-[#4a6d8a] transition duration-150"
              >
                Join Account
              </button>
            </form>
          </div>
          <div className="hidden md:flex md:w-1/2 bg-[#F4F7F5] items-center">
            <img
              src="/imgs/welcomeImg.png"
              alt="Your Family"
              className="object-contain max-h-[500px] w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPasswordForMember;
