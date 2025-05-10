import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import React from "react";

const AppHeader = () => {
  return (
    <div className="shadow-md flex p-3 justify-between items-center md:px-3">
      <Image src={"/logo.svg"} alt="Logo" width={120} height={120} />
      <UserButton />
    </div>
  );
};

export default AppHeader;
