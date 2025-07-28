import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbacks";
import * as yup from "yup";
import { createMember } from "../services/membersService";

interface SignUpToFamilyProps {}

const SignUpToFamily: FunctionComponent<SignUpToFamilyProps> = () => {
  const navigate = useNavigate();
  const familyNickname = sessionStorage.getItem("familyNickname");
  const creatorName = sessionStorage.getItem("creatorName");

  const formik = useFormik({
    initialValues: {
      nickName: familyNickname ? familyNickname : "",
      full_Name: creatorName ? creatorName : "",
      userName: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: yup.object({
      nickName: yup
        .string()
        .required("Nickname is required")
        .min(3, "Nickname must be at least 3 characters long"),
      full_Name: yup
        .string()
        .required("Full name is required")
        .min(5, "Full name must be at least 5 characters long"),
      userName: yup
        .string()
        .required("Username is required")
        .min(2, "Username must be at least 2 characters long"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      repeatPassword: yup
        .string()
        .required("Please repeat your password")
        .oneOf([yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        let member;
        if (!familyNickname || !creatorName) {
          member = await createMember({
            family_nickname: values.nickName,
            full_name: values.full_Name,
            username: values.userName,
            password: values.password,
            is_creator: false,
          });
        } else {
          member = await createMember({
            family_nickname: values.nickName,
            full_name: values.full_Name,
            username: values.userName,
            password: values.password,
            is_creator: true,
          });
        }
        console.log("Sending to server:", member);
        successMsg("Now put your userName and password!");
        navigate("/");
        sessionStorage.removeItem("creatorName");
        sessionStorage.setItem("userName", values.userName);
      } catch (error: any) {
        console.error("Full error object:", error); // ← הוסף את זה
        console.error("Error response:", error.response); // ← הוסף את זה
        console.error("Error creating member:", error);
        errorMsg(
          "An error occurred while joining the family. Please try again."
        );
      }
    },
  });

  return (
    <div className="h-auto bg-[#F4F7F5] flex items-center justify-center px-4 my-2">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-md border border-[#2F2504] overflow-hidden">
        <div className="w-full md:w-1/2 p-6 sm:p-8 space-y-5">
          <h2 className="text-2xl font-bold text-center text-[#372248]">
            Join Existing Account
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nickName"
                className="block text-sm text-[#372248]"
              >
                Nickname Family
              </label>
              <input
                type="text"
                id="nickName"
                name="nickName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nickName}
                className="mt-1 w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA]"
                placeholder="Enter your nickname"
              />
              {formik.touched.nickName && formik.errors.nickName && (
                <div className="text-red-600 text-sm">
                  {formik.errors.nickName}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="full_Name"
                className="block text-sm text-[#372248]"
              >
                your Full Name
              </label>
              <input
                type="text"
                id="full_Name"
                name="full_Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.full_Name}
                className="mt-1 w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA]"
                placeholder="Enter your full_Name"
              />
              {formik.touched.full_Name && formik.errors.full_Name && (
                <div className="text-red-600 text-sm">
                  {formik.errors.full_Name}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="userName"
                className="block text-sm text-[#372248]"
              >
                Your UserName
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                className="mt-1 w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA]"
                placeholder="Enter your userName"
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
                htmlFor="password"
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
                placeholder="Enter password"
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

          <p className="text-center text-sm text-[#372248]">
            Don't have an account?
            <a
              href="/"
              className="font-semibold text-[#5B85AA] hover:underline"
            >
              Login here
            </a>
          </p>
        </div>

        <div className="hidden md:block md:w-1/2 bg-[#F4F7F5]">
          <img
            src="/imgs/icon.jpg"
            alt="Your Family"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpToFamily;
