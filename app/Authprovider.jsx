"use client";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { UserContext } from "./_context/UserContext";

const Authprovider = ({ children }) => {
  const Createuser = useMutation(api.users.CreateUser);
  const user = useUser();
  const [userData, setUserData] = useState();

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
    setUserData(result);
  };
  return (
    <div>
      <UserContext.Provider value={{ userData, setUserData }}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default Authprovider;
