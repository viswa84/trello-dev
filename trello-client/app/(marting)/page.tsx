import React from "react";
import { Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MarketingPage() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task mangement
        </div>
        <h1 className="text-3xl mb:text-6xl text-center text-neutral-800 mb-6">
          {" "}
          Taskify helps team move
        </h1>
        <div className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          {" "}
          Work forward.
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
        {" "}
        collaborate, manage projects,and reach new productivity peaks. From high
        rises to the office, the way ypur team works is unique - acommpish it
        all with Taskify
      </div>
      <Button className="mt-6" size="lg" >
        {" "}
        <Link href={"/sign-up"}>Get Taskify for free</Link>
      </Button>
    </div>
  );
}
