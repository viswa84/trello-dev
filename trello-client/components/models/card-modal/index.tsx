"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { AuditLog } from "@prisma/client";
import { Activitiy } from "./activity";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isopen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: CardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });
  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!CardData ? <Header.Skeleton/> :   <Header data={CardData} /> }

        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
            {!CardData ? <Description.Skeleton/> :   <Description data={CardData} /> }
            {!auditLogsData ? <Activitiy.Skeleton/> :   <Activitiy items={auditLogsData} /> }
            </div>
          </div>
          {!CardData ? <Actions.Skeleton/> :   <Actions data={CardData} /> }
        </div>
      
      </DialogContent>
    </Dialog>
  );
};

