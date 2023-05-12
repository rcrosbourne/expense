import { User } from "@/app/types";
import React from "react";
import Image from "next/image";

const UserInfo = ({ user }: { user: User }) => {
  return (
    <div className="sm:flex sm:space-x-5">
      <div className="flex-shrink-0">
        {user && user.image ? (
          <Image
            className="mx-auto h-20 w-20 rounded-full object-cover"
            src={user?.image}
            alt=""
            height={80}
            width={80}
          />
        ) : (
          <div className="pointer-events-none rounded-full h-20 w-20 bg-purple-500 ring-2 ring-purple-900 text-4xl text-slate-50 flex items-center justify-center">
            {user?.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
        <p className="text-sm font-medium text-gray-600">Welcome back,</p>
        <p className="text-xl text-gray-900 sm:text-2xl capitalize">
          {user.name}
        </p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};
export default UserInfo;
