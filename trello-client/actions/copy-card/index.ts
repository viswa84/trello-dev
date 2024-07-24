"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, boardId } = data;
  let card;
  try {
    const carToCopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!carToCopy) {
      return { error: "Card Not Found" };
    }
    const lastCard = await db.card.findFirst({
      where: { listId: carToCopy.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newOrder = lastCard ? lastCard.order + 1 : 1;
    card = await db.card.create({
      data: {
        title: `${carToCopy.title} - Copy`,
        description: carToCopy.description,
        order: newOrder,
        listId: carToCopy.listId,
      },
    });
    await createAuditLog({
      entityTitle: card.title,
      enityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CERATE,
    });
  } catch (error) {
    return {
      error: "Failed to copy.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
