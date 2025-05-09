"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Suspense } from "react";
import Authprovider from "./Authprovider";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
const Provider = ({ children }) => {
  return (
    <Suspense fallback={<p>Loading .. </p>}>
      <ConvexProvider client={convex}>
        <Authprovider>{children}</Authprovider>
      </ConvexProvider>
    </Suspense>
  );
};

export default Provider;
