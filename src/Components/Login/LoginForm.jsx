"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FcGoogle } from "react-icons/fc";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import useTheme from "@/hooks/useTheme";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import generateJWT from "@/utils/generateJWT";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const LoginForm = () => {
  const { theme } = useTheme();
  const [hide, setHide] = useState(true);
  const { googleLogin, signIn } = useAuth();
  const handleGoogleLogin = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const { user } = await googleLogin();
      await generateJWT({ email: user.email });
      toast.dismiss(toastId);
      toast.success("Welcome Back.Successfully Login with Google!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "User not registered");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const toastId = toast.loading("Loading...");
    const { email, password } = data;
    try {
      await signIn(email, password);
      await generateJWT({ email });
      toast.dismiss(toastId);
      toast.success("Welcome Back.Successfully Login with your Email!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(
        error.message || "User not registered! Please sign up first!"
      );
    }
  };
  const handleHidePassword = (event) => {
    event.preventDefault();
    setHide(!hide);
  };

  return (
    <div className="flex flex-col gap-10 w-1/4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <input
          {...register("email")}
          type="email"
          className={`w-full border px-6 py-3 rounded-md outline-none ${
            theme === "dark" ? "bg-[#1D232A]" : "bg-white drop-shadow"
          }`}
          placeholder="Email address"
        />
        {errors.email && (
          <p className="text-red-500 -mt-3">Error: Email is required.</p>
        )}
        <div className="relative flex">
          <input
            {...register("password")}
            type={hide ? "password" : "text"}
            className={`w-full border px-6 py-3 rounded-md bg-[#1D232A] outline-none ${
              theme === "dark" ? "bg-[#1D232A]" : "bg-white drop-shadow"
            }`}
            placeholder="Password"
          />
          <button
            onClick={handleHidePassword}
            className={`absolute left-[90%] top-[30%]  ${
              (errors.email || errors.password) && "top-[30%]"
            }`}
          >
            {hide ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 -mt-3">Error: Password is required.</p>
        )}
        <div>
          <h1 className="text-center -mt-2 mb-4">
            New to Kichu Lagbe?{" "}
            <span className="text-[#32a8a0] hover:underline">
              <Link href="/sign-up">Sign up</Link>
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
export default LoginForm;
