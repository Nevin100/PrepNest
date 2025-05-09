"use client";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";

const Authprovider = ({ children }) => {
  const Createuser = useMutation(api.users.CreateUser);
  const user = useUser();
  useEffect(() => {
    console.log(user);
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    const result = await Createuser({
      name: user?.displayName,
      email: user?.primaryEmail,
    });
    console.log(result);
  };
  return <div>{children}</div>;
};

export default Authprovider;
