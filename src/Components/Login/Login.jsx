import Link from "next/link";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col gap-72 w-full justify-center items-center">
      <Link href="/" className="flex justify-center mt-10 ">
        <h1 className="font-bold text-xl p-5 rounded-[50%] shadow-2xl border italic">
          Kichu <br /> lagbe?
        </h1>
      </Link>
      <LoginForm />
    </div>
  );
};

export default Login;
