import React from "react";
import Image from "next/image";
import AuthOptions from "@/app/(pages)/(auth)/components/authOptions";
import logo from "@/assets/images/logo-indigo.svg";
const Page = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto w-auto h-10"
            src={logo}
            alt="Your Company Logo"
            height={40}
            width={40}
          />
          <h2 className="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-slate-900">
            Are you sure you want to sign out?
          </h2>
        </div>

       <AuthOptions type={"signout"} />
      </div>
    </>
  );
};
export default Page;
