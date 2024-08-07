import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { Suspense } from "react";
import { ActivityList } from "./_components/ActivityList";

const ActivityPage = () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <>
        <ActivityList />
      </>
    </div>
  );
};

export default ActivityPage;
