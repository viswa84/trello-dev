"use client";

import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionsProps {
  data: CardWithList;
}
export const Actions = ({ data }: ActionsProps) => {
  const parms = useParams();
  const cardModal = useCardModal();
  const { excute: excuteCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: () => {
        toast.success(`Card "${data.title}" copied`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
  const { excute: excuteDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: () => {
        toast.success(`Card "${data.title}" deleted`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
  const onCopy = () => {
    const boardId = parms.boardId as string;
    excuteCopyCard({
      id: data.id,
      boardId,
    });
  };
  const onDelete = () => {
    const boardId = parms.boardId as string;
    excuteDeleteCard({
      id: data.id,
      boardId,
    });
  };
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant={"gray"}
        className="w-full justify-start"
        size={"inline"}
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant={"gray"}
        className="w-full justify-start"
        size={"inline"}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActiomSkeleton() {
  return (
    <div className="spce-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
