
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Board } from "./board";
import { Form } from "./form";

const OrganizationPage = async () => {
  const boards = await db.board.findMany();

  const { userId, orgId } = auth();
  return (
    <div className="flex flex-col space-y-4">
       <Form/>
      <div className="space-y-2">
        {boards.map((board) => (
          <Board key={board.id} title={board.title} id={board.id} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationPage;
