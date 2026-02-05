"use client";

import { authClient, useSession } from "../lib/auth-client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuthOverlay } from "@/app/LayoutContext/OverlayContext";
import { useSessionQuery } from "@/app/lib/useSessionQeury";

export default function HeaderSession() {
  const { showLogin, showSignup } = useAuthOverlay();
  const { data: session, isPending, error } = useSessionQuery();
  const user = session?.user;
  if (isPending) {
    return (
      <div className="hidden md:flex gap-3 md:gap-6  items-center font-gantari text-lg">
        <div className="animate-pulse bg-gray-300 rounded border w-full blur-sm">
          My shelf
        </div>
        <p className="font-bold text-3xl flex items-center">|</p>
        <div className="animate-pulse bg-gray-300 rounded border w-full blur-sm">
          My shelf
        </div>
      </div>
    );
  }
  if (error) {
    return <></>;
  }
  return (
    <div className="">
      {user ? (
        <div className="hidden md:flex gap-3 md:gap-6  items-center font-gantari text-lg">
          <Link href="/pages/Myshelf">My shelf</Link>
          <p className="font-bold text-3xl flex items-center">|</p>
          <Link className="text-cyan-400" href="/pages/Profile">
            {user.name} 
          </Link>
        </div>
      ) : (
        <div className="hidden font-black md:flex gap-3 md:gap-6  items-center font-gantari text-lg">
          <button className="cursor-pointer" onClick={showLogin}>Login</button>
          <p className="font-bold text-3xl flex items-center">|</p>
          <button className="text-cyan-400 cursor-pointer" onClick={showSignup}>
            Register
          </button>
        </div>
      )}
    </div>
  );
}
