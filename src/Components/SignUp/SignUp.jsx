import Link from "next/link";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <div className="flex flex-col gap-32 w-full justify-center items-center">
      <Link href="/" className="flex justify-center mt-10 ">
        <h1 className="font-bold text-xl p-5 rounded-[50%] shadow-2xl border italic">
          Kichu <br /> lagbe?
        </h1>
      </Link>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
