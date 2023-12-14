"use client";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";

const schema = yup
  .object({
    userName: yup.string().required("Username is required."),
    email: yup.string().required("Email is required."),
    password: yup
      .string()
      .required("Password is required.")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required.")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([yup.ref("password")], "Password do not match"),
  })
  .required();

const SignUpForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState(null);
  const { googleLogin, signIn } = useAuth();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const handleGoogleLogin = async () => {
    await googleLogin();
    toast.success("Welcome Back.Successfully Login with Google!");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };
  const handleHideConfirmPassword = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };

  return (
    <div className="flex flex-col gap-10 w-1/4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <input
          {...register("userName")}
          type="text"
          className={`w-full border px-6 py-3 rounded-md outline-none ${
            theme === "dark" ? "bg-[#1D232A]" : "bg-white drop-shadow"
          }`}
          placeholder="Your Name"
        />
        {errors.userName && (
          <p className="text-red-500 -mt-3">Error: {errors.userName.message}</p>
        )}
        <input
          {...register("email")}
          type="email"
          className={`w-full border px-6 py-3 rounded-md outline-none ${
            theme === "dark" ? "bg-[#1D232A]" : "bg-white drop-shadow"
          }`}
          placeholder="Email address"
        />
        {errors.email && (
          <p className="text-red-500 -mt-3">Error: {errors.email.message}</p>
        )}

        <div className="relative flex">
          <input
            {...register("password")}
            type={hidePassword ? "password" : "text"}
            className={`w-full border px-6 py-3 rounded-md bg-[#1D232A] outline-none ${
              theme === "dark" ? "bg-[#1D232A]" : "bg-white drop-shadow"
            }`}
            placeholder="Password"
          />
          <button
            onClick={() => handleHidePassword()}
            className={`absolute left-[90%] top-[30%]  ${
              (errors.email || errors.password) && "top-[35%]"
            }`}
          >
            {hidePassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 -mt-3">Error: {errors.password.message}</p>
        )}
        <div className="relative flex">
          <input
            {...register("confirmPassword")}
            type={hideConfirmPassword ? "password" : "text"}
            className={`w-full border px-6 py-3 rounded-md bg-[#1D232A] outline-none ${
              theme === "dark" ? "bg-[#1D232A]" : "bg-white drop-shadow"
            }`}
            placeholder="Confirm Password"
          />
          <button
            onClick={() => handleHideConfirmPassword()}
            className={`absolute left-[90%] top-[30%]  ${
              (errors.confirmPassword || errors.password) && "top-[35%]"
            }`}
          >
            {hideConfirmPassword ? (
              <FaEyeSlash size={20} />
            ) : (
              <FaEye size={20} />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 -mt-3">
            Error: {errors.confirmPassword.message}
          </p>
        )}

        <div>
          <h1 className="text-center -mt-2 mb-4">
            Already have an account?{" "}
            <span className="text-[#32a8a0] hover:underline">
              <Link href="/login">Login</Link>
            </span>
          </h1>
        </div>

        <input
          type="submit"
          className="w-full border px-6 py-3 rounded-md bg-[#32a8a0] text-white text-xl uppercase font-semibold cursor-pointer drop-shadow"
        />
      </form>
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleLogin}
        className="flex gap-5 items-center w-full border px-6 py-3 rounded-md drop-shadow"
      >
        <FcGoogle size={26} /> <h1>Continue with Google</h1>
      </button>
    </div>
  );
};

export default SignUpForm;
