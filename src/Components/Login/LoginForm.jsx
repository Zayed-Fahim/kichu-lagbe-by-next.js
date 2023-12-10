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

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const LoginForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState(null);
  const [hide, setHide] = useState(true);
  const { googleLogin, signIn } = useAuth();
  const handleGoogleLogin = async () => {
    await googleLogin();
    toast.success("Welcome Back.Successfully Login with Google!");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleHidePassword = () => {
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

        <input
          {...register("password")}
          type={hide ? "password" : "text"}
          className={`w-full border px-6 py-3 rounded-md bg-[#1D232A] outline-none ${
            theme === "dark" ? "bg-[#1D232A]" : "bg-white drop-shadow"
          }`}
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 -mt-3">Error: Password is required.</p>
        )}

        <div>
          <h1 className="text-center -mt-2 mb-4">
            Already have an account?{" "}
            <span className="text-[#32a8a0] hover:underline">
              <Link href="/signup">Sign up</Link>
            </span>
          </h1>
        </div>

        <input
          type="submit"
          className="w-full border px-6 py-3 rounded-md bg-[#32a8a0] text-white text-xl uppercase font-semibold cursor-pointer drop-shadow"
        />
      </form>
      <button
        onClick={() => handleHidePassword()}
        className={`absolute left-[60%] top-[51.2%] ${
          (errors.email || errors.password) && "top-[55.4%]"
        }`}
      >
        {hide ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
      </button>
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
