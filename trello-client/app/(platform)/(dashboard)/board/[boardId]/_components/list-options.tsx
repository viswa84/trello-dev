"use client";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { deleteList } from "@/actions/delete-list";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";
import { copyList } from "@/actions/copy-list";

interface ListOptionProps {
  data: List;
  onAddCard: () => void;
}
export const ListOptions = ({ data, onAddCard }: ListOptionProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const { excute: excuteDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(` List ${data.title} deleted`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { excute: excuteCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(` List ${data.title} copied`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    excuteDelete({
      id,
      boardId,
    });
  };
  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    excuteCopy({
      id,
      boardId,
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 "
            variant={"ghost"}
          >
            <X className="h-4 w-4 " />
          </Button>
        </PopoverClose>
        <Button
          className="rounded-none w-full h-auto p-2 pxx-5 justify-start font-normal text-sm"
          variant={"ghost"}
        >
          Add Card ...
        </Button>
        <form action={onCopy}>
          <input hidden name="id" id={"id"} value={data.id} />
          <input hidden name="boardId" id={"boardId"} value={data.boardId} />
          <FormSubmit
            className="rounded-none w-full h-auto p-2 pxx-5 justify-start font-normal text-sm"
            variant={"ghost"}
          >
            Copy List ...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" id={"id"} value={data.id} />
          <input hidden name="boardId" id={"boardId"} value={data.boardId} />
          <FormSubmit

            className="rounded-none w-full h-auto p-2 pxx-5 justify-start font-normal text-sm"
            variant={"ghost"}
          >
            Delete this List ...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
