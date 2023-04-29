import { User } from "@/app/types";
import React from "react";
import Image from "next/image";

const UserInfo = ({ user }: { user: User }) => {
  return (
    <div className="sm:flex sm:space-x-5">
      <div className="flex-shrink-0">
        <Image
          className="mx-auto h-20 w-20 rounded-full object-cover"
          src={user.imageUrl}
          alt=""
          height={80}
          width={80}
        />
      </div>
      <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
        <p className="text-sm font-medium text-gray-600">Welcome back,</p>
        <p className="text-xl font-bold text-gray-900 sm:text-2xl">
          {user.name}
        </p>
        <p className="text-sm font-medium text-gray-600">{user.role}</p>
      </div>
    </div>
  );
};
export default UserInfo;
