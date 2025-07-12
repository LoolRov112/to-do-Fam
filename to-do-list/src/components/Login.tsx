import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbacks";
import { getFamilyByNickName } from "../services/familyService";
import { getMemberByFamilyAndUserName } from "../services/membersService";

type Props = {};

const Login = (props: Props) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      familyNickname: "",
      userName: "",
      password: "",
    },
    validationSchema: yup.object({
      userName: yup
        .string()
        .required("Username is required")
        .min(4, "Username must be at least 4 characters long"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    }),
    onSubmit: async (values) => {
      try {
        let user = await getMemberByFamilyAndUserName(
          values.familyNickname,
          values.userName,
          values.password
        );
        console.log("user object:", user);
        if (!user || user.password !== values.password) {
          errorMsg("User not found. Please check your credentials.");
          return;
        }
        let family = await getFamilyByNickName(values.familyNickname);
        if (!family) {
          errorMsg("Family not found. Please check the family nickname.");
          return;
        }
        successMsg("Login successful!");
        navigate("/home");
        sessionStorage.setItem(
          "isCreator",
          user.full_name === family.creator_name ? "true" : "false"
        );
        console.log("isCreator:", sessionStorage.getItem("isCreator"));
        sessionStorage.setItem("familyNickname", values.familyNickname);
        sessionStorage.setItem("userName", values.userName);
        sessionStorage.setItem("isLoggedIn", "true");
      } catch (error) {
        console.error("Login error:", error);
        errorMsg("An error occurred while logging in. Please try again.");
      }
    },
  });
  return (
    <div className="min-h bg-[#F4F7F5] flex items-center justify-center px-4 my-2">
      <div className="w-full max-w-sm space-y-6 bg-white p-6 rounded-xl shadow-md border border-[#2F2504]">
        <div className="text-center">
          <img
            className="mx-auto h-24 w-36"
            src="../imgs/icon.jpg"
            alt="Your Company"
          />
          <h2 className="mt-4 text-xl font-bold tracking-tight text-[#372248]">
            Sign in to your account
          </h2>
        </div>

        <form className="space-y-4" action="#" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="familyNickname"
              className="block text-sm font-medium text-[#372248]"
            >
              Family Nickname
            </label>
            <input
              type="text"
              name="familyNickname"
              id="familyNickname"
              autoComplete="familyNickname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.familyNickname}
              required
              className="mt-1 block w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA] focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-[#372248]"
            >
              User Name
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              autoComplete="userName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              required
              className="mt-1 block w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#372248]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 block w-full rounded-md border border-[#2F2504] bg-[#F4F7F5] px-3 py-1.5 text-[#5B85AA] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B85AA] focus:border-transparent"
            />
          </div>

          <div className="flex justify-center text-sm">
            <Link
              to="/forgot-password"
              className="text-[#5B85AA] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-[#5B85AA] px-4 py-1.5 text-white font-semibold hover:bg-[#4a6d8a] transition duration-150"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-[#372248]">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#5B85AA] hover:underline"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
