"use client";

import "@/app/globals.css";
import { useSearchParams } from "next/navigation";
import { useSearchBooks } from "@/app/hooks/useSearchBooks";
import AnimatedHome from "./ui/animatedHome";

export default function Home() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || ""

  const { data: data, isLoading, error } = useSearchBooks(q);

  return (
    <div className="flex flex-col min-h-screen bg-black/20">
      <AnimatedHome isLoading={isLoading} q={q} data={data}/>
    </div>
  );
}
