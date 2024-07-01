import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";
import { Board } from "@prisma/client";

interface BoardNavbarProps {
  data: Board;
}

export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  const { orgId } = auth();
  //   const board = await db.board.findUnique({
  //     where: {
  //       id,
  //       orgId: orgId!,
  //     },
  //   });

  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};
