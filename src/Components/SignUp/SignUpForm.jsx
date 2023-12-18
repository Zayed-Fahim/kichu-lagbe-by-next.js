"use client";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import generateJWT from "@/utils/generateJWT";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  const { createUser, profileUpdate } = useAuth();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const { email, password, userName } = data;
    const toastId = toast.loading("Loading...");
    try {
      await createUser(email, password);
      await generateJWT({ email });
      await profileUpdate({
        displayName: userName,
      });
      toast.dismiss(toastId);
      toast.success("Account creation successful");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "Attempt Unsuccessful");
    }
  };
  const handleHidePassword = (event) => {
    event.preventDefault();
    setHidePassword(!hidePassword);
  };
  const handleHideConfirmPassword = (event) => {
    event.preventDefault();
    setHideConfirmPassword(!hideConfirmPassword);
  };

  return (
    <div className="flex flex-col gap-10 w-1/4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="relative">
          <input
            {...register("userName")}
            type="text"
            id="userName"
            className={`w-full border px-6 pt-8 pb-3 peer rounded-md outline-none ${
              theme === "dark" ? "bg-[#1D232A]" : "bg-white drop-shadow"
            }`}
            placeholder=" "
          />
          <label
            htmlFor="userName"
            className="absolute text-[18px] text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3"
          >
            Your Name
          </label>
        </div>
        {errors.userName && (
          <p className="text-red-500 -mt-3">Error: {errors.userName.message}</p>
        )}
        <div className="relative">
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`w-full border px-6 pt-8 pb-3 peer rounded-md outline-none ${
              theme === "dark" ? "bg-[#1D232A]" : "bg-white drop-shadow"
            }`}
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-[18px] text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3"
          >
            Email address
          </label>
        </div>
        {errors.email && (
          <p className="text-red-500 -mt-3">Error: {errors.email.message}</p>
        )}
        <div className="relative flex">
          <div className="relative w-full">
            <input
              {...register("password")}
              id="password"
              type={hidePassword ? "password" : "text"}
              className={`w-full border px-6 pt-8 pb-3 peer rounded-md bg-[#1D232A] outline-none ${
                theme === "dark" ? "bg-[#1D232A]" : "bg-white drop-shadow"
              }`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute text-[18px] text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3"
            >
              Password
            </label>
          </div>
          <button
            onClick={handleHidePassword}
            className={`absolute left-[90%] top-[30%]  ${
              (errors.email || errors.password) && "top-[30%]"
            }`}
          >
            {hidePassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 -mt-3">Error: {errors.password.message}</p>
        )}
        <div className="relative flex">
          <div className="relative w-full">
            <input
              {...register("confirmPassword")}
              id="cPassword"
              type={hideConfirmPassword ? "password" : "text"}
              className={`w-full border px-6 pt-8 pb-3 peer rounded-md bg-[#1D232A] outline-none ${
                theme === "dark" ? "bg-[#1D232A]" : "bg-white drop-shadow"
              }`}
              placeholder=""
            />
            <label
              htmlFor="cPassword"
              className="absolute text-[18px] text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3"
            >
              Confirm Password
            </label>
          </div>
          <button
            onClick={handleHideConfirmPassword}
            className={`absolute left-[90%] top-[30%]  ${
              (errors.confirmPassword || errors.password) && "top-[30%]"
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
          className="w-full border px-6 py-5 rounded-md bg-[#32a8a0] text-white text-xl uppercase font-semibold cursor-pointer drop-shadow"
        />
      </form>
    </div>
  );
};

export default SignUpForm;
