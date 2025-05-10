"use client";

import { Button } from "@/components/ui/button";
import { ExpertList } from "@/services/Options";
import { useUser } from "@stackframe/stack";
import Image from "next/image";
import React from "react";

const Features = () => {
  const user = useUser();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium text-gray-500 text-xl">My WorkSpace</h2>
          <h2 className="text-3xl font-bold pt-2">
            Welcome Back, {user?.displayName}
          </h2>
        </div>
        <Button className={`cursor-pointer`}>Profile</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 mt-10">
        {ExpertList.map((option, index) => (
          <div>
            <div
              key={index}
              className="p-3 bg-secondary rounded-3xl flex flex-col justify-center items-center gap-6 cursor-pointer pt-4"
            >
              <Image
                src={option?.icon}
                alt="icon"
                width={150}
                height={150}
                className="h-[70px] w-[70px]"
              />
              <h2 className="font-semibold ">{option?.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
